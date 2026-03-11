'use client';

const paket = {
  name: 'Paket Pro',
  price: 'Rp297.000',
  period: '/tahun',
  expired: '12 Maret 2026',
  features: ['5 Website Aktif', 'SSL Gratis', 'Bandwidth Unlimited', 'Support Prioritas', 'Custom Domain'],
  usage: [
    { label: 'Website Aktif', used: 2, max: 5 },
    { label: 'Storage', used: 3.2, max: 10, unit: 'GB' },
    { label: 'Bandwidth', used: 45, max: 100, unit: 'GB' },
  ],
};

export default function PaketSection() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid #2E106310', background: '#FFFFFF', boxShadow: '0 2px 16px #2E10650A' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #2E10650D' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: '#FACC15', color: '#2E1065' }}>
            ⚡
          </div>
          <div>
            <h3 className="font-black text-sm" style={{ color: '#2E1065', fontFamily: "'Georgia', serif" }}>Paket Saya</h3>
            <p className="text-[11px]" style={{ color: '#2E106350' }}>Aktif hingga {paket.expired}</p>
          </div>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold hover:opacity-90 transition-all"
          style={{ background: '#FACC15', color: '#2E1065' }}
        >
          Upgrade
        </button>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-6">
        {/* Paket info */}
        <div
          className="rounded-xl p-5 flex flex-col gap-4"
          style={{ background: '#2E1065' }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#FACC1580' }}>Paket Aktif</p>
            <p className="text-2xl font-black" style={{ color: '#FACC15', fontFamily: "'Georgia', serif", letterSpacing: '-0.03em' }}>
              {paket.name}
            </p>
            <p className="text-sm font-bold mt-0.5" style={{ color: '#ffffff60' }}>
              {paket.price}<span className="text-xs font-normal">{paket.period}</span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {paket.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs" style={{ color: '#ffffff80' }}>
                <span className="text-[#FACC15] text-xs">✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div className="flex flex-col gap-4 justify-center">
          {paket.usage.map((u) => {
            const pct = Math.round((u.used / u.max) * 100);
            return (
              <div key={u.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold" style={{ color: '#2E1065' }}>{u.label}</span>
                  <span style={{ color: '#2E106360' }}>
                    {u.used}{u.unit || ''} / {u.max}{u.unit || ''}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: '#2E10650D' }}>
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: pct > 80 ? '#ef4444' : '#FACC15',
                    }}
                  />
                </div>
                <p className="text-[10px] mt-1 text-right" style={{ color: '#2E106340' }}>{pct}% digunakan</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}