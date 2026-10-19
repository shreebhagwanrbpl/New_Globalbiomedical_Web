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
    name: 'Dr. R. K. Choudhary (MD Pathologist)',
    city: 'Nagaur, Rajasthan',
    rating: 5,
    title: 'Outstanding Hematology Analyzer & Prompt Service in Nagaur',
    comment: 'We installed the HB-3000 Plus 3-Part Hematology Analyzer at our diagnostic centre in Nagaur near JLN Hospital. The CBC cell separation and platelet counts match our reference laboratory results consistently. The Human Biomedical biomedical engineer came personally to Nagaur for unboxing, calibration, and staff training. Highly recommended for every lab in Nagaur district!',
    purchasedProduct: 'HB-3000 Plus 3-Part Automated Hematology Analyzer',
    productSlug: 'hb-3000-plus-3-part-hematology-analyzer',
    date: '14 September 2026',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Dr. Sunita Sharma (Chief Biochemist)',
    city: 'Mansarovar, Jaipur',
    rating: 5,
    title: 'Excellent Linearity in LFT & KFT Reagents',
    comment: 'We have been using Human Biomedical liquid-stable LFT and KFT reagent packs on our automated chemistry analyzer. Reagent blank is low, linearity is exceptional, and on-board stability exceeds 60 days. Being based on 200 Feet Bypass Road in Jaipur, their delivery is fast within 2 hours whenever urgent stock is needed.',
    purchasedProduct: 'Liver Function Test (LFT) Liquid Stable Reagents Combo Kit',
    productSlug: 'liver-function-test-lft-liquid-stable-reagents-combo-kit',
    date: '08 September 2026',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Dr. Mahendra Singh Gehlot',
    city: 'Shastri Nagar, Jodhpur',
    rating: 5,
    title: 'Complete Turnkey Lab Setup Completed in 48 Hours',
    comment: 'When setting up our new polyclinic diagnostic branch in Jodhpur, Human Biomedical LLP handled the entire instrument package — Hematology, Biochemistry, Trinocular Microscope, and Digital Centrifuge. The instruments are robust, easy for lab technicians to operate, and NABL documentation was provided seamlessly.',
    purchasedProduct: 'Complete Pathology Lab Setup Bundle',
    productSlug: 'complete-pathology-lab-setup-bundle',
    date: '02 September 2026',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Pawan Kumar Sharma (Lab Director)',
    city: 'Didwana, Rajasthan',
    rating: 5,
    title: 'Best Diluent and Lyse Supply across Didwana & Nagaur',
    comment: 'Finding uninterrupted supply of high-grade particle-free CBC diluent in Didwana used to be a headache. Human Biomedical delivers directly from Jaipur to our lab within 24 hours. The Lyse is 100% cyanide-free and safe for lab staff.',
    purchasedProduct: 'Universal CBC Reagents Pack — Diluent & Lyse',
    productSlug: 'universal-cbc-hematology-reagents-diluent-lyse-pack',
    date: '28 August 2026',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Dr. Vivek Mittal (Medical Superintendent)',
    city: 'Kota, Rajasthan',
    rating: 5,
    title: 'Reliable ICU Patient Monitors & Swift Technical Support',
    comment: 'We procured 6 units of the HB-Mon 12 Multi-Para Patient Monitors for our intensive care unit in Kota. The SpO2 tracking under low perfusion is very responsive, and the 4-hour battery backup is indispensable during hospital emergency transfers.',
    purchasedProduct: 'HB-Mon 12-Inch Multi-Para Patient Monitor',
    productSlug: 'hb-mon-12-multipara-patient-monitor-hospital-icu',
    date: '22 August 2026',
    verified: true,
  },
  {
    id: 'rev-6',
    name: 'Dr. Arvind Meena (Pathology Head)',
    city: 'Bikaner, Rajasthan',
    rating: 5,
    title: 'HB-Scope 4000 Trinocular Optics are Top-Tier',
    comment: 'The infinity plan achromatic optics on the HB-Scope 4000 microscope provide crystal-clear edge sharpness for blood smear morphology and bone marrow slide reporting. The warm Kohler LED doesn’t heat the slides even after 8 hours of continuous microscopy.',
    purchasedProduct: 'HB-Scope 4000 Trinocular LED Laboratory Microscope',
    productSlug: 'hb-scope-4000-trinocular-led-laboratory-microscope',
    date: '17 August 2026',
    verified: true,
  },
];
