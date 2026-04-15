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

export type PackageType =
  | 'template-only'
  | 'template-hosting'
  | 'ai-only'
  | 'ai-hosting';

export const PACKAGE_LABELS: Record<PackageType, string> = {
  'template-only':    'Template',
  'template-hosting': 'Template + Hosting',
  'ai-only':          'Template AI',
  'ai-hosting':       'Template AI + Hosting',
};

export interface Order {
  id: string;
  userId: number;
  userName: string;
  userEmail: string;

  // product
  type: 'template' | 'ai-generated';
  templateId?: number;
  templateTitle?: string;
  aiHtmlCode?: string;

  // checkout details
  packageType: PackageType;
  domainName: string;
  phone: string;
  contactEmail: string;
  message: string;

  // payment
  price: number;
  status: 'pending' | 'processing' | 'done';
  paidAt: string;
  paymentMethod: string;
}

export interface Pricing {
  templateOnly: number;       // Template saja (ribuan IDR)
  templateHosting: number;    // Template + Hosting
  aiOnly: number;             // Template AI saja
  aiHosting: number;          // Template AI + Hosting
}

export const DEFAULT_PRICING: Pricing = {
  templateOnly:    49,
  templateHosting: 97,
  aiOnly:          29,
  aiHosting:       69,
};
