export interface HeroBannerSlide {
  id: string;
  badge?: string;
  heading: string;
  highlightText?: string;
  subheading: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  imageUrl: string;
  offerTag?: string;
  active: boolean;
}

export interface HomepageConfig {
  heroSlides: HeroBannerSlide[];
  featuredCategories: string[]; // Category IDs
  featuredProductIds: string[]; // Product IDs
  featuredRecipeIds: string[]; // Recipe IDs
  activeCampaignId?: string; // Offer ID
  trustBadges: {
    icon: string;
    title: string;
    description: string;
  }[];
  updatedAt: string;
}
