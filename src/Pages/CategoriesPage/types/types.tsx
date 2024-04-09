
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