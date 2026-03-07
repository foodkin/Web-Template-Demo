'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const isActive = (path: string) => pathname === path;

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

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end">
        <div className="flex items-center gap-1">
          {[
            { href: '/', label: 'Home' },
            { href: '/templates', label: 'Template' },
            { href: '/profile', label: 'Profile' },
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
              {!isActive(href) && (
                <span
                  className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"
                  style={{ background: '#2E10650A' }}
                />
              )}
            </Link>
          ))}

          {/* CTA button */}
          <Link
            href="/templates"
            className="ml-4 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:scale-[1.03]"
            style={{
              background: '#2E1065',
              color: '#FACC15',
              boxShadow: '0 4px 16px #2E106530',
              letterSpacing: '0.01em',
            }}
          >
            Mulai Sekarang →
          </Link>
        </div>
      </div>
    </nav>
  );
}