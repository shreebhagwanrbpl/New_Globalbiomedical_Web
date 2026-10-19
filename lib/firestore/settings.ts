import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { StoreSettings } from '@/types';
import { HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';

const SETTINGS_DOC_ID = 'global_settings';
const SETTINGS_COLLECTION = 'settings';

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Human Biomedical LLP',
  tagline: 'Leading In-Vitro Diagnostic Equipment & Clinical Laboratory Supplier across Rajasthan',
  supportEmail: 'sales@humanbiomedical.in',
  supportPhone: '+91 98290 88234',
  address: HEADQUARTERS_INFO.address,
  fssaiNumber: 'CDSCO-MD-RAJ-2026',
  currency: 'INR',
  currencySymbol: '₹',
  freeShippingThreshold: 999,
  standardShippingFee: 0,
  taxRatePercentage: 12,
  maintenanceMode: false,
  socialLinks: {
    instagram: 'https://instagram.com/humanbiomedical',
    facebook: 'https://facebook.com/humanbiomedical',
    youtube: 'https://youtube.com/humanbiomedical',
    whatsapp: 'https://wa.me/919829088234',
  },
};

/**
 * Fetches store configuration settings
 */
export async function getStoreSettings(): Promise<StoreSettings> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...docSnap.data() };
  } catch (error) {
    console.error('Error fetching store settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Updates store configuration settings (Admin)
 */
export async function updateStoreSettings(settings: Partial<StoreSettings>): Promise<void> {
  const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
  await setDoc(
    docRef,
    {
      ...settings,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
