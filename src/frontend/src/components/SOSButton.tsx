import { useCallback, useEffect, useRef, useState } from "react";

interface SOSButtonProps {
  onTrigger: () => void;
}

const HOLD_DURATION = 2000;

export function SOSButton({ onTrigger }: SOSButtonProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdStart = useRef<number | null>(null);
  const animRef = useRef<number | null>(null);
  const triggeredRef = useRef(false);

  const animate = useCallback(() => {
    if (holdStart.current === null) return;
    const elapsed = Date.now() - holdStart.current;
    const pct = Math.min((elapsed / HOLD_DURATION) * 100, 100);
    setProgress(pct);
    if (pct < 100) {
      animRef.current = requestAnimationFrame(animate);
    } else if (!triggeredRef.current) {
      triggeredRef.current = true;
      onTrigger();
      setIsHolding(false);
      setProgress(0);
    }
  }, [onTrigger]);

  const startHold = useCallback(() => {
    triggeredRef.current = false;
    holdStart.current = Date.now();
    setIsHolding(true);
    animRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const endHold = useCallback(() => {
    holdStart.current = null;
    setIsHolding(false);
    setProgress(0);
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center">
        <div
          className="absolute rounded-full border border-red-500/20 pulse-ring"
          style={{ width: 220, height: 220 }}
        />
        <div
          className="absolute rounded-full border border-red-500/15 pulse-ring-2"
          style={{ width: 240, height: 240 }}
        />

        <svg
          className="absolute"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          aria-hidden="true"
          role="presentation"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="rgba(255,59,48,0.15)"
            strokeWidth="6"
          />
          <circle
            className="progress-ring transition-none"
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke={isHolding ? "#FF3B30" : "transparent"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        <div
          className="absolute rounded-full"
          style={{
            width: 180,
            height: 180,
            background: "radial-gradient(circle, #4A1010 0%, #2A0808 100%)",
            border: "2px solid #8B1A1A",
          }}
        />

        <button
          type="button"
          data-ocid="sos.button"
          className={`relative rounded-full flex flex-col items-center justify-center cursor-pointer select-none z-10 transition-transform duration-100 ${isHolding ? "scale-95" : "scale-100"} ${isHolding ? "sos-glow-active" : "sos-glow"}`}
          style={{
            width: 160,
            height: 160,
            background: isHolding
              ? "radial-gradient(circle at 35% 35%, #FF6B5B, #C91515)"
              : "radial-gradient(circle at 35% 35%, #FF5247, #FF3B30)",
            border: "3px solid rgba(255,255,255,0.15)",
            touchAction: "none",
          }}
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={(e) => {
            e.preventDefault();
            startHold();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            endHold();
          }}
          onTouchCancel={endHold}
          aria-label="SOS Emergency Button - Hold for 2 seconds"
        >
          <span
            className="font-sans font-black tracking-widest text-white"
            style={{ fontSize: 40, lineHeight: 1, letterSpacing: 6 }}
          >
            SOS
          </span>
          <span
            className="font-sans font-medium text-white/80 mt-1"
            style={{ fontSize: 12, letterSpacing: 1 }}
          >
            {isHolding ? `${Math.round(progress)}%` : "Hold 2 Seconds"}
          </span>
        </button>
      </div>
    </div>
  );
}
