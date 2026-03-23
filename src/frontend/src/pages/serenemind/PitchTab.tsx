import {
  Brain,
  CheckCircle,
  Globe,
  Heart,
  Music,
  Smile,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const _slides = [
  {
    id: "cover",
    type: "cover",
  },
  {
    id: "problem",
    type: "problem",
  },
  {
    id: "solution",
    type: "solution",
  },
  {
    id: "how-it-works",
    type: "howitworks",
  },
  {
    id: "features",
    type: "features",
  },
  {
    id: "technology",
    type: "technology",
  },
  {
    id: "monetization",
    type: "monetization",
  },
  {
    id: "roadmap",
    type: "roadmap",
  },
  {
    id: "contact",
    type: "contact",
  },
];

function SlideWrapper({
  children,
  gradient,
}: { children: React.ReactNode; gradient?: string }) {
  return (
    <div
      className="slide-card rounded-3xl p-6 mb-6 shadow-lg"
      style={{
        background:
          gradient ||
          "linear-gradient(135deg, oklch(96% 0.04 300 / 0.6), oklch(97% 0.03 160 / 0.5))",
        border: "1px solid oklch(85% 0.06 300 / 0.4)",
      }}
    >
      {children}
    </div>
  );
}

function SlideNumber({ num }: { num: number }) {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold mb-4"
      style={{ background: "oklch(72% 0.14 300)", color: "white" }}
    >
      {num}
    </span>
  );
}

export default function PitchTab() {
  return (
    <div className="min-h-screen">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .pitch-print-area, .pitch-print-area * { visibility: visible; }
          .pitch-print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          .slide-card { page-break-inside: avoid; break-inside: avoid; margin-bottom: 24px; }
        }
      `}</style>

      {/* Header */}
      <div
        className="px-6 pt-12 pb-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(93% 0.06 300), oklch(94% 0.05 160))",
        }}
      >
        <h1
          className="font-display text-2xl font-bold"
          style={{ color: "oklch(30% 0.08 300)" }}
        >
          SereneMind Pitch Deck
        </h1>
        <p className="text-sm mt-1" style={{ color: "oklch(45% 0.08 300)" }}>
          Investor & Partner Presentation
        </p>
      </div>

      <div className="pitch-print-area px-5 py-6 space-y-2">
        {/* Slide 1: Cover */}
        <SlideWrapper gradient="linear-gradient(135deg, oklch(88% 0.10 300), oklch(90% 0.08 160))">
          <div className="text-center py-4">
            <div
              className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center"
              style={{
                background: "oklch(72% 0.14 300)",
                boxShadow: "0 8px 32px oklch(72% 0.14 300 / 0.4)",
              }}
            >
              <Brain size={40} color="white" />
            </div>
            <h2
              className="font-display text-4xl font-bold"
              style={{ color: "oklch(25% 0.08 300)" }}
            >
              SereneMind
            </h2>
            <p
              className="text-lg font-semibold mt-2"
              style={{ color: "oklch(40% 0.10 300)" }}
            >
              Your Sanctuary for Mental Wellness
            </p>
            <p
              className="text-sm mt-2"
              style={{ color: "oklch(50% 0.08 300)" }}
            >
              A Premium AI-Powered Mental Health App
            </p>
            <div
              className="mt-6 inline-block px-6 py-3 rounded-2xl"
              style={{
                background: "oklch(72% 0.14 300 / 0.15)",
                border: "1px solid oklch(72% 0.14 300 / 0.4)",
              }}
            >
              <p
                className="font-bold text-base"
                style={{ color: "oklch(30% 0.08 300)" }}
              >
                Founded by Dr Muskan Khosla
              </p>
              <p
                className="text-sm mt-0.5"
                style={{ color: "oklch(45% 0.08 300)" }}
              >
                muskankhosla001@gmail.com
              </p>
            </div>
          </div>
        </SlideWrapper>

        {/* Slide 2: Problem */}
        <SlideWrapper>
          <SlideNumber num={1} />
          <h3
            className="font-display text-xl font-bold mb-4"
            style={{ color: "oklch(30% 0.08 300)" }}
          >
            The Problem
          </h3>
          <div className="space-y-4">
            {[
              {
                icon: <Users size={20} />,
                stat: "1 in 4",
                desc: "people globally suffer from mental health issues",
              },
              {
                icon: <TrendingUp size={20} />,
                stat: "↑ 25%",
                desc: "rise in anxiety & depression since 2020",
              },
              {
                icon: <Heart size={20} />,
                stat: "75%",
                desc: "never receive the treatment they need",
              },
            ].map((item) => (
              <div
                key={item.stat}
                className="flex items-center gap-4 p-3 rounded-2xl"
                style={{ background: "oklch(95% 0.04 300 / 0.5)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "oklch(72% 0.14 300 / 0.2)",
                    color: "oklch(45% 0.14 300)",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    className="font-bold text-lg"
                    style={{ color: "oklch(30% 0.08 300)" }}
                  >
                    {item.stat}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(50% 0.06 300)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
            <p
              className="text-sm mt-2 leading-relaxed"
              style={{ color: "oklch(45% 0.06 300)" }}
            >
              People lack access to affordable, stigma-free, always-available
              mental health support.
            </p>
          </div>
        </SlideWrapper>

        {/* Slide 3: Solution */}
        <SlideWrapper gradient="linear-gradient(135deg, oklch(95% 0.05 160 / 0.6), oklch(97% 0.04 200 / 0.5))">
          <SlideNumber num={2} />
          <h3
            className="font-display text-xl font-bold mb-4"
            style={{ color: "oklch(28% 0.08 160)" }}
          >
            Our Solution
          </h3>
          <div
            className="rounded-2xl p-5 text-center"
            style={{
              background: "oklch(75% 0.12 160 / 0.15)",
              border: "1px solid oklch(75% 0.12 160 / 0.3)",
            }}
          >
            <Brain
              size={36}
              style={{ color: "oklch(55% 0.14 160)" }}
              className="mx-auto mb-3"
            />
            <h4
              className="font-bold text-lg"
              style={{ color: "oklch(28% 0.08 160)" }}
            >
              SereneMind
            </h4>
            <p
              className="text-sm leading-relaxed mt-2"
              style={{ color: "oklch(40% 0.08 160)" }}
            >
              An AI-powered mental wellness companion available 24/7 on any
              device. No appointments. No stigma. Immediate, compassionate
              support at your fingertips.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "24/7 Available", icon: "🌙" },
              { label: "No Stigma", icon: "💚" },
              { label: "Any Device", icon: "📱" },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-3 rounded-2xl"
                style={{ background: "oklch(95% 0.04 160 / 0.5)" }}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: "oklch(35% 0.08 160)" }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </SlideWrapper>

        {/* Slide 4: How It Works */}
        <SlideWrapper>
          <SlideNumber num={3} />
          <h3
            className="font-display text-xl font-bold mb-4"
            style={{ color: "oklch(30% 0.08 300)" }}
          >
            How It Works
          </h3>
          <div className="space-y-3">
            {[
              {
                step: 1,
                title: "Sign Up & Set Up Profile",
                desc: "Create your free account in seconds",
              },
              {
                step: 2,
                title: "Chat with AI Therapist",
                desc: "Talk openly — gentle, non-judgmental support",
              },
              {
                step: 3,
                title: "Follow Guided Exercise Flows",
                desc: "Anxiety, sleep, and overthinking control",
              },
              {
                step: 4,
                title: "Track Your Mood Daily",
                desc: "Emoji-based mood check-ins and weekly insights",
              },
              {
                step: 5,
                title: "Listen to Calm Music",
                desc: "Rain, ocean, ambient — any time you need peace",
              },
              {
                step: 6,
                title: "Journal Your Thoughts",
                desc: "Private, prompted journaling for clarity",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                  style={{ background: "oklch(72% 0.14 300)", color: "white" }}
                >
                  {item.step}
                </div>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "oklch(30% 0.08 300)" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(55% 0.06 300)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SlideWrapper>

        {/* Slide 5: Key Features */}
        <SlideWrapper gradient="linear-gradient(135deg, oklch(95% 0.05 270 / 0.5), oklch(97% 0.04 300 / 0.4))">
          <SlideNumber num={4} />
          <h3
            className="font-display text-xl font-bold mb-4"
            style={{ color: "oklch(28% 0.08 270)" }}
          >
            Key Features
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: <Brain size={20} />,
                title: "AI Therapist Chat",
                desc: "24/7 compassionate support",
              },
              {
                icon: <Zap size={20} />,
                title: "Guided Exercises",
                desc: "Anxiety, sleep & overthinking",
              },
              {
                icon: <Music size={20} />,
                title: "Calm Music Library",
                desc: "Relax, sleep & focus",
              },
              {
                icon: <Smile size={20} />,
                title: "Mood Tracker",
                desc: "Daily emoji check-ins",
              },
              {
                icon: <Star size={20} />,
                title: "Journal",
                desc: "Prompted private journaling",
              },
              {
                icon: <Heart size={20} />,
                title: "Emergency Support",
                desc: "Instant help when needed",
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="p-4 rounded-2xl flex flex-col gap-2"
                style={{
                  background: "oklch(95% 0.04 270 / 0.5)",
                  border: "1px solid oklch(80% 0.08 270 / 0.3)",
                }}
              >
                <div style={{ color: "oklch(50% 0.16 270)" }}>{feat.icon}</div>
                <p
                  className="font-bold text-sm"
                  style={{ color: "oklch(28% 0.08 270)" }}
                >
                  {feat.title}
                </p>
                <p className="text-xs" style={{ color: "oklch(48% 0.08 270)" }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </SlideWrapper>

        {/* Slide 6: Technology */}
        <SlideWrapper>
          <SlideNumber num={5} />
          <h3
            className="font-display text-xl font-bold mb-4"
            style={{ color: "oklch(30% 0.08 300)" }}
          >
            Technology
          </h3>
          <div className="space-y-3">
            {[
              {
                icon: <Globe size={18} />,
                title: "Internet Computer (ICP)",
                desc: "Decentralized, secure, tamper-proof hosting",
              },
              {
                icon: <Zap size={18} />,
                title: "React + TypeScript",
                desc: "Modern, fast, type-safe frontend",
              },
              {
                icon: <Brain size={18} />,
                title: "AI-Powered Chat",
                desc: "Intelligent therapist-like conversation engine",
              },
              {
                icon: <CheckCircle size={18} />,
                title: "Progressive Web App (PWA)",
                desc: "Installable on Android, iOS, and Desktop",
              },
            ].map((tech) => (
              <div
                key={tech.title}
                className="flex items-start gap-3 p-3 rounded-2xl"
                style={{ background: "oklch(96% 0.03 300 / 0.5)" }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "oklch(72% 0.14 300 / 0.2)",
                    color: "oklch(45% 0.14 300)",
                  }}
                >
                  {tech.icon}
                </div>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "oklch(30% 0.08 300)" }}
                  >
                    {tech.title}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(52% 0.06 300)" }}
                  >
                    {tech.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SlideWrapper>

        {/* Slide 7: Monetization */}
        <SlideWrapper gradient="linear-gradient(135deg, oklch(95% 0.05 200 / 0.5), oklch(97% 0.04 160 / 0.4))">
          <SlideNumber num={6} />
          <h3
            className="font-display text-xl font-bold mb-4"
            style={{ color: "oklch(28% 0.08 200)" }}
          >
            Monetization
          </h3>
          <div className="space-y-3">
            <div
              className="p-4 rounded-2xl"
              style={{
                background: "oklch(93% 0.06 200 / 0.5)",
                border: "1px solid oklch(78% 0.10 200 / 0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🆓</span>
                <p
                  className="font-bold"
                  style={{ color: "oklch(28% 0.08 200)" }}
                >
                  Free Tier
                </p>
              </div>
              <p className="text-sm" style={{ color: "oklch(45% 0.08 200)" }}>
                Basic features — mood tracker, journal, limited exercises
              </p>
            </div>
            <div
              className="p-4 rounded-2xl"
              style={{
                background: "oklch(90% 0.10 200 / 0.5)",
                border: "2px solid oklch(65% 0.14 200 / 0.5)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐</span>
                  <p
                    className="font-bold"
                    style={{ color: "oklch(28% 0.08 200)" }}
                  >
                    Premium
                  </p>
                </div>
                <span
                  className="text-sm font-bold px-3 py-1 rounded-full"
                  style={{ background: "oklch(65% 0.14 200)", color: "white" }}
                >
                  ₹299/mo · $4/mo
                </span>
              </div>
              <p className="text-sm" style={{ color: "oklch(38% 0.08 200)" }}>
                Unlimited AI chat, all guided exercises, full music library
              </p>
            </div>
            <div
              className="p-4 rounded-2xl"
              style={{
                background: "oklch(93% 0.06 200 / 0.5)",
                border: "1px solid oklch(78% 0.10 200 / 0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🏢</span>
                <p
                  className="font-bold"
                  style={{ color: "oklch(28% 0.08 200)" }}
                >
                  Corporate Wellness
                </p>
              </div>
              <p className="text-sm" style={{ color: "oklch(45% 0.08 200)" }}>
                B2B plans for companies, schools, and healthcare providers
              </p>
            </div>
          </div>
        </SlideWrapper>

        {/* Slide 8: Roadmap */}
        <SlideWrapper>
          <SlideNumber num={7} />
          <h3
            className="font-display text-xl font-bold mb-4"
            style={{ color: "oklch(30% 0.08 300)" }}
          >
            Roadmap
          </h3>
          <div className="space-y-3">
            {[
              {
                q: "Q1 2025",
                status: "done",
                items: [
                  "Core features launch",
                  "AI chat, exercises, music, mood, journal",
                ],
              },
              {
                q: "Q2 2025",
                status: "next",
                items: ["User accounts & cloud sync", "Push notifications"],
              },
              {
                q: "Q3 2025",
                status: "planned",
                items: ["Voice therapy sessions", "Group wellness circles"],
              },
              {
                q: "Q4 2025",
                status: "planned",
                items: [
                  "Play Store & App Store launch",
                  "Corporate wellness partnerships",
                ],
              },
            ].map((phase) => (
              <div key={phase.q} className="flex items-start gap-3">
                <div
                  className="px-2 py-1 rounded-lg text-xs font-bold shrink-0 mt-0.5"
                  style={{
                    background:
                      phase.status === "done"
                        ? "oklch(72% 0.14 160 / 0.25)"
                        : phase.status === "next"
                          ? "oklch(72% 0.14 300 / 0.25)"
                          : "oklch(90% 0.04 300 / 0.5)",
                    color:
                      phase.status === "done"
                        ? "oklch(38% 0.12 160)"
                        : phase.status === "next"
                          ? "oklch(38% 0.12 300)"
                          : "oklch(55% 0.06 300)",
                  }}
                >
                  {phase.q}
                </div>
                <div>
                  {phase.items.map((item) => (
                    <p
                      key={item}
                      className="text-sm"
                      style={{ color: "oklch(40% 0.06 300)" }}
                    >
                      • {item}
                    </p>
                  ))}
                </div>
                {phase.status === "done" && (
                  <CheckCircle
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: "oklch(55% 0.14 160)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </SlideWrapper>

        {/* Slide 9: Contact */}
        <SlideWrapper gradient="linear-gradient(135deg, oklch(88% 0.10 300), oklch(90% 0.08 160))">
          <div className="text-center py-4">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
              style={{ background: "oklch(72% 0.14 300)", color: "white" }}
            >
              MK
            </div>
            <h3
              className="font-display text-2xl font-bold"
              style={{ color: "oklch(25% 0.08 300)" }}
            >
              Dr Muskan Khosla
            </h3>
            <p
              className="text-base mt-1 font-semibold"
              style={{ color: "oklch(40% 0.10 300)" }}
            >
              Founder & Creator of SereneMind
            </p>
            <a
              href="mailto:muskankhosla001@gmail.com"
              className="inline-block mt-3 text-sm font-medium underline"
              style={{ color: "oklch(45% 0.14 300)" }}
            >
              muskankhosla001@gmail.com
            </a>
            <div
              className="mt-6 p-4 rounded-2xl"
              style={{ background: "oklch(72% 0.14 300 / 0.12)" }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: "oklch(35% 0.08 300)" }}
              >
                Building a world where mental wellness is accessible to all.
                Let's make it happen together.
              </p>
            </div>
          </div>
        </SlideWrapper>

        {/* Export Button */}
        <div className="no-print pb-6">
          <button
            type="button"
            data-ocid="pitch.export.primary_button"
            onClick={() => window.print()}
            className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, oklch(72% 0.14 300), oklch(72% 0.14 160))",
              boxShadow: "0 4px 20px oklch(72% 0.14 300 / 0.35)",
            }}
          >
            📥 Export as PDF
          </button>
          <p
            className="text-center text-xs mt-2"
            style={{ color: "oklch(60% 0.06 300)" }}
          >
            Print → Save as PDF
          </p>
        </div>
      </div>
    </div>
  );
}
