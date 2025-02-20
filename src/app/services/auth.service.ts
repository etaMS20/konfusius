import { Injectable } from '@angular/core';
import { BACKEND } from '../../config/http.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GuestAuth } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly customBackend = BACKEND + '/custom/v1';
  headers: HttpHeaders;

  constructor(private readonly http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('auth') !== null;
  }

  /** we use a custom endpoint to authenticate guests */
  authenticateGuest(pw: string): Observable<GuestAuth> {
    return this.http.post<any>(
      this.customBackend + `/guest-auth`,
      { password: pw },
      {
        headers: this.headers,
      }
    );
  }

  loginGuest(pw: string): void {
    this.authenticateGuest(pw).subscribe((r: GuestAuth) => {
      console.log(r);
    });
  }
}
