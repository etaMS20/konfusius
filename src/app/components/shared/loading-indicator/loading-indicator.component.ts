import { AsyncPipe } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '@services/loading.service';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'loading-indicator',
  imports: [AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss',
  standalone: true,
})
export class LoadingIndicatorComponent implements OnInit {
  loading$: Observable<boolean>;

  @Input() detectRouteTransitions = false;
  @Input() baseIndicator = false;

  @ContentChild('loading')
  customLoadingIndicator: TemplateRef<any> | null = null;

  constructor(
    public service: LoadingService,
    private readonly router: Router,
  ) {
    this.loading$ = this.service.loading$;
  }

  ngOnInit() {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.service.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.service.loadingOff();
            }
          }),
        )
        .subscribe();
    }
  }
}
