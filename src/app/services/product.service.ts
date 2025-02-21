import { inject, Injectable } from '@angular/core';
import { IMAGE_MAP, WcProduct } from '../components/product/product.model';
import { WcApiWrapper } from './wc-wrapper.service';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

/**
 * This service is responsible for managing the products
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  wcHttp = inject(WcApiWrapper);
  products: Observable<Array<WcProduct>>;

  private readonly selectedProductSubject =
    new BehaviorSubject<WcProduct | null>(null);
  selectedProduct$ = this.selectedProductSubject.asObservable();

  constructor() {
    this.products = this.wcHttp.getProducts(22);
  }

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
    };
  }

  setSelectedProduct(product: WcProduct | null): void {
    this.selectedProductSubject.next(product);
  }

  get getSelectedProduct(): Observable<WcProduct | null> {
    return this.selectedProduct$;
  }

  getSelectedProductValue(): WcProduct | null {
    return this.selectedProductSubject.getValue();
  }

  get listAllProducts() {
    return this.products.pipe(
      map((products: any[]) => products.map(this.mapProduct)),
      catchError((err) => {
        console.error('Error fetching products:', err);
        throw err;
      })
    );
  }

  getProductById(id: number): Observable<WcProduct> {
    return this.wcHttp.getProductById(id).pipe(map(this.mapProduct));
  }
}
