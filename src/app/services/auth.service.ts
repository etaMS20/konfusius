import { Injectable } from '@angular/core';
import { ARTIST_PW, CREW_PW, GUEST_PW, SALT } from '@config/http.config';
import shajs from 'sha.js';
import { authProductCatMap, AuthType } from '@models/auth.model';
import { LsKeys } from '@models/storage.model';
import { LocalStorageService } from '@storage/local-storage.service';
import { EnvStatusService } from './env-status.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly hashToAuthType = new Map<string, AuthType>();

  constructor(
    private readonly lsService: LocalStorageService,
    readonly envStatus: EnvStatusService,
  ) {
    const register = (pw: string | undefined, type: AuthType) => {
      const hash = this.hash(pw);
      if (hash) this.hashToAuthType.set(hash, type);
    };
    register(GUEST_PW, AuthType.GUEST);
    register(CREW_PW, AuthType.CREW);
    register(ARTIST_PW, AuthType.ARTIST);
  }

  private hash(password: string | undefined): string | undefined {
    if (!password) return;
    return shajs('sha256')
      .update(password + SALT)
      .digest('hex');
  }

  login(passwordInput: string): boolean {
    const inputHash = this.hash(passwordInput);
    if (!inputHash) return false;

    const authType = this.hashToAuthType.get(inputHash);
    if (authType === undefined) return false;

    this.lsService.setItem<string>(LsKeys.AUTH, inputHash);
    return true;
  }
  
  get authType(): AuthType | null {
    const storedHash = this.lsService.getItem<string>(LsKeys.AUTH);
    if (!storedHash) return null;
    return this.hashToAuthType.get(storedHash) ?? null;
  }

  isAuthenticatedBase(): boolean {
    return this.authType !== null && this.envStatus.envsLoaded;
  }

  isAuthenticatedCrew(): boolean {
    return this.authType === AuthType.CREW && this.envStatus.envsLoaded;
  }

  isAuthenticatedArtist(): boolean {
    return this.authType === AuthType.ARTIST && this.envStatus.envsLoaded;
  }

  get productCategory(): Array<number> {
    const type = this.authType;
    return type !== null ? authProductCatMap[type] : [22];
  }

  logout(): void {
    this.lsService.removeItem(LsKeys.AUTH);
  }

  sessionHasNonce(): boolean {
    return sessionStorage.getItem('nonce') !== null;
  }
}
