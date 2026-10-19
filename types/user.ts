import type { ShippingAddress } from './order';

export type UserRole = 'customer' | 'admin' | 'manager';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  photoURL?: string;
  role: UserRole;
  addresses: (ShippingAddress & { id: string; isDefault: boolean })[];
  wishlist: string[]; // List of Product IDs
  savedCart?: {
    productId: string;
    quantity: number;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
