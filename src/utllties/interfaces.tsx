export interface LoaderRequest {
  request: Request;
}

export interface CategoryItem {
  icons: { hieght: number; width: number; url: string }[];
  id: string;
  href: string;
  name: string;
}

export interface CategoriesResponse {
  categories?: {
    items: CategoryItem[];
    next: string;
    previous: string;
    offset: string;
    total: number;
    limit: number;
  };
}
export interface errorContent {
  message: string;
  status: number;
  data?: { message: string };
}
export class FetchError extends Error {
  data: errorContent;
  constructor(data: errorContent) {
    super();
    this.data = data;
  }
}
