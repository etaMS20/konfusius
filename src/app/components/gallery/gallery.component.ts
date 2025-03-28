import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  WPImageSizeApiKey,
  WPMappedImage,
  WPMediaCategory,
} from '@models/media.model';
import { WordPressApiService } from '@services/api/wp-api.service';
import { MappingService } from '@services/mapping.service';
import { map } from 'rxjs';
import { IAlbum, Lightbox, LightboxModule, LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, LightboxModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  standalone: true,
})
export class GalleryComponent {
  galleryImages = signal<WPMappedImage[]>([]);
  album: IAlbum[] = [];
  private readonly mappingService = inject(MappingService);

  constructor(
    private readonly wpApi: WordPressApiService,
    private readonly lightbox: Lightbox,
    private readonly lightboxConfig: LightboxConfig,
  ) {
    this.lightboxConfig.fadeDuration = 0.2;
    this.lightboxConfig.resizeDuration = 0.2;
    this.lightboxConfig.centerVertically = true;
    this.lightboxConfig.wrapAround = true;

    this.wpApi
      .getMediaImages([WPMediaCategory.GALLERY])
      .pipe(map((data: any) => this.mappingService.mapImageArray(data)))
      .subscribe((mappedImages) => {
        this.galleryImages.set(mappedImages);
        this.album = mappedImages.map((image) => ({
          src: image.url,
          caption: image.alt,
          thumb: image.sizes[WPImageSizeApiKey.MOBILE],
        }));
      });
  }

  openImage(index: number): void {
    this.lightbox.open(this.album, index);
  }

  closeLightbox(): void {
    this.lightbox.close();
  }
}
