import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND } from '@config/http.config';
import { OrderMin } from '@models/types.model';

@Injectable({
  providedIn: 'root',
})
export class CustomEndpointsService {
  private readonly customBackend = BACKEND + '/custom/v1';
  private readonly headers: HttpHeaders;

  constructor(private readonly http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  listAllowedInvites(): Observable<any> {
    return this.http.get(this.customBackend + `/allowed_invite_options`, {
      headers: this.headers,
    });
  }

  getOrdersByInvite(
    inv: string,
    years: string[] = [],
    meta_key = 'billing_invite',
  ): Observable<Array<OrderMin>> {
    let params = new HttpParams();

    params = params.set('meta_key', meta_key);
    params = params.set('meta_value', inv);

    if (years && years.length > 0) {
      params = params.set('years', years.join(','));
    }

    return this.http.get<Array<OrderMin>>(
      this.customBackend + `/orders-by-meta`,
      { headers: this.headers, params },
    );
  }
}
