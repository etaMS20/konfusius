import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartTotalsComponent } from '../cart-totals/cart-totals.component';
import {
  BillingComponent,
  FormOutput,
} from '../billing/billing-input/billing-input.component';
import { WcStoreAPI } from '../../../services/api/wc-store-api.service';
import { catchError, throwError } from 'rxjs';
import { ErrorDialogService } from '../../shared/errors/error-dialog.service';
import { WcCart, WcCheckOutData } from '../../../models/cart.model';
import { CustomEndpointsService } from 'src/app/services/api/custom-endpoints.service';
import { BlogPost } from 'src/app/models/blog-post.model';
import { WordPressApiService } from 'src/app/services/api/wp-api.service';
import { Router } from '@angular/router';
import { EncryptionService } from '@services/encryption.service';

@Component({
  selector: 'app-checkout-container',
  standalone: true,
  imports: [CommonModule, CartTotalsComponent, BillingComponent],
  templateUrl: './checkout-container.component.html',
  styleUrls: ['./checkout-container.component.scss'],
})
export class CheckoutContainerComponent implements OnInit {
  wcStoreApi = inject(WcStoreAPI);
  wpApi = inject(WordPressApiService);
  errorService = inject(ErrorDialogService);
  customEpS = inject(CustomEndpointsService);
  private readonly cryptoService = inject(EncryptionService);
  private readonly router = inject(Router);

  cart = signal<WcCart | null>(null);
  allowedOptions = signal<string[]>([]);
  rules = signal<BlogPost | undefined>(undefined);

  billingAddress = computed(() => {
    return this.cart()?.billing_address;
  });

  ngOnInit(): void {
    this.wpApi.getPostById(1741).subscribe((post) => {
      this.rules.set(post);
    });

    this.wcStoreApi
      .getCart()
      .pipe(
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
  }

  onBillingFormSubmit(fromValues: FormOutput) {
    const checkoutData: WcCheckOutData = {
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
