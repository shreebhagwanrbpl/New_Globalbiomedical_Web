import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  serverTimestamp,
  type DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { ProductReview } from '@/types';

const REVIEWS_COLLECTION = 'reviews';

export function mapDocToReview(docSnap: DocumentSnapshot): ProductReview {
  const data = docSnap.data();
  if (!data) throw new Error(`Document ${docSnap.id} has no data`);

  return {
    id: docSnap.id,
    productId: data.productId || '',
    userId: data.userId || '',
    userName: data.userName || 'Verified Customer',
    rating: Number(data.rating) || 5,
    title: data.title || undefined,
    comment: data.comment || '',
    images: Array.isArray(data.images) ? data.images : [],
    isVerifiedPurchase: Boolean(data.isVerifiedPurchase),
    isApproved: Boolean(data.isApproved),
    likesCount: Number(data.likesCount) || 0,
    createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt || new Date().toISOString(),
  };
}

/**
 * Fetches approved reviews for a product
 */
export async function getProductReviews(productId: string, maxItems: number = 20): Promise<ProductReview[]> {
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      where('productId', '==', productId),
      where('isApproved', '==', true),
      orderBy('createdAt', 'desc'),
      limit(maxItems)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapDocToReview);
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return [];
  }
}

/**
 * Submits a new customer review (pending approval by default)
 */
export async function submitProductReview(
  reviewData: Omit<ProductReview, 'id' | 'isApproved' | 'likesCount' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), {
    ...reviewData,
    isApproved: true, // or false if moderation is required
    likesCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}
