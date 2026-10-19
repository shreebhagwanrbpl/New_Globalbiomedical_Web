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
    title: 'Biomedical Diagnostic Lab Special Deals',
    slug: 'biomedical-diagnostic-lab-deals',
    campaignName: 'Diagnostic Equipment Deals',
    discountType: 'percentage',
    discountPercentage: 25,
    startDate: new Date(Date.now() - 86400000).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 30).toISOString(),
    productsIncluded: [
      'hb-3000-plus-hematology',
      'hb-scope-4000-trinocular',
      'hb-cbc-reagent-pack',
      'hb-centrifuge-digital-8x15ml',
    ],
    categoriesIncluded: ['hematology', 'microscopes-centrifuges', 'biochemistry'],
    badge: '25% OFF',
    isActive: true,
    description: 'Special seasonal pricing on automated hematology analyzers, trinocular microscopes, and clinical centrifuges across Rajasthan.',
    priority: 10,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
  },
  {
    id: 'offer-todays-deals',
    title: "Diagnostic Lab Reagents & Consumables Bundle",
    slug: 'reagents-consumables-deals',
    campaignName: "Today's Deals",
    discountType: 'percentage',
    discountPercentage: 30,
    startDate: new Date(Date.now() - 86400000).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 15).toISOString(),
    productsIncluded: [
      'hb-cbc-reagent-pack',
      'hb-lft-reagent-combo-kit',
      'hb-kft-reagent-combo-kit',
      'hb-edta-k3-vacuum-tubes',
      'hb-dengue-ns1-combo-rapid-kits',
    ],
    categoriesIncluded: ['lab-consumables', 'poct-rapid-kits', 'biochemistry'],
    badge: '30% OFF',
    isActive: true,
    description: 'Bulk pathology consumables, vacuum blood collection tubes, and diagnostic reagent packs with express delivery.',
    priority: 8,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
  },
  {
    id: 'offer-combo-savings',
    title: 'Complete Turnkey Pathology Setup Savings',
    slug: 'turnkey-pathology-bundle-savings',
    campaignName: 'Lab Setup Bundles',
    discountType: 'percentage',
    discountPercentage: 23,
    startDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 60).toISOString(),
    productsIncluded: ['combo-complete-pathology-lab', 'combo-hematology-biochem-duo'],
    categoriesIncluded: ['hematology', 'biochemistry', 'microscopes-centrifuges'],
    badge: 'SAVE ₹90,000',
    isActive: true,
    description: 'Save significantly when buying complete pathology laboratory setups including installation and NABL documentation.',
    priority: 7,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
  },
];

export const flashSaleProducts: FlashSaleItem[] = [
  {
    id: 'flash-1',
    productId: 'hb-3000-plus-hematology',
    title: 'HB-3000 Plus 3-Part Hematology Analyzer',
    slug: 'hb-3000-plus-3-part-hematology-analyzer',
    category: 'Hematology',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&fit=crop&q=80',
    mrp: 245000,
    salePrice: 185000,
    discountPercentage: 24,
    savings: 60000,
    badge: '🔥 SAVE ₹60,000',
    stockLeft: 6,
    totalStock: 25,
    flavourNote: '60 Samples/Hr • 21 Parameters • Touchscreen • Built-in Printer',
  },
  {
    id: 'flash-2',
    productId: 'hb-scope-4000-trinocular',
    title: 'HB-Scope 4000 Trinocular LED Microscope',
    slug: 'hb-scope-4000-trinocular-led-laboratory-microscope',
    category: 'Microscopes',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
    mrp: 52000,
    salePrice: 38500,
    discountPercentage: 25,
    savings: 13500,
    badge: '🔥 25% OFF',
    stockLeft: 9,
    totalStock: 30,
    flavourNote: 'Infinity Plan Achromatic 40x-1000x • Camera Port • 3W LED',
  },
  {
    id: 'flash-3',
    productId: 'hb-centrifuge-digital-8x15ml',
    title: 'HB-Spin 6000 Digital Clinical Centrifuge',
    slug: 'hb-spin-6000-digital-clinical-centrifuge-8x15ml',
    category: 'Centrifuges',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&fit=crop&q=80',
    mrp: 17500,
    salePrice: 12500,
    discountPercentage: 28,
    savings: 5000,
    badge: '🔥 28% OFF',
    stockLeft: 14,
    totalStock: 50,
    flavourNote: 'Brushless DC Motor • 6000 RPM • Electronic Safety Lock',
  },
  {
    id: 'flash-4',
    productId: 'hb-cbc-reagent-pack',
    title: 'Universal CBC Reagents Pack (Diluent 20L + Lyse)',
    slug: 'universal-cbc-hematology-reagents-diluent-lyse-pack',
    category: 'Reagents',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
    mrp: 4800,
    salePrice: 3600,
    discountPercentage: 25,
    savings: 1200,
    badge: '🔥 25% OFF',
    stockLeft: 85,
    totalStock: 300,
    flavourNote: 'Cyanide-Free Lyse • Mindray / Sysmex / Erba Compatible',
  },
];

export const buyMoreSaveMoreTiers: PromoTier[] = [
  {
    title: 'Clinic Consumables Tier',
    description: 'Order any 5 boxes of vacuum blood tubes or rapid test kits',
    code: 'LABSAVER5',
    discount: '5% Instant Off',
    minSpend: 2500,
    badge: 'REAGENTS 5%',
  },
  {
    title: 'Diagnostic Reagent Bulk',
    description: 'Bulk monthly diagnostic reagent procurement for clinical labs',
    code: 'BULKLAB10',
    discount: '10% Instant Off',
    minSpend: 15000,
    badge: 'BULK 10%',
  },
  {
    title: 'Turnkey Institutional Setup',
    description: 'Equipment orders above ₹1,00,000 get free shipping + 1-Year AMC + UPS',
    code: 'HOSPITALFREE',
    discount: 'Free 1KVA UPS + On-Site Engineer Setup',
    minSpend: 100000,
    badge: 'FREE SETUP',
  },
];
