import { Component, computed, input } from '@angular/core';
import { WcCartCoupon, WcCartItem, WcCartType } from '@models/cart.model';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';
import { WcCartTotals } from '@models/price.model';
import { FormatWcCartPricePipe } from '@pipes/format-cart-price.pipe';

@Component({
  selector: 'app-cart-totals',
  standalone: true,
  imports: [SafeHtmlPipe, FormatWcCartPricePipe],
  templateUrl: './cart-totals.component.html',
  styleUrls: ['./cart-totals.component.scss'],
})
export class CartTotalsComponent {
  cartTotals = input<WcCartTotals>();
  mainCartItem = input<WcCartItem>();
  crossSaleCartItem = input<WcCartItem>();
  cartCoupons = input<Array<WcCartCoupon>>([]);
  mainItemIsVariable = computed(() => {
    return this.mainCartItem()?.type === WcCartType.VARIATION;
  });

  get variation() {
    return this.mainCartItem()?.variation[0];
  }

  get ticketCategory() {
    return this.crossSaleCartItem()?.name;
  }

  get hasItem(): boolean {
    return !!this.mainCartItem();
  }
}
