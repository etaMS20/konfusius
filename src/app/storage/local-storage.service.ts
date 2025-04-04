import { Injectable } from '@angular/core';
import { BaseStorage } from './base-storage';

/**
 * extends BaseStorage and provides service.
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageService extends BaseStorage {
  constructor() {
    super(window.localStorage);
  }
}
