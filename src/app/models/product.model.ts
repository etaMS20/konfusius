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
  is_in_stock: boolean;
  is_purchasable: boolean;
  imagePath?: string;
  attributes?: Array<WcProductAttribute>;
  variations?: Array<WcProductVariation>;
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

export type WcProductVariationAttributes = {
  name: string;
  value: string;
};

// TODO: map from API
export const IMAGE_MAP: { [key: number]: string } = {
  1547: 'assets/schichten/abbau.png', // test
  1253: 'assets/schichten/abbau.png', // kaffee tee
  1247: 'assets/schichten/kiosk_2.png', // Aufräumen Keller
  962: 'assets/schichten/awareness.png', // awareness
  602: 'assets/schichten/abbau.png', // Abbau (montag)
  601: 'assets/schichten/abbau.png', // Sauna
  597: 'assets/schichten/workshops.png', // artist
  590: 'assets/schichten/klo.png', // Müll
  50: 'assets/schichten/kantine.png', // Küche
  30: 'assets/schichten/bar_keller.png', // Bar keller
  19: 'assets/schichten/bar.png', // Bar draußen
  13: 'assets/schichten/kiosk_1.png', // Kiosk
};
