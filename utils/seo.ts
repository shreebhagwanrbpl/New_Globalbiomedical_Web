import type { Metadata } from 'next';
import { HEADQUARTERS_INFO, DistrictLocation } from '@/data/rajasthanDistricts';

export interface BaseSEOPublicProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  district?: DistrictLocation;
  category?: string;
}

const DEFAULT_TITLE = 'Human Biomedical LLP | Leading Biomedical & Diagnostic Lab Equipment Supplier in Rajasthan';
const DEFAULT_DESCRIPTION = 'Human Biomedical LLP (Jaipur, Rajasthan) is an authorized supplier of Automated Hematology Analyzers, Clinical Biochemistry Systems, Microscopes, Centrifuges & Diagnostic Reagents across all 50 districts of Rajasthan. On-site engineer support and NABL calibration.';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://humanbiomedical.in';

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image = '/images/human-biomedical-logo.png',
  url = SITE_URL,
  type = 'website',
  keywords = [],
  district,
  category,
}: BaseSEOPublicProps = {}): Metadata {
  let fullTitle = title ? `${title} | Human Biomedical LLP` : DEFAULT_TITLE;
  let metaDescription = description;

  if (district && category) {
    const st = district.state || 'Rajasthan';
    fullTitle = `${category} in ${district.name}, ${st} | Human Biomedical LLP`;
    metaDescription = `Authorized supplier of ${category} in ${district.name}, ${st}. Same-day dispatch from Jaipur HQ, on-site engineer installation, NABL calibration, and local support in ${district.name}. Contact Human Biomedical LLP.`;
  } else if (district) {
    const st = district.state || 'Rajasthan';
    fullTitle = `Biomedical & Diagnostic Lab Equipment in ${district.name}, ${st} | Human Biomedical LLP`;
    metaDescription = district.seoDescription;
  }

  const combinedKeywords = [
    'Human Biomedical LLP',
    'biomedical equipment rajasthan',
    'hematology analyzer jaipur',
    'hematology in nagaur',
    'clinical laboratory equipment rajasthan',
    'biochemistry analyzer price',
    'diagnostic reagents supplier',
    'cbc machine rajasthan',
    ...(district ? district.seoKeywords : []),
    ...keywords,
  ];

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: combinedKeywords,
    authors: [{ name: 'Human Biomedical LLP', url: SITE_URL }],
    creator: 'Human Biomedical LLP',
    publisher: 'Human Biomedical LLP',
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url,
      siteName: 'Human Biomedical LLP',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type: type === 'product' ? 'website' : type,
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [image],
    },
    metadataBase: new URL(SITE_URL),
  };
}

/**
 * Generates JSON-LD schema for Products for rich Google Search results
 */
export function generateProductSchema(product: {
  title: string;
  description: string;
  images: string[];
  price: number;
  mrp: number;
  sku: string;
  brand: string;
  slug: string;
  stock: number;
}) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Human Biomedical',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'MedicalOrganization',
        name: 'Human Biomedical LLP',
        telephone: HEADQUARTERS_INFO.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd',
          addressLocality: 'Jaipur',
          addressRegion: 'Rajasthan',
          postalCode: '302021',
          addressCountry: 'IN',
        },
      },
    },
  };
}

/**
 * Generates LocalBusiness / MedicalBusiness JSON-LD schema for Rajasthan district or Head Office
 */
export function generateLocalBusinessSchema(district?: DistrictLocation) {
  if (district) {
    const st = district.state || 'Rajasthan';
    return {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      name: `Human Biomedical LLP — ${district.name} District Service Hub`,
      image: `${SITE_URL}/images/human-biomedical-logo.png`,
      url: `${SITE_URL}/${district.slug}`,
      telephone: HEADQUARTERS_INFO.phone,
      email: HEADQUARTERS_INFO.email,
      priceRange: '₹₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: district.centralAddress,
        addressLocality: district.name,
        addressRegion: st,
        postalCode: district.pincode,
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: district.coordinates.lat,
        longitude: district.coordinates.lng,
      },
      areaServed: [
        {
          '@type': 'AdministrativeArea',
          name: `${district.name} District, ${st}`,
        },
        ...district.coverageAreas.map(area => ({
          '@type': 'Place',
          name: `${area}, ${district.name}`,
        })),
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:30',
        },
      ],
      parentOrganization: {
        '@type': 'MedicalOrganization',
        name: HEADQUARTERS_INFO.name,
        address: HEADQUARTERS_INFO.fullAddress,
      },
    };
  }

  // Official Headquarters in Jaipur
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: HEADQUARTERS_INFO.name,
    image: `${SITE_URL}/images/human-biomedical-logo.png`,
    url: SITE_URL,
    telephone: HEADQUARTERS_INFO.phone,
    email: HEADQUARTERS_INFO.email,
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302021',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: HEADQUARTERS_INFO.coordinates.lat,
      longitude: HEADQUARTERS_INFO.coordinates.lng,
    },
    areaServed: {
      '@type': 'State',
      name: 'Rajasthan, India (All 50 Districts)',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:30',
      },
    ],
  };
}
