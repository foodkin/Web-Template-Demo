import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="relative min-h-[90vh] overflow-hidden flex items-center"
      style={{ background: "#FFFFFF" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, #2E106520 1.2px, transparent 1.2px)`,
          backgroundSize: "32px 32px",
          opacity: 0.35,
        }}
      />

      {/* Top-left purple accent block */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-br-[80px]"
        style={{ background: "#2E1065", opacity: 0.07 }}
      />

      {/* Large decorative text — outline purple */}
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{
          fontSize: "clamp(180px, 26vw, 400px)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "2px #2E106512",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          fontFamily: "'Georgia', serif",
        }}
      >
        WE
      </div>

      {/* Yellow decorative bar top */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #FACC15, #2E1065)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div>
          {/* Label badge */}
          <div
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: "#FACC15",
              color: "#2E1065",
              letterSpacing: "0.12em",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: "#2E1065" }}
            />
            Platform Web Template Indonesia
          </div>

          {/* Headline */}
          <h1
            className="leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(38px, 5vw, 72px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#2E1065",
              fontFamily: "'Georgia', serif",
            }}
          >
            Temukan
            <br />
            <span
              className="relative inline-block"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px #2E1065",
              }}
            >
              template
              {/* Yellow underline */}
              <span
                className="absolute bottom-1 left-0 w-full"
                style={{
                  height: "6px",
                  background: "#FACC15",
                  borderRadius: "3px",
                  zIndex: -1,
                  bottom: "4px",
                  display: "block",
                  opacity: 0.85,
                }}
              />
            </span>
            <br />
            menarik
            <br />
            untuk mu.
          </h1>

          {/* Subtext */}
          <p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-md"
            style={{ color: "#2E106580" }}
          >
            Lebih dari 12.000 UMKM telah mempercayai kami. Desain profesional,
            harga terjangkau, siap online dalam 24 jam.
          </p>

            {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/templates"
              className="group relative font-bold text-sm px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "#FACC15",
                color: "#2E1065",
                boxShadow: "0 4px 24px #FACC1550",
              }}
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* Trust row */}
          <div
            className="flex items-center gap-4 mt-10 pt-8"
            style={{ borderTop: "1px solid #2E106514" }}
          >
            <div className="flex -space-x-2">
              {["#FACC15", "#2E1065", "#FACC15BB", "#2E106599"].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold"
                  style={{ background: c, color: i % 2 === 0 ? "#2E1065" : "#FACC15", zIndex: 4 - i }}
                >
                  {["A", "B", "C", "D"][i]}
                </div>
              ))}
            </div>
            <div>
              <div
                className="text-xs font-bold"
                style={{ color: "#2E1065" }}
              >
                12.000+ UMKM aktif
              </div>
              <div className="text-xs" style={{ color: "#2E106560" }}>
                bergabung bulan ini
              </div>
            </div>
            <div
              className="ml-auto flex items-center gap-1 text-xs font-bold"
              style={{ color: "#FACC15" }}
            >
              ★★★★★
              <span className="font-normal" style={{ color: "#2E106560" }}>
                4.9/5
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — Stats card */}
        <div className="hidden md:flex flex-col gap-4">
          {/* Main card */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: "#2E1065",
              boxShadow: "0 24px 64px #2E106530",
            }}
          >
            <div
              className="text-xs font-bold uppercase tracking-widest mb-6"
              style={{ color: "#FACC1580", letterSpacing: "0.15em" }}
            >
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
                    className="font-black leading-none mb-1"
                    style={{
                      fontSize: "clamp(24px, 3vw, 36px)",
                      letterSpacing: "-0.04em",
                      color: "#FACC15",
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "#FFFFFF80" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mini template previews */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { bg: "#1a0a3d", label: "Ekspor" },
                { bg: "#220d4e", label: "Company" },
                { bg: "#180840", label: "Agrikultur" },
              ].map((t, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden aspect-[4/3] flex flex-col justify-between p-2.5"
                  style={{
                    background: t.bg,
                    border: "1px solid #FACC1520",
                  }}
                >
                  <div className="flex gap-1">
                    <div
                      className="h-1 w-8 rounded-full"
                      style={{ background: "#FACC1540" }}
                    />
                    <div
                      className="h-1 w-4 rounded-full"
                      style={{ background: "#FFFFFF20" }}
                    />
                  </div>
                  <div>
                    <div
                      className="h-1.5 w-10 rounded-full mb-1"
                      style={{ background: "#FFFFFF60" }}
                    />
                    <div
                      className="h-1 w-7 rounded-full mb-2"
                      style={{ background: "#FFFFFF30" }}
                    />
                    <div
                      className="h-4 w-12 rounded-md"
                      style={{ background: "#FACC15" }}
                    />
                  </div>
                  <div
                    className="text-[9px] font-bold uppercase tracking-wider"
                    style={{ color: "#FACC1570" }}
                  >
                    {t.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="rounded-xl p-5"
              style={{
                background: "#FFFFFF",
                border: "2px solid #2E106514",
                boxShadow: "0 4px 20px #2E106510",
              }}
            >
              <div
                className="text-[10px] uppercase tracking-widest mb-2 font-bold"
                style={{ color: "#2E106550", letterSpacing: "0.12em" }}
              >
                Online dalam
              </div>
              <div
                className="font-black text-2xl"
                style={{ letterSpacing: "-0.04em", color: "#2E1065" }}
              >
                24 Jam
              </div>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ background: "#FACC15" }}
            >
              <div
                className="text-[10px] uppercase tracking-widest mb-2 font-bold"
                style={{ color: "#2E106570", letterSpacing: "0.12em" }}
              >
                Mulai dari
              </div>
              <div
                className="font-black text-2xl"
                style={{ letterSpacing: "-0.04em", color: "#2E1065" }}
              >
                Rp97rb
              </div>
              <div
                className="text-[10px] mt-0.5"
                style={{ color: "#2E106360" }}
              >
                /tahun
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />

      {/* Yellow accent corner bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-48 h-48 rounded-tl-[60px] opacity-10 hidden md:block"
        style={{ background: "#FACC15" }}
      />
    </section>
  );
}