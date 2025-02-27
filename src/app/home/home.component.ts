import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ImageSliderComponent } from '../components/image-slider/image-slider.component';

@Component({
  selector: 'app-home',
  imports: [MatGridListModule, ImageSliderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  carouselImages = [
    { url: '/abbau.png', alt: 'First slide' },
    { url: '/bar_keller.png', alt: 'Second slide' },
    { url: '/bar.png', alt: 'Third slide' },
  ];

  showInfo(item: any) {
    console.log('Info for:', item);
  }
}
