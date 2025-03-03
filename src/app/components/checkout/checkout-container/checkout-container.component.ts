import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartTotalsComponent } from '../cart-totals/cart-totals.component';
import { BillingComponent } from '../billing/billing-input/billing-input.component';
import { WcBillingAddress } from '../../../models/customer.model';
import { WcStoreAPI } from '../../../services/wc-store-api.service';
import { catchError, throwError } from 'rxjs';
import { ErrorDialogService } from '../../shared/errors/error-dialog.service';
import { WcCart } from '../../../models/cart.model';
import { BillingOverviewComponent } from '../billing/billing-overview/billing-overview.component';

@Component({
  selector: 'app-checkout-container',
  standalone: true,
  imports: [
    CommonModule,
    CartTotalsComponent,
    BillingComponent,
    BillingOverviewComponent,
  ],
  templateUrl: './checkout-container.component.html',
  styleUrls: ['./checkout-container.component.scss'],
})
export class CheckoutContainerComponent {
  wcStoreApi = inject(WcStoreAPI);
  errorService = inject(ErrorDialogService);
  cart = signal<WcCart | null>(null);

  billingAddressSet = signal<boolean>(false);
  billingAddressEdit = signal<boolean>(false);
  billingAddress = computed(() => {
    return this.billingAddressSet() ? this.cart()?.billing_address : undefined;
  });

  constructor() {
    this.wcStoreApi
      .getCart()
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        })
      )
      .subscribe((response: WcCart) => {
        this.cart.set(response);
      });
  }

  onBillingAddressEdit(editMode: boolean) {
    this.billingAddressEdit.set(editMode);
  }

  onBillingFormSubmit(billingAddress: WcBillingAddress) {
    this.wcStoreApi.updateCustomerData(billingAddress).subscribe(() => {
      this.billingAddressSet.set(true);
      this.billingAddressEdit.set(false);
    });
  }

  checkout() {
    this.wcStoreApi
      .checkout(this.billingAddress(), 'cod')
      .subscribe((r) => console.log(r));
  }
}
