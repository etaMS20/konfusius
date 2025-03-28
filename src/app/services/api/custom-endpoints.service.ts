import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BACKEND } from '@config/http.config';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { WcOrder } from '@models/order.model';

@Injectable({
  providedIn: 'root',
})
export class CustomEndpointsService {
  private readonly errorService = inject(ErrorDialogService);
  private readonly customBackend = BACKEND + '/custom/v1';
  private readonly headers: HttpHeaders;

  constructor(private readonly http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  listAllowedInvites(): Observable<any> {
    return this.http
      .get(this.customBackend + `/allowed_invite_options`, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      );
  }

  getOrdersByInvite(
    inv: string,
    years?: Array<number>,
  ): Observable<Array<WcOrder>> {
    let params = new HttpParams();

    params = params.set('meta_key', 'billing_invite');
    params = params.set('meta_value', inv);

    if (years && years.length > 0) {
      params = params.set('years', years.join(','));
    }

    return this.http
      .get<
        Array<WcOrder>
      >(this.customBackend + `/orders-by-meta`, { headers: this.headers, params })
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      );
  }
}
