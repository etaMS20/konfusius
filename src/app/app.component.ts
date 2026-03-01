import { Component, inject, isDevMode, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '@components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { filter, map, Observable, Subscription } from 'rxjs';
import { FooterComponent } from '@components/footer/footer.component';
import { BackgroundComponent } from './components/shared/background/background.component';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { APP_VERSION, envLoaded, FESTIVAL_START } from '@config/http.config';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { EnvStatusService } from '@services/env-status.service';
import { KTimeUtilsService } from '@services/time-utils.service';
import { ToastModule } from 'primeng/toast';
import { EarlyBirdService } from '@services/early-bird-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    CommonModule,
    FooterComponent,
    BackgroundComponent,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  envStatus = inject(EnvStatusService);
  swUpdate = inject(SwUpdate);
  ccService = inject(NgcCookieConsentService); // inject to trigger cookie consent popup
  timeUtil = inject(KTimeUtilsService);
  earlyBirdService = inject(EarlyBirdService);
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
      this.swUpdate.activateUpdate().then(() => {
        console.info(
          `New version (v${APP_VERSION}) ready. Will activate on next page load.`,
        );
      });
    });

    console.info(
      `Development Mode: ${isDevMode()}\nEnvironment Loaded: ${envLoaded()}`,
    );

    this.envStatus.envsLoaded = envLoaded();
    if (!this.envStatus.envsLoaded) {
      alert(
        'One or more environment variables did not get loaded during build. Please contact site admin.',
      );
    }

    if (!('serviceWorker' in navigator)) {
      alert(
        'Service Worker API is not supported in this browser version. Please use a more recent browser.',
      );
    }
    this.timeUtil.setFestivalStart(FESTIVAL_START);
  }

  ngOnDestroy() {
    this.updatesAvailable?.unsubscribe();
  }

  onCloseToast() {
    this.earlyBirdService.isMessageVisible = false;
  }
}
