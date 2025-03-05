import { Component } from '@angular/core';
import { ImageSliderComponent } from '../../shared/image-slider/image-slider.component';

@Component({
  selector: 'app-image-container',
  imports: [ImageSliderComponent],
  templateUrl: './image-container.component.html',
  styleUrl: './image-container.component.scss',
})
export class ImageContainerComponent {
  carouselImages = [
    { url: 'assets/schichten/abbau.png', alt: 'First slide' },
    { url: 'assets/schichten/bar_keller.png', alt: 'Second slide' },
    { url: 'assets/schichten/bar.png', alt: 'Third slide' },
  ];
}
