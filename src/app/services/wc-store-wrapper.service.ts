import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BACKEND,
  CONSUMER_KEY,
  CONSUMER_SECRET,
} from '../../config/http.config';
import { Observable } from 'rxjs';
import { WcProductVariationKey } from '../components/shift/shift.model';

@Injectable({
  providedIn: 'root',
})
export class WcStoreApiWrapper {
  private readonly backendUrl = BACKEND; // get from environment.ts
  private readonly wcStoreBackend = BACKEND + '/wc/store/v1';

  headers: HttpHeaders;
  // authHeader: string;

  constructor(private readonly http: HttpClient) {
    // this.authHeader = 'Basic ' + btoa(CONSUMER_KEY + ':' + CONSUMER_SECRET);
    // this.headers = new HttpHeaders().set('Authorization', this.authHeader);
    this.headers = new HttpHeaders().set(
      'Nonce',
      sessionStorage.getItem('nonce') ?? ''
    );
  }

  // TODO: if nonce missing -> login

  /** Products */

  getProducts(cat: number, qnt = 50): Observable<any> {
    return this.http.get<any>(
      this.wcStoreBackend + `/products?per_page=${qnt}&category=${cat}`,
      {
        headers: this.headers,
      }
    );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.wcStoreBackend + `/products/${id}`, {
      headers: this.headers,
    });
  }

  /** Cart */

  getCart(): Observable<any> {
    return this.http.get<any>(this.wcStoreBackend + `/cart`, {
      headers: this.headers,
    });
  }

  addProductToCart(
    id: number,
    variation?: WcProductVariationKey,
    qnt = 1
  ): Observable<any> {
    const body = {
      id: id,
      quantity: qnt,
      variation: variation,
    };
    return this.http.post<any>(this.wcStoreBackend + `/cart/add-item`, body, {
      headers: this.headers,
      withCredentials: true,
    });
  }
}
