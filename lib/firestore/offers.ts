import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  type DocumentSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { Offer, OfferCalculationResult, Product } from '@/types';

const OFFERS_COLLECTION = 'offers';

export function mapDocToOffer(docSnap: DocumentSnapshot): Offer {
  const data = docSnap.data();
  if (!data) throw new Error(`Document ${docSnap.id} has no data`);

  return {
    id: docSnap.id,
    title: data.title || '',
    slug: data.slug || '',
    campaignName: data.campaignName || '',
    discountType: data.discountType || 'percentage',
    discountPercentage: data.discountPercentage !== undefined ? Number(data.discountPercentage) : undefined,
    discountAmount: data.discountAmount !== undefined ? Number(data.discountAmount) : undefined,
    startDate: data.startDate || '',
    endDate: data.endDate || '',
    productsIncluded: Array.isArray(data.productsIncluded) ? data.productsIncluded : [],
    categoriesIncluded: Array.isArray(data.categoriesIncluded) ? data.categoriesIncluded : [],
    badge: data.badge || 'OFFER',
    isActive: Boolean(data.isActive),
    description: data.description || undefined,
    bannerImage: data.bannerImage || undefined,
    termsAndConditions: Array.isArray(data.termsAndConditions) ? data.termsAndConditions : [],
    priority: Number(data.priority) || 0,
    createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt || new Date().toISOString(),
  };
}

/**
 * Fetches all currently active offers that fall within valid date ranges.
 */
export async function getActiveOffers(): Promise<Offer[]> {
  try {
    const q = query(
      collection(db, OFFERS_COLLECTION),
      where('isActive', '==', true),
      orderBy('priority', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const now = new Date().toISOString();

    return querySnapshot.docs
      .map(mapDocToOffer)
      .filter((offer) => {
        // Date range validity check
        if (offer.startDate && offer.startDate > now) return false;
        if (offer.endDate && offer.endDate < now) return false;
        return true;
      });
  } catch (error) {
    console.error('Error fetching active offers:', error);
    return [];
  }
}

/**
 * Fetches an offer by slug
 */
export async function getOfferBySlug(slug: string): Promise<Offer | null> {
  try {
    const q = query(collection(db, OFFERS_COLLECTION), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    return mapDocToOffer(querySnapshot.docs[0]);
  } catch (error) {
    console.error(`Error fetching offer by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Evaluates whether an active campaign applies to a given product and calculates dynamic pricing.
 */
export function calculateProductOffer(product: Product, activeOffers: Offer[]): OfferCalculationResult {
  const originalPrice = product.mrp || product.price;

  // Find the highest priority active offer applicable to this product or its category
  const matchingOffer = activeOffers.find((offer) => {
    const matchesProduct = offer.productsIncluded.includes(product.id);
    const matchesCategory = offer.categoriesIncluded.includes(product.category);
    return matchesProduct || matchesCategory;
  });

  if (!matchingOffer) {
    // If no campaign offer, check if product has an individual sale price
    if (product.salePrice && product.salePrice < product.mrp) {
      const discountPct = product.discountPercentage || Math.round(((product.mrp - product.salePrice) / product.mrp) * 100);
      return {
        hasOffer: true,
        originalPrice: product.mrp,
        discountedPrice: product.salePrice,
        savings: product.mrp - product.salePrice,
        discountPercentage: discountPct,
        appliedOffer: product.offerBadge
          ? {
              id: 'direct-discount',
              title: product.offerTitle || `${discountPct}% OFF`,
              badge: product.offerBadge,
              campaignName: 'Direct Discount',
            }
          : undefined,
      };
    }

    return {
      hasOffer: false,
      originalPrice,
      discountedPrice: product.price,
      savings: 0,
      discountPercentage: 0,
    };
  }

  let discountedPrice = originalPrice;

  if (matchingOffer.discountType === 'percentage' && matchingOffer.discountPercentage) {
    const discount = (originalPrice * matchingOffer.discountPercentage) / 100;
    discountedPrice = Math.round(originalPrice - discount);
  } else if (matchingOffer.discountType === 'fixed_amount' && matchingOffer.discountAmount) {
    discountedPrice = Math.max(0, originalPrice - matchingOffer.discountAmount);
  }

  const savings = originalPrice - discountedPrice;
  const discountPercentage = Math.round((savings / originalPrice) * 100);

  return {
    hasOffer: true,
    originalPrice,
    discountedPrice,
    savings,
    discountPercentage,
    appliedOffer: {
      id: matchingOffer.id,
      title: matchingOffer.title,
      badge: matchingOffer.badge,
      campaignName: matchingOffer.campaignName,
    },
  };
}

/**
 * Creates a new promotional offer / campaign
 */
export async function createOffer(offerData: Omit<Offer, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, OFFERS_COLLECTION), {
    ...offerData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Updates an offer / activates / deactivates
 */
export async function updateOffer(id: string, updates: Partial<Offer>): Promise<void> {
  const docRef = doc(db, OFFERS_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes an offer
 */
export async function deleteOffer(id: string): Promise<void> {
  const docRef = doc(db, OFFERS_COLLECTION, id);
  await deleteDoc(docRef);
}
