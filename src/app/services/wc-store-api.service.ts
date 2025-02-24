import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND } from '../../config/http.config';
import { WcCustomerInfo, WcShippingAddress } from '../models/customer.model';

// https://github.com/woocommerce/woocommerce/blob/trunk/plugins/woocommerce/src/StoreApi/docs

// TODO: Use cart API for adding products

@Injectable({
  providedIn: 'root',
})
export class WcStoreAPI {
  private readonly customBackend = BACKEND + '/custom/v1';
  private readonly storeApiBackend = BACKEND + '/wc/store/v1';
  private readonly header: HttpHeaders;

  constructor(private readonly http: HttpClient) {
    this.header = new HttpHeaders({});
  }

  // Products

  listProducts(category = 22, per_page = 50): Observable<any> {
    return this.http.get(
      this.storeApiBackend +
        `/products?per_page=${per_page}&category=${category}`
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
        `/products?type=variation&parent=${parentId}&stock_status=${stockStatus}`
    );
  }

  // cart

  getCart(): Observable<any> {
    return this.http.get(this.storeApiBackend + '/cart');
  }

  addItemToCart(id: number, quantity = 1): Observable<any> {
    return this.http.post(this.storeApiBackend + '/cart/add-item', {
      id,
      quantity,
    });
  }

  deleteAllCartItems(): Observable<any> {
    return this.http.delete(this.storeApiBackend + '/cart/items');
  }

  updateCustomerData(
    billing_address: WcShippingAddress,
    shipping_address?: WcShippingAddress
  ): Observable<any> {
    return this.http.post(this.storeApiBackend + '/cart/update-customer', {
      billing_address,
      shipping_address,
    });
  }

  // checkout

  checkout(billingAddress: any): Observable<any> {
    return this.http.post(this.storeApiBackend + '/checkout', {
      billing_address: billingAddress,
    });
  }
}
