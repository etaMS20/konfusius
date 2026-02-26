import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { HintService } from './service/hint.service';

@Component({
  selector: 'kf-hint',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
})
export class HintComponent {
  key = input.required<string>();
  withShowButton = input(true);
  visible = true;

  private readonly hintService = inject(HintService);

  ngOnInit(): void {
    const key = this.key();
    if (key) {
      this.visible = !this.hintService.isDismissed(key);
    }
  }

  dismiss(): void {
    const key = this.key();
    if (key) {
      this.hintService.dismiss(key);
    }
    this.visible = false;
  }

  show(): void {
    const key = this.key();
    if (key) {
      this.hintService.unDismiss(key);
    }
    this.visible = true;
  }
}
