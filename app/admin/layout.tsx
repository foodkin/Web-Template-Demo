'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router   = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace('/login');
    } else if (user.role !== 'admin') {
      router.replace('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F7FF' }}>
        <div className="text-sm font-semibold" style={{ color: '#2E106560' }}>Memeriksa akses...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#F8F7FF' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
