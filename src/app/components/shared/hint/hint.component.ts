import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'kf-hint',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
})
export class HintComponent {
  key = input<string>();
  visible = true;

  ngOnInit(): void {
    this.visible = !this.isDismissed();
  }

  dismiss(): void {
    this.visible = false;
    this.persistDismiss();
  }

  private isDismissed(): boolean {
    return false;
  }

  private persistDismiss(): void {}
}
