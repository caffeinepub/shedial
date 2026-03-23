import { Copy, Shield } from "lucide-react";
import { toast } from "sonner";

const sections = [
  {
    title: "Introduction",
    content:
      "SereneMind is committed to protecting your privacy and respecting your personal information, especially sensitive mental health data. This policy explains what we collect, how we use it, and your rights.",
  },
  {
    title: "What We Collect",
    items: [
      "Name and email address (only if you sign up)",
      "Mood entries (stored locally on your device)",
      "Journal entries (stored locally on your device)",
      "App usage patterns (anonymous, non-identifiable)",
    ],
  },
  {
    title: "How We Use Your Data",
    items: [
      "To personalize your in-app experience",
      "To improve app features and performance",
      "Your data is NEVER sold to third parties",
      "Your data is NEVER used for advertising",
    ],
  },
  {
    title: "Data Storage",
    content:
      "All personal data is stored locally on your device using browser localStorage. No personal data is transmitted to external servers without your explicit consent. Your data stays with you.",
  },
  {
    title: "Mental Health Data",
    content:
      "Your journal entries and mood data never leave your device. We never share, sell, or analyze your personal mental health information. This data is exclusively yours.",
    highlight: true,
  },
  {
    title: "Third-Party Services",
    content:
      "SereneMind does not integrate advertising SDKs, analytics trackers, social media pixels, or any third-party data collection tools. Your privacy is fully protected.",
  },
  {
    title: "Your Rights",
    items: [
      "Access your data — all data is viewable within the app",
      "Delete your data — clear app data in your browser settings",
      "Opt out at any time — simply stop using the app",
      "Data portability — your local data belongs to you",
    ],
  },
  {
    title: "Children's Privacy",
    content:
      "SereneMind is not intended for users under the age of 13. We do not knowingly collect data from children. If you believe a child has provided data, contact us immediately.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. Any changes will be displayed within the app. Continued use of SereneMind after changes constitutes acceptance.",
  },
  {
    title: "Contact Us",
    content: "",
    isContact: true,
  },
];

export default function PrivacyTab() {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Privacy Policy URL copied!");
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="px-6 pt-12 pb-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(93% 0.06 300), oklch(94% 0.05 160))",
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "oklch(72% 0.14 300)",
              boxShadow: "0 4px 16px oklch(72% 0.14 300 / 0.35)",
            }}
          >
            <Shield size={20} color="white" />
          </div>
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: "oklch(28% 0.08 300)" }}
          >
            Privacy Policy
          </h1>
        </div>
        <p className="text-sm" style={{ color: "oklch(48% 0.08 300)" }}>
          Last updated: January 2025
        </p>

        {/* Copy URL for Play Store */}
        <button
          type="button"
          data-ocid="privacy.copy_url.button"
          onClick={handleCopyUrl}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95"
          style={{
            background: "oklch(72% 0.14 300 / 0.15)",
            border: "1px solid oklch(72% 0.14 300 / 0.4)",
            color: "oklch(35% 0.12 300)",
          }}
        >
          <Copy size={15} />
          Copy URL for Play Store Listing
        </button>
      </div>

      <div className="px-5 py-6 space-y-4">
        {sections.map((section) => (
          <div
            key={section.title}
            data-ocid={`privacy.${section.title.toLowerCase().replace(/\s+/g, "_")}.section`}
            className="rounded-3xl p-5"
            style={{
              background: section.highlight
                ? "linear-gradient(135deg, oklch(93% 0.08 300 / 0.5), oklch(94% 0.06 160 / 0.4))"
                : "oklch(97% 0.02 300 / 0.6)",
              border: section.highlight
                ? "1px solid oklch(78% 0.12 300 / 0.5)"
                : "1px solid oklch(88% 0.04 300 / 0.4)",
            }}
          >
            <h2
              className="font-display font-bold text-base mb-3 flex items-center gap-2"
              style={{ color: "oklch(28% 0.08 300)" }}
            >
              {section.highlight && (
                <Shield size={16} style={{ color: "oklch(55% 0.14 300)" }} />
              )}
              {section.title}
            </h2>

            {section.isContact ? (
              <div className="space-y-1">
                <p className="text-sm" style={{ color: "oklch(40% 0.06 300)" }}>
                  For privacy concerns or data requests, contact:
                </p>
                <p
                  className="font-semibold text-sm"
                  style={{ color: "oklch(30% 0.08 300)" }}
                >
                  Dr Muskan Khosla
                </p>
                <a
                  href="mailto:muskankhosla001@gmail.com"
                  className="text-sm font-medium underline"
                  style={{ color: "oklch(48% 0.14 300)" }}
                >
                  muskankhosla001@gmail.com
                </a>
              </div>
            ) : section.items ? (
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "oklch(40% 0.06 300)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ background: "oklch(72% 0.14 300)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(40% 0.06 300)" }}
              >
                {section.content}
              </p>
            )}
          </div>
        ))}

        <div
          className="rounded-3xl p-5 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(93% 0.06 300), oklch(94% 0.05 160))",
          }}
        >
          <Shield
            size={24}
            className="mx-auto mb-2"
            style={{ color: "oklch(55% 0.14 300)" }}
          />
          <p
            className="text-sm font-semibold"
            style={{ color: "oklch(30% 0.08 300)" }}
          >
            Your mental health data is yours — always.
          </p>
          <p className="text-xs mt-1" style={{ color: "oklch(50% 0.06 300)" }}>
            SereneMind was built with privacy as the foundation.
          </p>
        </div>

        <footer className="text-center py-2">
          <p className="text-xs" style={{ color: "oklch(60% 0.06 300)" }}>
            © {new Date().getFullYear()} SereneMind by Dr Muskan Khosla
          </p>
        </footer>
      </div>
    </div>
  );
}
