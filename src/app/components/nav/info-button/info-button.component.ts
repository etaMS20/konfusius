import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarlyBirdService } from '@services/early-bird-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'kf-info-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './info-button.component.html',
  styleUrl: './info-button.component.scss',
})
export class InfoButtonComponent {
  protected readonly earlyBirdService = inject(EarlyBirdService);

  isEarlyBirdActive = toSignal(this.earlyBirdService.isActive$, {
    initialValue: false,
  });

  glow = computed(() => {
    const shouldGlow =
      this.isEarlyBirdActive() && !this.earlyBirdService.isMessageVisible;
    return shouldGlow;
  });

  constructor() {}
  triggerMessage(): void {
    this.earlyBirdService.showEarlyBirdMessage();
  }
}
