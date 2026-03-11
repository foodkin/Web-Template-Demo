'use client';

import Link from 'next/link';

const templates = [
  {
    id: 1,
    title: 'Toko Online Modern',
    category: 'E-Commerce',
    beli: '10 Jan 2025',
    status: 'Aktif',
    headerBg: '#FEF9E7',
    headerAccent: '#FACC15',
    thumb: [
      { w: '60%', h: '8px', bg: '#2E1065', br: '3px' },
      { w: '40%', h: '6px', bg: '#2E106540', br: '3px' },
      { w: '100%', h: '40px', bg: '#2E10650D', br: '6px' },
      { w: '48%', h: '22px', bg: '#FACC15', br: '4px' },
    ],
  },
  {
    id: 2,
    title: 'Company Profile Pro',
    category: 'Perusahaan',
    beli: '22 Feb 2025',
    status: 'Aktif',
    headerBg: '#F0EBF8',
    headerAccent: '#2E1065',
    thumb: [
      { w: '50%', h: '8px', bg: '#2E1065', br: '3px' },
      { w: '70%', h: '6px', bg: '#2E106530', br: '3px' },
      { w: '100%', h: '38px', bg: '#2E10650A', br: '6px' },
      { w: '40%', h: '22px', bg: '#2E1065', br: '4px' },
    ],
  },
  {
    id: 3,
    title: 'Agrikultur & Hasil Bumi',
    category: 'Agribisnis',
    beli: '05 Mar 2025',
    status: 'Aktif',
    headerBg: '#F0FDF4',
    headerAccent: '#16A34A',
    thumb: [
      { w: '55%', h: '8px', bg: '#16A34A', br: '3px' },
      { w: '35%', h: '6px', bg: '#16A34A40', br: '3px' },
      { w: '100%', h: '40px', bg: '#16A34A0D', br: '6px' },
      { w: '45%', h: '22px', bg: '#16A34A', br: '4px' },
    ],
  },
];

function MiniThumb({ t }: { t: typeof templates[0] }) {
  return (
    <div className="w-full aspect-[16/9] rounded-lg flex flex-col p-3" style={{ background: t.headerBg }}>
      <div className="flex items-center gap-1 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-300" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
        <div className="ml-1 flex-1 h-2 rounded-full" style={{ background: `${t.headerAccent}20` }} />
      </div>
      <div className="flex flex-col gap-1.5 flex-1 justify-center">
        {t.thumb.map((b, i) => (
          <div key={i} style={{ width: b.w, height: b.h, background: b.bg, borderRadius: b.br }} />
        ))}
      </div>
    </div>
  );
}

export default function TemplateSection() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid #2E106310', background: '#FFFFFF', boxShadow: '0 2px 16px #2E10650A' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #2E10650D' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: '#2E1065', color: '#FACC15' }}>
            🎨
          </div>
          <div>
            <h3 className="font-black text-sm" style={{ color: '#2E1065', fontFamily: "'Georgia', serif" }}>Template Saya</h3>
            <p className="text-[11px]" style={{ color: '#2E106350' }}>{templates.length} template dibeli</p>
          </div>
        </div>
        <Link
          href="/templates"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold hover:opacity-90 transition-all"
          style={{ background: '#2E1065', color: '#FACC15' }}
        >
          + Beli Template
        </Link>
      </div>

      {/* Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => (
          <div
            key={t.id}
            className="rounded-xl overflow-hidden group"
            style={{ border: '1.5px solid #2E106310' }}
          >
            <div className="relative">
              <MiniThumb t={t} />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
                style={{ background: '#2E106580', backdropFilter: 'blur(2px)' }}
              >
                <Link
                  href={`/templates/${t.id}`}
                  className="px-3 py-1.5 rounded-full text-[11px] font-bold"
                  style={{ background: '#FFFFFF', color: '#2E1065' }}
                >
                  👁 Preview
                </Link>
                <button
                  className="px-3 py-1.5 rounded-full text-[11px] font-bold"
                  style={{ background: '#FACC15', color: '#2E1065' }}
                >
                  Kelola
                </button>
              </div>
            </div>
            <div className="px-3 py-2.5 flex items-center justify-between" style={{ background: '#FFFFFF' }}>
              <div>
                <p className="text-xs font-black" style={{ color: '#2E1065' }}>{t.title}</p>
                <p className="text-[10px]" style={{ color: '#2E106350' }}>Dibeli {t.beli}</p>
              </div>
              <span
                className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                style={{ background: '#FACC1520', color: '#2E1065', border: '1px solid #FACC1530' }}
              >
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}