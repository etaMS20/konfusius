import { Injectable } from '@angular/core';
import { BACKEND, CREW_PW, GUEST_PW, SALT } from '../../config/http.config';
import { HttpClient } from '@angular/common/http';
import shajs from 'sha.js';
import { authProductCatMap, AuthType } from '@models/auth.model';
import { LsKeys } from '@models/storage.model';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly customBackend = BACKEND + '/custom/v1';
  private readonly jwtAuthBackend = BACKEND + '/jwt-auth/v1';

  private readonly salt: string;
  private readonly guestPwHash?: string;
  private readonly crewPwHash?: string;

  constructor(
    private readonly http: HttpClient,
    private readonly lsService: LocalStorageService,
  ) {
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
      this.lsService.setItem<string>(LsKeys.GUEST_AUTH, inputHash);
      this.lsService.removeItem(LsKeys.CREW_AUTH);
      this.lsService.setItem<number>(
        LsKeys.USER_PRODUCT_CAT,
        authProductCatMap[AuthType.GUEST],
      );
      return true;
    } else if (inputHash && inputHash === this.crewPwHash) {
      this.lsService.setItem<string>(LsKeys.CREW_AUTH, inputHash);
      this.lsService.removeItem(LsKeys.GUEST_AUTH);
      this.lsService.setItem<number>(
        LsKeys.USER_PRODUCT_CAT,
        authProductCatMap[AuthType.CREW],
      );
      return true;
    }
    return false;
  }

  isAuthenticatedBase(): boolean {
    return (
      this.lsService.getItem<string>(LsKeys.GUEST_AUTH) === this.guestPwHash ||
      this.isAuthenticatedCrew()
    );
  }

  isAuthenticatedCrew(): boolean {
    return this.lsService.getItem<string>(LsKeys.CREW_AUTH) === this.crewPwHash;
  }

  // on logout remove all storage items
  logout(): void {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('konfusius')) {
        this.lsService.removeItem(key);
      }
    });
  }

  // TODO: Maybe useful later

  sessionHasNonce(): boolean {
    const nonce = sessionStorage.getItem('nonce');
    return nonce !== null;
  }
}
