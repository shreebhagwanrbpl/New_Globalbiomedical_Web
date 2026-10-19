import { MetadataRoute } from 'next';
import { RAJASTHAN_DISTRICTS, ALL_DISTRICTS } from '@/data/rajasthanDistricts';
import { staticProducts } from '@/data/products';
import { staticCategories } from '@/data/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://humanbiomedical.in';

  // Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rajasthan`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
  ];

  // Category Pages
  const categoryRoutes: MetadataRoute.Sitemap = staticCategories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Product Pages
  const productRoutes: MetadataRoute.Sitemap = staticProducts.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // All Rajasthan & India District Landing Pages
  const districtRoutes: MetadataRoute.Sitemap = ALL_DISTRICTS.map((district) => ({
    url: `${baseUrl}/rajasthan/${district.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: district.slug === 'nagaur' || district.slug === 'jaipur' || district.slug === 'delhi' ? 0.95 : 0.85,
  }));

  // High Intent Category in District Pages (e.g. /rajasthan/nagaur/hematology)
  const districtCategoryRoutes: MetadataRoute.Sitemap = [];
  ALL_DISTRICTS.slice(0, 100).forEach((district) => {
    // Top searched categories per district
    ['hematology', 'biochemistry', 'microscopes-centrifuges'].forEach((catSlug) => {
      districtCategoryRoutes.push({
        url: `${baseUrl}/rajasthan/${district.slug}/${catSlug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: (district.slug === 'nagaur' || district.slug === 'delhi') && catSlug === 'hematology' ? 0.95 : 0.8,
      });
    });
  });

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...districtRoutes,
    ...districtCategoryRoutes,
  ];
}
