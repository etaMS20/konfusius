import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND } from '../../config/http.config';
import { WcShippingAddress } from '../models/customer.model';

// https://github.com/woocommerce/woocommerce/blob/trunk/plugins/woocommerce/src/StoreApi/docs

@Injectable({
  providedIn: 'root',
})
export class WcStoreAPI {
  private readonly customBackend = BACKEND + '/custom/v1';
  private readonly storeApiBackend = BACKEND + '/wc/store/v1';
  private readonly headers: HttpHeaders;

  constructor(private readonly http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // Products

  listProducts(category = 22, per_page = 50): Observable<any> {
    return this.http.get(
      this.storeApiBackend +
        `/products?per_page=${per_page}&category=${category}`,
      { headers: this.headers }
    );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(this.storeApiBackend + `/products/${id}`);
  }

  listProductVariations(
    parentId: number,
    stockStatus = ['instock', 'outofstock']
  ): Observable<any> {
    return this.http.get(
      this.storeApiBackend +
        `/products?type=variation&parent=${parentId}&stock_status=${stockStatus}`,
      { headers: this.headers }
    );
  }

  // cart

  getCart(): Observable<any> {
    return this.http.get(this.storeApiBackend + '/cart', {
      headers: this.headers,
      withCredentials: true,
    });
  }

  addItemToCart(id: number, quantity = 1): Observable<any> {
    return this.http.post(
      this.storeApiBackend + '/cart/add-item',
      {
        id,
        quantity,
      },
      { headers: this.headers, withCredentials: true }
    );
  }

  deleteAllCartItems(): Observable<any> {
    return this.http.delete(this.storeApiBackend + '/cart/items', {
      headers: this.headers,
      withCredentials: true,
    });
  }

  updateCustomerData(
    billing_address: WcShippingAddress,
    shipping_address?: WcShippingAddress
  ): Observable<any> {
    return this.http.post(
      this.storeApiBackend + '/cart/update-customer',
      {
        billing_address,
        shipping_address,
      },
      { headers: this.headers, withCredentials: true }
    );
  }

  // checkout

  checkout(billingAddress: any): Observable<any> {
    return this.http.post(
      this.storeApiBackend + '/checkout',
      {
        billing_address: billingAddress,
      },
      { headers: this.headers, withCredentials: true }
    );
  }
}
