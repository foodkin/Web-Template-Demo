'use client';

import { useState } from 'react';
import Link from 'next/link';

const allTemplates = [
  {
    id: 1,
    title: 'Ekspor Nusantara',
    category: 'Ekspor',
    desc: 'Tampilan tegas dan terpercaya untuk bisnis ekspor skala internasional.',
    badge: 'Terlaris',
    pages: 10,
    headerBg: '#FFF7ED',
    headerAccent: '#EA580C',
    thumb: [
      { w: '65%', h: '10px', bg: '#EA580C', br: '4px' },
      { w: '45%', h: '8px', bg: '#EA580C40', br: '4px' },
      { w: '100%', h: '50px', bg: '#EA580C0D', br: '8px' },
      { w: '50%', h: '32px', bg: '#EA580C', br: '6px' },
    ],
  },
  {
    id: 2,
    title: 'Global Trade Pro',
    category: 'Ekspor',
    desc: 'Desain modern untuk perusahaan ekspor impor dengan pasar global.',
    badge: 'Featured',
    pages: 9,
    headerBg: '#FEF3C7',
    headerAccent: '#D97706',
    thumb: [
      { w: '55%', h: '10px', bg: '#D97706', br: '4px' },
      { w: '75%', h: '8px', bg: '#D9770640', br: '4px' },
      { w: '100%', h: '52px', bg: '#D977060D', br: '8px' },
      { w: '45%', h: '32px', bg: '#D97706', br: '6px' },
    ],
  },
  {
    id: 3,
    title: 'Company Profile Pro',
    category: 'Perusahaan',
    desc: 'Tampilan korporat profesional yang membangun kepercayaan klien dan investor.',
    badge: 'Populer',
    pages: 12,
    headerBg: '#F0EBF8',
    headerAccent: '#2E1065',
    thumb: [
      { w: '50%', h: '10px', bg: '#2E1065', br: '4px' },
      { w: '70%', h: '8px', bg: '#2E106530', br: '4px' },
      { w: '100%', h: '48px', bg: '#2E10650A', br: '8px' },
      { w: '40%', h: '32px', bg: '#2E1065', br: '6px' },
    ],
  },
  {
    id: 4,
    title: 'Corporate Elegance',
    category: 'Perusahaan',
    desc: 'Desain elegan dan modern untuk company profile skala enterprise.',
    badge: 'Baru',
    pages: 14,
    headerBg: '#EEE9F6',
    headerAccent: '#6D28D9',
    thumb: [
      { w: '60%', h: '10px', bg: '#6D28D9', br: '4px' },
      { w: '40%', h: '8px', bg: '#6D28D930', br: '4px' },
      { w: '100%', h: '50px', bg: '#6D28D90A', br: '8px' },
      { w: '44%', h: '32px', bg: '#6D28D9', br: '6px' },
    ],
  },
  {
    id: 5,
    title: 'Agrikultur & Hasil Bumi',
    category: 'Agribisnis',
    desc: 'Desain segar dan natural untuk bisnis pertanian dan produk organik.',
    badge: 'Baru',
    pages: 7,
    headerBg: '#F0FDF4',
    headerAccent: '#16A34A',
    thumb: [
      { w: '55%', h: '10px', bg: '#16A34A', br: '4px' },
      { w: '35%', h: '8px', bg: '#16A34A40', br: '4px' },
      { w: '100%', h: '52px', bg: '#16A34A0D', br: '8px' },
      { w: '45%', h: '32px', bg: '#16A34A', br: '6px' },
    ],
  },
  {
    id: 6,
    title: 'Green Harvest',
    category: 'Agribisnis',
    desc: 'Template modern untuk perkebunan, koperasi tani, dan hasil bumi lokal.',
    badge: 'Featured',
    pages: 8,
    headerBg: '#ECFDF5',
    headerAccent: '#059669',
    thumb: [
      { w: '50%', h: '10px', bg: '#059669', br: '4px' },
      { w: '65%', h: '8px', bg: '#05966940', br: '4px' },
      { w: '100%', h: '54px', bg: '#0596690D', br: '8px' },
      { w: '42%', h: '32px', bg: '#059669', br: '6px' },
    ],
  },
];

const PAGE_SIZE = 6;

function TemplateThumbnail({ t }: { t: typeof allTemplates[0] }) {
  return (
    <div
      className="w-full h-full flex flex-col p-5"
      style={{ background: t.headerBg }}
    >
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-2 h-2 rounded-full bg-red-300" />
        <div className="w-2 h-2 rounded-full bg-yellow-300" />
        <div className="w-2 h-2 rounded-full bg-green-300" />
        <div
          className="ml-2 flex-1 h-3 rounded-full"
          style={{ background: `${t.headerAccent}25` }}
        />
      </div>
      {/* Page content blocks */}
      <div className="flex flex-col gap-2.5 flex-1 justify-center">
        {t.thumb.map((b, i) => (
          <div
            key={i}
            style={{ width: b.w, height: b.h, background: b.bg, borderRadius: b.br }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Populer() {
  const [page, setPage] = useState(1);
  const [hovered, setHovered] = useState<number | null>(null);

  const visible = allTemplates.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < allTemplates.length;

  return (
    <section
      className="relative py-20 px-6 md:px-12 overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #2E106515 1.2px, transparent 1.2px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: '#FACC15', color: '#2E1065' }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#2E1065' }} />
              Pilihan Editor
            </div>
            <h2
              className="leading-tight"
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#2E1065',
                fontFamily: "'Georgia', serif",
              }}
            >
              Template Populer
            </h2>
            <p className="mt-2 text-sm md:text-base" style={{ color: '#2E106355' }}>
              Dipilih dari 200+ template terbaik kami. Siap pakai, tinggal isi konten.
            </p>
          </div>

          <Link
            href="/templates"
            className="self-start md:self-auto flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-90"
            style={{ background: '#2E1065', color: '#FACC15' }}
          >
            Semua Template
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Grid — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((t) => (
            <div
              key={t.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                aspectRatio: '4/3',
                boxShadow: hovered === t.id
                  ? '0 20px 60px #2E106525'
                  : '0 4px 20px #2E106510',
                transform: hovered === t.id ? 'translateY(-6px)' : 'none',
                transition: 'all 0.3s ease',
                border: hovered === t.id ? '2px solid #FACC15' : '2px solid transparent',
              }}
              onMouseEnter={() => setHovered(t.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Full thumbnail */}
              <div className="absolute inset-0">
                <TemplateThumbnail t={t} />
              </div>

              {/* Badge top-left */}
              <div
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider z-10"
                style={{
                  background: '#FACC15',
                  color: '#2E1065',
                }}
              >
                {t.badge}
              </div>

              {/* Pages top-right */}
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold z-10"
                style={{ background: '#2E106520', color: '#2E1065', backdropFilter: 'blur(4px)' }}
              >
                {t.pages} hal
              </div>

              {/* Bottom overlay — always visible, stronger on hover */}
              <div
                className="absolute inset-0 flex flex-col justify-end z-10"
                style={{
                  background: hovered === t.id
                    ? 'linear-gradient(to top, #2E1065EE 40%, #2E106560 70%, transparent 100%)'
                    : 'linear-gradient(to top, #2E1065CC 30%, #2E106530 60%, transparent 100%)',
                  transition: 'background 0.3s ease',
                }}
              >
                <div className="p-5">
                  {/* Category */}
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest mb-1"
                    style={{ color: '#FACC1590' }}
                  >
                    {t.category}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-black text-base leading-tight mb-1"
                    style={{ color: '#FFFFFF', fontFamily: "'Georgia', serif" }}
                  >
                    {t.title}
                  </h3>

                  {/* Desc — visible on hover */}
                  <p
                    className="text-xs leading-relaxed mb-4 transition-all duration-300"
                    style={{
                      color: '#ffffff80',
                      maxHeight: hovered === t.id ? '40px' : '0px',
                      opacity: hovered === t.id ? 1 : 0,
                      overflow: 'hidden',
                    }}
                  >
                    {t.desc}
                  </p>

                  {/* Actions */}
                  <div
                    className="flex items-center gap-2 transition-all duration-300"
                    style={{
                      opacity: hovered === t.id ? 1 : 0,
                      transform: hovered === t.id ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    <Link
                      href={`/templates/${t.id}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105"
                      style={{ background: '#FFFFFF', color: '#2E1065' }}
                    >
                      👁 Lihat
                    </Link>
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105"
                      style={{ background: '#FACC15', color: '#2E1065' }}
                    >
                      ✓ Pilih Ini
                    </button>
                    <span
                      className="ml-auto text-xs font-black"
                      style={{ color: '#FACC15' }}
                    >
                      Rp97rb
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="group flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: '#FFFFFF',
                border: '2px solid #2E1065',
                color: '#2E1065',
                boxShadow: '0 4px 20px #2E106312',
              }}
            >
              <span>Lihat Template Lainnya</span>
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-90"
                style={{ background: '#FACC15' }}
              >
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M2 6l4 4 4-4" stroke="#2E1065" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}