'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#2E1065' }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, #FACC15, #ffffff20)' }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff08 1.2px, transparent 1.2px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div
              className="text-xl font-black"
              style={{ color: '#FACC15', fontFamily: "'Georgia', serif", letterSpacing: '-0.03em' }}
            >
              WebDemo
            </div>
            <p className="text-xs max-w-xs leading-relaxed" style={{ color: '#ffffff50' }}>
              Platform template website untuk UMKM Indonesia. Profesional, terjangkau, siap online dalam 24 jam.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-8">
            {[
              { label: 'Home', href: '/' },
              { label: 'Template', href: '/templates' },
              { label: 'Profile', href: '/profile' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-semibold transition-colors duration-200 hover:text-white"
                style={{ color: '#ffffff60' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-2">
            {['IG', 'TW', 'FB'].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-200"
                style={{ background: '#ffffff10', color: '#ffffff60', border: '1px solid #ffffff15' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FACC15';
                  e.currentTarget.style.color = '#2E1065';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff10';
                  e.currentTarget.style.color = '#ffffff60';
                }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6" style={{ borderTop: '1px solid #ffffff10' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px]" style={{ color: '#ffffff30' }}>
            © 2025 WebDemo. Semua hak dilindungi.
          </p>
          <div
            className="px-3 py-1 rounded-full text-[10px] font-bold"
            style={{ background: '#FACC1515', color: '#FACC15', border: '1px solid #FACC1520' }}
          >
            🇮🇩 Made in Indonesia
          </div>
        </div>
      </div>
    </footer>
  );
}