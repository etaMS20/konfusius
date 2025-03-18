import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { FooterComponent } from '@components/footer/footer.component';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  // keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription?: Subscription;
  private popupCloseSubscription?: Subscription;

  constructor(
    private readonly ccService: NgcCookieConsentService,
    private readonly swUpdate: SwUpdate,
  ) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          if (
            confirm('A new website version is available. Load new version?')
          ) {
            window.location.reload();
          }
        }
      });
    }
  }

  ngOnInit() {
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
      // use this.ccService.getConfig() to do stuff...
    });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(() => {
      // use this.ccService.getConfig() to do stuff...
    });
  }

  ngOnDestroy() {
    this.popupOpenSubscription?.unsubscribe();
    this.popupCloseSubscription?.unsubscribe();
  }
}
