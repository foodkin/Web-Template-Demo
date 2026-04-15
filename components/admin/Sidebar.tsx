'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Sidebar() {
  const pathname         = usePathname();
  const router           = useRouter();
  const { user, logout, orders } = useAuth();

  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Manajemen Pesanan',
      href: '/admin/orders',
      badge: pendingCount,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      name: 'Manajemen Customer',
      href: '/admin/customers',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      name: 'Pengaturan Sistem',
      href: '/admin/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-64 flex flex-col relative overflow-hidden" style={{ background: '#2E1065' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, #ffffff07 1.2px, transparent 1.2px)`, backgroundSize: '28px 28px' }} />
      <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: 'linear-gradient(to bottom, #FACC15, #ffffff10)' }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Brand */}
        <div className="px-6 py-6" style={{ borderBottom: '1px solid #ffffff10' }}>
          <div className="text-lg font-black" style={{ color: '#FACC15', fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}>WebDemo</div>
          <div className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: '#ffffff30' }}>Admin Dashboard</div>
        </div>

        <div className="px-6 pt-5 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#ffffff25' }}>Menu Utama</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={isActive ? { background: '#FACC15', color: '#2E1065', boxShadow: '0 4px 16px #FACC1530' } : { color: '#ffffff60', background: 'transparent' }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = '#ffffff10'; e.currentTarget.style.color = '#ffffff'; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff60'; } }}
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: isActive ? '#2E106520' : '#ffffff10', color: isActive ? '#2E1065' : '#ffffff60' }}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
                {(item.badge ?? 0) > 0 && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: isActive ? '#2E1065' : '#FACC15', color: isActive ? '#FACC15' : '#2E1065' }}>
                    {item.badge}
                  </span>
                )}
                {isActive && (item.badge ?? 0) <= 0 && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#2E1065' }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-4 pb-4">
          <div className="rounded-xl p-3 mb-2 flex items-center gap-3" style={{ background: '#ffffff08', border: '1px solid #ffffff10' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0" style={{ background: '#FACC15', color: '#2E1065' }}>
              {user?.name?.[0] ?? 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: '#ffffff' }}>{user?.name ?? 'Admin'}</p>
              <p className="text-[10px] truncate" style={{ color: '#ffffff40' }}>{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-80 mb-2"
            style={{ background: '#FEF2F2', color: '#DC2626' }}
          >
            Keluar
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-80"
            style={{ background: '#ffffff10', color: '#ffffff60', border: '1px solid #ffffff10' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}
