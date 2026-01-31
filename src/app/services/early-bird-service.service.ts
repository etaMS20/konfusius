import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EarlyBirdService {
  private readonly DEADLINE = '2026-05-01T00:00:00';

  private activeSubject = new BehaviorSubject<boolean>(false);
  isActive$ = this.activeSubject.asObservable();

  constructor() {
    this.checkStatus();
  }

  checkStatus() {
    const isEarly = DateTime.now() < DateTime.fromISO(this.DEADLINE);
    this.activeSubject.next(isEarly);
  }

  getRemainingTime() {
    return DateTime.fromISO(this.DEADLINE).diffNow([
      'days',
      'hours',
      'minutes',
    ]);
  }
}
