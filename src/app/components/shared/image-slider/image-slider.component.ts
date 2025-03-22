import {
  Component,
  Input,
  signal,
  effect,
  computed,
  OnInit,
  OnDestroy,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style } from '@angular/animations';
import { WPImageSizeApiKey, WPMappedImage } from '@models/media.model';

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
        style({ transform: 'translateX(0)', opacity: 1 }),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        style({ transform: 'translateX(0)', opacity: 1 }),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        style({ transform: 'translateX(100%)', opacity: 0 }),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  @Input() autoPlayInterval = 5000;
  @Input() size: WPImageSizeApiKey = WPImageSizeApiKey.MEDIUM;
  private readonly fsSize = WPImageSizeApiKey.FULL;
  images = input<WPMappedImage[]>([]);
  imagePaths = computed(() => this.images().map((image) => image.url));
  private autoPlayTimer?: number; // countdown
  currentIndex = signal(0);
  isPaused = signal(false);
  totalSlides = computed(() => this.images().length);
  currentImage = computed(
    () => this.images()[this.currentIndex()].sizes[this.size],
  );
  currentFullImage = computed(
    () => this.images()[this.currentIndex()].sizes[this.fsSize],
  );
  currentAlt = computed(() => this.images()[this.currentIndex()].alt);
  isFullscreen = signal(false); // Signal for fullscreen state

  constructor() {
    document.addEventListener('keydown', this.handleKeydown);

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

  private readonly handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      this.next();
    } else if (event.key === 'ArrowLeft') {
      this.previous();
    } else if (event.key === 'Escape') {
      this.closeFullscreen();
    }
  };

  openFullscreen() {
    this.isFullscreen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeFullscreen() {
    this.isFullscreen.set(false);
    document.body.style.overflow = '';
  }

  next() {
    this.currentIndex.update((current) =>
      current === this.images().length - 1 ? 0 : current + 1,
    );
  }

  previous() {
    this.currentIndex.update((current) =>
      current === 0 ? this.images().length - 1 : current - 1,
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
