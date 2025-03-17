import { BlogPost } from './blog-post.model';
import { WcProduct } from './product.model';

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
