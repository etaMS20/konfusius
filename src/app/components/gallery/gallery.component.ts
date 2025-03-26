import { Component, signal } from '@angular/core';
import { WPMappedImage } from '@models/media.model';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  standalone: true,
})
export class GalleryComponent {
  images = signal<WPMappedImage[]>([]);

  constructor() {}

  openImageModal(image: WPMappedImage) {
    // Optional: Implement image modal/lightbox functionality
    // This could open a full-screen view of the clicked image
    console.log('Image clicked:', image);
  }
}
