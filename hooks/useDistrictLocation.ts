'use client';

import { useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { RAJASTHAN_DISTRICTS, HEADQUARTERS_INFO, getDistrictBySlug, DistrictLocation } from '@/data/rajasthanDistricts';

export interface ActiveLocationInfo {
  isDistrictActive: boolean;
  district?: DistrictLocation;
  name: string;
  displayAddress: string;
  landmark: string;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsEmbedUrl: string;
  serviceHubName: string;
  deliveryTimeline: string;
  phone: string;
  email: string;
  headquarters: typeof HEADQUARTERS_INFO;
}

export function useDistrictLocation(): ActiveLocationInfo {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useMemo(() => {
    // 1. Check path e.g. /rajasthan/nagaur or /rajasthan/nagaur/hematology
    let districtSlug: string | null = null;
    if (pathname) {
      const match = pathname.match(/^\/rajasthan\/([a-zA-Z0-9-]+)/);
      if (match && match[1]) {
        districtSlug = match[1];
      }
    }

    // 2. Fallback to query param ?district=nagaur
    if (!districtSlug && searchParams) {
      districtSlug = searchParams.get('district');
    }

    const matchedDistrict = districtSlug ? getDistrictBySlug(districtSlug) : undefined;

    if (matchedDistrict) {
      return {
        isDistrictActive: true,
        district: matchedDistrict,
        name: `Human Biomedical LLP — ${matchedDistrict.name} District Service Hub`,
        displayAddress: matchedDistrict.centralAddress,
        landmark: matchedDistrict.landmark,
        pincode: matchedDistrict.pincode,
        coordinates: matchedDistrict.coordinates,
        googleMapsEmbedUrl: matchedDistrict.googleMapsEmbedUrl,
        serviceHubName: matchedDistrict.serviceHubName,
        deliveryTimeline: matchedDistrict.deliveryTimeline,
        phone: HEADQUARTERS_INFO.phone,
        email: HEADQUARTERS_INFO.email,
        headquarters: HEADQUARTERS_INFO,
      };
    }

    // Default Headquarters in Jaipur
    return {
      isDistrictActive: false,
      name: HEADQUARTERS_INFO.name,
      displayAddress: HEADQUARTERS_INFO.fullAddress,
      landmark: 'on Ajmer-Delhi, 200 Feet Bypass Rd, Tagor Nagar D-Block',
      pincode: HEADQUARTERS_INFO.pincode,
      coordinates: HEADQUARTERS_INFO.coordinates,
      googleMapsEmbedUrl: HEADQUARTERS_INFO.googleMapsEmbedUrl,
      serviceHubName: 'Corporate Headquarters & Central Dispatch Hub',
      deliveryTimeline: 'Same-day express dispatch across all 50 districts of Rajasthan',
      phone: HEADQUARTERS_INFO.phone,
      email: HEADQUARTERS_INFO.email,
      headquarters: HEADQUARTERS_INFO,
    };
  }, [pathname, searchParams]);
}
