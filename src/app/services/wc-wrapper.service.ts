import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND } from '../../config/http.config';
import { Observable } from 'rxjs';
import { WcProductVariationKey } from '../components/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class WcApiWrapper {
  private readonly productsBackend = BACKEND + '/cocart/v1';
  private readonly coCartBackend = BACKEND + '/cocart/v2';

  headers: HttpHeaders;

  constructor(private readonly http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  /** Products */

  getProducts(cat: number, qnt = 50): Observable<any> {
    return this.http.get<any>(
      this.productsBackend + `/products?per_page=${qnt}&category=${cat}`,
      {
        headers: this.headers,
      }
    );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.productsBackend + `/products/${id}`, {
      headers: this.headers,
    });
  }

  /** Cart */

  getCart(): Observable<any> {
    return this.http.get<any>(this.coCartBackend + `/cart`, {
      headers: this.headers,
    });
  }

  addProductToCart(
    id: string,
    variation?: WcProductVariationKey,
    qnt = '1'
  ): Observable<any> {
    const body = {
      id: id,
      quantity: qnt,
      variation: variation,
    };
    return this.http.post<any>(this.coCartBackend + `/cart/add-item`, body, {
      headers: this.headers,
    });
  }
}
