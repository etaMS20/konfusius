import { Injectable } from '@angular/core';
import { BACKEND } from '../../config/http.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { GuestAuth } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly customBackend = BACKEND + '/custom/v1';
  private readonly jwtAuthBackend = BACKEND + '/jwt-auth/v1';
  headers: HttpHeaders;

  constructor(private readonly http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  private isGuestAuth(obj: any): obj is GuestAuth {
    return obj && typeof obj.token === 'string';
  }

  isAuthenticated(): boolean {
    const authData = sessionStorage.getItem('auth');
    return authData ? this.isGuestAuth(JSON.parse(authData)) : false;
  }

  /** we use a custom endpoint to authenticate guests */
  authenticateGuest(pw: string): Observable<GuestAuth> {
    return this.http.post<GuestAuth>(
      this.customBackend + `/guest-auth`,
      { password: pw },
      {
        headers: this.headers,
      }
    );
  }

  // TODO: Maybe useful later
  validateToken(): Observable<boolean> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return of(false);
    }

    return this.http
      .post<any>(this.jwtAuthBackend + '/token/validate', null, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((result) => result?.code === 'jwt_auth_valid_token'),
        catchError(() => of(false))
      );
  }
}
