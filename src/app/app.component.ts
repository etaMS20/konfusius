import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from '@shared/background/background.component';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  // keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription?: Subscription;
  private popupCloseSubscription?: Subscription;

  constructor(
    private readonly ccService: NgcCookieConsentService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

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
