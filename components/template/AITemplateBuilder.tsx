'use client';

import { useState, useRef, useEffect } from 'react';

interface Page {
  id: string;
  name: string;
  detail: string;
}

type Step = 'form' | 'generating' | 'result';

export default function AITemplateBuilder() {
  const [pages, setPages] = useState<Page[]>([{ id: '1', name: '', detail: '' }]);
  const [theme, setTheme] = useState('');
  const [step, setStep] = useState<Step>('form');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ─── Page management ─── */
  const addPage = () => {
    setPages((prev) => [
      ...prev,
      { id: Date.now().toString(), name: '', detail: '' },
    ]);
  };

  const removePage = (id: string) => {
    if (pages.length === 1) return;
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePage = (id: string, field: 'name' | 'detail', value: string) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  /* ─── Progress animation ─── */
  const startProgress = () => {
    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          if (progressRef.current) clearInterval(progressRef.current);
          return 90;
        }
        return prev + Math.random() * 8;
      });
    }, 600);
  };

  const stopProgress = () => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(100);
  };

  /* ─── Generate ─── */
  const handleGenerate = async () => {
    const filledPages = pages.filter((p) => p.name.trim());
    if (!filledPages.length) {
      setError('Tambahkan minimal 1 halaman dengan nama.');
      return;
    }
    if (!theme.trim()) {
      setError('Isi tema dan keperluan website terlebih dahulu.');
      return;
    }

    setError('');
    setStep('generating');
    startProgress();

    try {
      const res = await fetch('/api/generate-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages: filledPages, theme }),
      });

      const data = await res.json();
      stopProgress();

      if (!res.ok || !data.html) {
        throw new Error(data.error ?? 'Terjadi kesalahan.');
      }

      setGeneratedHtml(data.html);
      setStep('result');
    } catch (err: unknown) {
      stopProgress();
      setError(err instanceof Error ? err.message : 'Gagal generate template.');
      setStep('form');
    }
  };

  /* ─── Inject HTML into iframe ─── */
  useEffect(() => {
    if (step === 'result' && iframeRef.current && generatedHtml) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(generatedHtml);
        doc.close();
      }
    }
  }, [step, generatedHtml]);

  /* ─── Download ─── */
  const downloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ─── Open in new tab ─── */
  const openPreview = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  /* ─── GENERATING STATE ─── */
  if (step === 'generating') {
    return (
      <div
        className="rounded-3xl p-10 flex flex-col items-center justify-center text-center"
        style={{
          background: 'linear-gradient(135deg, #2E1065 0%, #1e0a45 100%)',
          minHeight: '420px',
          border: '2px solid #FACC1530',
        }}
      >
        {/* Pulse ring */}
        <div className="relative mb-8">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FACC15 0%, #f59e0b 100%)',
              boxShadow: '0 0 60px #FACC1550',
              animation: 'pulse-ring 2s ease-in-out infinite',
            }}
          >
            <span className="text-4xl">✨</span>
          </div>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid #FACC1540',
              animation: 'spin-slow 3s linear infinite',
            }}
          />
        </div>

        <h3
          className="text-2xl font-black mb-3"
          style={{ color: '#FACC15', letterSpacing: '-0.03em', fontFamily: "'Georgia', serif" }}
        >
          AI sedang membangun template kamu...
        </h3>
        <p className="text-sm mb-10" style={{ color: '#ffffff60' }}>
          Harap tunggu, proses ini memakan waktu 20–40 detik
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-sm">
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: '#ffffff10' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(90deg, #FACC15, #f59e0b)',
                boxShadow: '0 0 12px #FACC1580',
              }}
            />
          </div>
          <div className="text-xs mt-2 font-bold" style={{ color: '#ffffff40' }}>
            {Math.round(Math.min(progress, 100))}%
          </div>
        </div>

        <style>{`
          @keyframes pulse-ring {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  /* ─── RESULT STATE ─── */
  if (step === 'result') {
    return (
      <div className="flex flex-col gap-4">
        {/* Actions bar */}
        <div
          className="flex items-center justify-between px-5 py-3 rounded-2xl"
          style={{ background: '#2E1065', border: '1.5px solid #FACC1530' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade8080' }}
            />
            <span className="text-sm font-bold" style={{ color: '#FFFFFF' }}>
              Template berhasil dibuat! 🎉
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openPreview}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105"
              style={{ background: '#FFFFFF', color: '#2E1065' }}
            >
              👁 Full Preview
            </button>
            <button
              onClick={downloadHtml}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105"
              style={{ background: '#FACC15', color: '#2E1065' }}
            >
              ⬇ Download HTML
            </button>
            <button
              onClick={() => { setStep('form'); setGeneratedHtml(''); }}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:opacity-80"
              style={{ background: '#ffffff15', color: '#ffffff80', border: '1px solid #ffffff20' }}
            >
              ↺ Buat Ulang
            </button>
          </div>
        </div>

        {/* Iframe preview */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            height: '680px',
            border: '2px solid #2E106518',
            boxShadow: '0 12px 40px #2E106515',
          }}
        >
          <iframe
            ref={iframeRef}
            title="Generated Template Preview"
            className="w-full h-full"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </div>
    );
  }

  /* ─── FORM STATE ─── */
  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        border: '1.5px solid #2E106514',
        boxShadow: '0 8px 40px #2E106508',
      }}
    >
      {/* Header */}
      <div
        className="px-8 py-7 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2E1065 0%, #1e0a45 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff06 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
            style={{ background: '#FACC15', color: '#2E1065' }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#2E1065' }} />
            Fitur AI
          </div>
          <h2
            className="text-2xl font-black mb-1.5"
            style={{ color: '#FFFFFF', fontFamily: "'Georgia', serif", letterSpacing: '-0.03em' }}
          >
            Buat Template Mu Sendiri ✨
          </h2>
          <p className="text-sm" style={{ color: '#ffffff60' }}>
            Ceritakan kebutuhan website kamu, AI kami akan generate landing page yang siap pakai.
          </p>
        </div>
      </div>

      {/* Form body */}
      <div className="p-8 flex flex-col gap-8" style={{ background: '#FDFCFF' }}>

        {/* ── TEMA ── */}
        <div>
          <label
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-3"
            style={{ color: '#2E1065', letterSpacing: '0.1em' }}
          >
            <span
              className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black"
              style={{ background: '#2E1065', color: '#FACC15' }}
            >
              3
            </span>
            Tema & Keperluan Website
          </label>
          <textarea
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Contoh: Website untuk brand fashion lokal yang menjual pakaian batik modern, target pasar anak muda 20-35 tahun, kesan elegan dan kontemporer..."
            rows={3}
            className="w-full px-5 py-4 rounded-2xl text-sm resize-none outline-none transition-all duration-200"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #2E106514',
              color: '#2E1065',
              fontFamily: 'inherit',
              lineHeight: '1.6',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#2E106540'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#2E106514'; }}
          />
        </div>

        {/* ── HALAMAN (PAGES) ── */}
        <div>
          <label
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-4"
            style={{ color: '#2E1065', letterSpacing: '0.1em' }}
          >
            <span
              className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black"
              style={{ background: '#2E1065', color: '#FACC15' }}
            >
              1
            </span>
            Halaman
            <span className="font-normal normal-case tracking-normal ml-1" style={{ color: '#2E106550' }}>
              — tambah section yang kamu mau
            </span>
          </label>

          <div className="flex flex-col gap-3">
            {pages.map((page, idx) => (
              <div
                key={page.id}
                className="rounded-2xl overflow-hidden"
                style={{ border: '1.5px solid #2E106514', background: '#FFFFFF' }}
              >
                {/* Page header */}
                <div
                  className="flex items-center gap-3 px-4 py-3"
                  style={{ background: '#F8F7FF', borderBottom: '1px solid #2E10650A' }}
                >
                  <div
                    className="flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-black flex-shrink-0"
                    style={{ background: '#2E1065', color: '#FACC15' }}
                  >
                    {idx + 1}
                  </div>
                  <input
                    type="text"
                    value={page.name}
                    onChange={(e) => updatePage(page.id, 'name', e.target.value)}
                    placeholder="Nama halaman... (contoh: Hero, Tentang Kami, Layanan)"
                    className="flex-1 bg-transparent text-sm font-bold outline-none"
                    style={{ color: '#2E1065' }}
                  />
                  {pages.length > 1 && (
                    <button
                      onClick={() => removePage(page.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs transition-all hover:scale-110"
                      style={{ background: '#FEE2E2', color: '#DC2626' }}
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* ── DETAIL for this page ── */}
                <div className="px-4 pt-3 pb-4">
                  <label
                    className="text-[10px] font-black uppercase tracking-widest mb-2 block"
                    style={{ color: '#2E106550' }}
                  >
                    Detail isi halaman ini
                  </label>
                  <textarea
                    value={page.detail}
                    onChange={(e) => updatePage(page.id, 'detail', e.target.value)}
                    placeholder={`Jelaskan konten halaman "${page.name || `Halaman ${idx + 1}`}"... Contoh: Tampilkan headline utama, sub-headline, dan tombol CTA untuk trial gratis`}
                    rows={2}
                    className="w-full text-sm resize-none outline-none transition-all duration-200"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#2E1065',
                      fontFamily: 'inherit',
                      lineHeight: '1.6',
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Add page button */}
            <button
              onClick={addPage}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: '#F0EBF8',
                color: '#2E1065',
                border: '1.5px dashed #2E106530',
              }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-base font-black"
                style={{ background: '#2E1065', color: '#FACC15' }}
              >
                +
              </span>
              Tambah Halaman
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="px-5 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5' }}
          >
            ⚠ {error}
          </div>
        )}

        {/* Summary & Generate */}
        <div
          className="rounded-2xl p-5 flex items-center justify-between gap-4"
          style={{ background: '#F0EBF8', border: '1.5px solid #2E106514' }}
        >
          <div className="text-sm" style={{ color: '#2E106570' }}>
            <span className="font-black" style={{ color: '#2E1065' }}>
              {pages.filter((p) => p.name.trim()).length}
            </span>{' '}
            halaman ·{' '}
            <span className="font-black" style={{ color: '#2E1065' }}>
              {theme.trim() ? '✓' : '—'}
            </span>{' '}
            tema
          </div>
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-black transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #2E1065 0%, #4c1d95 100%)',
              color: '#FACC15',
              boxShadow: '0 8px 30px #2E106530',
            }}
          >
            <span>✨</span>
            Generate Template AI
          </button>
        </div>

      </div>
    </div>
  );
}
