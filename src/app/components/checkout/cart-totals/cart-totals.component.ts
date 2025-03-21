import { Component, computed, input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { WcCart, WcCartType } from '@models/cart.model';
import { formatPrice } from '@utils/price.utils';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

@Component({
  selector: 'app-cart-totals',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, NgIf],
  templateUrl: './cart-totals.component.html',
  styleUrls: ['./cart-totals.component.scss'],
})
export class CartTotalsComponent {
  cart = input<WcCart | null>(null);
  cartTotals = computed(() => {
    return this.cart()?.totals ?? null;
  });
  cartItem = computed(() => {
    return this.cart()?.items[0] ?? null;
  });
  cartItemIsVariable = computed(() => {
    return this.cartItem()?.type === WcCartType.VARIATION;
  });

  get cartTotalPrice(): string {
    const ct = this.cartTotals();
    if (ct)
      return formatPrice(
        ct.total_price,
        ct.currency_thousand_separator,
        ct.currency_decimal_separator,
        ct.currency_minor_unit,
      );
    else return '';
  }

  get cartItemTotalPrice(): string {
    const ct = this.cartItem()?.totals;
    if (ct)
      return formatPrice(
        ct.line_total,
        ct.currency_thousand_separator,
        ct.currency_decimal_separator,
        ct.currency_minor_unit,
      );
    else return '';
  }

  get cartItemSubTotalPrice(): string {
    const ct = this.cartItem()?.totals;
    if (ct)
      return formatPrice(
        ct.line_subtotal,
        ct.currency_thousand_separator,
        ct.currency_decimal_separator,
        ct.currency_minor_unit,
      );
    else return '';
  }

  get hasItem(): boolean {
    if (this.cart()) return this.cart()!.items_count > 0;
    else return false;
  }
}
