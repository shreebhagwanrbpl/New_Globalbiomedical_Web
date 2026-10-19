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
import type { Recipe } from '@/types';

const RECIPES_COLLECTION = 'recipes';

export function mapDocToRecipe(docSnap: DocumentSnapshot): Recipe {
  const data = docSnap.data();
  if (!data) throw new Error(`Document ${docSnap.id} has no data`);

  return {
    id: docSnap.id,
    title: data.title || '',
    slug: data.slug || '',
    subtitle: data.subtitle || undefined,
    description: data.description || '',
    image: data.image || '',
    prepTimeMinutes: Number(data.prepTimeMinutes) || 0,
    cookTimeMinutes: Number(data.cookTimeMinutes) || 0,
    totalTimeMinutes: Number(data.totalTimeMinutes) || 0,
    servings: Number(data.servings) || 4,
    difficulty: data.difficulty || 'Easy',
    cuisine: data.cuisine || 'Indian',
    spicinessLevel: data.spicinessLevel || 'Medium',
    ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
    instructions: Array.isArray(data.instructions) ? data.instructions : [],
    featuredSpices: Array.isArray(data.featuredSpices) ? data.featuredSpices : [],
    featured: Boolean(data.featured),
    published: Boolean(data.published),
    createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt || new Date().toISOString(),
  };
}

/**
 * Fetches published recipes
 */
export async function getRecipes(maxItems: number = 12): Promise<Recipe[]> {
  try {
    const q = query(
      collection(db, RECIPES_COLLECTION),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(maxItems)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapDocToRecipe);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

/**
 * Fetches a recipe by slug
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const q = query(collection(db, RECIPES_COLLECTION), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    return mapDocToRecipe(querySnapshot.docs[0]);
  } catch (error) {
    console.error(`Error fetching recipe by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetches recipes that feature a specific spice/masala product
 */
export async function getRecipesBySpiceId(productId: string): Promise<Recipe[]> {
  try {
    const q = query(
      collection(db, RECIPES_COLLECTION),
      where('featuredSpices', 'array-contains', productId),
      where('published', '==', true),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapDocToRecipe);
  } catch (error) {
    console.error(`Error fetching recipes for spice ${productId}:`, error);
    return [];
  }
}

/**
 * Creates a recipe
 */
export async function createRecipe(recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, RECIPES_COLLECTION), {
    ...recipeData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Updates a recipe
 */
export async function updateRecipe(id: string, updates: Partial<Recipe>): Promise<void> {
  const docRef = doc(db, RECIPES_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes a recipe
 */
export async function deleteRecipe(id: string): Promise<void> {
  const docRef = doc(db, RECIPES_COLLECTION, id);
  await deleteDoc(docRef);
}
