import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BACKEND, CONSUMER_KEY, CONSUMER_SECRET } from '@config/http.config';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { catchError, Observable, throwError } from 'rxjs';
import {
  WcOrder,
  WcOrderStatus,
  WcPaymentGateway,
} from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class WcV3Service {
  private readonly wcBackend = BACKEND + '/wc/v3';
  private readonly headers: HttpHeaders;
  errorService = inject(ErrorDialogService);

  constructor(private readonly http: HttpClient) {
    const encodedCredentials = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${encodedCredentials}`,
    });
  }

  getOrderById(id: number): Observable<WcOrder> {
    return this.http
      .get<WcOrder>(this.wcBackend + `/orders/${id}`, { headers: this.headers })
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      );
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

    return this.http
      .get<Array<WcOrder>>(`${this.wcBackend}/orders`, {
        headers: this.headers,
        params: params,
      })
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      );
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
}
