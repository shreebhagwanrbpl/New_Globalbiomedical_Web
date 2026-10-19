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
import type { Category } from '@/types';

const CATEGORIES_COLLECTION = 'categories';

export function mapDocToCategory(docSnap: DocumentSnapshot): Category {
  const data = docSnap.data();
  if (!data) throw new Error(`Document ${docSnap.id} has no data`);

  return {
    id: docSnap.id,
    name: data.name || '',
    slug: data.slug || '',
    description: data.description || '',
    image: data.image || '',
    icon: data.icon || undefined,
    subcategories: Array.isArray(data.subcategories) ? data.subcategories : [],
    featured: Boolean(data.featured),
    order: Number(data.order) || 0,
    createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt || new Date().toISOString(),
  };
}

/**
 * Fetches all active categories ordered by display priority
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapDocToCategory);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetches a category by its unique URL slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const q = query(collection(db, CATEGORIES_COLLECTION), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    return mapDocToCategory(querySnapshot.docs[0]);
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Creates a category
 */
export async function createCategory(categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), {
    ...categoryData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Updates an existing category
 */
export async function updateCategory(id: string, updates: Partial<Category>): Promise<void> {
  const docRef = doc(db, CATEGORIES_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes a category
 */
export async function deleteCategory(id: string): Promise<void> {
  const docRef = doc(db, CATEGORIES_COLLECTION, id);
  await deleteDoc(docRef);
}
