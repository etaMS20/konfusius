/**
 * Category of Media (given by the WP Media Assistant plugin)
 */
export enum WPCategory {
  ANMELDUNG = 35,
  LOGOS = 38,
  GALLERY = 39,
  GALLERY_2024 = 40,
}

/**
 * WP returns multiple sampling sizes of the images in the media response
 * For simplicity we only use 3 sizes on this website
 */
export enum WPImageSizeApiKey {
  MEDIUM = 'large', // use for slideshows
  MOBILE = 'medium_large', // use for slideshows on mobile
  FULL = 'full',
}

/**
 * We use this simplified model for all images on the website
 */
export interface MaterialImage {
  url: string;
  alt?: string;
  title?: string;
  category?: Array<WPCategory>;
  sizes: Record<WPImageSizeApiKey, string>;
}
