import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  type DocumentSnapshot,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { UserProfile, ShippingAddress } from '@/types';

const USERS_COLLECTION = 'users';

export function mapDocToUserProfile(docSnap: DocumentSnapshot): UserProfile {
  const data = docSnap.data();
  if (!data) throw new Error(`Document ${docSnap.id} has no data`);

  return {
    uid: docSnap.id,
    email: data.email || '',
    displayName: data.displayName || '',
    phoneNumber: data.phoneNumber || undefined,
    photoURL: data.photoURL || undefined,
    role: data.role || 'customer',
    addresses: Array.isArray(data.addresses) ? data.addresses : [],
    wishlist: Array.isArray(data.wishlist) ? data.wishlist : [],
    savedCart: Array.isArray(data.savedCart) ? data.savedCart : [],
    createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt || new Date().toISOString(),
  };
}

/**
 * Fetches user profile from Firestore by user UID
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return mapDocToUserProfile(docSnap);
  } catch (error) {
    console.error(`Error fetching user profile for ${uid}:`, error);
    return null;
  }
}

/**
 * Initializes or updates user profile upon authentication
 */
export async function upsertUserProfile(profile: Partial<UserProfile> & { uid: string; email: string }): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, profile.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      ...profile,
      role: 'customer',
      addresses: [],
      wishlist: [],
      savedCart: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    await updateDoc(docRef, {
      ...profile,
      updatedAt: serverTimestamp(),
    });
  }
}

/**
 * Adds an address to the user's address book
 */
export async function addUserAddress(uid: string, address: ShippingAddress): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, uid);
  const newAddress = {
    ...address,
    id: `addr_${Date.now()}`,
    isDefault: false,
  };
  await updateDoc(docRef, {
    addresses: arrayUnion(newAddress),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Toggles product ID in the user wishlist
 */
export async function toggleWishlistProduct(uid: string, productId: string, isSaved: boolean): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(docRef, {
    wishlist: isSaved ? arrayRemove(productId) : arrayUnion(productId),
    updatedAt: serverTimestamp(),
  });
}
