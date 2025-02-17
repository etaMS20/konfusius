import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSUMER_KEY, CONSUMER_SECRET } from '../../config/http.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WcApiWrapperService {
  readonly backendUrl = '/wp-json/wc/v3';
  headers: HttpHeaders;
  authHeader: string;

  constructor(private readonly http: HttpClient) {
    this.authHeader = 'Basic ' + btoa(CONSUMER_KEY + ':' + CONSUMER_SECRET);
    this.headers = new HttpHeaders().set('Authorization', this.authHeader);
  }

  getProducts(category: number): Observable<any> {
    return this.http.get<any>(
      this.backendUrl + `/products?per_page=50&category=${category}`,
      {
        headers: this.headers,
      }
    );
  }
}
