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
    return formatPrice(this.cartTotals()).totalPrice;
  }

  get cartSubTotalPrice(): string {
    return formatPrice(this.cartTotals()).totalPrice;
  }

  get cartItemTotalPrice(): string {
    return formatPrice(this.cartItem()?.totals).totalPrice;
  }

  get cartItemSubTotalPrice(): string {
    return formatPrice(this.cartItem()?.totals).totalPrice;
  }

  get hasItem(): boolean {
    return this.cart!.items_count > 0;
  }
}
