import { Injectable, signal } from '@angular/core';
import { BACKEND, CREW_PW, GUEST_PW, SALT } from '../../config/http.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { GuestAuth } from './auth.model';
import shajs from 'sha.js';
import { authProductCatMap, AuthType } from '@models/auth.model';
import { LocalStorageKeys } from '@models/storage.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly customBackend = BACKEND + '/custom/v1';
  private readonly jwtAuthBackend = BACKEND + '/jwt-auth/v1';

  private readonly salt: string;
  private readonly guestPwHash?: string;
  private readonly crewPwHash?: string;

  userAuthType = signal<AuthType | undefined>(undefined);

  constructor(private readonly http: HttpClient) {
    this.salt = SALT!;
    this.guestPwHash = this.hashPassword(GUEST_PW);
    this.crewPwHash = this.hashPassword(CREW_PW);
  }

  private hashPassword(password: string | undefined): string | undefined {
    if (!password) return;
    return shajs('sha256')
      .update(password + this.salt)
      .digest('hex');
  }

  login(passwordInput: string) {
    const inputHash = this.hashPassword(passwordInput);
    if (inputHash && inputHash === this.guestPwHash) {
      localStorage.setItem(LocalStorageKeys.GUEST_AUTH, inputHash);
      localStorage.removeItem(LocalStorageKeys.CREW_AUTH);
      localStorage.setItem(
        LocalStorageKeys.USER_PRODUCT_CAT,
        authProductCatMap[AuthType.GUEST].toString(),
      );
      this.userAuthType.set(AuthType.GUEST);
      return true;
    } else if (inputHash && inputHash === this.crewPwHash) {
      localStorage.setItem(LocalStorageKeys.CREW_AUTH, inputHash);
      localStorage.removeItem(LocalStorageKeys.GUEST_AUTH);
      localStorage.setItem(
        LocalStorageKeys.USER_PRODUCT_CAT,
        authProductCatMap[AuthType.CREW].toString(),
      );
      this.userAuthType.set(AuthType.CREW);
      return true;
    }
    return false;
  }

  isAuthenticatedBase(): boolean {
    return (
      localStorage.getItem(LocalStorageKeys.GUEST_AUTH) === this.guestPwHash ||
      this.isAuthenticatedCrew()
    );
  }

  isAuthenticatedCrew(): boolean {
    return localStorage.getItem(LocalStorageKeys.CREW_AUTH) === this.crewPwHash;
  }

  // on logout remove all storage items
  logout(): void {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('konfusius')) {
        localStorage.removeItem(key);
      }
    });
  }

  // TODO: Maybe useful later

  sessionHasNonce(): boolean {
    const nonce = sessionStorage.getItem('nonce');
    return nonce !== null;
  }

  /** we use a custom endpoint to authenticate guests */
  authenticateGuest(pw: string): Observable<GuestAuth> {
    const jwtToken = localStorage.getItem('jwtToken');

    let headers = new HttpHeaders();
    if (jwtToken) {
      headers.set('Authorization', `Bearer ${jwtToken}`);
    }

    return this.http.post<GuestAuth>(
      this.customBackend + `/guest-auth`,
      { password: pw },
      {
        headers,
      },
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
        catchError(() => of(false)),
      );
  }
}
