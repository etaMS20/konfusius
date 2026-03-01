import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'kf-info-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './info-button.component.html',
  styleUrl: './info-button.component.scss',
})
export class InfoButtonComponent {
  isInfoShown = input(false);
  severity = input<ButtonSeverity>('info');
  tooltipText = input<string>('');
  triggerMessage = output<void>();
  icon = input<string>('pi pi-info-circle');
  label = input<string>('');

  glow = computed(() => {
    const shouldGlow = !this.isInfoShown();
    return shouldGlow;
  });

  onTriggerMessage(): void {
    this.triggerMessage.emit();
  }
}
