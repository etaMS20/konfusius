export interface WcProduct {
  id: number;
  type: string;
  slug?: string;
  name?: string;
  description?: string;
  stock_quantity: number | null;
  stock_status: string;
  purchasable?: boolean;
  imagePath?: string;
  attributes?: WcProductAttributes;
  variations?: WcProductVariations;
}

export type WcProductVariation = {
  id: number;
};

export type WcProductVariations = {
  [key: string]: WcProductVariation;
};

interface WcProductAttribute {
  id: number;
  name: string;
  position: number;
  is_attribute_visible: boolean;
  used_for_variation: boolean;
  options: string[];
}

export interface WcProductAttributes {
  [key: string]: WcProductAttribute;
}

export interface WcProductVariationKey {
  attribute: string;
  value: string;
}

// TODO: map from API
export const IMAGE_MAP: { [key: number]: string } = {
  1547: '/abbau.png', // test
  1253: '/abbau.png', // kaffee tee
  1247: '/kiosk_2.png', // Aufräumen Keller
  962: '/awareness.png', // awareness
  602: '/abbau.png', // Abbau (montag)
  601: '/abbau.png', // Sauna
  597: '/workshops.png', // artist
  590: '/klo.png', // Müll
  50: '/kantine.png', // Küche
  30: '/bar_keller.png', // Bar keller
  19: '/bar.png', // Bar draußen
  13: '/kiosk_1.png', // Kiosk
};
