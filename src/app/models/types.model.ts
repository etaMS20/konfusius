export interface BaseDialogData {
  content?: string;
  title?: string;
  imageMeta?: ImageMeta;
}

export interface ImageMeta {
  src: string;
  srcSet?: string;
  alt?: string;
  sizes?: string;
  descriptions?: string;
}

export interface FaqSection {
  question: string;
  answer: string;
}
