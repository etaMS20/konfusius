import { Component, effect, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'kf-hint',
  standalone: true,
  imports: [CommonModule, ButtonModule, MarkdownModule],
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
})
export class HintComponent {
  key = input<string>();
  mdSrc = input<string>();
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

  onError(event: Error | string): void {
    this.visible = false;
    console.error('Error loading hint content from markdown file.', event);
  }
}
