import { inject, Injectable } from '@angular/core';
import { IMAGE_MAP, WcProduct } from '../components/product/product.model';
import { map, Observable } from 'rxjs';
import { CoCartService } from './co-cart.service';

/**
 * service to map the api responses to typed objects
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  coCartService = inject(CoCartService);

  constructor() {}

  mapProduct(product: any): WcProduct {
    return {
      id: product.id,
      type: product.type,
      slug: product.slug,
      name: product.name,
      description: product.description,
      stock_quantity: product.stock_quantity,
      stock_status: product.stock_status,
      purchasable: product.purchasable,
      imagePath: product.id in IMAGE_MAP ? IMAGE_MAP[product.id] : undefined,
      attributes: product.attributes,
      variations: product.variations,
    };
  }

  getProductById(id: number): Observable<WcProduct> {
    return this.coCartService.getProductById(id).pipe(map(this.mapProduct));
  }
}
