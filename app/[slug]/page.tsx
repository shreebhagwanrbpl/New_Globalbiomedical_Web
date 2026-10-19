import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  ALL_DISTRICTS,
  ALL_STATES_META,
  getDistrictBySlug,
  getStateBySlug,
} from '@/data/rajasthanDistricts';
import { DistrictPageView } from '@/components/districts/DistrictPageView';
import { StatePortalView } from '@/components/districts/StatePortalView';
import { constructMetadata } from '@/utils/seo';

interface DynamicSlugPageProps {
  params: {
    slug: string;
  };
}

export const dynamicParams = true;

export function generateStaticParams() {
  const stateParams = Object.keys(ALL_STATES_META).map((s) => ({ slug: s }));
  const districtParams = ALL_DISTRICTS.slice(0, 100).map((d) => ({ slug: d.slug }));
  return [...stateParams, ...districtParams];
}

export function generateMetadata({ params }: DynamicSlugPageProps): Metadata {
  const cleanSlug = params.slug?.toLowerCase()?.trim();

  // 1. Check if slug is a State
  const state = getStateBySlug(cleanSlug);
  if (state) {
    return constructMetadata({
      title: `Biomedical Equipment & Diagnostic Reagents in ${state.name} (${state.districtsCount} Districts)`,
      description: `${state.description} Authorized distributor of Hematology Analyzers, Biochemistry Reagents, and clinical laboratory equipment across all ${state.districtsCount} districts of ${state.name}. Daily dispatch from Jaipur HQ.`,
      url: `https://humanbiomedical.in/${state.slug}`,
      keywords: [
        `biomedical equipment ${state.name}`,
        `hematology analyzer ${state.name}`,
        `cbc reagent supplier ${state.name}`,
        `pathology machines ${state.capital}`,
        `diagnostic laboratory supply ${state.name}`,
      ],
    });
  }

  // 2. Check if slug is a District
  const district = getDistrictBySlug(cleanSlug);
  if (district) {
    return constructMetadata({
      title: district.seoTitle,
      description: district.seoDescription,
      url: `https://humanbiomedical.in/${district.slug}`,
      keywords: district.seoKeywords,
      district: district,
    });
  }

  return {
    title: 'Diagnostic Page Not Found | Human Biomedical LLP',
  };
}

export default function DynamicSlugPage({ params }: DynamicSlugPageProps) {
  const cleanSlug = params.slug?.toLowerCase()?.trim();

  // 1. Check if slug matches an Indian State (e.g. /bihar, /uttar-pradesh, /maharashtra, /gujarat)
  const state = getStateBySlug(cleanSlug);
  if (state) {
    return <StatePortalView state={state} />;
  }

  // 2. Check if slug matches ANY of the 780+ Indian Districts (e.g. /nagaur, /patna, /lucknow, /pune, /agra)
  const district = getDistrictBySlug(cleanSlug);
  if (district) {
    return <DistrictPageView district={district} />;
  }

  // 3. If neither matches, render 404
  notFound();
}
