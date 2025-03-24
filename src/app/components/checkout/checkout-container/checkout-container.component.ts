import {
  AfterViewInit,
  Component,
  computed,
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
} from '../billing/billing-input/billing-input.component';
import { WcStoreAPI } from '../../../services/api/wc-store-api.service';
import { catchError, Subject, throwError } from 'rxjs';
import { ErrorDialogService } from '../../shared/errors/error-dialog.service';
import { WcCart, WcCheckOutData } from '../../../models/cart.model';
import { CustomEndpointsService } from 'src/app/services/api/custom-endpoints.service';
import { BlogPost, BlogPostId } from 'src/app/models/blog-post.model';
import { WordPressApiService } from 'src/app/services/api/wp-api.service';
import { Router } from '@angular/router';
import { EncryptionService } from '@services/encryption.service';
import { indicate } from '@utils/reactive-loading.utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DisclaimerStateService } from '@services/disclaimer-state.service';
import { ConditionsComponent } from '../conditions/conditions.component';
import { DisclaimerForm, DisclaimerFormStore } from '@models/disclaimer.model';

@Component({
  selector: 'app-checkout-container',
  standalone: true,
  imports: [
    CommonModule,
    CartTotalsComponent,
    BillingComponent,
    MatProgressSpinnerModule,
    MatProgressBarModule,
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
  private readonly disclaimerStateS = inject(DisclaimerStateService);
  private readonly cryptoService = inject(EncryptionService);
  private readonly router = inject(Router);

  private readonly destroy$ = new Subject<void>();
  loading$ = new Subject<boolean>();
  cart = signal<WcCart | null>(null);
  allowedOptions = signal<string[]>([]);
  rules = signal<BlogPost | undefined>(undefined);
  disclaimerState?: DisclaimerForm;

  billingAddress = computed(() => {
    return this.cart()?.billing_address;
  });

  ngOnInit(): void {
    this.loading$.next(true);
    this.wpApi.getPostById(BlogPostId.KODEX_INFO).subscribe((post) => {
      this.rules.set(post);
    });

    this.wcStoreApi
      .getCart()
      .pipe(
        indicate(this.loading$),
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      )
      .subscribe((response: WcCart) => {
        this.cart.set(response);
      });

    this.customEpS.listAllowedInvites().subscribe((response: string[]) => {
      this.allowedOptions.set(response);
    });

    this.disclaimerState = this.disclaimerStateS.getState;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBillingFormSubmit(fromValues: FormOutput) {
    const checkoutData: WcCheckOutData = {
      disclaimer_valid: this.disclaimerStateS.validateContext(),
      invited_by: fromValues.invited_by,
      billing_address: fromValues.billingAddress,
      payment_method: 'cod',
      customer_note: fromValues.comments,
    };
    this.wcStoreApi
      .checkout(checkoutData)
      .pipe(
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
