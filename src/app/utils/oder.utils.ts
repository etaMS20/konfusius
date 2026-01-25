import { DISCLAIMER_PRODUCTS } from '@models/cross-sale.model';
import { LineItemMin } from '@models/types.model';

export function findMainItem(items: Array<LineItemMin>) {
  return items.find((i) => !DISCLAIMER_PRODUCTS.has(i.product_id))?.name || '';
}

export function findCrossItem(items: Array<LineItemMin>) {
  return items.find((item) => DISCLAIMER_PRODUCTS.has(item.product_id))?.name;
}
