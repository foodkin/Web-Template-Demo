import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div
        className="max-w-6xl mx-auto rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #2E1065 0%, #4c1d95 100%)',
          boxShadow: '0 40px 100px #2E106540',
        }}
      >
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: '#FACC15', opacity: 0.1, transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full" style={{ background: '#ffffff', opacity: 0.03, transform: 'translate(-30%, 30%)' }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2
            className="font-black mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: '#FACC15', fontFamily: "'Georgia', serif", letterSpacing: '-0.03em' }}
          >
            Siap Go-Digital Hari Ini?
          </h2>
          <p className="text-base md:text-xl mb-12" style={{ color: '#ffffff80' }}>
            Konsultasikan kebutuhan website Anda secara gratis dan dapatkan penawaran spesial untuk UMKM.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/templates"
              className="px-10 py-4 rounded-full font-black text-sm transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: '#FACC15', color: '#2E1065', boxShadow: '0 8px 30px #FACC1440' }}
            >
              Mulai Sekarang
            </Link>
            <button
               className="px-10 py-4 rounded-full font-bold text-sm border-2 transition-all duration-300 hover:bg-white/10"
               style={{ borderColor: '#ffffff20', color: '#ffffff' }}
            >
               Tanya Tim Ahli
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
