import type { Metadata } from 'next';

export interface BaseSEOPublicProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

const DEFAULT_TITLE = 'AAXOL | Authentic Handcrafted Indian Spices & Masalas';
const DEFAULT_DESCRIPTION = 'Discover authentic, single-origin, hand-pounded Indian spices, artisanal masalas, and pure seasonings delivered fresh to your doorstep.';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aaxol.com';

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image = '/images/og-default.jpg',
  url = SITE_URL,
  type = 'website',
}: BaseSEOPublicProps = {}): Metadata {
  const fullTitle = title ? `${title} | AAXOL` : DEFAULT_TITLE;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'AAXOL',
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
      description,
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
      name: product.brand || 'AAXOL',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'AAXOL',
      },
    },
  };
}
