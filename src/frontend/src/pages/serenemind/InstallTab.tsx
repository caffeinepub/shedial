import { Check, Download, Share2, SmartphoneIcon } from "lucide-react";
import { useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    deferredInstallPrompt?: BeforeInstallPromptEvent;
  }
}

const androidSteps = [
  "Open this link in Chrome browser",
  "Tap the 3-dot menu (\u22ee) at the top right",
  'Tap "Add to Home Screen"',
  'Tap "Add" to confirm',
  "SereneMind icon will appear on your home screen",
];

const iosSteps = [
  "Open this link in Safari browser",
  "Tap the Share button (square with arrow) at the bottom",
  'Scroll down and tap "Add to Home Screen"',
  'Tap "Add" in the top right corner',
  "SereneMind icon will appear on your home screen",
];

export default function InstallTab() {
  const [copied, setCopied] = useState(false);
  const appUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "SereneMind \u2013 Mental Wellness App",
        text: "Try SereneMind \u2013 a calming mental wellness app for anxiety relief, guided exercises, and daily inspiration.",
        url: appUrl,
      });
    } else {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInstall = async () => {
    if (window.deferredInstallPrompt) {
      await window.deferredInstallPrompt.prompt();
    }
  };

  return (
    <div
      className="min-h-screen p-4 pb-8"
      style={{ background: "var(--background)" }}
    >
      {/* Header */}
      <div className="pt-10 pb-6 text-center">
        <div
          className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center"
          style={{ background: "oklch(0.55 0.18 290)" }}
        >
          <Download size={32} className="text-white" />
        </div>
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Install SereneMind
        </h1>
        <p
          className="text-sm mt-1"
          style={{ color: "var(--muted-foreground)" }}
        >
          Add to your home screen for instant access
        </p>
      </div>

      {/* Android Instructions */}
      <div
        className="rounded-2xl p-4 mb-4"
        style={{
          background: "oklch(0.18 0.02 270 / 0.8)",
          border: "1px solid oklch(0.35 0.08 270 / 0.4)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <SmartphoneIcon size={18} style={{ color: "oklch(0.7 0.15 290)" }} />
          <h2
            className="font-semibold text-base"
            style={{ color: "var(--foreground)" }}
          >
            Android
          </h2>
        </div>
        <ol className="space-y-2">
          {androidSteps.map((step) => (
            <li
              key={step}
              className="flex items-start gap-2 text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: "oklch(0.55 0.18 290)", color: "white" }}
              >
                {androidSteps.indexOf(step) + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={handleInstall}
          className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: "oklch(0.55 0.18 290)" }}
        >
          Install Now (Android Chrome)
        </button>
      </div>

      {/* iPhone Instructions */}
      <div
        className="rounded-2xl p-4 mb-4"
        style={{
          background: "oklch(0.18 0.02 270 / 0.8)",
          border: "1px solid oklch(0.35 0.08 270 / 0.4)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <SmartphoneIcon size={18} style={{ color: "oklch(0.7 0.15 150)" }} />
          <h2
            className="font-semibold text-base"
            style={{ color: "var(--foreground)" }}
          >
            iPhone / iPad
          </h2>
        </div>
        <ol className="space-y-2">
          {iosSteps.map((step) => (
            <li
              key={step}
              className="flex items-start gap-2 text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: "oklch(0.5 0.15 150)", color: "white" }}
              >
                {iosSteps.indexOf(step) + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Share Button */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: "oklch(0.18 0.02 270 / 0.8)",
          border: "1px solid oklch(0.35 0.08 270 / 0.4)",
        }}
      >
        <h2
          className="font-semibold text-base mb-1"
          style={{ color: "var(--foreground)" }}
        >
          Share with friends
        </h2>
        <p
          className="text-xs mb-3"
          style={{ color: "var(--muted-foreground)" }}
        >
          Help others find calm -- share SereneMind via WhatsApp, Instagram, or
          any app.
        </p>
        <button
          type="button"
          onClick={handleShare}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
          style={{ background: "oklch(0.55 0.18 290)" }}
        >
          {copied ? <Check size={16} /> : <Share2 size={16} />}
          {copied ? "Link Copied!" : "Share App Link"}
        </button>
      </div>
    </div>
  );
}
