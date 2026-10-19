export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'dispatched'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'razorpay' | 'cod' | 'upi' | 'card' | 'netbanking';

export interface OrderItem {
  productId: string;
  title: string;
  slug: string;
  image: string;
  netQuantity: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  sku: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderPriceBreakdown {
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  couponDiscount: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "VS-2026-1049"
  userId: string;
  userEmail: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  pricing: OrderPriceBreakdown;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentDetails?: {
    paymentId?: string;
    orderId?: string;
    signature?: string;
  };
  tracking?: {
    courierName?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    dispatchedAt?: string;
    deliveredAt?: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
