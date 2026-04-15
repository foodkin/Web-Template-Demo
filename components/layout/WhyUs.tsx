export default function WhyUs() {
  const benefits = [
    { title: 'Cepat & Instan', detail: 'Website Anda siap online hanya dalam waktu kurang dari 24 jam.' },
    { title: 'Harga Terjangkau', detail: 'Mulai dari Rp97rb per tahun, sudah termasuk domain .com/.id gratis.' },
    { title: 'Support 24/7', detail: 'Tim ahli kami siap membantu kendala teknis Anda kapan saja.' },
    { title: 'SEO Friendly', detail: 'Semua template telah dioptimasi agar mudah ditemukan di Google.' },
  ];

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          {/* Decorative shapes */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full" style={{ background: '#FACC1515' }} />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full" style={{ background: '#2E106505' }} />
          
          <div className="relative z-10" style={{ perspective: '1000px' }}>
            <div
              className="rounded-[40px] p-10 overflow-hidden"
              style={{
                background: '#2E1065',
                boxShadow: '0 40px 100px #2E106540',
                transform: 'rotateY(-10deg) rotateX(5deg)',
              }}
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="space-y-4">
                <div className="h-4 w-3/4 rounded-full bg-white/10" />
                <div className="h-4 w-1/2 rounded-full bg-white/5" />
                <div className="h-32 w-full rounded-2xl bg-white/5 border border-white/10 mt-8" />
                <div className="grid grid-cols-2 gap-4 mt-6">
                   <div className="h-20 rounded-xl bg-[#FACC15]" />
                   <div className="h-20 rounded-xl bg-white/5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2
            className="font-black mb-8"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#2E1065', fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
          >
            Mengapa Harus Memilih Kami?
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {benefits.map((b) => (
              <div key={b.title}>
                <h4 className="font-black text-lg mb-2" style={{ color: '#2E1065' }}>
                  {b.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#2E106570' }}>
                  {b.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
