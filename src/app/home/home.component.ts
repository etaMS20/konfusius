import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  imports: [MatGridListModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  items = [
    {
      imagePath: '/abbau.png',
      title: 'Item 1',
    },
    {
      imagePath: '/abbau.png',
      title: 'Item 2',
    },
    // Add more items as needed
  ];

  showInfo(item: any) {
    console.log('Info for:', item);
  }
}
