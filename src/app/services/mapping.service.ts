import { Injectable } from '@angular/core';
import { IMAGE_MAP, WcProduct } from '../models/product.model';
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
      is_in_stock: data.is_in_stock,
      is_purchasable: data.is_purchasable,
      imagePath: data.id in IMAGE_MAP ? IMAGE_MAP[data.id] : undefined,
      attributes: data.attributes,
      variations: data.variations,
      prices: data.prices,
    };
  }

  mapImageUrls(data: any): WPMappedImage[] {
    const images: WPMappedImage[] = [];

    data.forEach((item: any) => {
      const materialImage: WPMappedImage = {
        url: item.guid.rendered,
        alt: item.alt_text || '', // Optional alt text, if available
        title: item.title.rendered || '', // Optional title, if available
        category: item.attachment_category || [], // Optional category, if available
        sizes: {
          [WPImageSizeApiKey.MOBILE]:
            item.media_details.sizes.medium?.source_url || '',
          [WPImageSizeApiKey.MEDIUM]:
            item.media_details.sizes.large?.source_url || '',
          [WPImageSizeApiKey.FULL]:
            item.media_details.sizes.full?.source_url || '',
        },
      };
      images.push(materialImage);
    });

    return images;
  }
}
