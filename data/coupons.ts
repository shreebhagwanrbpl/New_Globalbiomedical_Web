import { Coupon } from '@/types/coupon';

export const staticCoupons: Coupon[] = [
  {
    id: 'coup-biomed10',
    code: 'BIOMED10',
    description: '10% instant discount on diagnostic reagents & consumable orders',
    type: 'percentage',
    value: 10,
    minOrderValue: 1999,
    maxDiscountAmount: 2500,
    startDate: '2026-01-01T00:00:00.000Z',
    endDate: '2026-12-31T23:59:59.000Z',
    usedCount: 520,
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
  },
  {
    id: 'coup-human15',
    code: 'HUMAN15',
    description: '15% off for first-time diagnostic laboratory supply order',
    type: 'percentage',
    value: 15,
    minOrderValue: 2999,
    maxDiscountAmount: 3000,
    startDate: '2026-01-01T00:00:00.000Z',
    endDate: '2026-12-31T23:59:59.000Z',
    usedCount: 890,
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
  },
  {
    id: 'coup-labstart',
    code: 'LABSTART',
    description: 'Flat ₹500 discount on pathology consumable orders above ₹4,999',
    type: 'fixed_amount',
    value: 500,
    minOrderValue: 4999,
    startDate: '2026-01-01T00:00:00.000Z',
    endDate: '2026-12-31T23:59:59.000Z',
    usedCount: 340,
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
  },
  {
    id: 'coup-freeship',
    code: 'FREESHIP',
    description: 'Free express temperature-controlled shipping across all Rajasthan districts',
    type: 'free_shipping',
    value: 150,
    minOrderValue: 0,
    startDate: '2026-01-01T00:00:00.000Z',
    endDate: '2026-12-31T23:59:59.000Z',
    usedCount: 630,
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z',
  },
];

export interface CouponValidationResult {
  isValid: boolean;
  coupon?: Coupon;
  discountAmount: number;
  message: string;
}

export function validateCoupon(code: string, subtotal: number): CouponValidationResult {
  const normalizedCode = code.trim().toUpperCase();
  const found = staticCoupons.find((c) => c.code === normalizedCode && c.isActive);

  if (!found) {
    return {
      isValid: false,
      discountAmount: 0,
      message: `Coupon "${code}" is invalid or expired. Try BIOMED10 or HUMAN15.`,
    };
  }

  if (found.minOrderValue && subtotal < found.minOrderValue) {
    return {
      isValid: false,
      discountAmount: 0,
      message: `Coupon ${found.code} requires a minimum subtotal of ₹${found.minOrderValue}. Add ₹${
        found.minOrderValue - subtotal
      } more.`,
    };
  }

  let discount = 0;
  if (found.type === 'percentage') {
    discount = Math.round((subtotal * found.value) / 100);
    if (found.maxDiscountAmount && discount > found.maxDiscountAmount) {
      discount = found.maxDiscountAmount;
    }
  } else if (found.type === 'fixed_amount') {
    discount = Math.min(found.value, subtotal);
  } else if (found.type === 'free_shipping') {
    discount = 150;
  }

  return {
    isValid: true,
    coupon: found,
    discountAmount: discount,
    message: `Coupon ${found.code} applied successfully! You saved ₹${discount}.`,
  };
}
