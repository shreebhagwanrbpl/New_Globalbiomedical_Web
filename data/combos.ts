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
  shortDescription?: string;
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
    id: 'combo-complete-pathology-lab',
    slug: 'complete-pathology-lab-setup-bundle',
    title: 'Complete Pathology Lab Setup Bundle',
    tagline: 'End-to-End Diagnostic Instrumentation Package for New Labs',
    description: 'An all-inclusive turnkey equipment package tailored for establishing a modern clinical pathology laboratory in Rajasthan. Includes automated 3-Part Hematology Analyzer, Semi-Auto Biochemistry Analyzer, Trinocular LED Microscope, Digital Centrifuge, Pipette Set, and Starter Reagents. Comes with on-site biomedical installation and NABL documentation support.',
    badge: 'TURNKEY SETUP',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1000&auto=format&fit=crop&q=80',
    mrp: 385000,
    price: 295000,
    discountPercentage: 23,
    savings: 90000,
    rating: 4.9,
    reviewCount: 38,
    itemsIncluded: [
      { name: 'HB-3000 Plus 3-Part Auto Hematology Analyzer', weight: '1 Unit', description: '60 Samples/Hr with 21 parameters + touchscreen' },
      { name: 'HB-ChemTouch Semi-Auto Biochemistry Analyzer', weight: '1 Unit', description: 'Quartz flow cell with 7 filters and Peltier heating' },
      { name: 'HB-Scope 4000 Trinocular LED Microscope', weight: '1 Unit', description: 'Plan achromatic optics 40x-1000x with camera port' },
      { name: 'HB-Spin 6000 Digital Centrifuge (8x15ml)', weight: '1 Unit', description: 'Brushless DC motor up to 6000 RPM with timer' },
      { name: 'HB-Pipette Pro Autoclavable Set (3 Pipettes + Stand)', weight: '1 Set', description: '0.5-10µL, 10-100µL, 100-1000µL with calibration cert' },
      { name: 'Comprehensive Starter Reagent Pack (CBC + LFT + KFT)', weight: 'Full Kit', description: '500+ tests reagent capacity included' },
    ],
    itemCount: 6,
    features: [
      'Zero Hassle Turnkey Setup with Free Delivery across all Rajasthan districts',
      'Dedicated On-Site Biomedical Engineer for Installation & Staff Training',
      '1-Year Comprehensive Warranty on all instruments with local Rajasthan support',
      'Saves ₹90,000 compared to individual equipment purchases',
    ],
    bestFor: 'New Diagnostic Pathology Labs, Hospital Labs & Polyclinics',
    tags: ['pathology lab setup', 'lab package rajasthan', 'hematology biochemistry combo', 'turnkey diagnostic lab'],
    isFeatured: true,
  },
  {
    id: 'combo-hematology-biochem-duo',
    title: 'Hematology & Biochemistry Duo Starter Combo',
    slug: 'hematology-biochemistry-duo-starter-combo',
    shortDescription: 'Core Routine Diagnostics: 3-Part Cell Counter + Semi-Auto Chemistry Analyzer',
    tagline: 'The Foundation of Every Routine Diagnostic Health Centre',
    description: 'A focused equipment duo combining high-speed automated CBC testing and clinical chemistry analysis. Covers over 90% of routine diagnostic test volume including Complete Blood Count, Liver Function, Renal Function, Lipid Profile, and Blood Sugar.',
    badge: 'MOST POPULAR',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    mrp: 345000,
    price: 265000,
    discountPercentage: 23,
    savings: 80000,
    rating: 4.9,
    reviewCount: 46,
    itemsIncluded: [
      { name: 'HB-3000 Plus 3-Part Hematology Analyzer', weight: '1 Unit', description: '21 parameters + 3 histograms, low reagent consumption' },
      { name: 'HB-ChemTouch Semi-Auto Clinical Chemistry', weight: '1 Unit', description: '7 filters, internal thermal printer, 70+ programs' },
      { name: 'CBC Starter Reagents (Diluent 20L + Lyse 500ml)', weight: '1 Pack', description: 'Particle-free high-precision hematology reagents' },
      { name: 'LFT & KFT Liquid Stable Reagents Kit', weight: '2 Kits', description: 'SGOT, SGPT, Bilirubin, Urea, Creatinine reagents' },
    ],
    itemCount: 4,
    features: [
      'Immediate capability to process 150+ patient samples daily',
      'Low cost per test with open-system reagent flexibility',
      'Free Rajasthan-wide delivery & 12 months on-site warranty',
      'Free 1KVA Online UPS battery backup included',
    ],
    bestFor: 'Diagnostic Clinics, Nursing Homes & Satellite Laboratories',
    tags: ['hematology and biochemistry', 'cbc machine combo', 'nagaur lab equipment', 'jaipur diagnostics'],
    isFeatured: true,
  },
  {
    id: 'combo-clinic-poct-rapid-setup',
    title: 'Primary Health Clinic Rapid Testing Package',
    slug: 'primary-health-clinic-rapid-testing-package',
    tagline: 'Fast Point-of-Care Diagnostic Solutions for Clinics & Daycares',
    description: 'Designed for primary health centers, urgent care clinics, and day-care hospitals needing immediate diagnostic answers. Features automated urine strip reader, digital centrifuge, and extensive rapid diagnostic cards for infectious diseases and cardiac markers.',
    badge: 'RAPID CARE',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=1000&auto=format&fit=crop&q=80',
    mrp: 65000,
    price: 48500,
    discountPercentage: 25,
    savings: 16500,
    rating: 4.8,
    reviewCount: 29,
    itemsIncluded: [
      { name: 'HB-UroScan 11-Parameter Automated Urine Analyzer', weight: '1 Unit', description: '120 tests/hour with thermal printer' },
      { name: 'HB-Spin 6000 Clinical Centrifuge (8x15ml)', weight: '1 Unit', description: 'Digital timer and brushless DC motor' },
      { name: 'Dengue NS1 + IgG/IgM Combo Rapid Cards', weight: 'Box of 25', description: '15-minute dual differential dengue detection' },
      { name: 'Troponin I Rapid Diagnostic Cassettes', weight: 'Box of 20', description: 'High sensitivity emergency cardiac marker' },
      { name: '11-Parameter Diagnostic Urinalysis Strips', weight: 'Pack of 100', description: 'Cold-light reflection compatible strips' },
      { name: 'K3 EDTA Vacuum Blood Collection Tubes', weight: 'Box of 100', description: 'Sterile lavender top vacutainers' },
    ],
    itemCount: 6,
    features: [
      'Delivers instant test results at patient bedside in under 15 minutes',
      'Compact footprint requiring minimal bench space',
      'Includes all necessary buffers, droppers, and tubes',
      'Immediate same-day dispatch from Jaipur Central Hub',
    ],
    bestFor: 'Primary Health Centers (PHCs), Urgent Care Clinics, Doctors OPD',
    tags: ['clinic diagnostic package', 'rapid test kit bundle', 'poct setup rajasthan'],
    isFeatured: false,
  },
  {
    id: 'combo-icu-critical-care',
    title: 'Hospital ICU Multi-Para & Critical Monitoring Station',
    slug: 'hospital-icu-multipara-critical-monitoring-station',
    tagline: 'Life-Support Patient Monitoring & Infusion Management Duo',
    description: 'High-acuity patient monitoring combo combining our 12.1-inch color Multi-Parameter Patient Monitor with dual programmable syringe and infusion delivery pumps. Essential setup for ICUs, emergency trauma rooms, and post-operative recovery bays.',
    badge: 'ICU STATION',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80',
    mrp: 95000,
    price: 72000,
    discountPercentage: 24,
    savings: 23000,
    rating: 5.0,
    reviewCount: 19,
    itemsIncluded: [
      { name: 'HB-Mon 12-Inch Multi-Para Patient Monitor', weight: '1 Unit', description: 'ECG, SpO2, NIBP, Respiration, Temp with battery' },
      { name: 'Rolling Trolley Stand with Storage Basket', weight: '1 Unit', description: 'Medical grade 360° castor wheels with brakes' },
      { name: 'Adult & Pediatric Dual Cuff & Sensor Pack', weight: '1 Set', description: 'Multi-size NIBP cuffs and reusable SpO2 finger probes' },
      { name: '12-Lead ECG Machine Link Cable & Electrodes', weight: '1 Set', description: 'Diagnostic defibrillation-proof patient cable' },
    ],
    itemCount: 4,
    features: [
      'Continuous 24/7 patient vital signs tracking with arrhythmia alert',
      '4-Hour continuous battery backup during power outages or transport',
      'Heavy-duty mobile rolling trolley included free of charge',
      'Full 1-Year replacement warranty on main monitor unit',
    ],
    bestFor: 'Hospital ICUs, Emergency Departments, Operation Theatres',
    tags: ['icu monitor combo', 'patient monitoring system', 'hospital equipment rajasthan'],
    isFeatured: false,
  },
];

export function getComboBySlug(slug: string): ComboPack | undefined {
  if (!slug) return undefined;
  return staticCombos.find(c => c.slug === slug || c.id === slug);
}
