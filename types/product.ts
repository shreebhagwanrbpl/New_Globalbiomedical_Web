export interface ProductNutritionalInfo {
  servingSize?: string;
  energyKcal?: number;
  proteinG?: number;
  carbohydratesG?: number;
  fatG?: number;
  sugarG?: number;
  sodiumMg?: number;
  [key: string]: string | number | undefined;
}

export interface ProductFSSAIInfo {
  licenseNumber: string;
  manufacturerDetails?: string;
  packerDetails?: string;
}

export interface PackSizeOption {
  weight: string;
  price: number;
  mrp: number;
  discountPercentage?: number;
  inStock?: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description: string;
  images: string[];
  price: number;
  mrp: number;
  salePrice?: number;
  discountPercentage?: number;
  category: string;
  subcategory?: string;
  brand: string;
  sku: string;
  stock: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival?: boolean;
  offerEnabled: boolean;
  offerTitle?: string;
  offerBadge?: string;
  offerStartDate?: string | null;
  offerEndDate?: string | null;
  packSizes?: PackSizeOption[];
  selectedPackSize?: string;
  weight: string;
  ingredients: string[];
  origin?: string;
  spiceLevel?: 'None' | 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  flavourProfile?: string;
  bestFor?: string[];
  usage?: string;
  storage?: string;
  shelfLife?: string;
  dietaryInfo?: string[];
  countryOfOrigin: string;
  manufacturer: string;
  fssaiInformation: ProductFSSAIInfo;
  nutritionalInformation?: ProductNutritionalInfo;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilterParams {
  category?: string;
  subcategory?: string;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  offerEnabled?: boolean;
  spiceLevel?: string;
  dietary?: string;
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'featured' | 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'rating' | 'discount';
  limit?: number;
  lastDocId?: string;
}
