import { PhoneCall, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { stopSiren } from "../utils/audio";

interface SOSOverlayProps {
  onCancel: () => void;
}

export function SOSOverlay({ onCancel }: SOSOverlayProps) {
  useEffect(() => {
    return () => stopSiren();
  }, []);

  const handleCancel = () => {
    stopSiren();
    onCancel();
  };

  return (
    <motion.div
      data-ocid="sos.modal"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center siren-active"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-8 px-8">
        <div className="relative">
          <div
            className="absolute rounded-full bg-red-500/30 ring-expand"
            style={{ width: 120, height: 120, top: -20, left: -20 }}
          />
          <div
            className="absolute rounded-full bg-red-500/20 ring-expand-2"
            style={{ width: 120, height: 120, top: -20, left: -20 }}
          />
          <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center">
            <PhoneCall size={40} className="text-white" />
          </div>
        </div>

        <div className="text-center">
          <h1
            className="font-sans font-black text-white tracking-widest"
            style={{ fontSize: 48, letterSpacing: 4 }}
          >
            SOS
          </h1>
          <p className="font-sans font-bold text-red-400 text-2xl mt-1 tracking-wide">
            ACTIVATED
          </p>
          <p className="text-white/70 mt-4 text-base leading-relaxed">
            Emergency alerts sent to your contacts. Calling{" "}
            <span className="text-red-400 font-bold">100</span> now...
          </p>
        </div>

        <div className="w-full max-w-xs">
          <p className="text-white/50 text-sm text-center mb-4">
            Siren is playing. Stay safe.
          </p>
          <button
            type="button"
            data-ocid="sos.cancel_button"
            className="w-full py-4 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center gap-3 text-white font-bold text-lg active:scale-95 transition-transform"
            onClick={handleCancel}
          >
            <X size={22} />
            Cancel SOS
          </button>
        </div>
      </div>
    </motion.div>
  );
}
