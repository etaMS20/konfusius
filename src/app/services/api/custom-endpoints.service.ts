import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BACKEND } from '@config/http.config';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';

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
}
