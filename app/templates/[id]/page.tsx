'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { allTemplates, Template } from '@/data/templates';
import TemplatePreview from '@/components/template/TemplatePreview';
import CheckoutFlow from '@/components/checkout/CheckoutFlow';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

export default function TemplateDetailPage({ params }: { params: { id: string } }) {
  const template = allTemplates.find((t) => t.id === Number(params.id));
  if (!template) return notFound();
  return <TemplateDetailClient template={template} />;
}

function TemplateDetailClient({ template }: { template: (typeof allTemplates)[number] }) {
  const { user } = useAuth();
  const router = useRouter();

  const [showPreview,  setShowPreview]  = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchased,    setPurchased]    = useState(false);

  const related = useMemo(() => {
    const sameCat = allTemplates.filter((t) => t.category === template.category && t.id !== template.id);
    const others  = allTemplates.filter((t) => t.category !== template.category && t.id !== template.id);
    return [...sameCat, ...others].slice(0, 3);
  }, [template]);

  const previewUrl = `/api/preview/${template.id}`;

  useEffect(() => {
    fetch(previewUrl, { method: 'HEAD' })
      .then((r) => { if (r.ok) setPreviewReady(true); })
      .catch(() => {});
  }, [previewUrl]);

  const handleBuy = () => {
    if (!user) { router.push(`/login?redirect=/templates/${template.id}`); return; }
    setShowCheckout(true);
  };

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>

      {showCheckout && (
        <CheckoutFlow
          type="template"
          templateId={template.id}
          templateTitle={template.title}
          templateCategory={template.category}
          onSuccess={() => { setShowCheckout(false); setPurchased(true); }}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {purchased && (
        <div className="px-6 py-4 text-center text-sm font-bold" style={{ background: '#DCFCE7', color: '#16A34A', borderBottom: '1px solid #86efac' }}>
          ✅ Pembelian berhasil! Admin sedang memproses pesanan kamu.
        </div>
      )}

      {showPreview && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#0a0a0a' }}>
          <div className="flex items-center gap-4 px-6 py-3 flex-shrink-0" style={{ background: '#1a1a1a', borderBottom: '1px solid #ffffff10' }}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" /><div className="w-3 h-3 rounded-full bg-yellow-500" /><div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 h-8 rounded-lg px-4 flex items-center text-xs" style={{ background: '#2a2a2a', color: '#ffffff40' }}>Preview: {template.title}</div>
            <button onClick={() => setShowPreview(false)} className="px-4 py-2 rounded-full text-xs font-bold" style={{ background: '#FACC15', color: '#2E1065' }}>✕ Tutup</button>
          </div>
          <iframe src={previewUrl} title={`Preview: ${template.title}`} className="flex-1 w-full border-0" />
        </div>
      )}

      <div className="px-6 py-3 border-b" style={{ borderColor: '#2E106510' }}>
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs" style={{ color: '#2E106550' }}>
          <Link href="/" style={{ color: '#2E1065' }}>Home</Link><span>/</span>
          <Link href="/templates" style={{ color: '#2E1065' }}>Template</Link><span>/</span>
          <span style={{ color: '#2E106580' }}>{template.title}</span>
        </div>
      </div>

      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
          <div>
            <TemplatePreview template={template} className="aspect-[4/3]" />
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.03]"
                  style={{ aspectRatio: '4/3', background: template.headerBg, border: i === 1 ? `2px solid ${template.headerAccent}` : '2px solid transparent', boxShadow: '0 2px 12px #2E106510' }}>
                  <div className="w-full h-full flex flex-col p-3">
                    <div className="flex gap-1 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-300" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-300" /><div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 justify-center">
                      {template.thumb.slice(0, 3).map((b, idx) => <div key={idx} style={{ width: b.w, height: '6px', background: b.bg, borderRadius: b.br }} />)}
                    </div>
                    <div className="text-[8px] font-bold mt-2" style={{ color: template.headerAccent }}>Halaman {i}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider" style={{ background: '#FACC15', color: '#2E1065' }}>{template.badge}</span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: '#F0EBF8', color: '#2E1065' }}>{template.category}</span>
            </div>

            <h1 className="leading-tight mb-4" style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#2E1065', fontFamily: "'Georgia',serif" }}>
              {template.title}
            </h1>

            <div className="flex items-center gap-2 mb-5">
              <span className="text-sm font-bold" style={{ color: '#FACC15' }}>★★★★★</span>
              <span className="text-xs font-semibold" style={{ color: '#2E1065' }}>4.9</span>
              <span className="text-xs" style={{ color: '#2E106550' }}>(128 ulasan)</span>
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: '#2E106580' }}>{template.desc}</p>

            <div className="grid grid-cols-3 gap-4 mb-8 p-5 rounded-2xl" style={{ background: '#F8F7FF', border: '1.5px solid #2E106512' }}>
              {[{ label: 'Halaman', value: `${template.pages}` }, { label: 'Revisi', value: '1x Gratis' }, { label: 'Setup', value: '24 Jam' }].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-black text-lg" style={{ color: '#2E1065' }}>{s.value}</div>
                  <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: '#2E106550' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#2E1065' }}>Termasuk Halaman</h3>
              <div className="flex flex-wrap gap-2">
                {template.features.map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: '#F0EBF8', color: '#2E1065' }}>✓ {f}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 rounded-2xl mb-4" style={{ background: '#2E1065', boxShadow: '0 8px 40px #2E106330' }}>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: '#ffffff50' }}>Mulai dari</div>
                  <div className="font-black text-3xl" style={{ color: '#FACC15', letterSpacing: '-0.04em' }}>Rp{template.price}rb</div>
                  <div className="text-xs mt-0.5" style={{ color: '#ffffff40' }}>pilih paket di langkah berikutnya</div>
                </div>
                <div className="text-right text-xs" style={{ color: '#ffffff40' }}>
                  <div>Template + Hosting</div>
                  <div className="font-bold" style={{ color: '#ffffff60' }}>tersedia</div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {purchased ? (
                  <div className="w-full py-3 rounded-full text-sm font-black text-center" style={{ background: '#4ade80', color: '#fff' }}>✅ Sudah Dibeli</div>
                ) : (
                  <button
                    onClick={handleBuy}
                    className="w-full py-3 rounded-full text-sm font-black transition-all hover:scale-105"
                    style={{ background: '#FACC15', color: '#2E1065', boxShadow: '0 4px 20px #FACC1440' }}
                  >
                    {user ? 'Pilih Paket & Beli →' : '🔒 Login untuk Beli'}
                  </button>
                )}
                {previewReady ? (
                  <button onClick={() => setShowPreview(true)} className="w-full py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                    style={{ background: 'transparent', color: '#ffffff80', border: '1.5px solid #ffffff20' }}>
                    👁 Preview Live
                  </button>
                ) : (
                  <a href={previewUrl} target="_blank" rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full text-sm font-semibold text-center block"
                    style={{ background: 'transparent', color: '#ffffff80', border: '1.5px solid #ffffff20' }}>
                    👁 Preview Live
                  </a>
                )}
              </div>
            </div>

            {!user && (
              <div className="px-4 py-3 rounded-xl text-sm" style={{ background: '#FFFBEB', color: '#92400E', border: '1px solid #FDE68A' }}>
                ⚠ Kamu perlu <Link href="/login" className="font-bold underline">login</Link> terlebih dahulu untuk melakukan pembelian.
              </div>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-14 px-6" style={{ background: '#F8F7FF', borderTop: '1px solid #2E106510' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-black" style={{ fontSize: 'clamp(20px,3vw,32px)', color: '#2E1065', fontFamily: "'Georgia',serif" }}>Template Serupa</h2>
              <Link href="/templates" className="text-sm font-bold px-4 py-2 rounded-full" style={{ background: '#2E1065', color: '#FACC15' }}>Semua →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((t: Template) => (
                <Link key={t.id} href={`/templates/${t.id}`} className="block group">
                  <div className="relative rounded-2xl overflow-hidden transition-all group-hover:-translate-y-1.5"
                    style={{ aspectRatio: '4/3', boxShadow: '0 4px 20px #2E106310', border: '2px solid transparent' }}>
                    <div className="absolute inset-0 flex flex-col p-5" style={{ background: t.headerBg }}>
                      <div className="flex gap-1.5 mb-4"><div className="w-2 h-2 rounded-full bg-red-300" /><div className="w-2 h-2 rounded-full bg-yellow-300" /><div className="w-2 h-2 rounded-full bg-green-300" /></div>
                      <div className="flex flex-col gap-2.5 flex-1 justify-center">
                        {t.thumb.map((b: any, i: number) => <div key={i} style={{ width: b.w, height: b.h, background: b.bg, borderRadius: b.br }} />)}
                      </div>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end" style={{ background: 'linear-gradient(to top,#2E1065DD 35%,transparent 100%)' }}>
                      <div className="p-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#FACC1590' }}>{t.category}</div>
                        <div className="font-black text-sm" style={{ color: '#FFF', fontFamily: "'Georgia',serif" }}>{t.title}</div>
                        <div className="text-xs font-bold" style={{ color: '#FACC15' }}>Rp{t.price}rb</div>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase z-10" style={{ background: '#FACC15', color: '#2E1065' }}>{t.badge}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
