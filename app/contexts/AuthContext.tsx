'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User, Order, Pricing,
  loginWithCredentials,
  STORAGE_KEY, ORDERS_KEY, PRICING_KEY,
  DEFAULT_PRICING,
} from '@/lib/auth';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => 'admin' | 'user' | 'error';
  logout: () => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'paidAt'>) => Order;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  pricing: Pricing;
  savePricing: (p: Pricing) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [orders, setOrders]   = useState<Order[]>([]);
  const [pricing, setPricing] = useState<Pricing>(DEFAULT_PRICING);
  const [ready, setReady]     = useState(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem(STORAGE_KEY);
      if (u) setUser(JSON.parse(u));

      const o = localStorage.getItem(ORDERS_KEY);
      if (o) setOrders(JSON.parse(o));

      const p = localStorage.getItem(PRICING_KEY);
      if (p) setPricing({ ...DEFAULT_PRICING, ...JSON.parse(p) });
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  const login = (email: string, password: string): 'admin' | 'user' | 'error' => {
    const u = loginWithCredentials(email, password);
    if (!u) return 'error';
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    return u.role;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const addOrder = (order: Omit<Order, 'id' | 'paidAt'>): Order => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      paidAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    const updated = orders.map((o) => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  };

  const savePricing = (p: Pricing) => {
    setPricing(p);
    localStorage.setItem(PRICING_KEY, JSON.stringify(p));
  };

  if (!ready) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout, orders, addOrder, updateOrderStatus, pricing, savePricing }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
