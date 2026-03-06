export default function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-black overflow-hidden flex items-center">
      {/* Grid texture background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Large decorative number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{
          fontSize: "clamp(200px, 28vw, 420px)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(255,255,255,0.06)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          userSelect: "none",
        }}
      >
        WE
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase">
              Happy New Year · Kode Promo WEBSITEJUARA
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-white leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(38px, 5vw, 72px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}
          >
            Temukan
            <br />
            <span
              className="relative inline-block"
              style={{ WebkitTextStroke: "1.5px #fff", color: "transparent" }}
            >
              template
            </span>
            <br />
            menarik
            <br />
            untuk mu.
          </h1>

          {/* Subtext */}
          <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-md">
            Lebih dari 12.000 UMKM telah mempercayai kami. Desain profesional,
            harga terjangkau, siap online dalam 24 jam.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              className="group relative bg-white text-black font-bold text-sm px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                🎨 Lihat Template
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <button className="text-white/70 font-semibold text-sm px-7 py-3.5 rounded-full border border-white/[0.15] hover:border-white/40 hover:text-white transition-all duration-300">
              💬 Hubungi Kami
            </button>
          </div>
        </div>

        {/* RIGHT — Stats card */}
        <div className="hidden md:flex flex-col gap-4">
          {/* Main card */}
          <div className="border border-white/10 rounded-2xl p-7 bg-white/[0.03] backdrop-blur-sm">
            <div className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-6">
              Platform Overview
            </div>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { num: "12K+", label: "UMKM Aktif" },
                { num: "89%", label: "Sales Naik" },
                { num: "200+", label: "Template" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-white font-black leading-none mb-1"
                    style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.04em" }}
                  >
                    {s.num}
                  </div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Mini template previews */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { bg: "#0D0D0D", label: "Ekspor" },
                { bg: "#141414", label: "Company" },
                { bg: "#111", label: "Agrikultur" },
              ].map((t, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden border border-white/10 aspect-[4/3] flex flex-col justify-between p-2.5"
                  style={{ background: t.bg }}
                >
                  <div className="flex gap-1">
                    <div className="h-1 w-8 bg-white/20 rounded-full" />
                    <div className="h-1 w-4 bg-white/10 rounded-full" />
                  </div>
                  <div>
                    <div className="h-1.5 w-10 bg-white/40 rounded-full mb-1" />
                    <div className="h-1 w-7 bg-white/20 rounded-full mb-2" />
                    <div className="h-4 w-12 bg-white/90 rounded-md" />
                  </div>
                  <div className="text-white/30 text-[9px] font-semibold uppercase tracking-wider">
                    {t.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
              <div className="text-white/30 text-[10px] uppercase tracking-widest mb-2">
                Online dalam
              </div>
              <div className="text-white font-black text-2xl" style={{ letterSpacing: "-0.04em" }}>
                24 Jam
              </div>
            </div>
            <div className="border border-white/10 rounded-xl p-5 bg-white text-black">
              <div className="text-black/40 text-[10px] uppercase tracking-widest mb-2">
                Mulai dari
              </div>
              <div className="font-black text-2xl" style={{ letterSpacing: "-0.04em" }}>
                Rp97rb
              </div>
              <div className="text-black/40 text-[10px] mt-0.5">/tahun</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </section>
  );
}