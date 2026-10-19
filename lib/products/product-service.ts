import { staticProducts, getProductBySlug as getStaticProductBySlug, getProductsByCategory as getStaticProductsByCategory } from '@/data/products';
import { staticOffers } from '@/data/offers';
import { calculateProductOffer } from '../firestore/offers';
import type { Product, ProductFilterParams, PaginationResult, Offer } from '@/types';

/**
 * High-level Product Service.
 * Currently backed by comprehensive local static datasets (48+ products).
 * Fully structured as asynchronous promises so when Firestore is activated later,
 * no UI component changes will be required.
 */

export async function getAllProducts(): Promise<Product[]> {
  return staticProducts;
}

export async function getProductById(id: string): Promise<Product | null> {
  const prod = staticProducts.find(p => p.id === id);
  return prod || null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const prod = getStaticProductBySlug(slug);
  return prod || null;
}

export async function getProductsByCategory(categorySlug: string, maxItems: number = 12): Promise<Product[]> {
  const prods = getStaticProductsByCategory(categorySlug);
  return prods.slice(0, maxItems);
}

export async function getFeaturedProducts(maxItems: number = 8): Promise<Product[]> {
  const featured = staticProducts.filter(p => p.featured || p.bestSeller);
  return featured.slice(0, maxItems);
}

export async function getBestSellerProducts(maxItems: number = 8): Promise<Product[]> {
  const bestSellers = staticProducts.filter(p => p.bestSeller);
  return bestSellers.slice(0, maxItems);
}

export async function getNewArrivalProducts(maxItems: number = 6): Promise<Product[]> {
  const newArrivals = staticProducts.filter(p => p.newArrival);
  return newArrivals.slice(0, maxItems);
}

export async function getActiveOffers(): Promise<Offer[]> {
  return staticOffers.filter(o => o.isActive);
}

export async function getProductWithOffer(slug: string): Promise<{ product: Product | null; offerInfo?: ReturnType<typeof calculateProductOffer> }> {
  const product = await getProductBySlug(slug);
  if (!product) return { product: null };

  const activeOffers = await getActiveOffers();
  const offerInfo = calculateProductOffer(product, activeOffers);

  return { product, offerInfo };
}

export async function getFeaturedProductsWithOffers(maxItems: number = 8) {
  const [products, activeOffers] = await Promise.all([
    getFeaturedProducts(maxItems),
    getActiveOffers(),
  ]);

  return products.map((product) => ({
    product,
    offerInfo: calculateProductOffer(product, activeOffers),
  }));
}

export async function getCatalogProducts(params: ProductFilterParams = {}): Promise<PaginationResult<Product>> {
  let filtered = [...staticProducts];

  if (params.category && params.category !== 'all') {
    filtered = filtered.filter(p => p.category === params.category);
  }

  if (params.subcategory) {
    filtered = filtered.filter(p => p.subcategory === params.subcategory);
  }

  if (params.featured) {
    filtered = filtered.filter(p => p.featured);
  }

  if (params.bestSeller) {
    filtered = filtered.filter(p => p.bestSeller);
  }

  if (params.newArrival) {
    filtered = filtered.filter(p => p.newArrival);
  }

  if (params.offerEnabled) {
    filtered = filtered.filter(p => p.offerEnabled || (p.discountPercentage && p.discountPercentage > 0));
  }

  if (params.spiceLevel) {
    filtered = filtered.filter(p => p.spiceLevel?.toLowerCase() === params.spiceLevel?.toLowerCase());
  }

  if (params.dietary) {
    filtered = filtered.filter(p => p.dietaryInfo?.some(d => d.toLowerCase().includes(params.dietary!.toLowerCase())));
  }

  if (params.inStockOnly) {
    filtered = filtered.filter(p => p.stock > 0);
  }

  if (params.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= params.minPrice!);
  }

  if (params.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= params.maxPrice!);
  }

  if (params.search) {
    const q = params.search.toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.shortDescription?.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.ingredients.some(ing => ing.toLowerCase().includes(q)) ||
      p.tags?.some(tag => tag.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (params.sortBy) {
    switch (params.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case 'popular':
      case 'featured':
      default:
        filtered.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
        break;
    }
  }

  const queryLimit = params.limit || 100;
  const items = filtered.slice(0, queryLimit);
  const hasMore = filtered.length > queryLimit;

  return {
    items,
    hasMore,
    lastDocId: items.length > 0 ? items[items.length - 1].id : undefined,
  };
}
