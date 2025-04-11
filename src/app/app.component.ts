import { Component, inject, isDevMode, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '@components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { filter, map, Observable, Subscription } from 'rxjs';
import { FooterComponent } from '@components/footer/footer.component';
import { BackgroundComponent } from './components/shared/background/background.component';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { APP_VERSION } from '@config/http.config';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    CommonModule,
    FooterComponent,
    BackgroundComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  swUpdate = inject(SwUpdate);
  ccService = inject(NgcCookieConsentService); // inject to trigger cookie consent popup
  private updatesAvailable$?: Observable<any>;
  private updatesAvailable?: Subscription;

  constructor() {}

  ngOnInit() {
    this.updatesAvailable$ = this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map((evt) => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      })),
    );

    this.updatesAvailable = this.updatesAvailable$?.subscribe(() => {
      this.promptUser();
    });

    console.log('devMode: ', isDevMode());
  }

  ngOnDestroy() {
    this.updatesAvailable?.unsubscribe();
  }

  private promptUser(): void {
    alert(
      `A new website-version (v${APP_VERSION}) is available. The site will now update.`,
    );
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
