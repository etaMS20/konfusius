import { Component, computed, input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { WcCartItem, WcCartType } from '@models/cart.model';
import { formatPrice } from '@utils/price.utils';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { WcCartTotals } from '@models/price.model';

@Component({
  selector: 'app-cart-totals',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, NgIf],
  templateUrl: './cart-totals.component.html',
  styleUrls: ['./cart-totals.component.scss'],
})
export class CartTotalsComponent {
  cartTotals = input<WcCartTotals>();
  mainCartItem = input<WcCartItem>();
  crossSaleCartItem = input<WcCartItem>();
  mainItemIsVariable = computed(() => {
    return this.mainCartItem()?.type === WcCartType.VARIATION;
  });

  get cartTotalPrice(): string {
    const ct = this.cartTotals();
    if (ct)
      return formatPrice(
        ct.total_price,
        ct.currency_thousand_separator,
        ct.currency_decimal_separator,
        ct.currency_minor_unit,
        ct.currency_symbol,
      );
    else return '';
  }

  get variation() {
    return this.mainCartItem()?.variation[0];
  }

  get ticketCategory() {
    return this.crossSaleCartItem()?.name;
  }

  getCartItemTotalPrice(cartItem?: WcCartItem): string {
    const ct = cartItem?.totals;
    if (ct)
      return formatPrice(
        ct.line_total,
        ct.currency_thousand_separator,
        ct.currency_decimal_separator,
        ct.currency_minor_unit,
        ct.currency_symbol,
      );
    else return '';
  }

  get hasItem(): boolean {
    return !!this.mainCartItem();
  }
}
