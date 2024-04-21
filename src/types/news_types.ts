export interface NewsResponse<T> {
  results: T[];
}

export interface NewsDataType {
  article_id: string;
  description: string;
  title: string;
  image_url: string;
  link: string;
  pubDate: string;
}
