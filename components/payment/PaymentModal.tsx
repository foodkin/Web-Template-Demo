'use client';

import { useState } from 'react';

interface PaymentModalProps {
  itemName: string;
  price: number; // dalam ribuan IDR
  onSuccess: (method: string) => void;
  onClose: () => void;
}

type Step = 'method' | 'processing' | 'success';
type Method = 'transfer' | 'qris' | 'kartu';

const METHODS = [
  { id: 'transfer' as Method, label: 'Transfer Bank', icon: '🏦', desc: 'BCA, Mandiri, BNI, BRI' },
  { id: 'qris'     as Method, label: 'QRIS',          icon: '📱', desc: 'Semua dompet digital' },
  { id: 'kartu'    as Method, label: 'Kartu Kredit',  icon: '💳', desc: 'Visa, Mastercard' },
];

export default function PaymentModal({ itemName, price, onSuccess, onClose }: PaymentModalProps) {
  const [step,   setStep]   = useState<Step>('method');
  const [method, setMethod] = useState<Method | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!method) return;
    setLoading(true);
    setStep('processing');
    await new Promise((r) => setTimeout(r, 2200)); // simulasi proses pembayaran
    setStep('success');
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget && step !== 'processing') onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: '#FFFFFF', boxShadow: '0 32px 80px #00000040' }}
      >

        {/* ── METHOD STEP ── */}
        {step === 'method' && (
          <>
            {/* Header */}
            <div className="px-6 pt-6 pb-4" style={{ borderBottom: '1px solid #2E106510' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#2E106550' }}>Pembayaran</p>
                  <h3 className="text-lg font-black" style={{ color: '#2E1065', fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>
                    {itemName}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all hover:opacity-70"
                  style={{ background: '#F0EBF8', color: '#2E1065' }}
                >
                  ✕
                </button>
              </div>

              {/* Price */}
              <div
                className="mt-4 px-5 py-4 rounded-2xl flex items-center justify-between"
                style={{ background: '#2E1065' }}
              >
                <span className="text-sm font-semibold" style={{ color: '#ffffff70' }}>Total Pembayaran</span>
                <span className="text-2xl font-black" style={{ color: '#FACC15', letterSpacing: '-0.03em' }}>
                  Rp{price}rb
                </span>
              </div>
            </div>

            {/* Methods */}
            <div className="px-6 py-5">
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#2E106550' }}>
                Pilih Metode Pembayaran
              </p>
              <div className="flex flex-col gap-2 mb-6">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all hover:scale-[1.01]"
                    style={{
                      background: method === m.id ? '#F0EBF8' : '#F8F7FF',
                      border: method === m.id ? '1.5px solid #2E1065' : '1.5px solid #2E106510',
                    }}
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-bold" style={{ color: '#2E1065' }}>{m.label}</div>
                      <div className="text-xs" style={{ color: '#2E106550' }}>{m.desc}</div>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: method === m.id ? '#2E1065' : '#2E106520',
                        background: method === m.id ? '#2E1065' : 'transparent',
                      }}
                    >
                      {method === m.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Fake transfer detail */}
              {method === 'transfer' && (
                <div
                  className="mb-4 p-4 rounded-2xl text-sm"
                  style={{ background: '#FFFBEB', border: '1px solid #FACC1540' }}
                >
                  <p className="font-bold mb-2" style={{ color: '#2E1065' }}>Transfer ke rekening:</p>
                  <p style={{ color: '#2E106570' }}>Bank BCA — 1234 5678 90</p>
                  <p className="font-bold" style={{ color: '#2E1065' }}>a/n Nusantara Digital Indonesia</p>
                </div>
              )}

              {method === 'qris' && (
                <div
                  className="mb-4 p-4 rounded-2xl text-center"
                  style={{ background: '#F0EBF8', border: '1px solid #2E106520' }}
                >
                  <div
                    className="w-28 h-28 mx-auto rounded-xl mb-2 flex items-center justify-center text-5xl"
                    style={{ background: '#2E1065' }}
                  >
                    📱
                  </div>
                  <p className="text-xs" style={{ color: '#2E106570' }}>Scan QRIS dengan aplikasi apapun</p>
                </div>
              )}

              <button
                onClick={handlePay}
                disabled={!method || loading}
                className="w-full py-3.5 rounded-xl text-sm font-black transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #2E1065, #4c1d95)', color: '#FACC15', boxShadow: '0 8px 24px #2E106330' }}
              >
                Bayar Sekarang →
              </button>
              <p className="text-center text-xs mt-3" style={{ color: '#2E106540' }}>
                🔒 Pembayaran diproses dengan aman
              </p>
            </div>
          </>
        )}

        {/* ── PROCESSING STEP ── */}
        {step === 'processing' && (
          <div className="px-6 py-16 flex flex-col items-center text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-6"
              style={{
                background: 'linear-gradient(135deg, #2E1065, #4c1d95)',
                animation: 'spin 1.5s linear infinite',
                boxShadow: '0 0 40px #2E106340',
              }}
            >
              ⏳
            </div>
            <h3 className="text-xl font-black mb-2" style={{ color: '#2E1065', fontFamily: 'Georgia, serif' }}>
              Memproses Pembayaran...
            </h3>
            <p className="text-sm" style={{ color: '#2E106560' }}>Harap tunggu sebentar</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* ── SUCCESS STEP ── */}
        {step === 'success' && (
          <div className="px-6 py-12 flex flex-col items-center text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-6"
              style={{ background: '#DCFCE7', boxShadow: '0 0 40px #4ade8040' }}
            >
              ✅
            </div>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3"
              style={{ background: '#DCFCE7', color: '#16A34A' }}
            >
              Pembayaran Berhasil!
            </div>
            <h3
              className="text-xl font-black mb-2"
              style={{ color: '#2E1065', fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}
            >
              Terima Kasih! 🎉
            </h3>
            <p className="text-sm mb-2" style={{ color: '#2E106560' }}>
              Pesanan kamu telah diterima dan sedang diproses oleh admin.
            </p>
            <p className="text-xs mb-8" style={{ color: '#2E106540' }}>
              Kamu akan dihubungi dalam 1×24 jam kerja.
            </p>
            <button
              onClick={() => onSuccess(method!)}
              className="px-8 py-3 rounded-full text-sm font-black transition-all hover:scale-105"
              style={{ background: '#2E1065', color: '#FACC15' }}
            >
              Selesai
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
