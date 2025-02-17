import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated(): boolean {
    return sessionStorage.getItem('auth') !== null;
  }
}
