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
      title: '100% Pure & Authentic',
      description: 'Zero artificial fillers, colors, or preservatives',
    },
    {
      icon: 'Sparkles',
      title: 'Stone Ground Fresh',
      description: 'Slow-ground to preserve natural essential oils',
    },
    {
      icon: 'Truck',
      title: 'Direct Farm Sourced',
      description: 'From certified spice plantations across India',
    },
    {
      icon: 'Award',
      title: 'FSSAI Certified',
      description: 'Rigorous 24-parameter laboratory tested purity',
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
