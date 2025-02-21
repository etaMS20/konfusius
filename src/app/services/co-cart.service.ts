import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  WcProduct,
  WcProductVariation,
  WcProductVariations,
} from '../components/product/product.model';
import CoCart from '@cocart/cocart-rest-api';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoCartService {
  coCartHttp = new CoCart({
    url: 'https://konfusius.org',
    consumerKey: '',
    consumerSecret: '',
  });

  constructor() {}

  // Products

  listProducts(category = 22, per_page = 50): Observable<any> {
    return from(
      this.coCartHttp.get(`products?per_page=${per_page}&category=${category}`)
    );
  }

  getProductById(id: number): Observable<any> {
    return from(this.coCartHttp.get('products', { id: id.toString() }));
  }

  listProductVariations(id: number): Observable<WcProductVariations> {
    return from(this.coCartHttp.get(`products/${id}/variations`));
  }

  // Cart

  addProductToCart(id: number): Observable<WcProduct> {
    return from(this.coCartHttp.post('cart/add-item', { id }, null));
  }
}
