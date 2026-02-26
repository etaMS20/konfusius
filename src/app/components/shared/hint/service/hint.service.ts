import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '@storage/local-storage.service';
import { map, Observable } from 'rxjs';

const DISMISSED_HINTS_KEY = 'dismissed-hints';

@Injectable({ providedIn: 'root' })
export class HintService {
  private readonly storage = inject(LocalStorageService);

  unDismiss(hintId: string): void {
    const dismissed = this.getDismissed();
    dismissed.delete(hintId);
    this.storage.setItem(DISMISSED_HINTS_KEY, [...dismissed]);
  }

  dismiss(hintId: string): void {
    const dismissed = this.getDismissed();
    dismissed.add(hintId);
    this.storage.setItem(DISMISSED_HINTS_KEY, [...dismissed]);
  }

  isDismissed(hintId: string): boolean {
    return this.getDismissed().has(hintId);
  }

  isDismissed$(hintId: string): Observable<boolean> {
    return this.storage
      .getItem$<string[]>(DISMISSED_HINTS_KEY, [])
      .pipe(map((ids) => (Array.isArray(ids) ? ids.includes(hintId) : false)));
  }

  reset(): void {
    this.storage.removeItem(DISMISSED_HINTS_KEY);
  }

  private getDismissed(): Set<string> {
    return new Set(this.storage.getItem<string[]>(DISMISSED_HINTS_KEY, []));
  }
}
