import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  type DocumentSnapshot,
  type QueryConstraint,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { Product, ProductFilterParams, PaginationResult } from '@/types';

const PRODUCTS_COLLECTION = 'products';

/**
 * Maps a Firestore document snapshot to a typed Product entity
 */
export function mapDocToProduct(docSnap: DocumentSnapshot): Product {
  const data = docSnap.data();
  if (!data) throw new Error(`Document ${docSnap.id} has no data`);

  return {
    id: docSnap.id,
    title: data.title || '',
    slug: data.slug || '',
    description: data.description || '',
    images: Array.isArray(data.images) ? data.images : [],
    price: Number(data.price) || 0,
    mrp: Number(data.mrp) || 0,
    salePrice: data.salePrice !== undefined ? Number(data.salePrice) : undefined,
    discountPercentage: data.discountPercentage !== undefined ? Number(data.discountPercentage) : undefined,
    category: data.category || '',
    subcategory: data.subcategory || undefined,
    brand: data.brand || 'Vedic Spices',
    sku: data.sku || '',
    stock: Number(data.stock) || 0,
    featured: Boolean(data.featured),
    bestSeller: Boolean(data.bestSeller),
    offerEnabled: Boolean(data.offerEnabled),
    offerTitle: data.offerTitle || undefined,
    offerBadge: data.offerBadge || undefined,
    offerStartDate: data.offerStartDate || null,
    offerEndDate: data.offerEndDate || null,
    ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
    weight: data.weight || data.netQuantity || '100g',
    countryOfOrigin: data.countryOfOrigin || 'India',
    shelfLife: data.shelfLife || '',
    storage: data.storage || '',
    manufacturer: data.manufacturer || '',
    fssaiInformation: data.fssaiInformation || { licenseNumber: '' },
    nutritionalInformation: data.nutritionalInformation || undefined,
    createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt || new Date().toISOString(),
  };
}

/**
 * Fetches a single product by its unique document ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return mapDocToProduct(docSnap);
  } catch (error) {
    console.error(`Error fetching product by ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetches a single product by its URL-friendly slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    return mapDocToProduct(querySnapshot.docs[0]);
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetches featured products for homepage or promotions (controlled limit to save read quota)
 */
export async function getFeaturedProducts(maxItems: number = 8): Promise<Product[]> {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('featured', '==', true),
      limit(maxItems)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapDocToProduct);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

/**
 * Fetches best-selling products
 */
export async function getBestSellerProducts(maxItems: number = 8): Promise<Product[]> {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('bestSeller', '==', true),
      limit(maxItems)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapDocToProduct);
  } catch (error) {
    console.error('Error fetching best seller products:', error);
    return [];
  }
}

/**
 * Fetches products filtered by category with pagination support
 */
export async function getProductsByCategory(
  categorySlug: string,
  maxItems: number = 12
): Promise<Product[]> {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', categorySlug),
      limit(maxItems)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapDocToProduct);
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    return [];
  }
}

/**
 * Scalable paginated and filtered product search
 */
export async function getPaginatedProducts(
  params: ProductFilterParams = {}
): Promise<PaginationResult<Product>> {
  try {
    const { category, subcategory, featured, bestSeller, offerEnabled, limit: queryLimit = 12, lastDocId } = params;
    const constraints: QueryConstraint[] = [];

    if (category) {
      constraints.push(where('category', '==', category));
    }
    if (subcategory) {
      constraints.push(where('subcategory', '==', subcategory));
    }
    if (featured !== undefined) {
      constraints.push(where('featured', '==', featured));
    }
    if (bestSeller !== undefined) {
      constraints.push(where('bestSeller', '==', bestSeller));
    }
    if (offerEnabled !== undefined) {
      constraints.push(where('offerEnabled', '==', offerEnabled));
    }

    // Add ordering and pagination limit
    constraints.push(orderBy('createdAt', 'desc'));

    if (lastDocId) {
      const lastDocSnap = await getDoc(doc(db, PRODUCTS_COLLECTION, lastDocId));
      if (lastDocSnap.exists()) {
        constraints.push(startAfter(lastDocSnap));
      }
    }

    // Fetch limit + 1 to check if more items exist
    constraints.push(limit(queryLimit + 1));

    const q = query(collection(db, PRODUCTS_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);

    const hasMore = querySnapshot.docs.length > queryLimit;
    const docsToReturn = hasMore ? querySnapshot.docs.slice(0, queryLimit) : querySnapshot.docs;
    const items = docsToReturn.map(mapDocToProduct);
    const newLastDocId = docsToReturn.length > 0 ? docsToReturn[docsToReturn.length - 1].id : undefined;

    return {
      items,
      hasMore,
      lastDocId: newLastDocId,
    };
  } catch (error) {
    console.error('Error fetching paginated products:', error);
    return { items: [], hasMore: false };
  }
}

/**
 * Creates a new product document in Firestore
 */
export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...productData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Updates an existing product document
 */
export async function updateProduct(id: string, updates: Partial<Product>): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes a product document
 */
export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}
