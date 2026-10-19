import * as orderRepo from '../firestore/orders';
import type { Order, OrderPriceBreakdown, OrderItem } from '@/types';

/**
 * Calculates order totals including shipping, taxes, and discounts
 */
export function calculateOrderBreakdown(
  items: OrderItem[],
  couponDiscount: number = 0,
  freeShippingThreshold: number = 499,
  standardShippingFee: number = 50,
  taxRatePercentage: number = 5
): OrderPriceBreakdown {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = couponDiscount;
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const shippingFee = taxableSubtotal >= freeShippingThreshold || taxableSubtotal === 0 ? 0 : standardShippingFee;
  const taxAmount = Math.round((taxableSubtotal * taxRatePercentage) / 100);
  const totalAmount = taxableSubtotal + shippingFee + taxAmount;

  return {
    subtotal,
    discountAmount,
    couponDiscount,
    shippingFee,
    taxAmount,
    totalAmount,
  };
}

export async function placeOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  return orderRepo.createOrder(orderData);
}

export async function getCustomerOrderHistory(userId: string): Promise<Order[]> {
  return orderRepo.getUserOrders(userId);
}
