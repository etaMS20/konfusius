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
  imageObject: Array<object> = [
    {
      image: '/abbau.png',
      thumbImage: '/abbau.png',
    },
    {
      image: '/abbau.png',
      thumbImage: '/abbau.png',
    },
    {
      image: '/abbau.png',
      thumbImage: '/abbau.png',
    },
    {
      image: '/abbau.png',
      thumbImage: '/abbau.png',
    },
    {
      image: '/abbau.png',
      thumbImage: '/abbau.png',
    },
  ];

  showInfo(item: any) {
    console.log('Info for:', item);
  }
}
