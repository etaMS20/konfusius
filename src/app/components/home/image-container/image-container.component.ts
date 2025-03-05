import { Component, inject, signal } from '@angular/core';
import { ImageSliderComponent } from '../../shared/image-slider/image-slider.component';
import { WordPressApiService } from '../../../services/wp-api.service';
import { WPCategory, WPMappedImage } from '../../../models/media.model';
import { map } from 'rxjs';
import { MappingService } from '../../../services/mapping.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-image-container',
  imports: [ImageSliderComponent, NgIf],
  templateUrl: './image-container.component.html',
  styleUrl: './image-container.component.scss',
})
export class ImageContainerComponent {
  private readonly wpApi = inject(WordPressApiService);
  private readonly mappingService = inject(MappingService);

  gallery1 = signal<WPMappedImage[] | undefined>(undefined);

  constructor() {
    this.wpApi
      .getMediaImages(WPCategory.GALLERY_2024)
      .pipe(
        map((data: any) => {
          return this.mappingService.mapImageUrls(data);
        }),
      )
      .subscribe((mappedImages) => {
        this.gallery1.set(mappedImages);
      });
  }
}
