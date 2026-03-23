let sirenCtx: AudioContext | null = null;
let sirenInterval: ReturnType<typeof setInterval> | null = null;

export function playSiren() {
  stopSiren();
  sirenCtx = new AudioContext();
  const ctx = sirenCtx;
  let high = true;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
  oscillator.frequency.setValueAtTime(800, ctx.currentTime);
  oscillator.start();

  sirenInterval = setInterval(() => {
    high = !high;
    oscillator.frequency.setValueAtTime(high ? 1000 : 800, ctx.currentTime);
  }, 500);
}

export function stopSiren() {
  if (sirenInterval) {
    clearInterval(sirenInterval);
    sirenInterval = null;
  }
  if (sirenCtx) {
    sirenCtx.close();
    sirenCtx = null;
  }
}

let ringtoneCtx: AudioContext | null = null;
let ringtoneInterval: ReturnType<typeof setInterval> | null = null;

export function playRingtone() {
  stopRingtone();
  ringtoneCtx = new AudioContext();
  const ctx = ringtoneCtx;

  function beep() {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }

  beep();
  ringtoneInterval = setInterval(() => {
    beep();
  }, 1200);
}

export function stopRingtone() {
  if (ringtoneInterval) {
    clearInterval(ringtoneInterval);
    ringtoneInterval = null;
  }
  if (ringtoneCtx) {
    ringtoneCtx.close();
    ringtoneCtx = null;
  }
}
