export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

const DUMMY_ACCOUNTS = [
  { id: 1, name: 'Admin Nusantara', email: 'admin@nusantara.id', password: 'admin123', role: 'admin' as UserRole },
  { id: 2, name: 'Budi Santoso',    email: 'user@gmail.com',     password: 'user123',  role: 'user'  as UserRole },
];

export function loginWithCredentials(email: string, password: string): User | null {
  const account = DUMMY_ACCOUNTS.find(
    (a) => a.email === email && a.password === password
  );
  if (!account) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...user } = account;
  return user;
}

export const STORAGE_KEY = 'nusantara_user';
export const ORDERS_KEY  = 'nusantara_orders';
export const PRICING_KEY = 'nusantara_pricing';

export interface Order {
  id: string;
  userId: number;
  userName: string;
  userEmail: string;
  type: 'template' | 'ai-generated';
  templateId?: number;
  templateTitle?: string;
  aiHtmlCode?: string;
  price: number;
  status: 'pending' | 'processing' | 'done';
  paidAt: string;
  paymentMethod: string;
}

export interface Pricing {
  aiPackage: number;   // harga paket AI generate (ribuan IDR)
}

export const DEFAULT_PRICING: Pricing = {
  aiPackage: 49,       // Rp 49rb default
};
