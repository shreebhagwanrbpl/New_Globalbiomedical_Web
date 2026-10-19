import { Coupon } from '@/types/coupon';

export const staticCoupons: Coupon[] = [
  {
    id: 'coup-spice10',
    code: 'SPICE10',
    description: '10% instant discount on any spice purchase',
    type: 'percentage',
    value: 10,
    minOrderValue: 299,
    maxDiscountAmount: 250,
    startDate: '2026-01-01T00:00:00.000Z',
    endDate: '2026-12-31T23:59:59.000Z',
    usedCount: 1420,
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'coup-welcome15',
    code: 'WELCOME15',
    description: '15% off for your first spice order',
    type: 'percentage',
    value: 15,
    minOrderValue: 499,
    maxDiscountAmount: 300,
    startDate: '2026-01-01T00:00:00.000Z',
    endDate: '2026-12-31T23:59:59.000Z',
    usedCount: 2890,
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'coup-festive20',
    code: 'FESTIVE20',
    description: '20% off on premium festive orders above ₹1,499',
    type: 'percentage',
    value: 20,
    minOrderValue: 1499,
    maxDiscountAmount: 600,
    startDate: '2026-08-01T00:00:00.000Z',
    endDate: '2026-11-30T23:59:59.000Z',
    usedCount: 654,
    isActive: true,
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'coup-aaxol10',
    code: 'AAXOL10',
    description: 'Flat ₹100 discount on orders above ₹799',
    type: 'fixed_amount',
    value: 100,
    minOrderValue: 799,
    startDate: '2026-01-01T00:00:00.000Z',
    endDate: '2026-12-31T23:59:59.000Z',
    usedCount: 932,
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  },
  {
    id: 'coup-freeship',
    code: 'FREESHIP',
    description: 'Free express Pan-India shipping with zero minimum order',
    type: 'free_shipping',
    value: 79,
    minOrderValue: 0,
    startDate: '2026-01-01T00:00:00.000Z',
    endDate: '2026-12-31T23:59:59.000Z',
    usedCount: 430,
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-23T00:00:00.000Z'
  }
];

export interface CouponValidationResult {
  isValid: boolean;
  coupon?: Coupon;
  discountAmount: number;
  message: string;
}

export function validateCoupon(code: string, subtotal: number): CouponValidationResult {
  const normalizedCode = code.trim().toUpperCase();
  const found = staticCoupons.find(c => c.code === normalizedCode && c.isActive);

  if (!found) {
    return {
      isValid: false,
      discountAmount: 0,
      message: `Coupon "${code}" is invalid or expired. Try SPICE10 or WELCOME15.`
    };
  }

  if (found.minOrderValue && subtotal < found.minOrderValue) {
    return {
      isValid: false,
      discountAmount: 0,
      message: `Coupon ${found.code} requires a minimum subtotal of ₹${found.minOrderValue}. Add ₹${found.minOrderValue - subtotal} more.`
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
    discount = 79; // standard shipping fee
  }

  return {
    isValid: true,
    coupon: found,
    discountAmount: discount,
    message: `Coupon ${found.code} applied successfully! You saved ₹${discount}.`
  };
}
