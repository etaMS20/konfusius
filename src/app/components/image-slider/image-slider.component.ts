import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImageSliderComponent {
  swiperModules = [IonicSlides];
}
