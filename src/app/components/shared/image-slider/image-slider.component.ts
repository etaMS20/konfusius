import {
  Component,
  Input,
  signal,
  effect,
  computed,
  OnInit,
  OnDestroy,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style, animate } from '@angular/animations';
import { WPMappedImage } from '../../../models/media.model';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '500ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 }),
        ),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '500ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 }),
        ),
      ]),
    ]),
  ],
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  images = input<WPMappedImage[]>([]);
  @Input() autoPlayInterval = 5000;
  imagePaths = computed(() => this.images().map((image) => image.url));

  private autoPlayTimer?: number;
  currentIndex = signal(0);
  isPaused = signal(false);

  totalSlides = computed(() => this.images().length);
  currentImage = computed(() => this.images()[this.currentIndex()]);

  constructor() {
    effect(() => {
      if (!this.isPaused()) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    });
  }

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  next() {
    this.currentIndex.update((current) =>
      current === this.images.length - 1 ? 0 : current + 1,
    );
  }

  previous() {
    this.currentIndex.update((current) =>
      current === 0 ? this.images.length - 1 : current - 1,
    );
  }

  goToSlide(index: number) {
    this.currentIndex.set(index);
  }

  pauseAutoPlay() {
    this.isPaused.set(true);
  }

  resumeAutoPlay() {
    this.isPaused.set(false);
  }

  private startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      this.next();
    }, this.autoPlayInterval);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }
}
