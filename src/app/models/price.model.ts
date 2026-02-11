export interface WcPrice extends WcTotalsCurrency {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range?: WcPriceRange;
  raw_prices?: {
    precision: number;
    price: string;
    regular_price: string;
    sale_price: string;
  };
}

export interface WcPriceRange {
  min_amount: string;
  max_amount: string;
}

export interface WcTotalsCurrency {
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface WcItemTotals extends WcTotalsCurrency {
  line_subtotal: string;
  line_subtotal_tax: string;
  line_total: string;
  line_total_tax: string;
}

export interface WcCouponTotals extends WcTotalsCurrency {
  total_discount: string;
  total_discount_tax: string;
}

export interface WcCartTotals extends WcTotalsCurrency {
  total_items: string;
  total_items_tax: string;
  total_fees: string;
  total_fees_tax: string;
  total_discount: string;
  total_discount_tax: string;
  total_shipping: string;
  total_shipping_tax: string;
  total_price: string;
  total_tax: string;
  tax_lines: Array<any>;
}

export type WcPaymentRequirement = 'product';
