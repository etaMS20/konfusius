import { WcCartType } from './cart.model';
import { WcPrice } from './price.model';
import { ShiftInterval } from './time.model';

export enum WcProductTypes {
  VARIABLE = 'variable',
  SIMPLE = 'simple',
}

export const ProductTypeLabels = {
  [WcProductTypes.VARIABLE]: 'Schicht mit variablen Zeiten',
  [WcProductTypes.SIMPLE]: 'Einfache Schicht',
};

export interface WcProduct {
  id: number;
  type: WcProductTypes;
  slug: string;
  name: string;
  description?: string;
  short_description?: string;
  is_in_stock: boolean;
  is_purchasable: boolean;
  attributes?: Array<WcProductAttribute>;
  variations?: Array<WcProductVariationDetails>;
  prices: WcPrice;
  images: Array<WcProductImage>;
  sku: string;
  stock_availability: { class: string; text: string };
  categories: Array<{ id: number; name: string; slug: string }>;
  extensions: {
    konfusius_shift: WcKonfusiusShift;
  };
}

export interface WcProductImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

export type WcProductAttributeTerm = {
  id: number;
  name: string;
  slug?: string;
};
export interface WcProductAttribute {
  id: number;
  name: string;
  has_variations: boolean;
  terms: Array<WcProductAttributeTerm>;
}

export interface WcProductVariationDetails {
  name: string;
  id: number;
  is_in_stock: boolean;
  is_purchaseable: boolean;
  prices: WcPrice;
  type: WcCartType;
  variation: string;
  stock_availability: { class: string; text: string };
  extensions: {
    konfusius_shift: WcKonfusiusShift;
  };
}

export type WcProductVariationAttributes = {
  name: string;
  value: string;
};

export interface WcKonfusiusShift {
  time_interval?: ShiftInterval;
  planned_stock?: number;
  stock_count?: number;
  variation_data: Array<WcKonfusiusShiftVariationData>;
}

export interface WcKonfusiusShiftVariationData {
  id: number;
  name: string;
  time_interval?: ShiftInterval;
  planned_stock?: number;
  stock_count: number;
}
