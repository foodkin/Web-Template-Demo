'use client';

import { useState, useMemo } from 'react';
import { allTemplates, categories } from '@/data/templates';
import TemplateCard from '@/components/template/TemplateCard';
import AITemplateBuilder from '@/components/template/AITemplateBuilder';

const sortOptions = [
  { value: 'popular', label: 'Terpopuler' },
  { value: 'newest', label: 'Terbaru' },
  { value: 'price-asc', label: 'Harga: Rendah ke Tinggi' },
  { value: 'price-desc', label: 'Harga: Tinggi ke Rendah' },
  { value: 'pages-desc', label: 'Halaman Terbanyak' },
];

type Tab = 'gallery' | 'builder';

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('gallery');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filtered = useMemo(() => {
    let result = [...allTemplates];

    if (activeCategory !== 'Semua') {
      result = result.filter((t) => t.category === activeCategory);
    }

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
      default:
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>

      {/* ── TAB SWITCHER ── */}
      <section
        className="sticky top-0 z-30 px-6 py-4 border-b"
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(12px)',
          borderColor: '#2E106512',
          boxShadow: '0 2px 16px #2E106508',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">

          {/* Tab buttons */}
          <div
            className="flex items-center rounded-full p-1 flex-shrink-0"
            style={{ background: '#F0EBF8', border: '1.5px solid #2E106514' }}
          >
            <button
              onClick={() => setActiveTab('gallery')}
              className="px-5 py-2 rounded-full text-xs font-bold transition-all duration-200"
              style={{
                background: activeTab === 'gallery' ? '#2E1065' : 'transparent',
                color: activeTab === 'gallery' ? '#FACC15' : '#2E106560',
              }}
            >
              📦 Pilih Template
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className="px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5"
              style={{
                background: activeTab === 'builder' ? '#2E1065' : 'transparent',
                color: activeTab === 'builder' ? '#FACC15' : '#2E106560',
              }}
            >
              ✨ Buat Sendiri
              <span
                className="px-1.5 py-0.5 rounded-full text-[9px] font-black"
                style={{
                  background: activeTab === 'builder' ? '#FACC15' : '#2E1065',
                  color: activeTab === 'builder' ? '#2E1065' : '#FACC15',
                }}
              >
                AI
              </span>
            </button>
          </div>

          {/* Filters — only show on gallery tab */}
          {activeTab === 'gallery' && (
            <>
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
            </>
          )}
        </div>
      </section>

      {/* ── GALLERY TAB ── */}
      {activeTab === 'gallery' && (
        <section className="relative py-12 px-6 overflow-hidden">
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

            {/* Prompt to try AI builder */}
            <div
              className="mt-16 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
              style={{
                background: 'linear-gradient(135deg, #2E1065 0%, #1e0a45 100%)',
                border: '1.5px solid #FACC1520',
              }}
            >
              <div className="text-5xl">✨</div>
              <div className="flex-1">
                <h3
                  className="font-black text-lg mb-1"
                  style={{ color: '#FFFFFF', fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
                >
                  Tidak menemukan yang cocok?
                </h3>
                <p className="text-sm" style={{ color: '#ffffff60' }}>
                  Gunakan fitur AI kami untuk generate landing page sesuai kebutuhan bisnis kamu.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('builder')}
                className="px-6 py-3 rounded-full text-sm font-black transition-all duration-200 hover:scale-105 flex-shrink-0"
                style={{ background: '#FACC15', color: '#2E1065', boxShadow: '0 4px 20px #FACC1440' }}
              >
                Coba AI Generator →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── BUILDER TAB ── */}
      {activeTab === 'builder' && (
        <section className="relative py-12 px-6 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #2E106315 1.2px, transparent 1.2px)`,
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <AITemplateBuilder />
          </div>
        </section>
      )}
    </div>
  );
}
