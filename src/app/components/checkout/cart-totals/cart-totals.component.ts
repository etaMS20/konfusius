import { Component, computed, input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { WcCart, WcCartItem, WcCartType } from '@models/cart.model';
import { formatPrice } from '@utils/price.utils';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { CrossSaleProductId } from '@models/cross-sale.model';

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
  cartItems = computed(() => {
    return this.cart()?.items?.length ? this.cart()?.items : null;
  });
  cartContainsVariableItem = computed(() => {
    return (
      this.cartItems()?.some((item) => item.type === WcCartType.VARIATION) ??
      false
    );
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
    return this.getItems().main?.variation[0];
  }

  get ticketCategory() {
    return this.getItems().sub?.name;
  }

  getItems(): { main: WcCartItem | undefined; sub: WcCartItem | undefined } {
    const excludedIds = new Set([
      CrossSaleProductId.SOLI,
      CrossSaleProductId.KONFUSIUS,
      CrossSaleProductId.GOENNER,
    ]);

    return {
      main: this.cartItems()?.find((item) => !excludedIds.has(item.id)),
      sub: this.cartItems()?.find((item) => excludedIds.has(item.id)),
    };
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
    if (this.cart()) return this.cart()!.items_count > 0;
    else return false;
  }
}
