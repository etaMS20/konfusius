import { WcBillingAddress, WcShippingAddress } from './customer.model';
import {
  WcPaymentMethod,
  WcPaymentRequirement,
  WcPrice,
  WcTotals,
} from './price.model';

export interface WcCart {
  billing_address: WcBillingAddress;
  coupons: Array<any>;
  cross_sells: Array<any>;
  errors: Array<any>;
  extensions: object;
  has_calculated_shipping: boolean;
  items: Array<WcCartItem>;
  items_count: number;
  items_weight: number;
  needs_payment: boolean;
  needs_shipping: false;
  payment_methods: Array<WcPaymentMethod>;
  payment_requirements: Array<WcPaymentRequirement>;
  shipping_address: WcShippingAddress;
  shipping_rates: Array<any>;
  totals: WcTotals;
}

export interface WcCartItem {
  key: string;
  id: number;
  name: string;
  type: string;
  quantity: number;
  quantity_limits: {
    minimum: number;
    maximum: number;
    multiple_of: number;
    editable: boolean;
  };
  short_description: string;
  description: string;
  sku: string;
  low_stock_remaining: any;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: Array<object>;
  variation: Array<{
    attribute: string;
    value: string;
  }>;
  item_data: Array<any>;
  prices: WcPrice;
  totals: WcTotals;
  catalog_visibility: string;
  extensions: object;
}
