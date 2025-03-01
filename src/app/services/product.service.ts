import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMAGE_MAP, WcProduct } from '../models/product.model';
import { WcStoreAPI } from './wc-store-api.service';

/**
 * service to map the api responses to typed objects
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  wcStore = inject(WcStoreAPI);

  constructor() {}

  mapProduct(product: any): WcProduct {
    return {
      id: product.id,
      type: product.type,
      slug: product.slug,
      name: product.name,
      description: product.description,
      is_in_stock: product.is_in_stock,
      is_purchasable: product.is_purchasable,
      imagePath: product.id in IMAGE_MAP ? IMAGE_MAP[product.id] : undefined,
      attributes: product.attributes,
      variations: product.variations,
      prices: product.prices,
    };
  }

  getProductById(id: number): Observable<WcProduct> {
    return this.wcStore.getProductById(id).pipe(map(this.mapProduct));
  }
}
