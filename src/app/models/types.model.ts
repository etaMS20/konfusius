import { BlogPost } from './blog-post.model';

export interface BaseDialogData {
  content?: BlogPost;
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
