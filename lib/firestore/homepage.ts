import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { HomepageConfig } from '@/types';

const HOMEPAGE_DOC_ID = 'main_config';
const HOMEPAGE_COLLECTION = 'homepage';

export const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
  heroSlides: [],
  featuredCategories: [],
  featuredProductIds: [],
  featuredRecipeIds: [],
  trustBadges: [
    {
      icon: 'ShieldCheck',
      title: 'ISO 13485:2016 Certified',
      description: 'Manufactured and calibrated to international medical IVD standards',
    },
    {
      icon: 'Award',
      title: 'NABL Traceable Calibration',
      description: 'Every analyzer supplied with certified traceable QC quality report',
    },
    {
      icon: 'Truck',
      title: 'Rajasthan 50-District Delivery',
      description: 'Guaranteed 24-48 hr dispatch from Jaipur Central Hub',
    },
    {
      icon: 'Wrench',
      title: 'On-Site Engineer Installation',
      description: 'Professional setup, optical calibration & lab staff training included',
    },
  ],
  updatedAt: new Date().toISOString(),
};

/**
 * Fetches dynamic homepage configuration
 */
export async function getHomepageConfig(): Promise<HomepageConfig> {
  try {
    const docRef = doc(db, HOMEPAGE_COLLECTION, HOMEPAGE_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return DEFAULT_HOMEPAGE_CONFIG;
    }
    return { ...DEFAULT_HOMEPAGE_CONFIG, ...docSnap.data() };
  } catch (error) {
    console.error('Error fetching homepage config:', error);
    return DEFAULT_HOMEPAGE_CONFIG;
  }
}

/**
 * Updates homepage configuration (Admin)
 */
export async function updateHomepageConfig(config: Partial<HomepageConfig>): Promise<void> {
  const docRef = doc(db, HOMEPAGE_COLLECTION, HOMEPAGE_DOC_ID);
  await setDoc(
    docRef,
    {
      ...config,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
