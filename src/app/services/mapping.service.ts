import { Injectable } from '@angular/core';
import { IMAGE_MAP, WcProduct } from '../models/product.model';
import { WPImageSizeApiKey } from '../models/media.model';

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

  mapImageUrls(data: any) {
    const mobile: string[] = [];
    const large: string[] = [];
    const full: string[] = [];

    data.forEach((item: any) => {
      if (item.media_details.sizes.medium) {
        mobile.push(
          item.media_details.sizes[WPImageSizeApiKey.MOBILE].source_url,
        );
      }
      if (item.media_details.sizes.large) {
        large.push(
          item.media_details.sizes[WPImageSizeApiKey.MEDIUM].source_url,
        );
      }
      if (item.media_details.sizes.full) {
        full.push(item.guid.rendered);
      }
    });

    return { mobile, large, full };
  }
}
