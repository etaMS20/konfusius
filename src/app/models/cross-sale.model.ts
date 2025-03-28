export enum CrossSaleProductId {
  SOLI = 1960,
  GOENNER = 1961,
  KONFUSIUS = 1962,
}

export const crossSaleProductCat = 49;

export const DISCLAIMER_PRODUCTS = new Set([
  CrossSaleProductId.SOLI,
  CrossSaleProductId.KONFUSIUS,
  CrossSaleProductId.GOENNER,
]);
