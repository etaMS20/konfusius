import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartTotalsComponent } from '../cart-totals/cart-totals.component';
import {
  BillingComponent,
  FormOutput,
} from '../billing-input/billing-input.component';
import { WcStoreAPI } from '@services/api/wc-store-api.service';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { WcCart, WcCartItem, WcCheckOutData } from '@models/cart.model';
import { CustomEndpointsService } from '@services/api/custom-endpoints.service';
import { BlogPost, BlogPostId } from '@models/blog-post.model';
import { WordPressApiService } from '@services/api/wp-api.service';
import { Router } from '@angular/router';
import { EncryptionService } from '@services/encryption.service';
import { indicate } from '@utils/reactive-loading.utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConditionsComponent } from '../conditions/conditions.component';
import {
  DisclaimerState,
  DisclaimerStateStore,
} from '@models/disclaimer.model';
import { LocalStorageService } from '@storage/local-storage.service';
import { getCurrentStateBySKU } from '@utils/disclaimer.utils';
import { LsKeys } from '@models/storage.model';
import { DISCLAIMER_PRODUCTS } from '@models/cross-sale.model';

@Component({
  selector: 'app-checkout-container',
  standalone: true,
  imports: [
    CommonModule,
    CartTotalsComponent,
    BillingComponent,
    MatProgressSpinnerModule,
    ConditionsComponent,
  ],
  templateUrl: './checkout-container.component.html',
  styleUrls: ['./checkout-container.component.scss'],
})
export class CheckoutContainerComponent implements OnInit, OnDestroy {
  wcStoreApi = inject(WcStoreAPI);
  wpApi = inject(WordPressApiService);
  errorService = inject(ErrorDialogService);
  customEpS = inject(CustomEndpointsService);
  lsService = inject(LocalStorageService);
  private readonly cryptoService = inject(EncryptionService);
  private readonly router = inject(Router);

  mainItem?: WcCartItem;
  crossSaleItem?: WcCartItem;

  cartCoupons = computed(() => {
    const coupons = this.cart()?.coupons;
    if (coupons && coupons.length > 0) {
      return coupons;
    }
    return [];
  });

  private readonly destroy$ = new Subject<void>();
  loading$ = new Subject<boolean>();
  allowedOptions = signal<string[]>([]);
  rules = signal<BlogPost | undefined>(undefined);
  disclaimerState?: DisclaimerState;

  cart = signal<WcCart | null>(null);
  cartTotals = computed(() => {
    return this.cart()?.totals ?? undefined;
  });
  cartItems = computed(() => {
    return this.cart()?.items?.length ? this.cart()?.items : undefined;
  });
  billingAddress = computed(() => {
    return this.cart()?.billing_address;
  });

  constructor() {
    effect(() => {
      this.mainItem = this.cartItems()?.find(
        (item) => !DISCLAIMER_PRODUCTS.has(item.id),
      );
      this.crossSaleItem = this.cartItems()?.find((item) =>
        DISCLAIMER_PRODUCTS.has(item.id),
      );

      if (this.mainItem) {
        this.disclaimerState = getCurrentStateBySKU(
          this.lsService.getItem<DisclaimerStateStore>(LsKeys.DISC_STATE) ?? {},
          this.mainItem.sku,
        );
      }
    });
  }

  ngOnInit(): void {
    this.loading$.next(true);
    this.wpApi.getPostById(BlogPostId.KODEX_INFO).subscribe((post) => {
      this.rules.set(post);
    });

    this.wcStoreApi
      .getCart()
      .pipe(
        indicate(this.loading$),
        takeUntil(this.destroy$),
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      )
      .subscribe((response: WcCart) => {
        this.cart.set(response);
      });

    this.customEpS
      .listAllowedInvites()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: string[]) => {
        this.allowedOptions.set(response);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBillingFormSubmit(fromValues: FormOutput) {
    this.loading$.next(true);
    const checkoutData: WcCheckOutData = {
      disclaimer_confirm: this.disclaimerState?.understood,
      disclaimer_experience: this.disclaimerState?.experience,
      gebote_confirm: fromValues.consent,
      invited_by: fromValues.invited_by,
      billing_address: fromValues.billingAddress,
      food_intolerance: fromValues.food_intolerance,
      payment_method: 'cod',
      customer_note: fromValues.comments,
    };
    this.wcStoreApi
      .checkout(checkoutData)
      .pipe(
        indicate(this.loading$),
        takeUntil(this.destroy$),
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      )
      .subscribe({
        next: (data) => {
          this.router.navigate([
            `/order/${this.cryptoService.encrypt(data.order_id.toString())}`,
          ]);
        },
      });
  }
}
