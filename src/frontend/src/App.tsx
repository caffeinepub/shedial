import { Toaster } from "@/components/ui/sonner";
import {
  FileText,
  Home,
  PhoneIncoming,
  Radio,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SettingsModal } from "./components/SettingsModal";
import { useSettings } from "./hooks/useSettings";
import { ContactsTab } from "./pages/ContactsTab";
import { FakeCallTab } from "./pages/FakeCallTab";
import { HelplineTab } from "./pages/HelplineTab";
import { HomeTab } from "./pages/HomeTab";
import { PitchDeckTab } from "./pages/PitchDeckTab";
import type { TabType } from "./types";

const TABS: { id: TabType; label: string; Icon: React.ElementType }[] = [
  { id: "home", label: "HOME", Icon: Home },
  { id: "contacts", label: "CONTACTS", Icon: Users },
  { id: "helpline", label: "HELPLINE", Icon: Shield },
  { id: "fakecall", label: "FAKE CALL", Icon: PhoneIncoming },
  { id: "pitchdeck", label: "PITCH", Icon: FileText },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSettings } = useSettings();

  const tabTitles: Record<TabType, string> = {
    home: "",
    contacts: "Emergency Contacts",
    helpline: "Helplines",
    fakecall: "Fake Call",
    pitchdeck: "Pitch Deck",
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center"
      style={{ background: "oklch(0.06 0.003 270)" }}
    >
      <div
        className="relative flex flex-col w-full max-w-[430px] min-h-screen"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.13 0.01 25 / 0.4) 0%, oklch(0.09 0.005 270) 60%)",
        }}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-5 pt-12 pb-4 flex-shrink-0">
          <div className="w-12" />
          <div className="flex flex-col items-center">
            <Radio size={20} className="text-red-500 mb-1" />
            <h1 className="font-display font-bold text-white text-2xl tracking-wide">
              SheDial
            </h1>
          </div>
          <button
            type="button"
            data-ocid="settings.open_modal_button"
            className="flex flex-col items-center gap-0.5 w-12"
            onClick={() => setShowSettings(true)}
            aria-label="Open settings"
          >
            <Settings size={22} className="text-white/60" />
            <span className="text-white/40 text-[10px] font-medium">
              Settings
            </span>
          </button>
        </header>

        {activeTab !== "home" && (
          <div className="px-5 pb-4">
            <h2 className="font-sans font-black text-white text-xl tracking-wide">
              {tabTitles[activeTab]}
            </h2>
          </div>
        )}

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "home" && (
                <HomeTab settings={settings} onNavigate={setActiveTab} />
              )}
              {activeTab === "contacts" && <ContactsTab />}
              {activeTab === "helpline" && <HelplineTab />}
              {activeTab === "fakecall" && <FakeCallTab />}
              {activeTab === "pitchdeck" && <PitchDeckTab />}
            </motion.div>
          </AnimatePresence>
        </main>

        <nav
          data-ocid="home.tab"
          className="nav-bar fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 py-2 z-30"
          style={{ maxWidth: 430, marginLeft: "auto", marginRight: "auto" }}
        >
          {TABS.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                type="button"
                key={id}
                data-ocid={`nav.${id}.link`}
                className="flex flex-col items-center gap-1 flex-1 py-2 relative"
                onClick={() => setActiveTab(id)}
                aria-label={label}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-red-500"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <Icon
                  size={22}
                  className={isActive ? "text-red-500" : "text-white/35"}
                />
                <span
                  className={`text-[10px] font-bold tracking-widest ${isActive ? "text-red-500" : "text-white/35"}`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="h-20 flex-shrink-0" />

        <AnimatePresence>
          {showSettings && (
            <SettingsModal
              key="settings"
              settings={settings}
              onSave={updateSettings}
              onClose={() => setShowSettings(false)}
            />
          )}
        </AnimatePresence>
      </div>

      <Toaster />
    </div>
  );
}
