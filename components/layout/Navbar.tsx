'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Navbar() {
  const pathname      = usePathname();
  const router        = useRouter();
  const { user, logout } = useAuth();

  if (pathname.startsWith('/admin')) return null;

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav
      className="relative w-full"
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #2E106514',
        boxShadow: '0 2px 16px #2E106508',
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, #FACC15, #2E1065)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-black text-base flex items-center gap-2"
          style={{ color: '#2E1065', fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}
        >
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
            style={{ background: '#2E1065', color: '#FACC15' }}
          >
            W
          </span>
          WebDemo
        </Link>

        {/* Nav links + auth */}
        <div className="flex items-center gap-1">
          {[
            { href: '/',          label: 'Home' },
            { href: '/templates', label: 'Template' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-200"
              style={{
                color: isActive(href) ? '#2E1065' : '#2E106370',
                background: isActive(href) ? '#FACC15' : 'transparent',
                letterSpacing: '0.01em',
              }}
            >
              {label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-2 ml-4">
              {/* User info */}
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{ background: '#F0EBF8', color: '#2E1065' }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                  style={{ background: '#2E1065', color: '#FACC15' }}
                >
                  {user.name[0]}
                </div>
                <span className="font-semibold text-xs hidden sm:block">{user.name}</span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:opacity-80"
                style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A520' }}
              >
                Keluar
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-4 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: '#2E1065',
                color: '#FACC15',
                boxShadow: '0 4px 16px #2E106330',
              }}
            >
              Masuk →
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
