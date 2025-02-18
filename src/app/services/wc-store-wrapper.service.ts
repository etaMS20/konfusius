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
  // readonly backendUrl = '/wp-json/wc/v3';
  private readonly backendUrl = BACKEND; // get from environment
  headers: HttpHeaders;
  authHeader: string;

  // TODO: The wc store endpoint does not require auth normally
  constructor(private readonly http: HttpClient) {
    this.authHeader = 'Basic ' + btoa(CONSUMER_KEY + ':' + CONSUMER_SECRET); // get from environment
    this.headers = new HttpHeaders().set('Authorization', this.authHeader);
  }

  /** Products */

  getProducts(cat: number, qnt = 50): Observable<any> {
    return this.http.get<any>(
      this.backendUrl + `/products?per_page=${qnt}&category=${cat}`,
      {
        headers: this.headers,
      }
    );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.backendUrl + `/products/${id}`, {
      headers: this.headers,
    });
  }

  /** Cart */

  getCart(): Observable<any> {
    return this.http.get<any>(this.backendUrl + `/cart`, {
      headers: this.headers,
    });
  }

  addProductToCart(
    id: number,
    variation: WcProductVariationKey,
    qnt = 1
  ): Observable<any> {
    const body = {
      id: id,
      quantity: qnt,
      variation: variation,
    };
    return this.http.post<any>(this.backendUrl + `/cart/add-item`, body, {
      headers: this.headers,
    });
  }
}
