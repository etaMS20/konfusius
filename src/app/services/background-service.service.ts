import { Injectable } from '@angular/core';
import { fromEvent, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackgroundServiceService {
  private readonly scroll$: Observable<number>;

  constructor() {
    this.scroll$ = fromEvent<Event>(window, 'scroll').pipe(
      map(() => window.scrollY),
    );
  }

  getScrollPosition(): Observable<number> {
    return this.scroll$;
  }
}
