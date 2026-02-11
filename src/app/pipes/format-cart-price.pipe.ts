import { Pipe, PipeTransform } from '@angular/core';
import { WcTotalsCurrency } from '@models/price.model';
import { formatPrice } from '@utils/price.utils';

@Pipe({
  name: 'formatWcCartPrice',
  standalone: true,
})
export class FormatWcCartPricePipe implements PipeTransform {
  transform(
    value: string | undefined | null,
    currencyInfo: WcTotalsCurrency | undefined | null,
  ): string {
    if (!value || !currencyInfo) {
      return '';
    }

    return formatPrice(
      value,
      currencyInfo.currency_thousand_separator,
      currencyInfo.currency_decimal_separator,
      currencyInfo.currency_minor_unit,
      currencyInfo.currency_symbol,
    );
  }
}
