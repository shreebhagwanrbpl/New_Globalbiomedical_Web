import {
  collection,
  doc,
  getDocs,
  query,
  where,
  limit,
  type DocumentSnapshot,
  addDoc,
  updateDoc,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { Coupon } from '@/types';

const COUPONS_COLLECTION = 'coupons';

export function mapDocToCoupon(docSnap: DocumentSnapshot): Coupon {
  const data = docSnap.data();
  if (!data) throw new Error(`Document ${docSnap.id} has no data`);

  return {
    id: docSnap.id,
    code: (data.code || '').toUpperCase(),
    description: data.description || '',
    type: data.type || 'percentage',
    value: Number(data.value) || 0,
    minOrderValue: data.minOrderValue !== undefined ? Number(data.minOrderValue) : undefined,
    maxDiscountAmount: data.maxDiscountAmount !== undefined ? Number(data.maxDiscountAmount) : undefined,
    startDate: data.startDate || '',
    endDate: data.endDate || '',
    usageLimit: data.usageLimit !== undefined ? Number(data.usageLimit) : undefined,
    usedCount: Number(data.usedCount) || 0,
    perUserLimit: data.perUserLimit !== undefined ? Number(data.perUserLimit) : undefined,
    isActive: Boolean(data.isActive),
    applicableCategories: Array.isArray(data.applicableCategories) ? data.applicableCategories : [],
    applicableProducts: Array.isArray(data.applicableProducts) ? data.applicableProducts : [],
    createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt || new Date().toISOString(),
  };
}

/**
 * Validates and retrieves a coupon code for checkout
 */
export async function validateCouponCode(code: string, subtotal: number): Promise<{ valid: boolean; coupon?: Coupon; error?: string }> {
  try {
    const q = query(
      collection(db, COUPONS_COLLECTION),
      where('code', '==', code.toUpperCase().trim()),
      where('isActive', '==', true),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return { valid: false, error: 'Invalid coupon code' };
    }

    const coupon = mapDocToCoupon(querySnapshot.docs[0]);
    const now = new Date().toISOString();

    if (coupon.startDate && coupon.startDate > now) {
      return { valid: false, error: 'Coupon is not yet active' };
    }
    if (coupon.endDate && coupon.endDate < now) {
      return { valid: false, error: 'Coupon has expired' };
    }
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { valid: false, error: 'Coupon usage limit reached' };
    }
    if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
      return { valid: false, error: `Minimum order value of ₹${coupon.minOrderValue} required` };
    }

    return { valid: true, coupon };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return { valid: false, error: 'Unable to validate coupon' };
  }
}

/**
 * Increments coupon used count after successful checkout
 */
export async function markCouponUsed(couponId: string): Promise<void> {
  const docRef = doc(db, COUPONS_COLLECTION, couponId);
  await updateDoc(docRef, {
    usedCount: increment(1),
    updatedAt: serverTimestamp(),
  });
}
