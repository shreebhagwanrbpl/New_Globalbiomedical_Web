import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ALL_DISTRICTS, getDistrictBySlug } from '@/data/rajasthanDistricts';
import { DistrictPageView } from '@/components/districts/DistrictPageView';
import { constructMetadata } from '@/utils/seo';

interface DistrictPageProps {
  params: {
    district: string;
  };
}

export const dynamicParams = true;

export function generateStaticParams() {
  return ALL_DISTRICTS.slice(0, 80).map((district) => ({
    district: district.slug,
  }));
}

export function generateMetadata({ params }: DistrictPageProps): Metadata {
  const district = getDistrictBySlug(params.district);
  if (!district) {
    return {
      title: 'District Not Found | Human Biomedical LLP',
    };
  }

  return constructMetadata({
    title: `${district.seoTitle}`,
    description: district.seoDescription,
    url: `https://humanbiomedical.in/rajasthan/${district.slug}`,
    keywords: district.seoKeywords,
    district: district,
  });
}

export default function DistrictLandingPage({ params }: DistrictPageProps) {
  const district = getDistrictBySlug(params.district);

  if (!district) {
    notFound();
  }

  return <DistrictPageView district={district} />;
}
