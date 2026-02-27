import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocalStorageService } from '@storage/local-storage.service';
import { map, Observable } from 'rxjs';

const DISMISSED_HINTS_KEY = 'dismissed-hints';

@Injectable({ providedIn: 'root' })
export class HintService {
  private readonly storage = inject(LocalStorageService);
  private readonly renderedHints = new Set<string>();

  show(hintId: string): void {
    this.updateDismissed(hintId, false);
  }

  hide(hintId: string): void {
    this.updateDismissed(hintId, true);
  }

  register(hintId: string): void {
    this.renderedHints.add(hintId);
  }

  unregister(hintId: string): void {
    this.renderedHints.delete(hintId);
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
    return [...this.renderedHints];
  }

  showAllRendered(): void {
    const dismissed = this.getDismissed();
    this.renderedHints.forEach((hintId) => dismissed.delete(hintId));
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

  areAllRenderedVisible = toSignal(
    this.storage.getItem$<string[]>(DISMISSED_HINTS_KEY, []).pipe(
      map((ids) => {
        const dismissed = new Set(ids ?? []);
        return [...this.renderedHints].every(
          (hintId) => !dismissed.has(hintId),
        );
      }),
    ),
    { initialValue: true },
  );

  anyRenderedDismissed = computed(() => !this.areAllRenderedVisible());
}
