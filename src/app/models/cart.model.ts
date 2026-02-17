import { WcBillingAddress, WcShippingAddress } from './customer.model';
import { WcPaymentMethodId } from './order.model';
import {
  WcCartTotals,
  WcCouponTotals,
  WcItemTotals,
  WcPaymentRequirement,
  WcPrice,
} from './price.model';

export interface WcCart {
  billing_address: WcBillingAddress;
  coupons: Array<WcCartCoupon>;
  cross_sells: Array<any>;
  errors: Array<any>;
  extensions: object;
  has_calculated_shipping: boolean;
  items: Array<WcCartItem>;
  items_count: number;
  items_weight: number;
  needs_payment: boolean;
  needs_shipping: false;
  payment_methods: Array<WcPaymentMethodId>;
  payment_requirements: Array<WcPaymentRequirement>;
  shipping_address: WcShippingAddress;
  shipping_rates: Array<any>;
  totals: WcCartTotals;
}

export interface WcCartCoupon {
  code: string;
  discount_type: string;
  totals: WcCouponTotals;
}

export interface WcCartItem {
  key: string;
  id: number;
  name: string;
  type: WcCartType;
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
  totals: WcItemTotals;
  catalog_visibility: string;
  extensions: object;
}

export interface WcCheckOutData {
  invited_by: string;
  gebote_confirm: boolean;
  disclaimer_confirm?: boolean;
  disclaimer_experience?: string;
  billing_address: WcBillingAddress;
  payment_method: string;
  customer_note?: string;
  payment_data?: Array<any>;
  shipping_address?: WcShippingAddress;
}

export enum WcCartType {
  VARIATION = 'variation',
  SIMPLE = 'simple',
}
