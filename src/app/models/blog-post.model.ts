/** Blog Post */
export interface BlogPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta?: null[] | null;
  categories?: number[] | null;
  tags?: number[] | null;
  class_list?: Array<string>;
  _links?: object;
}

export enum BlogPostId {
  SUGGESTIONS = 1954,
  INTRO = 1706,
  KONFUSIUS = 1733,
  ECKDATEN = 1735,
  LETTER = 1713,
  PROGRAMM_SHORT = 1858,
}
