import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { StoreSettings } from '@/types';

const SETTINGS_DOC_ID = 'global_settings';
const SETTINGS_COLLECTION = 'settings';

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Vedic Spices',
  tagline: 'Handcrafted Heritage Indian Spices & Masalas',
  supportEmail: 'care@vedicspices.com',
  supportPhone: '+91 98765 43210',
  address: 'Spice Heritage Estate, Kochi, Kerala, India - 682001',
  fssaiNumber: '10020042000123',
  currency: 'INR',
  currencySymbol: '₹',
  freeShippingThreshold: 499,
  standardShippingFee: 50,
  taxRatePercentage: 5,
  maintenanceMode: false,
  socialLinks: {
    instagram: 'https://instagram.com/vedicspices',
    facebook: 'https://facebook.com/vedicspices',
    youtube: 'https://youtube.com/vedicspices',
    whatsapp: 'https://wa.me/919876543210',
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
