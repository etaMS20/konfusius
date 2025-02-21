import { Injectable } from '@angular/core';
import { BACKEND, CREDENTIALS } from '../../config/http.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { GuestAuth } from './auth.model';
import shajs from 'sha.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly customBackend = BACKEND + '/custom/v1';
  private readonly jwtAuthBackend = BACKEND + '/jwt-auth/v1';

  private readonly salt: string;
  private readonly storedPasswordHash: string;

  constructor(private readonly http: HttpClient) {
    this.salt = CREDENTIALS.salt!;
    this.storedPasswordHash = this.hashPassword(CREDENTIALS.password!);
  }

  get getStoredPwHash() {
    return this.storedPasswordHash;
  }

  private hashPassword(password: string): string {
    return shajs('sha256')
      .update(password + this.salt)
      .digest('hex');
  }

  loginGuestWithPw(passwordInput: string): boolean {
    const inputHash = this.hashPassword(passwordInput);
    if (inputHash === this.storedPasswordHash) {
      localStorage.setItem('auth', inputHash);
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('auth') === this.storedPasswordHash;
  }

  logout(): void {
    localStorage.removeItem('auth');
  }

  // TODO: Maybe useful later

  sessionHasNonce(): boolean {
    const nonce = sessionStorage.getItem('nonce');
    return nonce !== null;
  }

  /** we use a custom endpoint to authenticate guests */
  authenticateGuest(pw: string): Observable<GuestAuth> {
    return this.http.post<GuestAuth>(
      this.customBackend + `/guest-auth`,
      { password: pw },
      {
        // headers: this.headers,
      }
    );
  }

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
