import { Injectable } from '@angular/core';
import { WcProduct } from '../models/product.model';
import { WPImageSizeApiKey, WPMappedImage } from '../models/media.model';

/**
 * service to map the api responses to typed objects
 */
@Injectable({
  providedIn: 'root',
})
export class MappingService {
  constructor() {}

  mapProduct(data: any): WcProduct {
    return {
      id: data.id,
      type: data.type,
      slug: data.slug,
      name: data.name,
      description: data.description,
      short_description: data.description,
      is_in_stock: data.is_in_stock,
      is_purchasable: data.is_purchasable,
      attributes: data.attributes,
      variations: data.variations,
      prices: data.prices,
      images: data.images,
      sku: data.sku,
    };
  }

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
