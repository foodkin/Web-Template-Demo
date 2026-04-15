export default function Testimonials() {
  const reviews = [
    { name: 'Budi Santoso', role: 'Owner Kopi Nusantara', text: 'Template-nya sangat profesional. Setelah ganti website, image brand saya naik drastis di mata pembeli luar negeri.' },
    { name: 'Siti Aminah', role: 'Founder Batik Lestari', text: 'Fitur AI builder-nya sangat membantu buat saya yang tidak paham koding. Website langsung jadi dalam sekejap!' },
    { name: 'Rian Pratama', role: 'CEO Digital Agency', text: 'Supportnya luar biasa. Setiap ada kendala, tim teknis responsif membantu sampai tuntas. Recomended!' },
  ];

  return (
    <section className="py-24 px-6" style={{ background: '#2E1065' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-black mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#FACC15', fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
          >
            Cerita Sukses Member
          </h2>
          <p className="max-w-l mx-auto" style={{ color: '#ffffff80' }}>
            Bergabunglah dengan ribuan pengusaha yang telah sukses mendigitalisasi bisnis mereka.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="p-10 rounded-[32px] border border-white/10"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="text-3xl mb-6">"</div>
              <p className="text-sm italic leading-relaxed mb-8" style={{ color: '#ffffff90' }}>
                {r.text}
              </p>
              <div>
                <div className="font-bold mb-1" style={{ color: '#FACC15' }}>{r.name}</div>
                <div className="text-xs" style={{ color: '#ffffff40' }}>{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
