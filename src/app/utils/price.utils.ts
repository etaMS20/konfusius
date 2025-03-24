import { WcPriceRange } from '@models/price.model';

export function formatPrice(
  price: string,
  thSep: string,
  decSep: string,
  cmu: number,
  currency?: string,
): string {
  let numericTotalPrice = parseFloat(price ?? 'NaN');

  const factor = Math.pow(10, cmu ?? 2);

  const format = (rawPrice: number) => {
    const fPrice = (rawPrice / factor).toFixed(cmu);

    let [intP, decP] = fPrice.split('.');
    intP = intP.replace(/\B(?=(\d{3})+(?!\d))/g, thSep);
    return `${intP}${decSep}${decP} ${currency}`;
  };

  return format(numericTotalPrice);
}

export function formatPriceRange(
  priceRange: WcPriceRange,
  thSep: string,
  decSep: string,
  cmu: number,
  currency?: string,
): string {
  const min = formatPrice(priceRange.min_amount, thSep, decSep, cmu, currency);
  const max = formatPrice(priceRange.max_amount, thSep, decSep, cmu, currency);
  return `${min} bis ${max}`;
}
