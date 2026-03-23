import { Download, FileText } from "lucide-react";
import { useEffect } from "react";

export function PitchDeckTab() {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "pitch-print-styles";
    style.innerHTML = `
      @media print {
        .nav-bar,
        header,
        .pitch-download-btn,
        .pitch-slide-nav {
          display: none !important;
        }
        body, html {
          background: #fff !important;
          color: #111 !important;
        }
        .pitch-deck-wrapper {
          background: #fff !important;
        }
        .pitch-slide {
          page-break-after: always !important;
          break-after: page !important;
          background: #fff !important;
          color: #111 !important;
          box-shadow: none !important;
          border: 1px solid #ddd !important;
          margin: 0 !important;
          border-radius: 0 !important;
          min-height: 100vh !important;
          padding: 40px 48px !important;
        }
        .pitch-slide * {
          color: #111 !important;
          border-color: #ccc !important;
        }
        .pitch-slide .slide-accent {
          color: #cc0000 !important;
        }
        .pitch-slide .slide-badge {
          background: #f0f0f0 !important;
          color: #111 !important;
        }
        .pitch-slide .slide-highlight-box {
          background: #fff5f5 !important;
          border-color: #cc0000 !important;
        }
        .pitch-slide .slide-feature-card {
          background: #f9f9f9 !important;
          border-color: #ddd !important;
        }
        .pitch-slide .slide-tier-card {
          background: #f9f9f9 !important;
          border-color: #ddd !important;
        }
        .pitch-slide .slide-tier-accent {
          background: #fff5f5 !important;
          border-color: #cc0000 !important;
        }
        .pitch-slide .slide-stat-box {
          background: #f9f9f9 !important;
        }
        .pitch-slide .slide-step-num {
          color: #cc0000 !important;
        }
        .pitch-slide .slide-milestone-dot {
          background: #cc0000 !important;
        }
        .pitch-slide .slide-bar-fill {
          background: #cc0000 !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("pitch-print-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="pitch-deck-wrapper pb-8 px-4 pt-2">
      {/* Download Button */}
      <div className="pitch-download-btn flex justify-center mb-6">
        <button
          type="button"
          data-ocid="pitch.primary_button"
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm tracking-widest transition-all shadow-lg shadow-red-900/30"
        >
          <Download size={16} />
          DOWNLOAD PDF
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Slide 1: Cover */}
        <div
          className="pitch-slide rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.12 0.015 25) 0%, oklch(0.09 0.008 270) 100%)",
            border: "1px solid oklch(0.25 0.03 25 / 0.6)",
          }}
        >
          <div className="flex flex-col items-center justify-center text-center py-16 px-8">
            <div className="text-5xl mb-4">🛡️</div>
            <div className="slide-badge inline-block bg-red-900/40 text-red-400 text-xs font-bold tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 border border-red-500/30">
              PITCH DECK · 2026
            </div>
            <h1
              className="text-5xl font-black text-white tracking-tight mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Shed<span className="slide-accent text-red-500">ial</span>
            </h1>
            <p className="text-red-300 text-xl font-semibold mb-2">
              "Your Safety. One Hold Away."
            </p>
            <p className="text-white/60 text-sm mb-10">
              Women's Emergency Response App
            </p>
            <div className="w-16 h-px bg-red-500/40 mb-8" />
            <p className="text-white/40 text-xs tracking-widest uppercase">
              Founded by
            </p>
            <p className="text-white/80 text-base mt-1">Dr Muskan Khosla</p>
          </div>
        </div>

        {/* Slide 2: The Problem */}
        <SlideWrapper num={2} title="The Problem" emoji="⚠️">
          <div className="slide-highlight-box bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-5">
            <p className="text-red-400 font-bold text-base text-center">
              Every 20 minutes, a woman faces a safety threat in India.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "In emergencies, there's no time to unlock phone, find contacts, and dial",
              "Existing apps are too complex for panic situations",
              "71% of women feel unsafe in public spaces",
            ].map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-white/80 text-sm"
              >
                <span className="text-red-500 mt-0.5 flex-shrink-0">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 bg-white/5 rounded-xl p-4 text-center border border-white/10">
            <p className="slide-stat-num text-4xl font-black text-red-500">
              71%
            </p>
            <p className="text-white/50 text-xs mt-1">
              of women feel unsafe in public spaces
            </p>
          </div>
        </SlideWrapper>

        {/* Slide 3: The Solution */}
        <SlideWrapper num={3} title="The Solution" emoji="💡">
          <div className="slide-highlight-box bg-red-900/20 border border-red-500/40 rounded-xl p-4 mb-5">
            <p className="text-white font-black text-lg text-center">
              <span className="slide-accent text-red-400">SheDial</span> — Hold
              one button for 2 seconds.
            </p>
            <p className="text-white/60 text-sm text-center mt-1">
              SOS sent instantly. No thinking required.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "GPS location shared automatically with all emergency contacts",
              "Shake-to-Alert: works hands-free, no screen interaction needed",
              "No internet required for core SOS — uses SMS",
            ].map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-white/80 text-sm"
              >
                <span className="text-red-500 mt-0.5 flex-shrink-0">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </SlideWrapper>

        {/* Slide 4: Key Features */}
        <SlideWrapper num={4} title="Key Features" emoji="🛡️">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: "🔴",
                name: "SOS Hold Button",
                desc: "2-sec activation, radial countdown",
              },
              {
                icon: "📳",
                name: "Shake-to-Alert",
                desc: "25 m/s² threshold, hands-free",
              },
              {
                icon: "📞",
                name: "Fake Incoming Call",
                desc: "Escape unsafe situations",
              },
              {
                icon: "👥",
                name: "Emergency Contacts",
                desc: "Local storage, offline access",
              },
              {
                icon: "📍",
                name: "Live GPS Location",
                desc: "Google Maps link in SOS SMS",
              },
              {
                icon: "🏛️",
                name: "National Helplines",
                desc: "Police 100 · Women 1091 · 112",
              },
            ].map((f) => (
              <div
                key={f.name}
                className="slide-feature-card bg-white/5 border border-white/10 rounded-xl p-3"
              >
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="text-white font-bold text-xs mb-1">{f.name}</p>
                <p className="text-white/50 text-[11px]">{f.desc}</p>
              </div>
            ))}
          </div>
        </SlideWrapper>

        {/* Slide 5: How It Works */}
        <SlideWrapper num={5} title="How It Works" emoji="⚡">
          <div className="space-y-4">
            {[
              {
                num: "01",
                title: "Setup Once",
                desc: "Add emergency contacts — family, friends, trusted people",
              },
              {
                num: "02",
                title: "In Danger",
                desc: "Hold HELP button 2 seconds — or shake your phone",
              },
              {
                num: "03",
                title: "Help Arrives",
                desc: "SMS with GPS location sent to all contacts + police dialed",
              },
            ].map((s) => (
              <div
                key={s.num}
                className="flex items-start gap-4 bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <span className="slide-step-num text-red-500 font-black text-2xl leading-none flex-shrink-0">
                  {s.num}
                </span>
                <div>
                  <p className="text-white font-bold text-sm">{s.title}</p>
                  <p className="text-white/60 text-xs mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SlideWrapper>

        {/* Slide 6: Target Audience */}
        <SlideWrapper num={6} title="Target Audience" emoji="🎯">
          <ul className="space-y-2 mb-6">
            {[
              "College students and working women",
              "Women traveling alone or commuting at night",
              "Parents monitoring children's safety",
            ].map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 text-white/80 text-sm"
              >
                <span className="text-red-500 flex-shrink-0">▸</span>
                {s}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "600M+", label: "Women in India" },
              { value: "400M+", label: "Smartphone users" },
              { value: "$2.8B", label: "TAM (12% YoY)" },
            ].map((s) => (
              <div
                key={s.label}
                className="slide-stat-box bg-white/5 border border-white/10 rounded-xl p-3 text-center"
              >
                <p className="text-red-400 font-black text-lg">{s.value}</p>
                <p className="text-white/50 text-[10px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </SlideWrapper>

        {/* Slide 7: Technology */}
        <SlideWrapper num={7} title="Technology" emoji="🔧">
          <div className="space-y-3">
            {[
              {
                label: "Platform",
                value: "Progressive Web App — all devices, no install",
              },
              {
                label: "Hosting",
                value: "Internet Computer Protocol (ICP) — decentralized",
              },
              { label: "Location", value: "Google Maps API for real-time GPS" },
              {
                label: "Privacy",
                value: "Local storage only — no server data collection",
              },
              {
                label: "Emergency",
                value: "Native SMS + Call integration via device",
              },
            ].map((t) => (
              <div key={t.label} className="flex gap-3 items-start">
                <span className="slide-accent text-red-500 font-bold text-xs w-20 flex-shrink-0 pt-0.5">
                  {t.label}
                </span>
                <span className="text-white/75 text-sm">{t.value}</span>
              </div>
            ))}
          </div>
        </SlideWrapper>

        {/* Slide 8: Monetization */}
        <SlideWrapper num={8} title="Monetization" emoji="💰">
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="slide-tier-card bg-white/5 border border-white/15 rounded-xl p-4">
              <p className="text-white/50 text-xs font-bold tracking-widest mb-1">
                FREE
              </p>
              <p className="text-white font-black text-xl mb-3">₹0</p>
              <ul className="space-y-1.5">
                {[
                  "Core SOS button",
                  "3 emergency contacts",
                  "Basic helplines",
                ].map((f) => (
                  <li key={f} className="text-white/65 text-xs flex gap-2">
                    <span className="text-white/30">·</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="slide-tier-accent bg-red-900/25 border border-red-500/50 rounded-xl p-4">
              <p className="slide-accent text-red-400 text-xs font-bold tracking-widest mb-1">
                PREMIUM
              </p>
              <p className="text-white font-black text-xl mb-3">
                ₹99
                <span className="text-white/40 text-sm font-normal">/mo</span>
              </p>
              <ul className="space-y-1.5">
                {[
                  "Unlimited contacts",
                  "Family tracking",
                  "SOS history",
                  "Priority alerts",
                ].map((f) => (
                  <li key={f} className="text-white/80 text-xs flex gap-2">
                    <span className="text-red-400">·</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-2">
            {[
              "B2B: Corporate safety packages for companies with female employees",
              "Government: Smart city safety program partnerships",
              "NGO Grants: Women's safety funding opportunities",
            ].map((o) => (
              <p key={o} className="text-white/55 text-xs flex gap-2">
                <span className="text-red-500">▸</span>
                {o}
              </p>
            ))}
          </div>
        </SlideWrapper>

        {/* Slide 9: Roadmap */}
        <SlideWrapper num={9} title="Traction & Roadmap" emoji="🚀">
          <div className="relative">
            <div className="absolute left-8 top-4 bottom-4 w-px bg-red-500/20" />
            <div className="space-y-4">
              {[
                {
                  phase: "Now",
                  label: "Version 1: Live ✅",
                  desc: "SOS, shake detection, fake call, helplines",
                },
                {
                  phase: "3 mo",
                  label: "Version 2",
                  desc: "Native Android/iOS app, background SOS",
                },
                {
                  phase: "6 mo",
                  label: "Version 3",
                  desc: "Family location tracking, AI threat detection",
                },
                {
                  phase: "12 mo",
                  label: "Version 4",
                  desc: "Wearable integration, community safety network",
                },
              ].map((m) => (
                <div key={m.phase} className="flex items-start gap-4 pl-2">
                  <div className="flex flex-col items-center flex-shrink-0 w-12">
                    <div className="slide-milestone-dot w-4 h-4 rounded-full bg-red-500 border-2 border-red-900 z-10" />
                    <span className="text-red-400/70 text-[10px] font-bold mt-1">
                      {m.phase}
                    </span>
                  </div>
                  <div className="pb-2">
                    <p className="text-white font-bold text-sm">{m.label}</p>
                    <p className="text-white/50 text-xs mt-0.5">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>

        {/* Slide 10: Why Now */}
        <SlideWrapper num={10} title="Why Now?" emoji="⏰">
          <ul className="space-y-3 mb-6">
            {[
              "Rising safety awareness post-pandemic in Indian cities",
              "4G/5G penetration reaching tier-2 and tier-3 cities",
              "Government push for women's safety apps (Nirbhaya Fund)",
              "No dominant player has captured this space yet",
            ].map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-white/80 text-sm"
              >
                <span className="text-red-500 mt-0.5 flex-shrink-0">▸</span>
                {b}
              </li>
            ))}
          </ul>
          <div className="slide-highlight-box bg-red-900/25 border border-red-500/40 rounded-xl p-4 text-center">
            <p className="text-white font-bold text-sm">The window is open.</p>
            <p className="text-red-400 font-black text-base mt-1">
              First mover wins.
            </p>
          </div>
        </SlideWrapper>

        {/* Slide 11: The Ask */}
        <SlideWrapper num={11} title="The Ask" emoji="🤝">
          <div className="slide-highlight-box bg-red-900/20 border border-red-500/40 rounded-xl p-5 mb-5 text-center">
            <p className="text-white/50 text-xs tracking-widest uppercase mb-1">
              Seed Round
            </p>
            <p className="text-white font-black text-4xl">
              ₹50 <span className="text-red-400">Lakhs</span>
            </p>
          </div>
          <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-3">
            Use of Funds
          </p>
          <div className="space-y-2 mb-5">
            {[
              { pct: "40%", area: "Native App Development", w: "40%" },
              { pct: "35%", area: "Marketing & Growth", w: "35%" },
              { pct: "25%", area: "Team & Operations", w: "25%" },
            ].map((b) => (
              <div key={b.area}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">{b.area}</span>
                  <span className="slide-accent text-red-400 font-bold">
                    {b.pct}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="slide-bar-fill bg-red-500 h-1.5 rounded-full"
                    style={{ width: b.w }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/50 text-xs text-center">
            Looking for: strategic investors with women's safety or social
            impact focus
          </p>
        </SlideWrapper>

        {/* Slide 12: Closing */}
        <div
          className="pitch-slide rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.12 0.015 25) 0%, oklch(0.09 0.008 270) 100%)",
            border: "1px solid oklch(0.25 0.03 25 / 0.6)",
          }}
        >
          <div className="flex flex-col items-center justify-center text-center py-14 px-8">
            <div className="text-4xl mb-6">❤️</div>
            <p className="text-white/80 text-lg font-semibold mb-2 leading-relaxed">
              "SheDial doesn't just connect calls —
            </p>
            <p className="text-red-400 font-black text-xl mb-8">
              it could save a life."
            </p>
            <div className="w-12 h-px bg-red-500/40 mb-8" />
            <div className="space-y-2 text-white/50 text-sm">
              <p>📧 muskankhosla001@gmail.com</p>
              <p>🌐 SheDial — Women's Safety App</p>
              <p>👤 Founded by Dr Muskan Khosla</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide count note */}
      <p className="text-center text-white/25 text-xs mt-4 pitch-slide-nav">
        <FileText size={12} className="inline mr-1" />
        12 slides · Print or Save as PDF
      </p>
    </div>
  );
}

function SlideWrapper({
  num,
  title,
  emoji,
  children,
}: { num: number; title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div
      className="pitch-slide rounded-2xl p-5"
      style={{
        background: "oklch(0.09 0.006 270)",
        border: "1px solid oklch(0.18 0.01 270)",
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white/40"
          style={{ background: "oklch(0.15 0.01 270)" }}
        >
          {num}
        </div>
        <span className="text-lg">{emoji}</span>
        <h2 className="text-white font-black text-base tracking-wide">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
