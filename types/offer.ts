export type OfferDiscountType = 'percentage' | 'fixed_amount' | 'bogo' | 'custom_bundle';

export interface Offer {
  id: string;
  title: string;
  slug: string;
  campaignName: string; // e.g. "Weekend Spice Sale", "Diwali Sale", "Flash Spice Sale"
  discountType: OfferDiscountType;
  discountPercentage?: number; // e.g. 25
  discountAmount?: number; // e.g. 50 (in INR)
  startDate: string; // ISO 8601 string
  endDate: string; // ISO 8601 string
  productsIncluded: string[]; // List of Product IDs targeted by this offer
  categoriesIncluded: string[]; // List of Category IDs targeted
  badge: string; // e.g. "25% OFF", "Diwali Special", "Buy 2 Get 1"
  isActive: boolean;
  description?: string;
  bannerImage?: string;
  termsAndConditions?: string[];
  priority?: number; // Higher number gets display precedence
  createdAt: string;
  updatedAt: string;
}

export interface OfferCalculationResult {
  hasOffer: boolean;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  discountPercentage: number;
  appliedOffer?: {
    id: string;
    title: string;
    badge: string;
    campaignName: string;
  };
}
