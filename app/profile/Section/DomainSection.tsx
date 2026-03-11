'use client';

const domains = [
  { name: 'tokobudi.com', status: 'Aktif', expired: '12 Mar 2026', ssl: true },
  { name: 'budisantoso.id', status: 'Aktif', expired: '05 Aug 2025', ssl: true },
  { name: 'budifashion.store', status: 'Kadaluarsa', expired: '01 Jan 2025', ssl: false },
];

const statusStyle = (status: string) =>
  status === 'Aktif'
    ? { bg: '#FACC1520', color: '#FACC15', border: '1px solid #FACC1530' }
    : { bg: '#ff444420', color: '#ff6666', border: '1px solid #ff444430' };

export default function DomainSection() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid #2E106310', background: '#FFFFFF', boxShadow: '0 2px 16px #2E10650A' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #2E10650D' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: '#2E1065', color: '#FACC15' }}>
            🌐
          </div>
          <div>
            <h3 className="font-black text-sm" style={{ color: '#2E1065', fontFamily: "'Georgia', serif" }}>Domain Saya</h3>
            <p className="text-[11px]" style={{ color: '#2E106350' }}>{domains.length} domain terdaftar</p>
          </div>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold hover:opacity-90 transition-all"
          style={{ background: '#2E1065', color: '#FACC15' }}
        >
          + Tambah Domain
        </button>
      </div>

      {/* List */}
      <div className="divide-y" style={{ borderColor: '#2E10650A' }}>
        {domains.map((d) => (
          <div key={d.name} className="flex items-center justify-between px-6 py-4 hover:bg-[#2E10650A] transition-colors">
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: d.status === 'Aktif' ? '#FACC15' : '#ff6666' }}
              />
              <div>
                <p className="text-sm font-bold" style={{ color: '#2E1065' }}>{d.name}</p>
                <p className="text-[11px]" style={{ color: '#2E106350' }}>
                  Expired: {d.expired} {d.ssl && '· SSL ✓'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={statusStyle(d.status)}
              >
                {d.status}
              </span>
              <button
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold hover:opacity-80 transition-all"
                style={{ background: '#2E10650D', color: '#2E1065' }}
              >
                Kelola
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}