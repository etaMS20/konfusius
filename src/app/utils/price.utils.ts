import { WcTotals } from '../models/price.model';

export function formatPrice(totals?: WcTotals | null): {
  totalPrice: string;
  subTotal: string;
} {
  let numericTotalPrice = parseFloat(totals?.line_total ?? 'NaN');
  let numericSubTotalPrice = parseFloat(totals?.line_subtotal ?? 'NaN');

  const factor = Math.pow(10, totals?.currency_minor_unit ?? 2);

  const format = (rawPrice: number) => {
    const fPrice = (rawPrice / factor).toFixed(totals?.currency_minor_unit);

    let [intP, decP] = fPrice.split('.');
    intP = intP.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      totals?.currency_thousand_separator ?? '.'
    );
    return `${intP}${totals?.currency_decimal_separator ?? ','}${decP}`;
  };

  return {
    totalPrice: format(numericTotalPrice),
    subTotal: format(numericSubTotalPrice),
  };
}
