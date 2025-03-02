import { Component, computed, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WcCart } from '../../../models/cart.model';
import { formatPrice } from '../../../utils/price.utils';

@Component({
  selector: 'app-cart-totals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-totals.component.html',
  styleUrls: ['./cart-totals.component.scss'],
})
export class CartTotalsComponent {
  @Input() cart: WcCart | null = null;
  cartTotals = computed(() => {
    return this.cart?.totals ?? null;
  });
  cartItem = computed(() => {
    return this.cart?.items[0] ?? null;
  });

  get cartTotalPrice(): string {
    const ct = this.cartTotals();
    if (ct)
      return formatPrice(
        ct.total_price,
        ct.currency_thousand_separator,
        ct.currency_decimal_separator,
        ct.currency_minor_unit
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
        ct.currency_minor_unit
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
        ct.currency_minor_unit
      );
    else return '';
  }

  get hasItem(): boolean {
    if (this.cart) return this.cart.items_count > 0;
    else return false;
  }
}
