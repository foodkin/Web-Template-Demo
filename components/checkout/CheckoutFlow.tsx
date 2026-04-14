'use client';

import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { PackageType, PACKAGE_LABELS } from '@/lib/auth';

/* ────────────────────────────────────────── */
/* Types                                       */
/* ────────────────────────────────────────── */
interface CheckoutFlowProps {
  /* Product info */
  type: 'template' | 'ai-generated';
  templateId?: number;
  templateTitle: string;
  templateCategory?: string;
  aiHtmlCode?: string;
  /* Callbacks */
  onSuccess: () => void;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;
type PayMethod = 'transfer' | 'qris' | 'kartu';

/* ────────────────────────────────────────── */
/* Step indicator                              */
/* ────────────────────────────────────────── */
const STEPS = ['Paket', 'Domain', 'Detail', 'Bayar'];

function StepBar({ current }: { current: Step }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const num   = (i + 1) as Step;
        const done  = num < current;
        const active = num === current;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300"
                style={{
                  background: done ? '#4ade80' : active ? '#2E1065' : '#F0EBF8',
                  color:      done ? '#fff'    : active ? '#FACC15' : '#2E106540',
                  boxShadow:  active ? '0 4px 16px #2E106330' : 'none',
                }}
              >
                {done ? '✓' : num}
              </div>
              <span className="text-[10px] font-bold" style={{ color: active ? '#2E1065' : '#2E106540' }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-2 mb-4 transition-all duration-500"
                style={{ background: done ? '#4ade80' : '#2E106514' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────── */
/* Main Component                              */
/* ────────────────────────────────────────── */
export default function CheckoutFlow({
  type, templateId, templateTitle, templateCategory, aiHtmlCode, onSuccess, onClose,
}: CheckoutFlowProps) {
  const { user, addOrder, pricing } = useAuth();

  /* State */
  const [step,        setStep]       = useState<Step>(1);
  const [pkg,         setPkg]        = useState<PackageType | null>(null);
  const [domain,      setDomain]     = useState('');
  const [domainErr,   setDomainErr]  = useState('');
  const [phone,       setPhone]      = useState('');
  const [email,       setEmail]      = useState(user?.email ?? '');
  const [message,     setMessage]    = useState('');
  const [detailErr,   setDetailErr]  = useState('');
  const [payMethod,   setPayMethod]  = useState<PayMethod | null>(null);
  const [payStep,     setPayStep]    = useState<'choose' | 'processing' | 'done'>('choose');

  /* Available packages depending on type */
  const isAI = type === 'ai-generated';
  const packages: { id: PackageType; price: number; features: string[] }[] = isAI
    ? [
        { id: 'ai-only',    price: pricing.aiOnly,    features: ['Kode HTML siap pakai', 'Admin setup', '1x Revisi gratis'] },
        { id: 'ai-hosting', price: pricing.aiHosting, features: ['Kode HTML siap pakai', 'Hosting 1 tahun', 'SSL gratis', 'Admin setup', '2x Revisi gratis'] },
      ]
    : [
        { id: 'template-only',    price: pricing.templateOnly,    features: ['Template premium', 'Admin setup', '1x Revisi gratis'] },
        { id: 'template-hosting', price: pricing.templateHosting, features: ['Template premium', 'Hosting 1 tahun', 'SSL gratis', 'Admin setup', '2x Revisi gratis'] },
      ];

  const selectedPkg  = packages.find((p) => p.id === pkg);
  const totalPrice   = selectedPkg?.price ?? 0;

  /* ── Step navigation ── */
  const goNext = () => setStep((s) => Math.min(s + 1, 4) as Step);
  const goPrev = () => setStep((s) => Math.max(s - 1, 1) as Step);

  /* ── Validation ── */
  const validateDomain = () => {
    if (!domain.trim()) { setDomainErr('Nama domain wajib diisi.'); return false; }
    if (!/^[a-zA-Z0-9-]+$/.test(domain)) { setDomainErr('Hanya boleh huruf, angka, dan tanda (-).'); return false; }
    setDomainErr(''); return true;
  };
  const validateDetail = () => {
    if (!phone.trim() || !email.trim()) { setDetailErr('Nomor HP dan email wajib diisi.'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setDetailErr('Format email tidak valid.'); return false; }
    setDetailErr(''); return true;
  };

  /* ── Payment ── */
  const handlePay = async () => {
    if (!payMethod) return;
    setPayStep('processing');
    await new Promise((r) => setTimeout(r, 2200));

    addOrder({
      userId:        user!.id,
      userName:      user!.name,
      userEmail:     user!.email,
      type,
      templateId,
      templateTitle,
      aiHtmlCode,
      packageType:   pkg!,
      domainName:    domain,
      phone,
      contactEmail:  email,
      message,
      price:         totalPrice,
      status:        'pending',
      paymentMethod: payMethod,
    });
    setPayStep('done');
  };

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }}
      onClick={(e) => { if (e.target === e.currentTarget && payStep !== 'processing') onClose(); }}
    >
      <div
        className="w-full max-w-xl rounded-3xl overflow-hidden flex flex-col"
        style={{ background: '#FFFFFF', boxShadow: '0 40px 100px #00000050', maxHeight: '92vh' }}
      >

        {/* ── HEADER ── */}
        <div
          className="px-7 pt-6 pb-5 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #2E1065 0%, #1e0a45 100%)', borderBottom: '1px solid #FACC1520' }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#FACC1560' }}>
                {isAI ? '✨ Template AI Generate' : '🎨 Template ' + (templateCategory ?? '')}
              </p>
              <h3 className="text-lg font-black leading-tight" style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>
                {templateTitle}
              </h3>
            </div>
            {payStep !== 'processing' && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: '#ffffff15', color: '#ffffff80' }}
              >
                ✕
              </button>
            )}
          </div>
          <StepBar current={step} />
        </div>

        {/* ── BODY (scrollable) ── */}
        <div className="flex-1 overflow-y-auto px-7 py-6">

          {/* ══ STEP 1: PILIH PAKET ══ */}
          {step === 1 && (
            <div>
              <h4 className="text-base font-black mb-1" style={{ color: '#2E1065', fontFamily: 'Georgia, serif' }}>Pilih Paket</h4>
              <p className="text-xs mb-5" style={{ color: '#2E106560' }}>
                {isAI ? 'Paket AI lebih hemat dibanding template manual.' : 'Pilih paket yang sesuai kebutuhanmu.'}
              </p>

              <div className="flex flex-col gap-3">
                {packages.map((p) => {
                  const selected = pkg === p.id;
                  const isRecommended = isAI ? p.id === 'ai-hosting' : p.id === 'template-hosting';
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPkg(p.id)}
                      className="w-full text-left rounded-2xl p-5 transition-all duration-200 hover:scale-[1.01] relative"
                      style={{
                        border:     selected ? '2px solid #2E1065' : '1.5px solid #2E106514',
                        background: selected ? '#F0EBF8' : '#FDFCFF',
                        boxShadow:  selected ? '0 8px 24px #2E106318' : 'none',
                      }}
                    >
                      {isRecommended && (
                        <span
                          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase"
                          style={{ background: '#FACC15', color: '#2E1065' }}
                        >
                          Rekomendasi
                        </span>
                      )}

                      <div className="flex items-start gap-4">
                        <div
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ borderColor: selected ? '#2E1065' : '#2E106530', background: selected ? '#2E1065' : 'transparent' }}
                        >
                          {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-black text-sm" style={{ color: '#2E1065' }}>
                              {PACKAGE_LABELS[p.id]}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {p.features.map((f) => (
                              <span key={f} className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: selected ? '#2E106514' : '#F0EBF8', color: '#2E1065' }}>
                                ✓ {f}
                              </span>
                            ))}
                          </div>
                          <div className="text-xl font-black" style={{ color: selected ? '#2E1065' : '#2E106580', letterSpacing: '-0.03em' }}>
                            Rp{p.price}rb
                            <span className="text-xs font-semibold ml-1" style={{ color: '#2E106550' }}>/tahun</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══ STEP 2: PILIH DOMAIN ══ */}
          {step === 2 && (
            <div>
              <h4 className="text-base font-black mb-1" style={{ color: '#2E1065', fontFamily: 'Georgia, serif' }}>Pilih Nama Domain</h4>
              <p className="text-xs mb-6" style={{ color: '#2E106560' }}>
                Nama domain akan menjadi alamat website kamu, contoh: <strong>namakamu.com</strong>
              </p>

              <div
                className="flex items-center gap-0 rounded-2xl overflow-hidden mb-3"
                style={{ border: domainErr ? '1.5px solid #FCA5A5' : '1.5px solid #2E106520' }}
              >
                <div className="px-4 py-3.5 text-sm font-bold flex-shrink-0" style={{ background: '#F0EBF8', color: '#2E106570', borderRight: '1px solid #2E106514' }}>
                  www.
                </div>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => { setDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')); setDomainErr(''); }}
                  placeholder="namadomain"
                  className="flex-1 px-4 py-3.5 text-sm font-bold outline-none"
                  style={{ color: '#2E1065', background: '#FDFCFF' }}
                />
                <div className="px-4 py-3.5 text-sm font-bold flex-shrink-0" style={{ background: '#F0EBF8', color: '#2E106570', borderLeft: '1px solid #2E106514' }}>
                  .com
                </div>
              </div>

              {domainErr && (
                <p className="text-xs font-semibold mb-4" style={{ color: '#DC2626' }}>⚠ {domainErr}</p>
              )}

              {domain && !domainErr && (
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm mb-4"
                  style={{ background: '#DCFCE7', border: '1px solid #86efac' }}
                >
                  <span className="text-base">✅</span>
                  <div>
                    <p className="font-black" style={{ color: '#16A34A' }}>www.{domain}.com</p>
                    <p className="text-xs" style={{ color: '#16A34A80' }}>Domain tersedia untuk didaftarkan</p>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-2xl text-xs" style={{ background: '#F8F7FF', border: '1px solid #2E106510' }}>
                <p className="font-bold mb-2" style={{ color: '#2E1065' }}>💡 Tips memilih domain:</p>
                <ul className="flex flex-col gap-1" style={{ color: '#2E106560' }}>
                  <li>• Gunakan nama brand atau bisnis kamu</li>
                  <li>• Hindari angka dan tanda hubung yang banyak</li>
                  <li>• Pilih yang singkat dan mudah diingat</li>
                </ul>
              </div>
            </div>
          )}

          {/* ══ STEP 3: DETAIL KONTAK ══ */}
          {step === 3 && (
            <div>
              <h4 className="text-base font-black mb-1" style={{ color: '#2E1065', fontFamily: 'Georgia, serif' }}>Informasi Kontak</h4>
              <p className="text-xs mb-6" style={{ color: '#2E106560' }}>
                Admin akan menghubungi kamu via nomor HP atau email yang diisi.
              </p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#2E1065' }}>
                    Nomor HP / WhatsApp *
                  </label>
                  <div
                    className="flex items-center rounded-xl overflow-hidden"
                    style={{ border: '1.5px solid #2E106514' }}
                  >
                    <span className="px-3 py-3 text-sm font-bold flex-shrink-0" style={{ background: '#F0EBF8', color: '#2E106570', borderRight: '1px solid #2E106514' }}>
                      +62
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setDetailErr(''); }}
                      placeholder="812 3456 7890"
                      className="flex-1 px-4 py-3 text-sm outline-none"
                      style={{ background: '#FDFCFF', color: '#2E1065' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#2E1065' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setDetailErr(''); }}
                    placeholder="email@contoh.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#FDFCFF', border: '1.5px solid #2E106514', color: '#2E1065' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2E106540')}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = '#2E106514')}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#2E1065' }}>
                    Pesan / Kebutuhan Tambahan
                    <span className="ml-1 normal-case font-normal" style={{ color: '#2E106540' }}>(opsional)</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder={
                      isAI
                        ? `Contoh: Tolong tambahkan logo perusahaan di header, warna utama merah, dan kontak WhatsApp di footer...`
                        : `Contoh: Saya ingin menu navigasi dalam Bahasa Inggris, dan tambahkan fitur live chat di halaman kontak...`
                    }
                    className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none transition-all"
                    style={{ background: '#FDFCFF', border: '1.5px solid #2E106514', color: '#2E1065', fontFamily: 'inherit', lineHeight: '1.6' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2E106540')}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = '#2E106514')}
                  />
                </div>
              </div>

              {detailErr && (
                <div className="mt-3 px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5' }}>
                  ⚠ {detailErr}
                </div>
              )}
            </div>
          )}

          {/* ══ STEP 4: PEMBAYARAN ══ */}
          {step === 4 && payStep === 'choose' && (
            <div>
              {/* Order summary */}
              <div className="rounded-2xl p-5 mb-6" style={{ background: '#2E1065' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: '#FACC1560' }}>Ringkasan Pesanan</p>
                {[
                  { label: 'Produk',  val: templateTitle },
                  { label: 'Paket',   val: PACKAGE_LABELS[pkg!] },
                  { label: 'Domain',  val: `www.${domain}.com` },
                  { label: 'Kontak',  val: email },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-start text-xs mb-2">
                    <span style={{ color: '#ffffff50' }}>{r.label}</span>
                    <span className="font-bold ml-4 text-right" style={{ color: '#ffffff90', maxWidth: '60%', wordBreak: 'break-all' }}>{r.val}</span>
                  </div>
                ))}
                <div className="border-t mt-3 pt-3 flex justify-between items-center" style={{ borderColor: '#ffffff20' }}>
                  <span className="text-sm font-bold" style={{ color: '#ffffff70' }}>Total</span>
                  <span className="text-2xl font-black" style={{ color: '#FACC15', letterSpacing: '-0.03em' }}>Rp{totalPrice}rb</span>
                </div>
              </div>

              {/* Payment methods */}
              <h4 className="text-sm font-black mb-3" style={{ color: '#2E1065' }}>Metode Pembayaran</h4>
              <div className="flex flex-col gap-2 mb-5">
                {(
                  [
                    { id: 'transfer', label: 'Transfer Bank', icon: '🏦', desc: 'BCA · Mandiri · BNI · BRI' },
                    { id: 'qris',     label: 'QRIS',          icon: '📱', desc: 'GoPay · OVO · Dana · ShopeePay' },
                    { id: 'kartu',    label: 'Kartu Kredit',  icon: '💳', desc: 'Visa · Mastercard' },
                  ] as { id: PayMethod; label: string; icon: string; desc: string }[]
                ).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPayMethod(m.id)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all hover:scale-[1.01]"
                    style={{
                      border:     payMethod === m.id ? '1.5px solid #2E1065' : '1.5px solid #2E106514',
                      background: payMethod === m.id ? '#F0EBF8' : '#FDFCFF',
                    }}
                  >
                    <span className="text-xl">{m.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-bold" style={{ color: '#2E1065' }}>{m.label}</div>
                      <div className="text-xs" style={{ color: '#2E106550' }}>{m.desc}</div>
                    </div>
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: payMethod === m.id ? '#2E1065' : '#2E106520', background: payMethod === m.id ? '#2E1065' : 'transparent' }}
                    >
                      {payMethod === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Transfer detail */}
              {payMethod === 'transfer' && (
                <div className="mb-4 p-4 rounded-2xl text-sm" style={{ background: '#FFFBEB', border: '1px solid #FACC1540' }}>
                  <p className="font-bold mb-1" style={{ color: '#2E1065' }}>Transfer ke:</p>
                  <p style={{ color: '#2E106570' }}>Bank BCA — 1234 5678 90</p>
                  <p className="font-bold" style={{ color: '#2E1065' }}>a/n Nusantara Digital Indonesia</p>
                  <p className="text-xs mt-2" style={{ color: '#2E106550' }}>Nominal: <strong>Rp{totalPrice}.000</strong></p>
                </div>
              )}
              {payMethod === 'qris' && (
                <div className="mb-4 p-4 rounded-2xl text-center" style={{ background: '#F0EBF8', border: '1px solid #2E106520' }}>
                  <div className="w-24 h-24 mx-auto rounded-xl mb-2 flex items-center justify-center text-4xl" style={{ background: '#2E1065' }}>📱</div>
                  <p className="text-xs" style={{ color: '#2E106560' }}>Scan QRIS dengan aplikasi apapun</p>
                  <p className="text-sm font-black mt-1" style={{ color: '#2E1065' }}>Rp{totalPrice}.000</p>
                </div>
              )}
            </div>
          )}

          {/* ── PROCESSING ── */}
          {step === 4 && payStep === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5"
                style={{ background: 'linear-gradient(135deg, #2E1065, #4c1d95)', animation: 'spin 1.4s linear infinite', boxShadow: '0 0 40px #2E106340' }}
              >
                ⏳
              </div>
              <h3 className="text-xl font-black mb-2" style={{ color: '#2E1065', fontFamily: 'Georgia, serif' }}>Memproses Pembayaran...</h3>
              <p className="text-sm" style={{ color: '#2E106560' }}>Harap tunggu sebentar</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* ── SUCCESS ── */}
          {step === 4 && payStep === 'done' && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5" style={{ background: '#DCFCE7', boxShadow: '0 0 40px #4ade8040' }}>
                ✅
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                Pembayaran Berhasil!
              </div>
              <h3 className="text-xl font-black mb-2" style={{ color: '#2E1065', fontFamily: 'Georgia, serif' }}>Terima Kasih! 🎉</h3>
              <p className="text-sm mb-1" style={{ color: '#2E106560' }}>Pesanan kamu sudah masuk ke dashboard admin.</p>
              <p className="text-xs mb-6" style={{ color: '#2E106540' }}>Admin akan menghubungi kamu dalam 1×24 jam.</p>

              <div className="w-full p-4 rounded-2xl text-left mb-6" style={{ background: '#F8F7FF', border: '1px solid #2E106510' }}>
                {[
                  { label: 'Paket',  val: PACKAGE_LABELS[pkg!] },
                  { label: 'Domain', val: `www.${domain}.com` },
                  { label: 'Total',  val: `Rp${totalPrice}rb` },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: '#2E106560' }}>{r.label}</span>
                    <span className="font-bold" style={{ color: '#2E1065' }}>{r.val}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onSuccess}
                className="px-8 py-3 rounded-full text-sm font-black transition-all hover:scale-105"
                style={{ background: '#2E1065', color: '#FACC15' }}
              >
                Selesai
              </button>
            </div>
          )}

        </div>

        {/* ── FOOTER / NAV BUTTONS ── */}
        {!(step === 4 && (payStep === 'processing' || payStep === 'done')) && (
          <div
            className="px-7 py-5 flex items-center justify-between gap-3 flex-shrink-0"
            style={{ borderTop: '1px solid #2E106510', background: '#FDFCFF' }}
          >
            {/* Back */}
            <button
              onClick={step === 1 ? onClose : goPrev}
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:opacity-80"
              style={{ background: '#F0EBF8', color: '#2E1065' }}
            >
              {step === 1 ? 'Batal' : '← Kembali'}
            </button>

            {/* Price summary */}
            {pkg && (
              <div className="text-right">
                <div className="text-[10px]" style={{ color: '#2E106550' }}>{PACKAGE_LABELS[pkg]}</div>
                <div className="text-base font-black" style={{ color: '#2E1065', letterSpacing: '-0.02em' }}>Rp{totalPrice}rb</div>
              </div>
            )}

            {/* Next / Pay */}
            {step < 4 ? (
              <button
                onClick={() => {
                  if (step === 1 && !pkg) return;
                  if (step === 2 && !validateDomain()) return;
                  if (step === 3 && !validateDetail()) return;
                  goNext();
                }}
                disabled={step === 1 && !pkg}
                className="px-6 py-2.5 rounded-full text-sm font-black transition-all hover:scale-105 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #2E1065, #4c1d95)', color: '#FACC15', boxShadow: '0 6px 20px #2E106330' }}
              >
                Lanjut →
              </button>
            ) : (
              <button
                onClick={handlePay}
                disabled={!payMethod}
                className="px-6 py-2.5 rounded-full text-sm font-black transition-all hover:scale-105 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #2E1065, #4c1d95)', color: '#FACC15', boxShadow: '0 6px 20px #2E106330' }}
              >
                Bayar Rp{totalPrice}rb →
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
