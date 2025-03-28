import { WcCartType } from './cart.model';
import { WcPrice } from './price.model';

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
  slug?: string;
  name?: string;
  description?: string;
  short_description?: string;
  is_in_stock: boolean;
  is_purchasable: boolean;
  attributes?: Array<WcProductAttribute>;
  variations?: Array<WcProductVariation>;
  prices: WcPrice;
  images: Array<WcProductImage>;
  sku: string;
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

export type WcProductVariation = {
  id: number;
  attributes: Array<WcProductVariationAttributes>;
};

export interface WcProductVariationDetails {
  name: string;
  id: number;
  is_in_stock: boolean;
  is_purchaseable: boolean;
  prices: WcPrice;
  type: WcCartType;
  variation: string;
}

export type WcProductVariationAttributes = {
  name: string;
  value: string;
};
