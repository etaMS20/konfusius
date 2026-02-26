import { Injectable } from '@angular/core';
import { WPImageSizeApiKey, WPMappedImage } from '@models/media.model';

@Injectable({
  providedIn: 'root',
})
export class MappingService {
  constructor() {}

  /**
   * Maps a wp media response of type array to an array of WPMappedImage
   * @param data response object of wordpress api /media endpoint
   * @returns WPMappedImage[]
   */
  mapImageArray(data: Array<any>): Array<WPMappedImage> {
    const images: Array<WPMappedImage> = [];

    data.forEach((item: any) => {
      const materialImage: WPMappedImage = this.mapImage(item);
      images.push(materialImage);
    });

    return images;
  }

  /**
   * maps a single image response object
   * @param imageObject raw response object
   * @returns WPMappedImage
   */
  mapImage(imageObject: any): WPMappedImage {
    return {
      url: imageObject.guid.rendered,
      alt: imageObject.alt_text || '', // Optional alt text, if available
      title: imageObject.title.rendered || '', // Optional title, if available
      category: imageObject.attachment_category || [], // Optional category, if available
      sizes: {
        [WPImageSizeApiKey.MOBILE]:
          imageObject.media_details.sizes.medium?.source_url || '',
        [WPImageSizeApiKey.MEDIUM]:
          imageObject.media_details.sizes.large?.source_url || '',
        [WPImageSizeApiKey.FULL]:
          imageObject.media_details.sizes.full?.source_url || '',
      },
    };
  }
}
