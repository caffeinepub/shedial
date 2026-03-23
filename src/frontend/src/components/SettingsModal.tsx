import { Save, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { AppSettings } from "../types";

interface SettingsModalProps {
  settings: AppSettings;
  onSave: (s: Partial<AppSettings>) => void;
  onClose: () => void;
}

export function SettingsModal({
  settings,
  onSave,
  onClose,
}: SettingsModalProps) {
  const [emergencyNumber, setEmergencyNumber] = useState(
    settings.emergencyNumber,
  );

  const handleSave = () => {
    onSave({ emergencyNumber });
    onClose();
  };

  return (
    <motion.div
      data-ocid="settings.modal"
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: modal backdrop */}
      <div
        role="presentation"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-[430px] rounded-t-3xl card-surface p-6 pb-10"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-sans font-bold text-white text-xl">Settings</h2>
          <button
            type="button"
            data-ocid="settings.close_button"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="emergency-number"
              className="text-white/60 text-sm font-medium mb-2 block"
            >
              Emergency Call Number
            </label>
            <input
              id="emergency-number"
              data-ocid="settings.input"
              type="tel"
              value={emergencyNumber}
              onChange={(e) => setEmergencyNumber(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-base font-medium placeholder-white/30 outline-none focus:border-red-500/60 transition-colors"
              placeholder="100"
            />
            <p className="text-white/40 text-xs mt-1.5">
              India: 100 (Police), 112 (Emergency)
            </p>
          </div>
          <div className="card-surface p-4 rounded-xl">
            <h3 className="text-white/80 font-semibold mb-1">About SheDial</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Women safety &amp; emergency response app. Works offline via SMS.
              Version 1.0.0
            </p>
          </div>
        </div>

        <button
          type="button"
          data-ocid="settings.save_button"
          className="w-full mt-6 py-4 rounded-2xl bg-red-500 hover:bg-red-600 active:scale-95 flex items-center justify-center gap-2 text-white font-bold text-base transition-all"
          onClick={handleSave}
        >
          <Save size={18} />
          Save Settings
        </button>
      </motion.div>
    </motion.div>
  );
}
