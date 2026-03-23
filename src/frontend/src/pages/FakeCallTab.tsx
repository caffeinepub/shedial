import { Phone, PhoneOff, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { playRingtone, stopRingtone } from "../utils/audio";

type CallState = "idle" | "incoming" | "active";

const DELAY_OPTIONS = [
  { label: "Immediate", value: 0 },
  { label: "30 sec", value: 30 },
  { label: "1 minute", value: 60 },
  { label: "2 minutes", value: 120 },
];

export function FakeCallTab() {
  const [callerName, setCallerName] = useState("Mom");
  const [delay, setDelay] = useState(0);
  const [callState, setCallState] = useState<CallState>("idle");
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      stopRingtone();
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const triggerIncoming = () => {
    setCallState("incoming");
    playRingtone();
  };

  const startFakeCall = () => {
    if (delay === 0) {
      triggerIncoming();
    } else {
      setCountdown(delay);
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownRef.current!);
            countdownRef.current = null;
            setCountdown(null);
            triggerIncoming();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const acceptCall = () => {
    stopRingtone();
    setCallState("active");
    setCallDuration(0);
    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const declineCall = () => {
    stopRingtone();
    setCallState("idle");
    setCountdown(null);
  };

  const endCall = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCallState("idle");
    setCallDuration(0);
  };

  const cancelCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setCountdown(null);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <AnimatePresence>
        {(callState === "incoming" || callState === "active") && (
          <motion.div
            data-ocid="fakecall.modal"
            className="fixed inset-0 z-50 flex flex-col items-center justify-between py-16 px-8"
            style={{
              background: "linear-gradient(180deg, #0D0D0F 0%, #1A0A0A 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <p className="text-white/50 text-base font-medium">
                {callState === "incoming"
                  ? "Incoming Call"
                  : "Call in progress..."}
              </p>
              <h2 className="font-sans font-black text-white text-4xl mt-3">
                {callerName}
              </h2>
              {callState === "active" && (
                <p className="text-white/60 text-xl mt-2 font-mono">
                  {formatTime(callDuration)}
                </p>
              )}
            </div>

            <div
              className="relative flex items-center justify-center"
              style={{ width: 200, height: 200 }}
            >
              {callState === "incoming" && (
                <>
                  <div
                    className="absolute rounded-full bg-white/5 ring-expand"
                    style={{ width: 180, height: 180 }}
                  />
                  <div
                    className="absolute rounded-full bg-white/5 ring-expand-2"
                    style={{ width: 180, height: 180 }}
                  />
                  <div
                    className="absolute rounded-full bg-white/5 ring-expand-3"
                    style={{ width: 180, height: 180 }}
                  />
                </>
              )}
              <div
                className={`w-28 h-28 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center z-10 ${callState === "incoming" ? "incoming-pulse" : ""}`}
              >
                <User size={52} className="text-white" />
              </div>
            </div>

            {callState === "incoming" ? (
              <div className="flex gap-16 items-center">
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    data-ocid="fakecall.cancel_button"
                    className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center active:scale-90 transition-transform"
                    onClick={declineCall}
                  >
                    <PhoneOff size={28} className="text-white" />
                  </button>
                  <span className="text-white/50 text-sm">Decline</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    data-ocid="fakecall.confirm_button"
                    className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center active:scale-90 transition-transform"
                    onClick={acceptCall}
                  >
                    <Phone size={28} className="text-white" />
                  </button>
                  <span className="text-white/50 text-sm">Accept</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  data-ocid="fakecall.close_button"
                  className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center active:scale-90 transition-transform"
                  onClick={endCall}
                >
                  <PhoneOff size={28} className="text-white" />
                </button>
                <span className="text-white/50 text-sm">End Call</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-6 px-4 pb-6">
        <p className="text-white/50 text-sm leading-relaxed">
          Simulate an incoming call to escape uncomfortable situations
        </p>

        <div className="card-surface p-5 space-y-5">
          <div>
            <label
              htmlFor="caller-name"
              className="text-white/60 text-sm font-medium mb-2 block"
            >
              Caller Name
            </label>
            <input
              id="caller-name"
              data-ocid="fakecall.input"
              type="text"
              value={callerName}
              onChange={(e) => setCallerName(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-base placeholder-white/30 outline-none focus:border-red-500/60 transition-colors"
              placeholder="Mom"
            />
          </div>

          <div>
            <p className="text-white/60 text-sm font-medium mb-3">Call Delay</p>
            <div className="grid grid-cols-2 gap-2">
              {DELAY_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  data-ocid="fakecall.toggle"
                  className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all active:scale-95 ${delay === opt.value ? "bg-red-500 text-white" : "bg-white/5 border border-white/15 text-white/70"}`}
                  onClick={() => setDelay(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {countdown !== null ? (
          <div className="text-center">
            <p className="text-white/60 text-base">
              Call in{" "}
              <span className="text-red-400 font-bold text-2xl">
                {countdown}s
              </span>
              ...
            </p>
            <button
              type="button"
              data-ocid="fakecall.cancel_button"
              className="mt-3 px-6 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white/70 text-sm font-semibold active:scale-95 transition-transform"
              onClick={cancelCountdown}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            data-ocid="fakecall.primary_button"
            className="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-600 active:scale-95 flex items-center justify-center gap-3 text-white font-bold text-base transition-all"
            onClick={startFakeCall}
          >
            <Phone size={20} />
            Start Fake Call
          </button>
        )}

        <div className="card-surface p-4 rounded-xl">
          <h3 className="text-white/70 font-semibold text-sm mb-1">
            How to use
          </h3>
          <p className="text-white/40 text-xs leading-relaxed">
            Set a delay, then tap Start. Your phone will simulate an incoming
            call. Show the screen to escape an unsafe situation.
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center pb-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
