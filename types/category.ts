export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  order?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  subcategories: Subcategory[];
  featured?: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
}
