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
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { Order, OrderStatus, PaymentStatus } from '@/types';

const ORDERS_COLLECTION = 'orders';

export function mapDocToOrder(docSnap: DocumentSnapshot): Order {
  const data = docSnap.data();
  if (!data) throw new Error(`Document ${docSnap.id} has no data`);

  return {
    id: docSnap.id,
    orderNumber: data.orderNumber || '',
    userId: data.userId || '',
    userEmail: data.userEmail || '',
    customerName: data.customerName || '',
    customerPhone: data.customerPhone || '',
    items: Array.isArray(data.items) ? data.items : [],
    shippingAddress: data.shippingAddress || {},
    pricing: data.pricing || {
      subtotal: 0,
      discountAmount: 0,
      couponDiscount: 0,
      shippingFee: 0,
      taxAmount: 0,
      totalAmount: 0,
    },
    status: data.status || 'pending',
    paymentStatus: data.paymentStatus || 'pending',
    paymentMethod: data.paymentMethod || 'razorpay',
    paymentDetails: data.paymentDetails || undefined,
    tracking: data.tracking || undefined,
    notes: data.notes || undefined,
    createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt || new Date().toISOString(),
  };
}

/**
 * Fetches an order by its Firestore ID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return mapDocToOrder(docSnap);
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    return null;
  }
}

/**
 * Fetches all orders placed by a specific authenticated user
 */
export async function getUserOrders(userId: string, maxItems: number = 20): Promise<Order[]> {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(maxItems)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapDocToOrder);
  } catch (error) {
    console.error(`Error fetching orders for user ${userId}:`, error);
    return [];
  }
}

/**
 * Creates a new order in Firestore
 */
export async function createOrder(
  orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...orderData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Updates status and tracking for an order
 */
export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  paymentStatus?: PaymentStatus,
  tracking?: Order['tracking']
): Promise<void> {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  const updates: Record<string, unknown> = {
    status,
    updatedAt: serverTimestamp(),
  };
  if (paymentStatus) updates.paymentStatus = paymentStatus;
  if (tracking) updates.tracking = tracking;

  await updateDoc(docRef, updates);
}
