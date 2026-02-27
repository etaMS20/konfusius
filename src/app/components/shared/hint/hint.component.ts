import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { HintService } from './service/hint.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'kf-hint',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
})
export class HintComponent implements OnInit, OnDestroy {
  key = input.required<string>();
  withShowButton = input(true);

  private readonly hintService = inject(HintService);

  visible = toSignal(
    toObservable(this.key).pipe(
      switchMap((key) => this.hintService.isDismissed$(key)),
      map((dismissed) => !dismissed),
    ),
    { initialValue: true },
  );

  /**
   * On initializing a Hint, register it as rendered
   */
  ngOnInit(): void {
    this.hintService.register(this.key());
  }

  show(): void {
    this.hintService.show(this.key());
  }

  dismiss(): void {
    this.hintService.hide(this.key());
  }

  /**
   * On destroy, unregister it
   */
  ngOnDestroy(): void {
    this.hintService.unregister(this.key());
  }
}
