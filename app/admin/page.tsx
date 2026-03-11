import Link from "next/link";

// ── Mock data ──────────────────────────────────────────────
const stats = [
  { label: "Total Pesanan", value: "1.284", change: "+12%", up: true, icon: "📋", accent: "#FACC15" },
  { label: "Customer Aktif", value: "3.841", change: "+8%",  up: true, icon: "👥", accent: "#2E1065" },
  { label: "Revenue Bulan Ini", value: "Rp48,2jt", change: "+23%", up: true, icon: "💰", accent: "#FACC15" },
  { label: "Template Terjual", value: "276", change: "-3%", up: false, icon: "🎨", accent: "#2E1065" },
];

const recentOrders = [
  { id: "#ORD-0091", customer: "Budi Santoso",    item: "Paket Pro",              status: "Selesai",   amount: "Rp297rb", time: "2 mnt lalu" },
  { id: "#ORD-0090", customer: "Sari Dewi",        item: "Template Company Pro",   status: "Proses",    amount: "Rp97rb",  time: "18 mnt lalu" },
  { id: "#ORD-0089", customer: "Andi Firmansyah",  item: "Paket Starter",          status: "Menunggu",  amount: "Rp97rb",  time: "45 mnt lalu" },
  { id: "#ORD-0088", customer: "Rini Yulianti",    item: "Template Agrikultur",    status: "Selesai",   amount: "Rp97rb",  time: "1 jam lalu" },
  { id: "#ORD-0087", customer: "Hendra Wijaya",    item: "Paket Pro",              status: "Dibatalkan",amount: "Rp297rb", time: "2 jam lalu" },
];

const topTemplates = [
  { name: "Toko Online Modern",      sold: 84, pct: 85 },
  { name: "Company Profile Pro",     sold: 61, pct: 62 },
  { name: "Ekspor Nusantara",        sold: 48, pct: 49 },
  { name: "Agrikultur & Hasil Bumi", sold: 37, pct: 38 },
  { name: "Kuliner & Restoran",      sold: 29, pct: 30 },
];

const quickMenu = [
  { name: "Manajemen Pesanan",  href: "/admin/orders",    desc: "Lihat & proses semua pesanan masuk",    icon: "📋", bg: "#2E1065", fg: "#FACC15" },
  { name: "Manajemen Customer", href: "/admin/customers", desc: "Data customer, akun, dan riwayat beli", icon: "👥", bg: "#FACC15", fg: "#2E1065" },
  { name: "Pengaturan Sistem",  href: "/admin/settings",  desc: "Kelola harga paket & template",         icon: "⚙️", bg: "#2E1065", fg: "#FACC15" },
];

const statusStyle: Record<string, React.CSSProperties> = {
  Selesai:     { background: '#FACC1520', color: '#92700A', border: '1px solid #FACC1540' },
  Proses:      { background: '#2E10650D', color: '#2E1065', border: '1px solid #2E106525' },
  Menunggu:    { background: '#f97316 10', color: '#c2410c', border: '1px solid #fed7aa' },
  Dibatalkan:  { background: '#fee2e2',   color: '#dc2626', border: '1px solid #fca5a5' },
};

// ── Component ─────────────────────────────────────────────
export default function AdminDashboard() {
  const now = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 rounded-full" style={{ background: '#FACC15' }} />
          <div>
            <h1
              className="font-black"
              style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#2E1065', fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
            >
              Overview Dashboard
            </h1>
            <p className="text-xs mt-0.5 capitalize" style={{ color: '#2E106350' }}>{now}</p>
          </div>
        </div>

        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
          style={{ background: '#FACC1520', color: '#2E1065', border: '1px solid #FACC1540' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
          Sistem Online
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-5"
            style={{ background: '#FFFFFF', border: '2px solid #2E106308', boxShadow: '0 2px 16px #2E10650A' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                style={{ background: s.accent === '#FACC15' ? '#FACC1520' : '#2E10650D' }}
              >
                {s.icon}
              </div>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: s.up ? '#FACC1520' : '#fee2e2',
                  color: s.up ? '#92700A' : '#dc2626',
                }}
              >
                {s.change}
              </span>
            </div>
            <p
              className="font-black leading-none mb-1"
              style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#2E1065', fontFamily: "'Georgia', serif", letterSpacing: '-0.03em' }}
            >
              {s.value}
            </p>
            <p className="text-xs" style={{ color: '#2E106350' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Main content: orders + top templates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent orders — 2/3 width */}
        <div
          className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ background: '#FFFFFF', border: '2px solid #2E106308', boxShadow: '0 2px 16px #2E10650A' }}
        >
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid #2E10650D' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: '#2E1065', color: '#FACC15' }}>
                📋
              </div>
              <h2 className="font-black text-sm" style={{ color: '#2E1065', fontFamily: "'Georgia', serif" }}>Pesanan Terbaru</h2>
            </div>
            <Link href="/admin/orders" className="text-xs font-bold hover:underline" style={{ color: '#2E106560' }}>
              Lihat semua →
            </Link>
          </div>

          <div className="divide-y" style={{ borderColor: '#2E10650A' }}>
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center gap-3 px-6 py-3.5 hover:bg-[#2E10650A] transition-colors">
                {/* ID */}
                <span className="text-[11px] font-black w-20 shrink-0" style={{ color: '#2E106540' }}>{o.id}</span>

                {/* Customer + item */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate" style={{ color: '#2E1065' }}>{o.customer}</p>
                  <p className="text-[11px] truncate" style={{ color: '#2E106350' }}>{o.item}</p>
                </div>

                {/* Amount */}
                <span className="text-xs font-black shrink-0" style={{ color: '#2E1065' }}>{o.amount}</span>

                {/* Status */}
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 hidden sm:block"
                  style={statusStyle[o.status] ?? {}}
                >
                  {o.status}
                </span>

                {/* Time */}
                <span className="text-[10px] shrink-0 hidden md:block" style={{ color: '#2E106340' }}>{o.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top templates — 1/3 width */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: '#FFFFFF', border: '2px solid #2E106308', boxShadow: '0 2px 16px #2E10650A' }}
        >
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid #2E10650D' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: '#FACC15', color: '#2E1065' }}>
                🎨
              </div>
              <h2 className="font-black text-sm" style={{ color: '#2E1065', fontFamily: "'Georgia', serif" }}>Top Template</h2>
            </div>
            <Link href="/admin/settings" className="text-xs font-bold hover:underline" style={{ color: '#2E106560' }}>
              Kelola →
            </Link>
          </div>

          <div className="p-5 flex flex-col gap-4">
            {topTemplates.map((t, i) => (
              <div key={t.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-black"
                      style={{ background: i === 0 ? '#FACC15' : '#2E10650D', color: i === 0 ? '#2E1065' : '#2E106550' }}
                    >
                      {i + 1}
                    </span>
                    <span className="font-semibold truncate max-w-[130px]" style={{ color: '#2E1065' }}>{t.name}</span>
                  </div>
                  <span className="font-black shrink-0" style={{ color: '#2E1065' }}>{t.sold}</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: '#2E10650A' }}>
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${t.pct}%`, background: i === 0 ? '#FACC15' : '#2E1065', opacity: i === 0 ? 1 : 0.3 + i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Summary box */}
          <div
            className="mx-5 mb-5 p-4 rounded-xl"
            style={{ background: '#2E1065' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#FACC1570', letterSpacing: '0.14em' }}>
              Total Terjual
            </p>
            <p className="text-2xl font-black" style={{ color: '#FACC15', fontFamily: "'Georgia', serif", letterSpacing: '-0.03em' }}>
              276 <span className="text-sm font-normal" style={{ color: '#ffffff50' }}>template</span>
            </p>
            <p className="text-xs mt-1" style={{ color: '#ffffff40' }}>Bulan Maret 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}