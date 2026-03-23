import { useEffect, useRef } from "react";

export function useShakeDetection(onShake: () => void, enabled = true) {
  const lastShake = useRef(0);
  const lastAcc = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (!enabled) return;
    if (typeof DeviceMotionEvent === "undefined") return;

    const handler = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const x = acc.x ?? 0;
      const y = acc.y ?? 0;
      const z = acc.z ?? 0;

      const deltaX = Math.abs(x - lastAcc.current.x);
      const deltaY = Math.abs(y - lastAcc.current.y);
      const deltaZ = Math.abs(z - lastAcc.current.z);

      lastAcc.current = { x, y, z };

      const totalDelta = deltaX + deltaY + deltaZ;
      const now = Date.now();

      if (totalDelta > 25 && now - lastShake.current > 3000) {
        lastShake.current = now;
        onShake();
      }
    };

    if (
      typeof (
        DeviceMotionEvent as unknown as {
          requestPermission?: () => Promise<string>;
        }
      ).requestPermission === "function"
    ) {
      (
        DeviceMotionEvent as unknown as {
          requestPermission: () => Promise<string>;
        }
      )
        .requestPermission()
        .then((permission: string) => {
          if (permission === "granted") {
            window.addEventListener("devicemotion", handler);
          }
        })
        .catch(() => {});
    } else {
      window.addEventListener("devicemotion", handler);
    }

    return () => window.removeEventListener("devicemotion", handler);
  }, [onShake, enabled]);
}
