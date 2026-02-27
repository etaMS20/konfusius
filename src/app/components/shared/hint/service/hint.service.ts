import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocalStorageService } from '@storage/local-storage.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

const DISMISSED_HINTS_KEY = 'dismissed-hints';

@Injectable({ providedIn: 'root' })
export class HintService {
  private readonly storage = inject(LocalStorageService);
  private readonly renderedHints$ = new BehaviorSubject(new Set<string>());

  private readonly dismissed$ = this.storage
    .getItem$<string[]>(DISMISSED_HINTS_KEY, [])
    .pipe(map((ids) => new Set(ids ?? [])));

  anyRenderedDismissed = toSignal(
    combineLatest([this.renderedHints$, this.dismissed$]).pipe(
      map(([rendered, dismissed]) =>
        [...rendered].some((id) => dismissed.has(id)),
      ),
    ),
    { initialValue: false },
  );

  areAllRenderedVisible = computed(() => !this.anyRenderedDismissed());

  show(hintId: string): void {
    this.updateDismissed(hintId, false);
  }

  hide(hintId: string): void {
    this.updateDismissed(hintId, true);
  }

  register(hintId: string): void {
    const set = new Set(this.renderedHints$.value);
    set.add(hintId);
    this.renderedHints$.next(set);
  }

  unregister(hintId: string): void {
    const set = new Set(this.renderedHints$.value);
    set.delete(hintId);
    this.renderedHints$.next(set);
  }

  isDismissed(hintId: string): boolean {
    return this.getDismissed().has(hintId);
  }

  isDismissed$(hintId: string): Observable<boolean> {
    return this.storage
      .getItem$<string[]>(DISMISSED_HINTS_KEY, [])
      .pipe(map((ids) => (Array.isArray(ids) ? ids.includes(hintId) : false)));
  }

  getRendered(): string[] {
    return [...this.renderedHints$.value];
  }

  showAllRendered(): void {
    const dismissed = this.getDismissed();
    this.renderedHints$.value.forEach((hintId) => dismissed.delete(hintId));
    this.storage.setItem(DISMISSED_HINTS_KEY, [...dismissed]);
  }

  reset(): void {
    this.storage.removeItem(DISMISSED_HINTS_KEY);
  }

  private getDismissed(): Set<string> {
    return new Set(this.storage.getItem<string[]>(DISMISSED_HINTS_KEY, []));
  }

  private updateDismissed(hintId: string, dismissed: boolean): void {
    const set = this.getDismissed();
    dismissed ? set.add(hintId) : set.delete(hintId);
    this.storage.setItem(DISMISSED_HINTS_KEY, [...set]);
  }
}
