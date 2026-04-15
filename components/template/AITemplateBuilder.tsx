'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import CheckoutFlow from '@/components/checkout/CheckoutFlow';

interface Page { id: string; name: string; detail: string; }
type Step = 'form' | 'generating' | 'result';

export default function AITemplateBuilder() {
  const { user, pricing } = useAuth();
  const router = useRouter();

  const [pages,       setPages]       = useState<Page[]>([{ id: '1', name: '', detail: '' }]);
  const [theme,       setTheme]       = useState('');
  const [step,        setStep]        = useState<Step>('form');
  const [html,        setHtml]        = useState('');
  const [error,       setError]       = useState('');
  const [progress,    setProgress]    = useState(0);
  const [showCheckout,setShowCheckout]= useState(false);
  const [purchased,   setPurchased]   = useState(false);

  const iframeRef   = useRef<HTMLIFrameElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addPage    = () => setPages((p) => [...p, { id: Date.now().toString(), name: '', detail: '' }]);
  const removePage = (id: string) => { if (pages.length > 1) setPages((p) => p.filter((x) => x.id !== id)); };
  const updatePage = (id: string, f: 'name' | 'detail', v: string) =>
    setPages((p) => p.map((x) => x.id === id ? { ...x, [f]: v } : x));

  const startProgress = () => {
    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress((p) => { if (p >= 90) { clearInterval(progressRef.current!); return 90; } return p + Math.random() * 8; });
    }, 600);
  };
  const stopProgress = () => { clearInterval(progressRef.current!); setProgress(100); };

  const handleGenerate = async () => {
    const filled = pages.filter((p) => p.name.trim());
    if (!filled.length) { setError('Tambahkan minimal 1 halaman.'); return; }
    if (!theme.trim())  { setError('Isi tema terlebih dahulu.'); return; }
    setError(''); setStep('generating'); setPurchased(false); startProgress();
    try {
      const res  = await fetch('/api/generate-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages: filled, theme }),
      });
      const data = await res.json();
      stopProgress();
      if (!res.ok || !data.html) throw new Error(data.error ?? 'Gagal.');
      setHtml(data.html);
      setStep('result');
    } catch (e: unknown) {
      stopProgress();
      setError(e instanceof Error ? e.message : 'Gagal generate.');
      setStep('form');
    }
  };

  useEffect(() => {
    if (step === 'result' && iframeRef.current && html) {
      const doc = iframeRef.current.contentDocument;
      if (doc) { doc.open(); doc.write(html); doc.close(); }
    }
  }, [step, html]);

  const downloadHtml = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    a.download = 'landing-page.html'; a.click();
  };

  const handleBuy = () => {
    if (!user) { router.push('/login?redirect=/templates'); return; }
    setShowCheckout(true);
  };

  /* ── GENERATING ── */
  if (step === 'generating') return (
    <div className="rounded-3xl p-10 flex flex-col items-center text-center"
      style={{ background: 'linear-gradient(135deg,#2E1065,#1e0a45)', minHeight: '420px', border: '2px solid #FACC1530' }}>
      <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8 text-4xl"
        style={{ background: 'linear-gradient(135deg,#FACC15,#f59e0b)', boxShadow: '0 0 60px #FACC1550', animation: 'pulse 2s ease-in-out infinite' }}>
        ✨
      </div>
      <h3 className="text-2xl font-black mb-3" style={{ color: '#FACC15', fontFamily: "'Georgia',serif" }}>AI sedang membangun template kamu...</h3>
      <p className="text-sm mb-10" style={{ color: '#ffffff60' }}>Harap tunggu 20–40 detik</p>
      <div className="w-full max-w-sm">
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#ffffff10' }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(progress,100)}%`, background: 'linear-gradient(90deg,#FACC15,#f59e0b)' }} />
        </div>
        <div className="text-xs mt-2 font-bold" style={{ color: '#ffffff40' }}>{Math.round(Math.min(progress,100))}%</div>
      </div>
      <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
    </div>
  );

  /* ── RESULT ── */
  if (step === 'result') return (
    <div className="flex flex-col gap-4">
      {showCheckout && (
        <CheckoutFlow
          type="ai-generated"
          templateTitle={`AI — ${theme.slice(0,40)}`}
          aiHtmlCode={html}
          onSuccess={() => { setShowCheckout(false); setPurchased(true); }}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {/* Actions bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 rounded-2xl"
        style={{ background: '#2E1065', border: '1.5px solid #FACC1530' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#4ade80' }} />
          <span className="text-sm font-bold" style={{ color: '#FFF' }}>Template berhasil dibuat! 🎉</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => window.open(URL.createObjectURL(new Blob([html],{type:'text/html'})),'_blank')}
            className="px-4 py-2 rounded-full text-xs font-bold hover:scale-105 transition-all" style={{ background: '#FFF', color: '#2E1065' }}>
            👁 Full Preview
          </button>
          <button onClick={downloadHtml}
            className="px-4 py-2 rounded-full text-xs font-bold hover:scale-105 transition-all" style={{ background: '#FACC15', color: '#2E1065' }}>
            ⬇ Download
          </button>
          {purchased ? (
            <div className="px-4 py-2 rounded-full text-xs font-bold" style={{ background: '#4ade80', color: '#fff' }}>✅ Sudah Dibeli</div>
          ) : (
            <button onClick={handleBuy}
              className="px-4 py-2 rounded-full text-xs font-bold hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(135deg,#4ade80,#22c55e)', color: '#fff' }}>
              🛒 Beli — mulai Rp{pricing.aiOnly}rb
            </button>
          )}
          <button onClick={() => { setStep('form'); setHtml(''); setPurchased(false); }}
            className="px-4 py-2 rounded-full text-xs font-bold" style={{ background: '#ffffff15', color: '#ffffff80', border: '1px solid #ffffff20' }}>
            ↺ Buat Ulang
          </button>
        </div>
      </div>

      {!user && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: '#FFFBEB', color: '#92400E', border: '1px solid #FDE68A' }}>
          ⚠ <a href="/login" className="font-bold underline">Login</a> untuk membeli dan mengirim template ke admin.
        </div>
      )}
      {purchased && (
        <div className="px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: '#DCFCE7', color: '#16A34A', border: '1px solid #86efac' }}>
          ✅ Pesanan masuk! Admin akan segera memproses website kamu.
        </div>
      )}

      <div className="rounded-2xl overflow-hidden" style={{ height: '680px', border: '2px solid #2E106518' }}>
        <iframe ref={iframeRef} title="Generated Template" className="w-full h-full" sandbox="allow-same-origin allow-scripts" />
      </div>
    </div>
  );

  /* ── FORM ── */
  return (
    <div className="rounded-3xl overflow-hidden" style={{ border: '1.5px solid #2E106514', boxShadow: '0 8px 40px #2E106508' }}>
      <div className="px-8 py-7 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#2E1065,#1e0a45)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle,#ffffff06 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ background: '#FACC15', color: '#2E1065' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2E1065' }} /> Fitur AI
          </div>
          <h2 className="text-2xl font-black mb-1.5" style={{ color: '#FFF', fontFamily: "'Georgia',serif", letterSpacing: '-0.03em' }}>
            Buat Template Mu Sendiri ✨
          </h2>
          <p className="text-sm" style={{ color: '#ffffff60' }}>Generate landing page, lalu pilih paket & bayar.</p>
          <div className="mt-3 inline-flex items-center gap-3 px-3 py-2 rounded-full" style={{ background: '#ffffff10' }}>
            <span className="text-xs" style={{ color: '#FACC15' }}>💡 Paket AI mulai <strong>Rp{pricing.aiOnly}rb</strong></span>
            <span className="text-xs" style={{ color: '#ffffff40' }}>vs template manual Rp{pricing.templateOnly}rb+</span>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col gap-8" style={{ background: '#FDFCFF' }}>

        {/* Tema */}
        <div>
          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#2E1065' }}>
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: '#2E1065', color: '#FACC15' }}>3</span>
            Tema & Keperluan Website
          </label>
          <textarea value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="Contoh: Website untuk brand fashion lokal yang menjual pakaian batik modern..."
            rows={3} className="w-full px-5 py-4 rounded-2xl text-sm resize-none outline-none transition-all"
            style={{ background: '#FFF', border: '1.5px solid #2E106514', color: '#2E1065', fontFamily: 'inherit', lineHeight: '1.6' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#2E106540')}
            onBlur={(e)  => (e.currentTarget.style.borderColor = '#2E106514')} />
        </div>

        {/* Pages */}
        <div>
          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#2E1065' }}>
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: '#2E1065', color: '#FACC15' }}>1</span>
            Halaman <span className="font-normal normal-case tracking-normal ml-1" style={{ color: '#2E106550' }}>— tambah section</span>
          </label>
          <div className="flex flex-col gap-3">
            {pages.map((page, idx) => (
              <div key={page.id} className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #2E106514', background: '#FFF' }}>
                <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#F8F7FF', borderBottom: '1px solid #2E10650A' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0" style={{ background: '#2E1065', color: '#FACC15' }}>{idx + 1}</div>
                  <input type="text" value={page.name} onChange={(e) => updatePage(page.id,'name',e.target.value)}
                    placeholder="Nama halaman... (Hero, Tentang Kami, Layanan)" className="flex-1 bg-transparent text-sm font-bold outline-none" style={{ color: '#2E1065' }} />
                  {pages.length > 1 && (
                    <button onClick={() => removePage(page.id)} className="w-6 h-6 rounded-full flex items-center justify-center text-xs hover:scale-110 transition-all" style={{ background: '#FEE2E2', color: '#DC2626' }}>×</button>
                  )}
                </div>
                <div className="px-4 pt-3 pb-4">
                  <label className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: '#2E106550' }}>Detail isi halaman ini</label>
                  <textarea value={page.detail} onChange={(e) => updatePage(page.id,'detail',e.target.value)}
                    placeholder={`Jelaskan konten halaman "${page.name||`Halaman ${idx+1}`}"...`} rows={2}
                    className="w-full text-sm resize-none outline-none" style={{ background: 'transparent', border: 'none', color: '#2E1065', fontFamily: 'inherit', lineHeight: '1.6' }} />
                </div>
              </div>
            ))}
            <button onClick={addPage} className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all hover:scale-[1.01]"
              style={{ background: '#F0EBF8', color: '#2E1065', border: '1.5px dashed #2E106330' }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center font-black" style={{ background: '#2E1065', color: '#FACC15' }}>+</span>
              Tambah Halaman
            </button>
          </div>
        </div>

        {error && (
          <div className="px-5 py-3 rounded-2xl text-sm font-semibold" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5' }}>⚠ {error}</div>
        )}

        <div className="rounded-2xl p-5 flex items-center justify-between gap-4" style={{ background: '#F0EBF8', border: '1.5px solid #2E106514' }}>
          <div className="text-sm" style={{ color: '#2E106570' }}>
            <span className="font-black" style={{ color: '#2E1065' }}>{pages.filter((p) => p.name.trim()).length}</span> halaman ·{' '}
            <span className="font-black" style={{ color: '#2E1065' }}>{theme.trim() ? '✓' : '—'}</span> tema
          </div>
          <button onClick={handleGenerate}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-black transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#2E1065,#4c1d95)', color: '#FACC15', boxShadow: '0 8px 30px #2E106330' }}>
            ✨ Generate Template AI
          </button>
        </div>
      </div>
    </div>
  );
}
