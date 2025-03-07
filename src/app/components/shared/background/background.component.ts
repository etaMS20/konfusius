import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  imports: [CommonModule],
})
export class BackgroundComponent {
  backgroundPosition = 'center 0px';

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY;
    this.backgroundPosition = `center ${scrollPosition * 0.1}px`;
  }
}
