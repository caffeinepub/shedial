import {
  CheckCircle,
  ChevronRight,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { SOSButton } from "../components/SOSButton";
import { SOSOverlay } from "../components/SOSOverlay";
import { useContacts } from "../hooks/useContacts";
import { useShakeDetection } from "../hooks/useShakeDetection";
import type { AppSettings, TabType } from "../types";
import { triggerSOS } from "../utils/sos";

interface HomeTabProps {
  settings: AppSettings;
  onNavigate: (tab: TabType) => void;
}

export function HomeTab({ settings, onNavigate }: HomeTabProps) {
  const { contacts } = useContacts();
  const [sosActive, setSosActive] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const handleSOSTrigger = useCallback(async () => {
    await triggerSOS(contacts, settings.emergencyNumber, () =>
      setSosActive(true),
    );
    navigator.geolocation?.getCurrentPosition((pos) => {
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }, [contacts, settings.emergencyNumber]);

  useShakeDetection(handleSOSTrigger, !sosActive);

  const previewContacts = contacts.slice(0, 3);

  return (
    <>
      <AnimatePresence>
        {sosActive && <SOSOverlay onCancel={() => setSosActive(false)} />}
      </AnimatePresence>

      <div className="flex flex-col gap-6 px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-white/80 text-sm font-medium">
              Ready for Immediate Help
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h1
            className="font-sans font-black text-white tracking-widest"
            style={{ fontSize: 64, lineHeight: 1, letterSpacing: 8 }}
          >
            HELP
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <SOSButton onTrigger={handleSOSTrigger} />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="font-sans font-bold text-white/60 text-xs tracking-widest uppercase mb-3">
            Emergency Actions
          </h2>
          <div className="card-surface overflow-hidden">
            {[
              {
                num: 1,
                label: "Call Emergency",
                sub: `${settings.emergencyNumber} / 112`,
                Icon: Phone,
              },
              {
                num: 2,
                label: "SMS Alert to Contacts",
                sub: `${contacts.length} contacts saved`,
                Icon: MessageSquare,
              },
              {
                num: 3,
                label: "Share Location",
                sub: location
                  ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
                  : "GPS ready",
                Icon: MapPin,
              },
            ].map((item, i) => (
              <div
                key={item.num}
                data-ocid={`home.action.item.${i + 1}`}
                className={`flex items-center gap-4 px-4 py-3.5 ${i < 2 ? "border-b border-white/8" : ""}`}
              >
                <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-xs">
                    {item.num}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-[15px]">
                    {item.label}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{item.sub}</p>
                </div>
                <item.Icon size={18} className="text-red-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-sans font-bold text-white/60 text-xs tracking-widest uppercase">
              Emergency Contacts
            </h2>
            <button
              type="button"
              data-ocid="home.contacts.link"
              className="flex items-center gap-1 text-red-400 text-sm font-semibold"
              onClick={() => onNavigate("contacts")}
            >
              View All <ChevronRight size={14} />
            </button>
          </div>

          {previewContacts.length === 0 ? (
            <div
              data-ocid="home.contacts.empty_state"
              className="card-surface p-4 text-center"
            >
              <p className="text-white/40 text-sm">
                No contacts yet. Add emergency contacts.
              </p>
            </div>
          ) : (
            <div className="card-surface overflow-hidden">
              {previewContacts.map((c, i) => (
                <div
                  key={c.id}
                  data-ocid={`home.contact.item.${i + 1}`}
                  className={`flex items-center gap-4 px-4 py-3.5 ${i < previewContacts.length - 1 ? "border-b border-white/8" : ""}`}
                >
                  <div className="w-9 h-9 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 font-bold text-sm">
                      {c.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-[15px] truncate">
                      {c.name}
                    </p>
                    <p className="text-white/40 text-xs">{c.phone}</p>
                  </div>
                  <Phone size={16} className="text-red-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </>
  );
}
