import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { FooterComponent } from '@components/footer/footer.component';
import { BackgroundComponent } from './components/shared/background/background.component';
import { SwUpdate } from '@angular/service-worker';

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
  ccService = inject(NgcCookieConsentService);

  // keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription?: Subscription;
  private popupCloseSubscription?: Subscription;

  constructor(private readonly swUpdate: SwUpdate) {}

  ngOnInit() {
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
      // use this.ccService.getConfig() to do stuff...
    });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(() => {
      // use this.ccService.getConfig() to do stuff...
    });

    // TODO
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          console.log(
            `sw new version: current: ${event.currentVersion.hash}, new: ${event.latestVersion.hash}`,
            event,
          );
          if (confirm(`New version available. Load New Version?`)) {
            window.location.reload();
          }
        }
      });
    }
  }

  ngOnDestroy() {
    this.popupOpenSubscription?.unsubscribe();
    this.popupCloseSubscription?.unsubscribe();
  }
}
