import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { WPMappedImage, WPMediaCategory } from '@models/media.model';
import { WordPressApiService } from '@services/api/wp-api.service';
import { MappingService } from '@services/mapping.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  standalone: true,
})
export class GalleryComponent {
  galleryImages = signal<WPMappedImage[]>([]);
  private readonly mappingService = inject(MappingService);

  constructor(private readonly wpApi: WordPressApiService) {
    this.wpApi
      .getMediaImages([WPMediaCategory.GALLERY])
      .pipe(
        map((data: any) => {
          return this.mappingService.mapImageArray(data);
        }),
      )
      .subscribe((mappedImages) => {
        this.galleryImages.set(mappedImages);
      });
  }

  openImageModal(image: WPMappedImage) {
    // Optional: Implement image modal/lightbox functionality
    // This could open a full-screen view of the clicked image
    console.log('Image clicked:', image);
  }
}
