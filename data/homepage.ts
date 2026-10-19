export interface RegionalHeritageItem {
  id: string;
  name: string;
  state: string;
  slug: string;
  tagline: string;
  signatureFlavour: string;
  keySpices: string;
  image: string;
  description: string;
  accentColor?: string;
}

export interface TrustPillar {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

export const homepageHeroData = {
  tagline: 'AUTHENTIC INDIAN SPICES',
  headline: 'Pure Spices. Rich Flavours. Made for Every Kitchen.',
  subheading: 'Discover carefully sourced Indian spices and masalas crafted to bring authentic flavour to everyday cooking. Single-origin, unadulterated, and freshly ground.',
  primaryCta: { text: 'Shop Spices', href: '/shop' },
  secondaryCta: { text: 'Explore Offers', href: '/offers' },
  heroStats: [
    { value: '50,000+', label: 'Happy Kitchens' },
    { value: '48+', label: 'Pure Spices' },
    { value: '4.9/5', label: 'Customer Rating' },
    { value: '100%', label: 'Purity Tested' }
  ],
  heroBadges: [
    '🌿 Zero Additives or Colours',
    '⚡ Cold-Milled Fresh',
    '📦 Express Pan-India Delivery'
  ]
};

export const trustPillars: TrustPillar[] = [
  {
    id: 'pillar-1',
    icon: 'Sparkles',
    title: 'Carefully Sourced',
    subtitle: 'Direct from Heritage Farms',
    description: 'Direct partnerships with generational spice farmers across Meghalaya, Kashmir, Rajasthan, and Kerala.'
  },
  {
    id: 'pillar-2',
    icon: 'Flame',
    title: 'Freshly Packed',
    subtitle: 'Micro-Batch Milling',
    description: 'Stone-milled at low temperatures to lock in delicate volatile aromatic oils without burning nutrients.'
  },
  {
    id: 'pillar-3',
    icon: 'ShieldCheck',
    title: 'Authentic Flavours',
    subtitle: '100% Pure & Unadulterated',
    description: 'Zero artificial colours, zero synthetic aromas, zero anti-caking starches or fillers. Just raw spice.'
  },
  {
    id: 'pillar-4',
    icon: 'CheckCircle2',
    title: 'Quality Tested',
    subtitle: '24 Purity Parameters',
    description: 'Every harvest batch undergoes rigorous independent NABL accredited lab testing for maximum peace of mind.'
  },
  {
    id: 'pillar-5',
    icon: 'Package',
    title: 'Secure Packaging',
    subtitle: 'UV & Moisture-Proof',
    description: 'Packaged in multi-layer food-safe barrier pouches and sealed tin caddies to preserve peak farm freshness.'
  },
  {
    id: 'pillar-6',
    icon: 'Truck',
    title: 'Pan-India Delivery',
    subtitle: 'Delivered in 48-72 Hours',
    description: 'Fast, climate-controlled shipping to 24,000+ pincodes across India and worldwide export express.'
  }
];

export const regionalFlavoursData: RegionalHeritageItem[] = [
  {
    id: 'region-rajasthan',
    name: 'Rajasthan',
    state: 'North-West India',
    slug: 'regional-masalas',
    tagline: 'Royal Desert Heat & Roasted Aromas',
    signatureFlavour: 'Mathania Mirch • Roasted Cumin • Dried Mango',
    keySpices: 'Mathania Mirch, Dal Baati Masala, Nagauri Kasuri Methi',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    description: 'Sun-drenched chillies and rich whole-spice blends crafted for royal Rajput feasts, robust gravies, and rustic baked breads.'
  },
  {
    id: 'region-kashmir',
    name: 'Kashmir',
    state: 'Himalayan Valley',
    slug: 'regional-masalas',
    tagline: 'Ruby Warmth & Saffron Delicacy',
    signatureFlavour: 'Mongra Saffron • Fennel • Sonth • Mild Chilli',
    keySpices: 'Kashmiri Lal Mirch, Rogan Josh Masala, Grade A1 Saffron',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
    description: 'Gentle warmth without harsh sting, scented with sweet fennel, Himalayan ginger, and world-renowned Pampore saffron.'
  },
  {
    id: 'region-punjab',
    name: 'Punjab',
    state: 'The Granary of India',
    slug: 'blended-masalas',
    tagline: 'Hearty, Robust & Smoky Flavours',
    signatureFlavour: 'Black Cardamom • Anardana • Kasuri Methi',
    keySpices: 'Amritsari Chole Masala, Punjabi Garam Masala, Tandoori Rub',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80',
    description: 'Bold, deep-brown spices roasted to perfection for decadent dhabas, buttery makhani gravies, and aromatic clay oven tandoors.'
  },
  {
    id: 'region-hyderabad',
    name: 'Hyderabad',
    state: 'Telangana & Deccan',
    slug: 'regional-masalas',
    tagline: 'Mughlai Elegance Meets Deccan Spice',
    signatureFlavour: 'Shahi Potli Aromatics • Mace • Green Cardamom',
    keySpices: 'Hyderabadi Dum Biryani Masala, Shahi Garam Masala',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    description: 'Royal Nizami alchemy blending fragrant green cardamom pods, stone flowers, and slow-roasted seeds for unforgettable dum biryanis.'
  },
  {
    id: 'region-south-india',
    name: 'South India',
    state: 'Kerala, Tamil Nadu, Karnataka',
    slug: 'regional-masalas',
    tagline: 'Curry Leaves, Mustard & Tellicherry Pepper',
    signatureFlavour: 'Roasted Lentils • Curry Leaves • Black Pepper',
    keySpices: 'Udupi Sambar Masala, Chettinad Masala, Tellicherry Pepper',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    description: 'Crisp tempering of mustard seeds, aromatic curry leaf blends, and fiery black pepper from the verdant Western Ghats.'
  },
  {
    id: 'region-gujarat',
    name: 'Gujarat',
    state: 'Western Coast',
    slug: 'whole-spices',
    tagline: 'Sweet, Tangy & Aromatic Balance',
    signatureFlavour: 'Unjha Cumin • Sesame • Sweet Fennel • Hing',
    keySpices: 'Unjha Cumin, Gujarati Kitchen Masala, White Sesame',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80',
    description: 'Subtle balances of warm cumin, sweet fennel seeds, and pungent asafoetida designed to elevate sweet and sour dals and dhoklas.'
  }
];
