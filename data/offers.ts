import { Offer } from '@/types/offer';

export interface FlashSaleItem {
  id: string;
  productId: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  mrp: number;
  salePrice: number;
  discountPercentage: number;
  savings: number;
  badge: string;
  stockLeft: number;
  totalStock: number;
  flavourNote: string;
}

export interface PromoTier {
  title: string;
  description: string;
  code: string;
  discount: string;
  minSpend: number;
  badge: string;
}

export const staticOffers: Offer[] = [
  {
    id: 'offer-flash-sale',
    title: 'Flash Spice Sale — Kitchen Essentials',
    slug: 'flash-spice-sale',
    campaignName: 'Flash Spice Sale',
    discountType: 'percentage',
    discountPercentage: 30,
    startDate: new Date(Date.now() - 86400000).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    productsIncluded: [
      'prod-kashmiri-chilli-powder',
      'prod-turmeric-powder-lakadong',
      'prod-garam-masala-shahi',
      'prod-green-cardamom-idukki'
    ],
    categoriesIncluded: ['spice-powders', 'whole-spices', 'blended-masalas'],
    badge: '30% OFF',
    isActive: true,
    description: 'Limited-time lightning discount on top pantry essentials. Freshly milled in small batches.',
    priority: 10,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'offer-todays-deals',
    title: "Today's Spice Favourites",
    slug: 'todays-spice-deals',
    campaignName: "Today's Deals",
    discountType: 'percentage',
    discountPercentage: 25,
    startDate: new Date(Date.now() - 86400000).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    productsIncluded: [
      'prod-cumin-seeds-unjha',
      'prod-black-pepper-malabar',
      'prod-biryani-masala-hyderabadi',
      'prod-chaat-masala',
      'prod-cloves-laung',
      'prod-kasuri-methi'
    ],
    categoriesIncluded: ['whole-spices', 'blended-masalas', 'herbs-seasonings'],
    badge: '25% OFF',
    isActive: true,
    description: 'Handpicked daily deals on regional masalas and whole spices. Save up to ₹100 per pack.',
    priority: 8,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'offer-combo-savings',
    title: 'Curated Combos & Gift Hampers',
    slug: 'curated-combos-discount',
    campaignName: 'Combo Savings',
    discountType: 'percentage',
    discountPercentage: 27,
    startDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 30).toISOString(),
    productsIncluded: ['combo-everyday-kitchen', 'combo-7-essential-spices', 'combo-royal-biryani'],
    categoriesIncluded: ['combo-packs', 'gift-boxes'],
    badge: 'SAVE UP TO ₹600',
    isActive: true,
    description: 'Save significantly when you purchase our master combo collections in reusable tins.',
    priority: 7,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  }
];

export const flashSaleProducts: FlashSaleItem[] = [
  {
    id: 'flash-1',
    productId: 'prod-kashmiri-chilli-powder',
    title: 'Premium Kashmiri Chilli Powder',
    slug: 'kashmiri-chilli-powder',
    category: 'Spice Powders',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    mrp: 199,
    salePrice: 149,
    discountPercentage: 25,
    savings: 50,
    badge: '🔥 25% OFF',
    stockLeft: 18,
    totalStock: 60,
    flavourNote: 'Vibrant ruby colour • Mild warmth • 100g'
  },
  {
    id: 'flash-2',
    productId: 'prod-turmeric-powder-lakadong',
    title: 'High-Curcumin Lakadong Turmeric',
    slug: 'lakadong-turmeric-powder',
    category: 'Turmeric Collection',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
    mrp: 249,
    salePrice: 189,
    discountPercentage: 24,
    savings: 60,
    badge: '🔥 24% OFF',
    stockLeft: 12,
    totalStock: 50,
    flavourNote: '5.8% Active Curcumin • Meghalaya • 100g'
  },
  {
    id: 'flash-3',
    productId: 'prod-green-cardamom-idukki',
    title: 'Idukki Bold Green Cardamom (8mm+)',
    slug: 'idukki-green-cardamom-whole',
    category: 'Whole Spices',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=80',
    mrp: 449,
    salePrice: 349,
    discountPercentage: 22,
    savings: 100,
    badge: '🔥 22% OFF',
    stockLeft: 8,
    totalStock: 40,
    flavourNote: 'Intensely fragrant • Western Ghats • 50g'
  },
  {
    id: 'flash-4',
    productId: 'prod-garam-masala-shahi',
    title: 'Royal Shahi Garam Masala',
    slug: 'royal-shahi-garam-masala',
    category: 'Blended Masalas',
    image: 'https://images.unsplash.com/photo-1596040033283-9b8893d56b46?w=800&auto=format&fit=crop&q=80',
    mrp: 229,
    salePrice: 169,
    discountPercentage: 26,
    savings: 60,
    badge: '🔥 26% OFF',
    stockLeft: 22,
    totalStock: 75,
    flavourNote: '16 Whole Spices • Hand Roasted • 100g'
  }
];

export const buyMoreSaveMoreTiers: PromoTier[] = [
  {
    title: 'Pantry Starter',
    description: 'Add any 3 individual spice packs to cart',
    code: 'PANTRY3',
    discount: '5% Instant Off',
    minSpend: 499,
    badge: 'BUY 3'
  },
  {
    title: 'Master Chef Pack',
    description: 'Add any 5 individual spices or masalas',
    code: 'CHEF5',
    discount: '10% Instant Off',
    minSpend: 899,
    badge: 'BUY 5'
  },
  {
    title: 'Royal Feast Vault',
    description: 'Orders above ₹1,499 get free shipping + extra discount',
    code: 'FEAST15',
    discount: '15% Instant Off + Free Shipping',
    minSpend: 1499,
    badge: 'BEST VALUE'
  }
];
