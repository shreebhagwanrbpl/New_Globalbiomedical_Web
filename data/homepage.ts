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
  tagline: 'HUMAN BIOMEDICAL LLP • 780+ HUBS ACROSS ALL INDIA & RAJASTHAN',
  headline: 'Precision Biomedical Equipment. Diagnostic Reagents. Across All 780+ Districts in India.',
  subheading: 'Authorized provider of 3-Part & 5-Part Automated Hematology Analyzers, Clinical Biochemistry Systems, Medical Microscopes, Centrifuges, and Diagnostic Reagents with same-day dispatch from our Jaipur Central Headquarters across Rajasthan and all 28 Indian States.',
  primaryCta: { text: 'Browse Lab Equipment', href: '/shop' },
  secondaryCta: { text: 'Explore 780+ District Hubs', href: '/rajasthan' },
  heroStats: [
    { value: '780+ Hubs', label: 'All India Districts Covered' },
    { value: '1,500+', label: 'Diagnostic Labs & Hospitals' },
    { value: '24/7', label: 'Biomedical Engineer Support' },
    { value: 'ISO 13485', label: 'Certified Quality Standards' },
  ],
  heroBadges: [
    '🏥 Same-Day Dispatch from Jaipur Central Hub',
    '🔬 On-Site Installation & NABL Calibration',
    '⚡ 24/7 Emergency Engineer Assistance',
  ],
};


export const trustPillars: TrustPillar[] = [
  {
    id: 'pillar-1',
    icon: 'Sparkles',
    title: 'Certified Accuracy',
    subtitle: 'NABL & ISO 13485 Standard',
    description: 'Precision clinical analyzers and reagents validated against international reference calibrators for repeatable diagnostic results.',
  },
  {
    id: 'pillar-2',
    icon: 'Flame',
    title: 'On-Site Installation',
    subtitle: 'Trained Biomedical Engineers',
    description: 'Our factory-trained service engineers provide on-site equipment commissioning, user training, and protocol calibration across all districts.',
  },
  {
    id: 'pillar-3',
    icon: 'ShieldCheck',
    title: 'Comprehensive Warranty',
    subtitle: '1 to 2 Years Warranty & AMC',
    description: 'Direct manufacturer warranty coverage with readily available genuine spare parts and rapid response field service.',
  },
  {
    id: 'pillar-4',
    icon: 'CheckCircle2',
    title: 'Reagent Compatibility',
    subtitle: 'Universal Closed & Open Systems',
    description: 'Reagents optimized for Mindray, Sysmex, Erba, and Human Biomedical counters with zero background interference.',
  },
  {
    id: 'pillar-5',
    icon: 'Package',
    title: 'Cold-Chain Delivery',
    subtitle: 'Validated 2°C – 8°C Packaging',
    description: 'Temperature-monitored cold-chain shipping ensures enzyme and antibody reagents reach your laboratory at peak potency.',
  },
  {
    id: 'pillar-6',
    icon: 'Truck',
    title: 'Pan-India Reach',
    subtitle: '50 Rajasthan Districts + All India',
    description: 'Strategic central warehouse located on Jaipur 200 Feet Bypass with daily express transport links to Nagaur, Jodhpur, Delhi, Ahmedabad, and every district.',
  },
];

export const regionalFlavoursData: RegionalHeritageItem[] = [
  {
    id: 'region-nagaur',
    name: 'Nagaur Hub',
    state: 'Central Rajasthan',
    slug: 'nagaur',
    tagline: 'JLN Hospital Belt & Diagnostic Supply Hub',
    signatureFlavour: 'Hematology • Biochemistry • POCT • Microscopes',
    keySpices: '3-Part Hematology, LFT/KFT Reagents, Vacuum EDTA Tubes, Centrifuges',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&fit=crop&q=80',
    description: 'Supplying clinical diagnostic laboratories, community health centers, and private pathology setups across Nagaur, Merta, Didwana, Kuchaman, and Makrana.',
  },
  {
    id: 'region-jaipur',
    name: 'Jaipur HQ',
    state: 'State Central Headquarters',
    slug: 'jaipur',
    tagline: 'Tagor Nagar, 200 Feet Bypass Road Experience Center',
    signatureFlavour: 'Full Equipment Showcase • Immediate Dispatch',
    keySpices: '5-Part Laser Cell Counters, Auto Biochemistry, CLIA Systems',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80',
    description: 'Central demonstration facility, biomedical engineering training lab, and master cold-chain warehouse dispatching across all Rajasthan districts.',
  },
  {
    id: 'region-delhi',
    name: 'Delhi NCR Hub',
    state: 'National Capital Region',
    slug: 'delhi',
    tagline: 'AIIMS & Safdarjung Medical Corridor Support',
    signatureFlavour: 'Advanced Flow Cytometry • High Throughput Testing',
    keySpices: 'Laser 5-Part Counters, Fully Automated Chemistry Towers',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
    description: 'Serving multi-speciality hospital networks, diagnostic chains, and medical colleges across South Delhi, Gurugram, and Noida.',
  },
  {
    id: 'region-jodhpur',
    name: 'Jodhpur Hub',
    state: 'Marwar Region',
    slug: 'jodhpur',
    tagline: 'AIIMS & MDM Hospital Corridor Support',
    signatureFlavour: 'Cell Counters • Centrifuges • Electrolytes',
    keySpices: 'HB-3000 Plus, HB-Lyte, Clinical Blood Bank Centrifuges',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
    description: 'Dedicated service depot delivering 24-hour turnaround for pathology labs in Jodhpur, Pali, Barmer, and Jalore.',
  },
  {
    id: 'region-ahmedabad',
    name: 'Ahmedabad Hub',
    state: 'Gujarat State',
    slug: 'ahmedabad',
    tagline: 'Civil Hospital & SG Highway Medical Corridor',
    signatureFlavour: 'High-Volume Pathology • Rapid POCT Kits',
    keySpices: 'AutoChem 200, HB-5800 Laser, Troponin I Cards',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    description: 'Serving clinical pathology centers, hospital diagnostics, and research laboratories across Ahmedabad, Gandhinagar, and Surat.',
  },
  {
    id: 'region-kota',
    name: 'Kota Hub',
    state: 'Hadoti Region',
    slug: 'kota',
    tagline: 'Medical College & Hospital Belt Distribution',
    signatureFlavour: 'Routine Diagnostics • Multi-Para Monitors',
    keySpices: 'Semi-Auto Biochemistry, CBC Reagent Packs, ICU Monitors',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    description: 'Fast delivery to private hospitals, nursing homes, and diagnostic laboratories in Kota, Baran, Bundi, and Jhalawar.',
  },
];
