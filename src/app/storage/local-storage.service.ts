import { Injectable } from '@angular/core';
import { BaseStorage } from './base-storage';

/**
 * A service for managing localStorage with reactive support.
 * Extends BaseStorage to provide additional functionality.
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageService extends BaseStorage {
  constructor() {
    super(window.localStorage);
  }
}
