import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientDeviceService implements OnDestroy {
  private readonly isTouchDevice$ = new BehaviorSubject<boolean>(false);
  private readonly touchMediaQuery: MediaQueryList;

  constructor() {
    this.touchMediaQuery = window.matchMedia('(pointer: coarse)');
    this.detectTouchDevice(); // Initial check
    this.touchMediaQuery.addEventListener(
      'change',
      this.detectTouchDevice.bind(this),
    ); // recheck on changes
  }

  private detectTouchDevice(): void {
    this.isTouchDevice$.next(this.touchMediaQuery.matches);
  }

  get isTouchDevice() {
    return this.isTouchDevice$.asObservable();
  }

  ngOnDestroy() {
    // clean up on destroyed
    this.touchMediaQuery.removeEventListener(
      'change',
      this.detectTouchDevice.bind(this),
    );
  }
}
