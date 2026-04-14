'use client';

import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { allTemplates } from '@/data/templates';
import type { PackageType } from '@/lib/auth';

// need to import PACKAGE_LABELS from auth since it's defined there
import { PACKAGE_LABELS as PL } from '@/lib/auth';

const PACKAGES: { id: PackageType; key: keyof ReturnType<typeof useAuth>['pricing']; icon: string; desc: string; isAI: boolean }[] = [
  { id: 'template-only',    key: 'templateOnly',    icon: '🎨', desc: 'Template premium saja, tanpa hosting',               isAI: false },
  { id: 'template-hosting', key: 'templateHosting', icon: '🌐', desc: 'Template premium + hosting 1 tahun + SSL',           isAI: false },
  { id: 'ai-only',          key: 'aiOnly',          icon: '✨', desc: 'Template AI generate saja, tanpa hosting',           isAI: true  },
  { id: 'ai-hosting',       key: 'aiHosting',       icon: '🚀', desc: 'Template AI generate + hosting 1 tahun + SSL',      isAI: true  },
];

export default function AdminSettingsPage() {
  const { pricing, savePricing } = useAuth();
  const [values, setValues] = useState({ ...pricing });
  const [saved, setSaved]   = useState(false);

  const handleSave = () => {
    savePricing(values);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const avgTemplate = Math.round(
    allTemplates.reduce((s, t) => s + t.price, 0) / allTemplates.length
  );

  const aiCheaperThanManual =
    values.aiOnly < values.templateOnly &&
    values.aiHosting < values.templateHosting;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{ color: '#2E1065', fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>
          Pengaturan
        </h1>
        <p className="text-sm" style={{ color: '#2E106560' }}>Kelola harga paket yang tersedia untuk user</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── HARGA PAKET ── */}
        <div className="xl:col-span-2 rounded-3xl overflow-hidden" style={{ border: '1.5px solid #2E106514' }}>
          <div className="px-6 py-5" style={{ background: 'linear-gradient(135deg,#2E1065,#1e0a45)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#FACC1560' }}>Konfigurasi</p>
            <h2 className="text-lg font-black" style={{ color: '#FFF', fontFamily: 'Georgia, serif' }}>Harga Paket</h2>
            <p className="text-xs mt-1" style={{ color: '#ffffff50' }}>Pastikan harga paket AI selalu lebih murah dari paket template manual.</p>
          </div>

          <div className="p-6" style={{ background: '#FFF' }}>
            {/* Template packages */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 rounded-full" style={{ background: '#2E1065' }} />
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#2E1065' }}>Paket Template Manual</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PACKAGES.filter((p) => !p.isAI).map((pkg) => (
                  <div key={pkg.id} className="p-4 rounded-2xl" style={{ background: '#F8F7FF', border: '1.5px solid #2E106510' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{pkg.icon}</span>
                      <div>
                        <p className="text-sm font-black" style={{ color: '#2E1065' }}>{PL[pkg.id]}</p>
                        <p className="text-[10px]" style={{ color: '#2E106550' }}>{pkg.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: '#2E106560' }}>Rp</span>
                      <input
                        type="number"
                        value={values[pkg.key as keyof typeof values]}
                        onChange={(e) => setValues((v) => ({ ...v, [pkg.key]: Number(e.target.value) }))}
                        min={10} max={9999}
                        className="flex-1 px-3 py-2 rounded-xl text-base font-black outline-none"
                        style={{ background: '#FFF', border: '1.5px solid #2E106520', color: '#2E1065' }}
                      />
                      <span className="text-sm font-bold" style={{ color: '#2E106560' }}>rb</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI packages */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 rounded-full" style={{ background: '#FACC15' }} />
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#2E1065' }}>Paket Template AI</p>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase" style={{ background: '#FACC15', color: '#2E1065' }}>Lebih Murah</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PACKAGES.filter((p) => p.isAI).map((pkg) => (
                  <div key={pkg.id} className="p-4 rounded-2xl" style={{ background: '#FFFBEB', border: '1.5px solid #FACC1530' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{pkg.icon}</span>
                      <div>
                        <p className="text-sm font-black" style={{ color: '#2E1065' }}>{PL[pkg.id]}</p>
                        <p className="text-[10px]" style={{ color: '#2E106550' }}>{pkg.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: '#2E106560' }}>Rp</span>
                      <input
                        type="number"
                        value={values[pkg.key as keyof typeof values]}
                        onChange={(e) => setValues((v) => ({ ...v, [pkg.key]: Number(e.target.value) }))}
                        min={10} max={9999}
                        className="flex-1 px-3 py-2 rounded-xl text-base font-black outline-none"
                        style={{ background: '#FFF', border: '1.5px solid #FACC1540', color: '#2E1065' }}
                      />
                      <span className="text-sm font-bold" style={{ color: '#2E106560' }}>rb</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning if AI not cheaper */}
            {!aiCheaperThanManual && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5' }}>
                ⚠ Harga paket AI harus lebih murah dari paket template manual agar user tertarik.
              </div>
            )}

            <button onClick={handleSave}
              className="w-full py-3.5 rounded-xl text-sm font-black transition-all hover:scale-[1.01]"
              style={{ background: saved ? '#DCFCE7' : 'linear-gradient(135deg,#2E1065,#4c1d95)', color: saved ? '#16A34A' : '#FACC15', boxShadow: saved ? 'none' : '0 8px 24px #2E106330' }}>
              {saved ? '✅ Tersimpan!' : 'Simpan Semua Pengaturan'}
            </button>
          </div>
        </div>

        {/* ── PREVIEW PAKET ── */}
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl overflow-hidden" style={{ border: '1.5px solid #2E106514' }}>
            <div className="px-5 py-4" style={{ background: '#F8F7FF', borderBottom: '1px solid #2E106510' }}>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#2E1065' }}>Preview Paket</p>
            </div>
            <div className="p-4 flex flex-col gap-3" style={{ background: '#FFF' }}>
              {PACKAGES.map((pkg) => (
                <div key={pkg.id}
                  className="flex items-center justify-between px-4 py-3 rounded-xl"
                  style={{ background: pkg.isAI ? '#FFFBEB' : '#F8F7FF', border: `1px solid ${pkg.isAI ? '#FACC1530' : '#2E106510'}` }}>
                  <div className="flex items-center gap-2">
                    <span>{pkg.icon}</span>
                    <span className="text-xs font-bold" style={{ color: '#2E1065' }}>{PL[pkg.id]}</span>
                    {pkg.isAI && <span className="text-[9px] px-1.5 py-0.5 rounded-full font-black" style={{ background: '#FACC15', color: '#2E1065' }}>AI</span>}
                  </div>
                  <span className="text-sm font-black" style={{ color: '#2E1065' }}>Rp{values[pkg.key as keyof typeof values]}rb</span>
                </div>
              ))}
            </div>
          </div>

          {/* Template avg reference */}
          <div className="rounded-3xl overflow-hidden" style={{ border: '1.5px solid #2E106514' }}>
            <div className="px-5 py-4" style={{ background: '#F8F7FF', borderBottom: '1px solid #2E106510' }}>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#2E1065' }}>Referensi Harga Template</p>
            </div>
            <div className="p-4" style={{ background: '#FFF' }}>
              <div className="max-h-52 overflow-y-auto flex flex-col gap-1.5 pr-1 mb-3">
                {allTemplates.map((t) => (
                  <div key={t.id} className="flex justify-between px-3 py-2 rounded-lg text-xs" style={{ background: '#F8F7FF' }}>
                    <span style={{ color: '#2E106580' }}>{t.title}</span>
                    <span className="font-black" style={{ color: '#2E1065' }}>Rp{t.price}rb</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between px-3 py-2.5 rounded-xl text-sm" style={{ background: '#2E1065' }}>
                <span style={{ color: '#ffffff60' }}>Rata-rata</span>
                <span className="font-black" style={{ color: '#FACC15' }}>Rp{avgTemplate}rb</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
