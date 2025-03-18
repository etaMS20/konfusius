import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PromptUpdateService {
  constructor(swUpdate: SwUpdate) {
    swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      )
      .subscribe((evt) => {
        if (this.promptUser(evt)) {
          document.location.reload();
        }
      });
  }

  private promptUser(evt: VersionReadyEvent): boolean {
    return confirm(
      'A new website version is available. Do you want to reload?',
    );
  }
}
