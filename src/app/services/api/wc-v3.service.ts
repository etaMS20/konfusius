import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND, CONSUMER_KEY, CONSUMER_SECRET } from '@config/http.config';
import { Observable } from 'rxjs';
import { WcOrder, WcOrderStatus, WcPaymentGateway } from '@models/order.model';
import { Coupon } from '@models/coupon.model';

@Injectable({
  providedIn: 'root',
})
export class WcV3Service {
  private readonly wcBackend = BACKEND + '/wc/v3';
  private readonly headers: HttpHeaders;

  constructor(private readonly http: HttpClient) {
    const encodedCredentials = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${encodedCredentials}`,
    });
  }

  getOrderById(id: number): Observable<WcOrder> {
    return this.http.get<WcOrder>(this.wcBackend + `/orders/${id}`, {
      headers: this.headers,
    });
  }

  getPaymentGateway(gateway: string): Observable<WcPaymentGateway> {
    return this.http.get<WcPaymentGateway>(
      this.wcBackend + `/payment_gateways/${gateway}`,
      {
        headers: this.headers,
        withCredentials: true,
      },
    );
  }

  getOrders(after = '2024-01-01T00:00:00'): Observable<Array<WcOrder>> {
    let params = new HttpParams();

    if (after) {
      params = params.set('after', after);
      params = params.set('per_page', 100);
    }

    return this.http.get<Array<WcOrder>>(`${this.wcBackend}/orders`, {
      headers: this.headers,
      params: params,
    });
  }

  // set_paid also possible
  batchUpdateOrderStatus(
    ids: Array<number>,
    status: WcOrderStatus,
  ): Observable<any> {
    const updates = ids.map((id) => {
      return {
        id: id,
        status: status,
      };
    });

    const payload = {
      update: updates,
    };

    return this.http.post<Array<any>>(
      `${this.wcBackend}/orders/batch`,
      payload,
      {
        headers: this.headers,
        withCredentials: true,
      },
    );
  }

  getCouponById(id: number): Observable<Coupon> {
    return this.http.get<Coupon>(this.wcBackend + `/coupons/${id}`, {
      headers: this.headers,
    });
  }
}
