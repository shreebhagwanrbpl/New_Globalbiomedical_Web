export interface CustomerTestimonial {
  id: string;
  name: string;
  city: string;
  avatar?: string;
  rating: number;
  title: string;
  comment: string;
  purchasedProduct: string;
  productSlug?: string;
  date: string;
  verified: boolean;
}

export const staticCustomerReviews: CustomerTestimonial[] = [
  {
    id: 'rev-1',
    name: 'Meera Rajput',
    city: 'Jaipur, Rajasthan',
    rating: 5,
    title: 'The Mathania Mirch & Dal Baati Masala are incomparable',
    comment: 'Being from Jaipur, we are very particular about our spices. The Mathania chilli powder and Dal Baati Masala are truly authentic — rich aroma, clean red hue without artificial dyes, and that distinct smoky Rajputana flavour.',
    purchasedProduct: 'Rajasthani Heritage Spice Collection',
    productSlug: 'rajasthani-spice-collection',
    date: '14 September 2026',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Ananya Sharma',
    city: 'South Delhi, Delhi',
    rating: 5,
    title: 'You can smell the freshness the moment you unseal the jar',
    comment: 'The Shahi Garam Masala and Kashmiri Saffron transformed my Sunday Biryani. The aroma filled the entire apartment. You can tell they cold-mill in small batches rather than industrial bulk processing.',
    purchasedProduct: 'Royal Biryani Master Collection',
    productSlug: 'royal-biryani-collection',
    date: '08 September 2026',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Vikram Merchant',
    city: 'Bandra West, Mumbai',
    rating: 5,
    title: 'High curcumin Lakadong Turmeric is the real deal',
    comment: 'I take golden milk daily and tried over 6 organic brands before this. The deep golden colour and warmth of this Lakadong turmeric is distinctly superior. The airtight glass canisters keep everything crisp.',
    purchasedProduct: 'High-Curcumin Lakadong Turmeric',
    productSlug: 'lakadong-turmeric-powder',
    date: '02 September 2026',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Nilesh Patel',
    city: 'Ahmedabad, Gujarat',
    rating: 5,
    title: 'Best Cumin and Coriander seeds we have used',
    comment: 'The Unjha Cumin seeds are plump with high essential oils, crackling with intense fragrance in tadka. The packaging is premium and delivery to Ahmedabad was completed in just 48 hours.',
    purchasedProduct: 'Everyday Kitchen Spice Box',
    productSlug: 'everyday-kitchen-spice-box',
    date: '28 August 2026',
    verified: true
  },
  {
    id: 'rev-5',
    name: 'Pooja Raghavan',
    city: 'Indiranagar, Bengaluru',
    rating: 5,
    title: 'Authentic temple-style sambar at last!',
    comment: 'Finding genuine South Indian Sambar masala with roasted lentils, curry leaves, and fenugreek without excess heat has been hard in commercial brands. This blend nails the traditional Udupi home flavour profile.',
    purchasedProduct: 'South Indian Sambar Masala',
    productSlug: 'south-indian-sambar-masala',
    date: '22 August 2026',
    verified: true
  },
  {
    id: 'rev-6',
    name: 'Khurram Hashmi',
    city: 'Banjara Hills, Hyderabad',
    rating: 5,
    title: 'Idukki 8mm Cardamom and Malabar Pepper are export-grade',
    comment: 'The green cardamoms are huge, vibrant green, and bursting with sticky black seeds. As an avid biryani cook, these whole spices have elevated my weekend cooking to another tier.',
    purchasedProduct: 'Idukki Bold Green Cardamom (8mm+)',
    productSlug: 'idukki-green-cardamom-whole',
    date: '17 August 2026',
    verified: true
  }
];
