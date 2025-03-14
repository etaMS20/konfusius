import { WcBillingAddress, WcShippingAddress } from './customer.model';

export interface WcCheckout {
  order_id: number;
  status: string;
  order_key: string;
  order_number: string;
  customer_note: string;
  customer_id: number;
  billing_address: WcBillingAddress;
  shipping_address: WcShippingAddress;
  payment_method: string;
  payment_result: {
    payment_status: 'success';
    payment_details: Array<{
      key: string;
      value: string;
    }>;
    redirect_url: string;
  };
  additional_fields: [];
  extensions: {};
}

export enum WcOrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  ON_HOLD = 'on-hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  FAILED = 'failed',
  TRASH = 'trash',
}

export interface WcPaymentGateway {
  id: string;
  title: string;
  description: string;
  order: number;
  enabled: boolean;
  method_title: string;
  method_description: string;
  method_supports: Array<string>;
  settings: any;
}

export enum WcPaymentMethodId {
  COD = 'cod',
  BACS = 'bacs',
  CHEQUE = 'cheque',
  PAYPAL = 'ppcp-gateway',
}

export interface WcOrder {
  id: number;
  parent_id: number;
  status: WcOrderStatus;
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  billing: WcBillingAddress & {
    billing_invite: string;
    billing_gebote: string;
    billing_addinfo: string;
  };
  shipping: WcShippingAddress;
  payment_method: WcPaymentMethodId;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed: null;
  date_paid: null;
  cart_hash: string;
  number: string;
  meta_data: Array<{
    id: number;
    key: string;
    value: string;
  }>;
  line_items: Array<WcLineItem>;
  tax_lines: Array<any>;
  shipping_lines: Array<any>;
  fee_lines: Array<any>;
  coupon_lines: Array<any>;
  refunds: Array<any>;
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  date_created_gmt: string;
  date_modified_gmt: string;
  date_completed_gmt: any;
  date_paid_gmt: any;
  currency_symbol: string;
  _links: any;
}

export interface WcLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: number;
  subtotal: number;
  subtotal_tax: number;
  total: number;
  total_tax: number;
  taxes: [];
  meta_data: Array<{
    id: number;
    key: string;
    value: string;
    display_key: string;
    display_value: string;
  }>;
  sku: string;
  price: number;
  image: {
    id: number;
    src: string;
  };
  parent_name: string;
}
