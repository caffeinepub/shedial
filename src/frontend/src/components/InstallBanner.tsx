import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (sessionStorage.getItem("install-dismissed")) return;

    // Detect iOS
    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(navigator as unknown as { standalone?: boolean }).standalone;
    setIsIOS(ios);

    if (ios) {
      setTimeout(() => setShowBanner(true), 3000);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    sessionStorage.setItem("install-dismissed", "1");
  };

  if (!showBanner || dismissed) return null;

  return (
    <div
      className="fixed bottom-20 left-0 right-0 z-50 flex justify-center px-4"
      style={{ maxWidth: 430, margin: "0 auto" }}
    >
      <div
        className="w-full rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl"
        style={{
          background: "oklch(0.16 0.02 25)",
          border: "1px solid oklch(0.3 0.08 25 / 0.6)",
        }}
      >
        <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
          <Download size={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm">Install SheDial</p>
          {isIOS ? (
            <p className="text-white/50 text-xs mt-0.5">
              Tap <strong className="text-white/70">Share</strong> then{" "}
              <strong className="text-white/70">Add to Home Screen</strong>
            </p>
          ) : (
            <p className="text-white/50 text-xs mt-0.5">
              Add to home screen for instant access
            </p>
          )}
        </div>
        {!isIOS && (
          <button
            type="button"
            onClick={handleInstall}
            className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold flex-shrink-0"
          >
            Install
          </button>
        )}
        <button
          type="button"
          onClick={handleDismiss}
          className="text-white/40 flex-shrink-0"
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
