import { CrossSaleProductId } from './cross-sale.model';
import { WcOrderStatus } from './order.model';

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

export interface OrderMin {
  id: number;
  date_created: string;
  billing: {
    full_name: string;
    email: string;
    billing_invite: string;
  };
  line_items: Array<LineItemMin>;
  total: string;
  status: WcOrderStatus;
}

export interface LineItemMin {
  product_id: number | CrossSaleProductId;
  name: string;
}
