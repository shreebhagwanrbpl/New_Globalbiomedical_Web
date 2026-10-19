export interface ComboProductItem {
  name: string;
  weight: string;
  image?: string;
  description?: string;
}

export interface ComboPack {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  image: string;
  galleryImages?: string[];
  mrp: number;
  price: number;
  discountPercentage: number;
  savings: number;
  rating: number;
  reviewCount: number;
  itemsIncluded: ComboProductItem[];
  itemCount: number;
  features: string[];
  bestFor: string;
  tags: string[];
  isFeatured?: boolean;
}

export const staticCombos: ComboPack[] = [
  {
    id: 'combo-everyday-kitchen',
    slug: 'everyday-kitchen-spice-box',
    title: 'Everyday Kitchen Spice Box',
    tagline: 'The 6 Essential Spices for Daily Indian Cooking',
    description: 'A handpicked collection of 6 foundation spices essential for daily dal, sabzi, curry, and tadka. Ground fresh in micro-batches with zero fillers.',
    badge: 'BEST VALUE',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    mrp: 1049,
    price: 799,
    discountPercentage: 24,
    savings: 250,
    rating: 4.9,
    reviewCount: 342,
    itemsIncluded: [
      { name: 'Salem Lakadong Turmeric Powder', weight: '200g', description: 'High curcumin (5.8%) golden turmeric' },
      { name: 'Kashmiri Lal Mirch Powder', weight: '200g', description: 'Vibrant ruby red with gentle warmth' },
      { name: 'Ramganj Coriander Powder', weight: '200g', description: 'Cold-milled aromatic dhaniya powder' },
      { name: 'Unjha Cumin Seeds (Jeera)', weight: '200g', description: 'High-essential-oil fragrant cumin' },
      { name: 'Shahi Garam Masala', weight: '100g', description: '16-whole-spice slow-roasted royal blend' },
      { name: 'Kasuri Methi', weight: '50g', description: 'Sun-dried Nagauri fenugreek leaves' }
    ],
    itemCount: 6,
    features: [
      '100% Pure, Zero Preservatives or Additives',
      'Cold-milled to preserve volatile essential oils',
      'Air-tight tin canisters included for long freshness',
      'Saves ₹250 compared to individual packs'
    ],
    bestFor: 'Daily home cooking, new homes, first-time spice kitchen setup',
    tags: ['Daily Essentials', 'Starter Box', 'Bestseller', 'Kitchen Combo'],
    isFeatured: true
  },
  {
    id: 'combo-7-essential-spices',
    slug: '7-essential-spices-combo',
    title: '7 Essential Spices Combo',
    tagline: 'Authentic Indian Masala Dabba Refill Kit',
    description: 'Specially measured and packaged to fill traditional Indian spice boxes (Masala Dabba). Premium quality seeds and freshly ground staples.',
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80',
    mrp: 1299,
    price: 949,
    discountPercentage: 27,
    savings: 350,
    rating: 4.85,
    reviewCount: 218,
    itemsIncluded: [
      { name: 'Premium Cumin Seeds', weight: '200g' },
      { name: 'Brown Mustard Seeds (Rai)', weight: '200g' },
      { name: 'Lakadong Turmeric Powder', weight: '200g' },
      { name: 'Kashmiri Chilli Powder', weight: '200g' },
      { name: 'Aromatic Coriander Powder', weight: '200g' },
      { name: 'Royal Garam Masala', weight: '100g' },
      { name: 'Fenugreek Seeds (Methi Dana)', weight: '150g' }
    ],
    itemCount: 7,
    features: [
      'Fits standard 7-compartment Indian spice boxes',
      'Triple-cleaned whole spices with zero debris',
      'Resealable moisture-proof zip pouches'
    ],
    bestFor: 'Refilling your Indian spice box, housewarming gifts',
    tags: ['Masala Dabba', 'Whole Spices', 'Kitchen Box'],
    isFeatured: true
  },
  {
    id: 'combo-rajasthani-collection',
    slug: 'rajasthani-spice-collection',
    title: 'Rajasthani Heritage Spice Collection',
    tagline: 'Bold, Fiery, Sun-Drenched Flavours of the Royal Desert',
    description: 'Experience authentic royal Marwari cooking with authentic Mathania chillies, Dal Baati Churma blend, spicy Laal Maas masala, and Nagauri Kasuri Methi.',
    badge: 'REGIONAL SPECIAL',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&auto=format&fit=crop&q=80',
    mrp: 1399,
    price: 1099,
    discountPercentage: 21,
    savings: 300,
    rating: 4.92,
    reviewCount: 184,
    itemsIncluded: [
      { name: 'Mathania Whole Red Chillies', weight: '150g', description: 'GI-tagged fiery Rajasthani chillies' },
      { name: 'Royal Rajasthani Laal Maas Masala', weight: '150g', description: 'Smoky, fiery Rajput royal recipe' },
      { name: 'Traditional Dal Baati Churma Masala', weight: '150g', description: 'Rich roasted hing & jeera aroma' },
      { name: 'Nagaur Premium Kasuri Methi', weight: '100g', description: 'Intensely fragrant broad-leaf methi' },
      { name: 'Rajasthani Kadhi Masala', weight: '100g', description: 'Tangy blend with dried fenugreek & mustard' }
    ],
    itemCount: 5,
    features: [
      'Authentic GI Mathania Mirch sourced from Jodhpur',
      'Traditional stone-ground recipes passed down generations',
      'Free printed authentic Rajasthani recipe booklet included'
    ],
    bestFor: 'Laal Maas, Dal Baati Churma, Gatte ki Sabzi, Ker Sangri',
    tags: ['Rajasthani', 'Heritage', 'Regional', 'Spicy'],
    isFeatured: true
  },
  {
    id: 'combo-royal-biryani',
    slug: 'royal-biryani-collection',
    title: 'Royal Biryani Master Collection',
    tagline: 'Mughlai & Hyderabadi Whole Aromatics & Secret Masalas',
    description: 'Everything you need to craft dum biryanis with heavenly aroma. Includes Idukki green cardamom, Kashmiri saffron, wild mace, star anise, and Shahi Biryani Potli.',
    badge: 'GOURMET',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    mrp: 1699,
    price: 1299,
    discountPercentage: 24,
    savings: 400,
    rating: 4.95,
    reviewCount: 420,
    itemsIncluded: [
      { name: 'Shahi Dum Biryani Masala', weight: '150g', description: 'Slow-roasted royal Nizami blend' },
      { name: 'Premium Idukki Green Cardamom 8mm+', weight: '50g', description: 'Jumbo fragrant cardamom pods' },
      { name: 'Kashmiri Mongra Saffron (Kesar)', weight: '1g', description: 'Grade A1 pure red stigmas' },
      { name: 'Kerala Cinnamon & Wild Star Anise', weight: '100g', description: 'Single-estate whole aromatics' },
      { name: 'Royal Biryani Potli Whole Spice Mix', weight: '100g', description: 'For boiling fragrant basmati rice' }
    ],
    itemCount: 5,
    features: [
      'Pure Kashmiri Mongra Saffron included',
      'Export-grade whole spices with explosive bouquet',
      'Step-by-step master chef Dum Biryani guide inside'
    ],
    bestFor: 'Hyderabadi Dum Biryani, Awadhi Biryani, Yakhni Pulao',
    tags: ['Biryani', 'Royal', 'Saffron', 'Cardamom', 'Gourmet'],
    isFeatured: true
  },
  {
    id: 'combo-indian-curry-starter',
    slug: 'indian-curry-starter-box',
    title: 'Indian Curry Starter Box',
    tagline: 'Master Any Indian Restaurant Style Curry at Home',
    description: 'Curated for cooking Butter Chicken, Paneer Tikka Masala, Chole, Rajma, and rich Indian gravy dishes. Comes with restaurant-grade spice blends.',
    badge: 'CURRY LOVER',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    mrp: 1199,
    price: 899,
    discountPercentage: 25,
    savings: 300,
    rating: 4.88,
    reviewCount: 265,
    itemsIncluded: [
      { name: 'Butter Chicken Masala', weight: '100g' },
      { name: 'Paneer Tikka Masala', weight: '100g' },
      { name: 'Amritsari Chole Masala', weight: '100g' },
      { name: 'Punjabi Rajma Masala', weight: '100g' },
      { name: 'Tandoori Barbecue Rub', weight: '100g' },
      { name: 'Kasuri Methi', weight: '50g' }
    ],
    itemCount: 6,
    features: [
      'Restaurant-style depth of flavour without MSG or colourants',
      'Pre-blended ratios for quick 30-minute meals',
      'Vegetarian and Non-vegetarian friendly'
    ],
    bestFor: 'Curries, gravies, tikkas, weekend dinners',
    tags: ['Curry', 'Restaurant Style', 'Butter Chicken', 'Chole']
  },
  {
    id: 'combo-complete-kitchen-box',
    slug: 'complete-indian-kitchen-box',
    title: 'Complete Indian Kitchen Box (12 Pack)',
    tagline: 'The Ultimate Grand Pantry Transformation',
    description: 'A comprehensive 12-spice master collection spanning whole spices, stone-ground essentials, and signature masalas. The definitive spice gift.',
    badge: 'ULTIMATE',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    mrp: 2499,
    price: 1899,
    discountPercentage: 24,
    savings: 600,
    rating: 4.97,
    reviewCount: 512,
    itemsIncluded: [
      { name: 'Lakadong Turmeric Powder', weight: '200g' },
      { name: 'Kashmiri Chilli Powder', weight: '200g' },
      { name: 'Coriander Powder', weight: '200g' },
      { name: 'Unjha Cumin Seeds', weight: '200g' },
      { name: 'Mustard Seeds', weight: '200g' },
      { name: 'Green Cardamom (8mm)', weight: '50g' },
      { name: 'Malabar Black Pepper', weight: '100g' },
      { name: 'Cloves (Laung)', weight: '50g' },
      { name: 'Shahi Garam Masala', weight: '100g' },
      { name: 'Pav Bhaji Masala', weight: '100g' },
      { name: 'Chaat Masala', weight: '100g' },
      { name: 'Kasuri Methi', weight: '50g' }
    ],
    itemCount: 12,
    features: [
      '12 premium spices covering 95% of all Indian dishes',
      'Includes stainless steel measuring spoon set',
      'Packed in eco-friendly luxury gift crate'
    ],
    bestFor: 'Bridal gifts, luxury housewarming, overseas kitchen setup',
    tags: ['Mega Box', 'Pantry', 'Luxury Gift', 'Complete Collection'],
    isFeatured: true
  },
  {
    id: 'combo-festive-gift-box',
    slug: 'festive-spice-gift-box',
    title: 'Festive Royal Spice Gift Box',
    tagline: 'Hand-crafted Luxury Wooden Box with 6 Grand Reserve Spices',
    description: 'A regal gift featuring the pinnacle of Indian spice heritage: GI Kashmiri Saffron, GI Wayanad Cardamom, Malabar Tellicherry Garbled Extra Bold Pepper, and Royal Saffron Garam Masala in gold-embossed glass jars.',
    badge: 'LUXURY GIFT',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80',
    mrp: 2999,
    price: 2399,
    discountPercentage: 20,
    savings: 600,
    rating: 4.98,
    reviewCount: 156,
    itemsIncluded: [
      { name: 'Grade A1 Kashmiri Mongra Saffron', weight: '2g' },
      { name: 'Wayanad Jumbo Green Cardamom (8.5mm+)', weight: '100g' },
      { name: 'Tellicherry Garbled Extra Bold Black Pepper', weight: '150g' },
      { name: 'Sri Lankan True Ceylon Cinnamon Quills', weight: '100g' },
      { name: 'Zanzibar Extra Bold Cloves', weight: '100g' },
      { name: 'Royal Saffron Shahi Garam Masala', weight: '100g' }
    ],
    itemCount: 6,
    features: [
      'Handcrafted seasoned teak-finish wooden presentation box',
      'Gold foil embossed UV-protected glass apothecary jars',
      'Includes brass spice spoon and certificate of authenticity'
    ],
    bestFor: 'Diwali, corporate VIP gifting, weddings, luxury celebrations',
    tags: ['Gift Box', 'Luxury', 'Festive', 'Corporate']
  }
];

export function getComboBySlug(slug: string): ComboPack | undefined {
  return staticCombos.find(c => c.slug === slug || c.id === slug);
}
