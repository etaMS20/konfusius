export function formatPrice(
  price: string,
  thSep: string,
  decSep: string,
  cmu: number,
  currency?: string,
) {
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
