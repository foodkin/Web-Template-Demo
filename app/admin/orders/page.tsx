'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import type { Order } from '@/lib/auth';
import { useState } from 'react';

const STATUS_LABEL: Record<Order['status'], string> = {
  pending:    '⏳ Menunggu',
  processing: '⚙ Diproses',
  done:       '✅ Selesai',
};
const STATUS_BG: Record<Order['status'], string> = {
  pending:    '#FFFBEB',
  processing: '#EFF6FF',
  done:       '#DCFCE7',
};
const STATUS_COLOR: Record<Order['status'], string> = {
  pending:    '#92400E',
  processing: '#1D4ED8',
  done:       '#16A34A',
};

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAuth();
  const [selected, setSelected] = useState<Order | null>(null);
  const [filter, setFilter] = useState<Order['status'] | 'all'>('all');

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{ color: '#2E1065', fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>
          Pesanan Masuk
        </h1>
        <p className="text-sm" style={{ color: '#2E106560' }}>Kelola semua pesanan template dari user</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Pesanan', val: orders.length,                              bg: '#F0EBF8', color: '#2E1065' },
          { label: 'Menunggu',      val: orders.filter((o) => o.status === 'pending').length,    bg: '#FFFBEB',  color: '#92400E' },
          { label: 'Diproses',      val: orders.filter((o) => o.status === 'processing').length, bg: '#EFF6FF',  color: '#1D4ED8' },
          { label: 'Selesai',       val: orders.filter((o) => o.status === 'done').length,       bg: '#DCFCE7',  color: '#16A34A' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5" style={{ background: s.bg, border: `1px solid ${s.color}20` }}>
            <div className="text-2xl font-black" style={{ color: s.color }}>{s.val}</div>
            <div className="text-xs font-semibold mt-1" style={{ color: s.color + '90' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6">
        {(['all', 'pending', 'processing', 'done'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-full text-xs font-bold transition-all"
            style={{
              background: filter === f ? '#2E1065' : '#F0EBF8',
              color: filter === f ? '#FACC15' : '#2E106570',
            }}
          >
            {f === 'all' ? 'Semua' : STATUS_LABEL[f]}
          </button>
        ))}
      </div>

      {/* Orders table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center rounded-3xl" style={{ background: '#F8F7FF', border: '1.5px solid #2E106510' }}>
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-lg font-black mb-2" style={{ color: '#2E1065', fontFamily: 'Georgia, serif' }}>Belum ada pesanan</h3>
          <p className="text-sm" style={{ color: '#2E106550' }}>Pesanan dari user akan muncul di sini</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1.5px solid #2E106510', background: '#FFFFFF' }}
            >
              <div className="flex items-center gap-4 px-5 py-4 flex-wrap">
                {/* Type icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: order.type === 'ai-generated' ? '#F0EBF8' : '#FFFBEB' }}
                >
                  {order.type === 'ai-generated' ? '✨' : '🎨'}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm" style={{ color: '#2E1065' }}>
                      {order.templateTitle}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                      style={{ background: order.type === 'ai-generated' ? '#F0EBF8' : '#FFFBEB', color: order.type === 'ai-generated' ? '#6D28D9' : '#92400E' }}
                    >
                      {order.type === 'ai-generated' ? 'AI Generate' : 'Template'}
                    </span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#2E106560' }}>
                    {order.userName} · {order.userEmail} · {order.paymentMethod} · {new Date(order.paidAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Price */}
                <div className="font-black text-base" style={{ color: '#2E1065' }}>
                  Rp{order.price}rb
                </div>

                {/* Status badge */}
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0"
                  style={{ background: STATUS_BG[order.status], color: STATUS_COLOR[order.status] }}
                >
                  {STATUS_LABEL[order.status]}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'processing')}
                      className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:opacity-80"
                      style={{ background: '#EFF6FF', color: '#1D4ED8' }}
                    >
                      Proses
                    </button>
                  )}
                  {order.status === 'processing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'done')}
                      className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:opacity-80"
                      style={{ background: '#DCFCE7', color: '#16A34A' }}
                    >
                      Selesai
                    </button>
                  )}
                  {order.aiHtmlCode && (
                    <button
                      onClick={() => setSelected(order)}
                      className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:opacity-80"
                      style={{ background: '#F0EBF8', color: '#2E1065' }}
                    >
                      Lihat HTML
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HTML Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div className="w-full max-w-3xl rounded-3xl overflow-hidden" style={{ background: '#1a1a2e', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #ffffff15' }}>
              <div>
                <p className="text-xs" style={{ color: '#ffffff40' }}>Kode HTML — {selected.templateTitle}</p>
                <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>{selected.userName}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const blob = new Blob([selected.aiHtmlCode!], { type: 'text/html' });
                    const a    = document.createElement('a'); a.href = URL.createObjectURL(blob);
                    a.download = 'generated.html'; a.click();
                  }}
                  className="px-4 py-2 rounded-full text-xs font-bold" style={{ background: '#FACC15', color: '#2E1065' }}
                >
                  ⬇ Download
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 rounded-full text-xs font-bold" style={{ background: '#ffffff15', color: '#ffffff80' }}
                >
                  ✕ Tutup
                </button>
              </div>
            </div>
            <pre
              className="flex-1 overflow-auto p-6 text-xs leading-relaxed"
              style={{ color: '#a5f3fc', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
            >
              {selected.aiHtmlCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
