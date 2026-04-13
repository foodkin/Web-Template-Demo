'use client';

import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { allTemplates } from '@/data/templates';

export default function AdminSettingsPage() {
  const { pricing, savePricing } = useAuth();
  const [aiPackage, setAiPackage] = useState(pricing.aiPackage);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    savePricing({ aiPackage });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const avgTemplatePrice = Math.round(allTemplates.reduce((sum, t) => sum + t.price, 0) / allTemplates.length);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{ color: '#2E1065', fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>
          Pengaturan
        </h1>
        <p className="text-sm" style={{ color: '#2E106560' }}>Kelola harga dan konfigurasi platform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── PAKET HARGA ── */}
        <div className="rounded-3xl overflow-hidden" style={{ border: '1.5px solid #2E106514' }}>
          <div className="px-6 py-5" style={{ background: 'linear-gradient(135deg, #2E1065, #1e0a45)', borderBottom: '1px solid #FACC1520' }}>
            <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#FACC1580' }}>Konfigurasi</div>
            <h2 className="text-lg font-black" style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif' }}>Harga Paket</h2>
          </div>

          <div className="p-6" style={{ background: '#FFFFFF' }}>

            {/* AI Package */}
            <div className="mb-6 p-5 rounded-2xl" style={{ background: '#F0EBF8', border: '1.5px solid #2E106514' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">✨</span>
                    <span className="font-black text-sm" style={{ color: '#2E1065' }}>Paket AI Generate</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase" style={{ background: '#FACC15', color: '#2E1065' }}>
                      Lebih Murah
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#2E106560' }}>Harga untuk user yang beli template hasil AI</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-bold" style={{ color: '#2E1065' }}>Rp</span>
                <input
                  type="number"
                  value={aiPackage}
                  onChange={(e) => setAiPackage(Number(e.target.value))}
                  min={10}
                  max={500}
                  className="flex-1 px-4 py-3 rounded-xl text-lg font-black outline-none transition-all"
                  style={{ background: '#FFFFFF', border: '1.5px solid #2E106520', color: '#2E1065' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#2E106550'; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = '#2E106520'; }}
                />
                <span className="text-sm font-bold" style={{ color: '#2E1065' }}>ribu</span>
              </div>

              {aiPackage >= avgTemplatePrice && (
                <div className="mt-3 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: '#FEF2F2', color: '#DC2626' }}>
                  ⚠ Harga AI (Rp{aiPackage}rb) lebih mahal dari rata-rata template (Rp{avgTemplatePrice}rb). Disarankan lebih murah.
                </div>
              )}
            </div>

            {/* Template prices reference */}
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#2E106550' }}>
                Referensi Harga Template Tersedia
              </p>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                {allTemplates.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm"
                    style={{ background: '#F8F7FF', border: '1px solid #2E106508' }}
                  >
                    <span style={{ color: '#2E1065' }}>{t.title}</span>
                    <span className="font-black" style={{ color: '#2E1065' }}>Rp{t.price}rb</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 px-4 py-2 rounded-xl flex justify-between text-sm" style={{ background: '#2E1065' }}>
                <span style={{ color: '#ffffff70' }}>Rata-rata harga template</span>
                <span className="font-black" style={{ color: '#FACC15' }}>Rp{avgTemplatePrice}rb</span>
              </div>
            </div>

            {/* Save */}
            <button
              onClick={handleSave}
              className="w-full py-3.5 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
              style={{ background: saved ? '#DCFCE7' : 'linear-gradient(135deg, #2E1065, #4c1d95)', color: saved ? '#16A34A' : '#FACC15', boxShadow: saved ? 'none' : '0 8px 24px #2E106330' }}
            >
              {saved ? '✅ Tersimpan!' : 'Simpan Pengaturan'}
            </button>
          </div>
        </div>

        {/* ── RINGKASAN HARGA ── */}
        <div className="rounded-3xl overflow-hidden" style={{ border: '1.5px solid #2E106514' }}>
          <div className="px-6 py-5" style={{ background: '#F8F7FF', borderBottom: '1px solid #2E106510' }}>
            <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#2E106550' }}>Info</div>
            <h2 className="text-lg font-black" style={{ color: '#2E1065', fontFamily: 'Georgia, serif' }}>Perbandingan Harga</h2>
          </div>

          <div className="p-6 flex flex-col gap-4" style={{ background: '#FFFFFF' }}>
            {/* AI package */}
            <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #2E1065, #4c1d95)', boxShadow: '0 8px 24px #2E106320' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">✨</span>
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#FACC1580' }}>Paket AI Generate</span>
              </div>
              <div className="text-3xl font-black" style={{ color: '#FACC15', letterSpacing: '-0.04em' }}>Rp{aiPackage}rb</div>
              <div className="text-xs mt-1" style={{ color: '#ffffff50' }}>User generate & beli template hasil AI</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['Generate unlimited section', 'HTML code siap pakai', 'Admin proses setup'].map((f) => (
                  <span key={f} className="text-[10px] px-2 py-1 rounded-full" style={{ background: '#ffffff15', color: '#ffffff80' }}>✓ {f}</span>
                ))}
              </div>
            </div>

            {/* Template range */}
            <div className="p-5 rounded-2xl" style={{ background: '#F8F7FF', border: '1.5px solid #2E106510' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🎨</span>
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#2E106560' }}>Template Tersedia</span>
              </div>
              <div className="text-3xl font-black" style={{ color: '#2E1065', letterSpacing: '-0.04em' }}>
                Rp{Math.min(...allTemplates.map(t => t.price))}rb – Rp{Math.max(...allTemplates.map(t => t.price))}rb
              </div>
              <div className="text-xs mt-1" style={{ color: '#2E106550' }}>Harga bervariasi per template (sudah ditentukan)</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['Design premium', 'Multi-halaman', 'Admin setup & revisi'].map((f) => (
                  <span key={f} className="text-[10px] px-2 py-1 rounded-full" style={{ background: '#2E10650A', color: '#2E106560' }}>✓ {f}</span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl text-xs" style={{ background: '#FFFBEB', color: '#92400E', border: '1px solid #FDE68A' }}>
              💡 <strong>Tips:</strong> Pastikan harga AI selalu lebih murah dari template tersedia agar user tertarik generate sendiri.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
