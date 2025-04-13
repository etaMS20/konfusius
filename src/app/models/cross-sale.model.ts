export enum CrossSaleProductId {
  KONFUSIUS = 1960,
  GOENNER = 1961,
  SOLI = 1962,
}

export const crossSaleProductCat = 49;

export const DISCLAIMER_PRODUCTS = new Set([
  CrossSaleProductId.SOLI,
  CrossSaleProductId.KONFUSIUS,
  CrossSaleProductId.GOENNER,
]);
