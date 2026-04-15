export default function ServiceGrid() {
  const services = [
    {
      title: 'Template Siap Pakai',
      desc: 'Pilih dari ratusan desain premium yang sudah kami optimasi untuk konversi tinggi.',
      icon: '📦',
      color: '#FACC15',
    },
    {
      title: 'AI Website Builder',
      desc: 'Cukup deskripsikan bisnis Anda, AI kami akan membangun landing page dalam hitungan detik.',
      icon: '✨',
      color: '#2E1065',
    },
    {
      title: 'Custom Development',
      desc: 'Butuh fitur khusus? Tim ahli kami siap membangun website kustom sesuai kebutuhan unik Anda.',
      icon: '🛠️',
      color: '#FACC15',
    },
  ];

  return (
    <section className="py-24 px-6" style={{ background: '#F8F7FF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-black mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#2E1065', fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
          >
            Solusi Digital Lengkap
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#2E106580' }}>
            Kami menyediakan segala kebutuhan untuk mendigitalisasi bisnis Anda dengan cara yang paling efektif dan efisien.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-10 rounded-[32px] transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: '#FFFFFF',
                border: '2px solid #2E106508',
                boxShadow: '0 10px 40px #2E106505',
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 transition-transform duration-300 group-hover:rotate-6"
                style={{ background: `${s.color}15` }}
              >
                {s.icon}
              </div>
              <h3 className="font-black text-xl mb-4" style={{ color: '#2E1065', letterSpacing: '-0.01em' }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#2E106560' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
