import type { Contact } from "../types";
import { playSiren } from "./audio";

export async function triggerSOS(
  contacts: Contact[],
  emergencyNumber: string,
  onActivated: () => void,
) {
  playSiren();
  onActivated();

  let mapsLink = "https://maps.google.com/?q=unknown";

  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 5000,
        enableHighAccuracy: true,
      }),
    );
    const { latitude, longitude } = pos.coords;
    mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
  } catch {
    // Location unavailable, use fallback
  }

  const message = `EMERGENCY! I need help immediately. My location: ${mapsLink} - Sent via SheDial`;
  const encoded = encodeURIComponent(message);

  // Open SMS for each contact
  for (const contact of contacts) {
    const phone = contact.phone.replace(/\s+/g, "");
    const smsLink = `sms:${phone}?body=${encoded}`;
    window.open(smsLink, "_blank");
    await new Promise((r) => setTimeout(r, 300));
  }

  // Open emergency call
  setTimeout(() => {
    window.open(`tel:${emergencyNumber}`, "_self");
  }, 1000);
}
