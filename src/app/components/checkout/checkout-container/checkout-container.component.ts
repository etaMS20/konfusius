import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartTotalsComponent } from '../cart-totals/cart-totals.component';
import { BillingComponent } from '../billing/billing-input/billing-input.component';
import { WcBillingAddress } from '../../../models/customer.model';
import { WcStoreAPI } from '../../../services/wc-store-api.service';
import { catchError, throwError } from 'rxjs';
import { ErrorDialogService } from '../../shared/errors/error-dialog.service';
import { WcCart } from '../../../models/cart.model';

@Component({
  selector: 'app-checkout-container',
  standalone: true,
  imports: [CommonModule, CartTotalsComponent, BillingComponent],
  templateUrl: './checkout-container.component.html',
  styleUrls: ['./checkout-container.component.scss'],
})
export class CheckoutContainerComponent {
  wcStoreApi = inject(WcStoreAPI);
  errorService = inject(ErrorDialogService);
  cart = signal<WcCart | null>(null);

  billingAddress = computed(() => {
    return this.cart()?.billing_address;
  });

  constructor() {
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
  }

  onBillingFormSubmit(billingAddress: WcBillingAddress) {
    this.wcStoreApi.updateCustomerData(billingAddress).subscribe((r) => {
      console.log(r);
    });
  }

  checkout() {
    this.wcStoreApi
      .checkout(this.billingAddress(), 'cod')
      .subscribe((r) => console.log(r));
  }
}
