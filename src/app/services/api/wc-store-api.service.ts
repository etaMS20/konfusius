import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND } from '@config/http.config';
import { WcBillingAddress, WcShippingAddress } from '@models/customer.model';
import { WcCheckOutData } from '@models/cart.model';
import { WcProduct, WcProductVariationDetails } from '@models/product.model';

@Injectable({
  providedIn: 'root',
})
export class WcStoreAPI {
  private readonly storeApiBackend = BACKEND + '/wc/store/v1';
  private readonly headers: HttpHeaders;

  constructor(private readonly http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // Products

  listProducts(
    category: number[] = [22],
    order_by = 'price', // or by title
    order = 'asc',
    per_page = 50,
  ): Observable<WcProduct[]> {
    const categoryParam = category.join(',');
    return this.http.get<WcProduct[]>(
      this.storeApiBackend +
        `/products?per_page=${per_page}&category=${categoryParam}&orderby=${order_by}&order=${order}`,
      { headers: this.headers },
    );
  }

  getProductById(id: number): Observable<WcProduct> {
    return this.http.get<WcProduct>(this.storeApiBackend + `/products/${id}`);
  }

  listProductVariations(
    parentId: number,
    stockStatus = ['instock'], // by default only list in stock items
  ): Observable<WcProductVariationDetails[]> {
    return this.http.get<WcProductVariationDetails[]>(
      this.storeApiBackend +
        `/products?type=variation&parent=${parentId}&stock_status=${stockStatus}&per_page=100`,
      { headers: this.headers },
    );
  }

  getVariationById(id: number): Observable<WcProductVariationDetails> {
    return this.http.get<WcProductVariationDetails>(
      this.storeApiBackend + `/products/${id}`,
    );
  }

  // cart

  batchItemsToCart(ids: Array<number>): Observable<any> {
    const batchPayload = {
      requests: ids.map((id) => ({
        path: '/wc/store/v1/cart/add-item',
        method: 'POST',
        cache: 'no-store',
        body: { id, quantity: 1 },
        // headers: { Nonce: '...' },
      })),
    };

    return this.http.post(this.storeApiBackend + '/batch', batchPayload, {
      headers: this.headers,
      withCredentials: true,
    });
  }

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
      { headers: this.headers, withCredentials: true },
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
    shipping_address?: WcShippingAddress,
  ): Observable<any> {
    return this.http.post(
      this.storeApiBackend + '/cart/update-customer',
      {
        billing_address,
        shipping_address,
      },
      { headers: this.headers, withCredentials: true },
    );
  }

  // checkout

  checkout(data: WcCheckOutData): Observable<any> {
    return this.http.post(this.storeApiBackend + '/checkout', data, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  checkoutOrder(
    key: string,
    billingAddress: WcBillingAddress,
    shippingAddress: WcShippingAddress,
    paymentMethod: string,
    paymentData: Array<any>,
    billingEmail?: string,
  ): Observable<any> {
    return this.http.post(
      this.storeApiBackend + '/checkout',
      {
        key: key,
        billing_address: billingAddress,
        payment_method: paymentMethod,
        payment_data: paymentData,
        shipping_address: shippingAddress,
        billing_email: billingEmail,
      },
      { headers: this.headers, withCredentials: true },
    );
  }

  addCoupon(code: string): Observable<any> {
    return this.http.post(
      this.storeApiBackend + `/cart/coupons?code=${code}`,
      { code },
      { headers: this.headers, withCredentials: true },
    );
  }
}
