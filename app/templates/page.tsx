'use client';

import { useState, useMemo } from 'react';
import { allTemplates, categories } from '@/data/templates';
import TemplateCard from '@/components/template/TemplateCard';

const sortOptions = [
  { value: 'popular', label: 'Terpopuler' },
  { value: 'newest', label: 'Terbaru' },
  { value: 'price-asc', label: 'Harga: Rendah ke Tinggi' },
  { value: 'price-desc', label: 'Harga: Tinggi ke Rendah' },
  { value: 'pages-desc', label: 'Halaman Terbanyak' },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filtered = useMemo(() => {
    let result = [...allTemplates];

    // Filter by category
    if (activeCategory !== 'Semua') {
      result = result.filter((t) => t.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.desc.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'pages-desc':
        result.sort((a, b) => b.pages - a.pages);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default: // popular — original order
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>

      {/* <section
        className="relative overflow-hidden pt-16 pb-14 px-6"
        style={{ background: '#2E1065' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff08 1.2px, transparent 1.2px)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div
          className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none pointer-events-none hidden md:block"
          style={{
            fontSize: 'clamp(120px, 18vw, 280px)',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '2px #ffffff08',
            lineHeight: 1,
            letterSpacing: '-0.05em',
            fontFamily: "'Georgia', serif",
          }}
        >
          WE
        </div>

        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: 'linear-gradient(90deg, #FACC15, #ffffff20)' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ background: '#FACC15', color: '#2E1065' }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#2E1065' }} />
            200+ Template Siap Pakai
          </div>

          <h1
            className="leading-tight mb-4"
            style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              fontFamily: "'Georgia', serif",
            }}
          >
            Semua Template
          </h1>
          <p className="text-base max-w-xl" style={{ color: '#ffffff70' }}>
            Temukan template yang tepat untuk bisnismu. Filter berdasarkan kategori, urutkan sesuai kebutuhan.
          </p>

          <div className="flex items-center gap-8 mt-8">
            {[
              { num: `${allTemplates.length}`, label: 'Template' },
              { num: '5', label: 'Kategori' },
              { num: '24 Jam', label: 'Setup' },
              { num: 'Gratis', label: 'Revisi 1x' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="font-black text-lg"
                  style={{ color: '#FACC15', letterSpacing: '-0.03em' }}
                >
                  {s.num}
                </div>
                <div className="text-[11px]" style={{ color: '#ffffff50' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div> 
        </div>
      </section> */}

      {/* ── FILTERS BAR ── */}
      <section
        className="sticky top-0 z-30 px-6 py-4 border-b"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderColor: '#2E106512',
          boxShadow: '0 2px 16px #2E106508',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: '#2E106550' }}
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Cari template..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm outline-none transition-all duration-200"
              style={{
                background: '#F8F7FF',
                border: '1.5px solid #2E106514',
                color: '#2E1065',
              }}
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105"
                style={{
                  background: activeCategory === cat ? '#2E1065' : '#F8F7FF',
                  color: activeCategory === cat ? '#FACC15' : '#2E106570',
                  border: activeCategory === cat ? '1.5px solid #2E1065' : '1.5px solid #2E106514',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="ml-auto text-xs font-semibold px-4 py-2 rounded-full outline-none cursor-pointer"
            style={{
              background: '#F8F7FF',
              border: '1.5px solid #2E106514',
              color: '#2E1065',
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="relative py-12 px-6 overflow-hidden">
        {/* Dot grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #2E106515 1.2px, transparent 1.2px)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Result count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm" style={{ color: '#2E106560' }}>
              Menampilkan{' '}
              <span className="font-bold" style={{ color: '#2E1065' }}>
                {filtered.length}
              </span>{' '}
              template
              {activeCategory !== 'Semua' && (
                <> dalam <span className="font-bold" style={{ color: '#2E1065' }}>{activeCategory}</span></>
              )}
            </p>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold px-3 py-1 rounded-full transition-all duration-200 hover:opacity-80"
                style={{ background: '#FACC15', color: '#2E1065' }}
              >
                ✕ Hapus filter
              </button>
            )}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-3xl"
                style={{ background: '#F0EBF8' }}
              >
                🔍
              </div>
              <h3
                className="text-xl font-black mb-2"
                style={{ color: '#2E1065', fontFamily: "'Georgia', serif" }}
              >
                Template tidak ditemukan
              </h3>
              <p className="text-sm max-w-sm mb-6" style={{ color: '#2E106560' }}>
                Coba kata kunci lain atau pilih kategori yang berbeda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Semua');
                }}
                className="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
                style={{ background: '#2E1065', color: '#FACC15' }}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      {/* <section
        className="relative overflow-hidden py-16 px-6 mx-6 mb-12 rounded-3xl"
        style={{ background: '#2E1065' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff06 1.2px, transparent 1.2px)`,
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ background: '#FACC15', color: '#2E1065' }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#2E1065' }} />
            Butuh Template Custom?
          </div>
          <h2
            className="leading-tight mb-4"
            style={{
              fontSize: 'clamp(24px, 4vw, 48px)',
              fontWeight: 900,
              color: '#FFFFFF',
              fontFamily: "'Georgia', serif",
              letterSpacing: '-0.03em',
            }}
          >
            Tidak menemukan yang cocok?
            <br />
            <span style={{ color: '#FACC15' }}>Kami buat untuk kamu.</span>
          </h2>
          <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: '#ffffff70' }}>
            Tim desainer kami siap membuat template sesuai identitas bisnis kamu dari nol. Konsultasi gratis!
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              className="px-7 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{ background: '#FACC15', color: '#2E1065', boxShadow: '0 4px 24px #FACC1540' }}
            >
              💬 Konsultasi Gratis
            </button>
            <button
              className="px-7 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: 'transparent',
                color: '#FFFFFF',
                border: '2px solid #ffffff30',
              }}
            >
              Lihat Portofolio
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
