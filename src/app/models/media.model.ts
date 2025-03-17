/**
 * Category of Media (given by the WP Media Assistant plugin)
 */
export enum WPMediaCategory {
  ANMELDUNG = 35,
  LOGOS = 38,
  GALLERY = 39,
  GALLERY_2023 = 40,
  GALLERY_2024 = 46,
  GALLERY_2025 = 47,
  WEBSITE_ASSETS = 41,
}

export enum WPMediaTag {
  GENERAL = 44,
  KELLER = 42,
  MAIN = 36,
  OPEN_AIR = 43,
  SPELUNKE = 45,
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
export interface WPMappedImage {
  url: string;
  alt?: string;
  title?: string;
  category?: Array<WPMediaCategory>;
  sizes: Record<WPImageSizeApiKey, string>;
}
