export function createAmbientGenerator(
  ctx: AudioContext,
  masterGain: GainNode,
): () => void {
  const oscillators: OscillatorNode[] = [];
  const gains: GainNode[] = [];
  for (const [i, freq] of [80, 160, 240].entries()) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq + i * 1.5;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2);
    osc.connect(g);
    g.connect(masterGain);
    osc.start();
    oscillators.push(osc);
    gains.push(g);
  }
  return () => {
    for (const g of gains)
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    setTimeout(() => {
      for (const o of oscillators) {
        try {
          o.stop();
        } catch {
          /**/
        }
      }
    }, 1100);
  };
}

export function createTrackGenerator(
  ctx: AudioContext,
  masterGain: GainNode,
  trackId: string,
): () => void {
  const oscillators: OscillatorNode[] = [];
  const sources: AudioBufferSourceNode[] = [];
  const gainNodes: GainNode[] = [];

  const fadeIn = (g: GainNode, peak = 0.15) => {
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(peak, ctx.currentTime + 2);
  };

  const createNoise = (filterFreq = 800, peak = 0.12): GainNode => {
    const bufSize = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = filterFreq;
    const g = ctx.createGain();
    fadeIn(g, peak);
    src.connect(filter);
    filter.connect(g);
    g.connect(masterGain);
    src.start();
    sources.push(src);
    gainNodes.push(g);
    return g;
  };

  const createOsc = (
    freq: number,
    type: OscillatorType = "sine",
    peak = 0.05,
  ): OscillatorNode => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    fadeIn(g, peak);
    osc.connect(g);
    g.connect(masterGain);
    osc.start();
    oscillators.push(osc);
    gainNodes.push(g);
    return osc;
  };

  switch (trackId) {
    case "rain":
      createNoise(1200, 0.18);
      createNoise(400, 0.08);
      break;
    case "ocean": {
      const ng = createNoise(600, 0.14);
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      lfo.frequency.value = 0.15;
      lg.gain.value = 0.06;
      lfo.connect(lg);
      lg.connect(ng.gain);
      lfo.start();
      oscillators.push(lfo);
      break;
    }
    case "forest":
      createNoise(2000, 0.08);
      createOsc(220, "sine", 0.04);
      createOsc(440, "sine", 0.03);
      createOsc(660, "sine", 0.02);
      break;
    case "deep":
      createOsc(432, "sine", 0.06);
      createOsc(216, "sine", 0.08);
      createOsc(108, "sine", 0.07);
      break;
    case "midnight":
      createOsc(60, "sine", 0.05);
      createOsc(120, "sine", 0.03);
      createNoise(200, 0.03);
      break;
    case "lullaby": {
      for (const [i, f] of [261.63, 293.66, 329.63, 392, 440].entries()) {
        const o = createOsc(f, "sine", 0.03);
        const vl = ctx.createOscillator();
        const vg = ctx.createGain();
        vl.frequency.value = 0.3 + i * 0.1;
        vg.gain.value = 1.5;
        vl.connect(vg);
        vg.connect(o.frequency);
        vl.start();
        oscillators.push(vl);
      }
      break;
    }
    case "clearmind":
      createOsc(396, "sine", 0.06);
      createOsc(528, "sine", 0.04);
      break;
    case "studyflow": {
      createOsc(174, "sine", 0.07);
      const pl = ctx.createOscillator();
      const pg = ctx.createGain();
      pl.frequency.value = 1;
      pg.gain.value = 0.04;
      pl.connect(pg);
      pg.connect(masterGain);
      pl.start();
      oscillators.push(pl);
      break;
    }
    case "morning":
      createOsc(528, "sine", 0.05);
      createOsc(1056, "sine", 0.03);
      createOsc(792, "sine", 0.03);
      break;
    default:
      createNoise(800, 0.1);
  }

  return () => {
    for (const g of gainNodes) {
      try {
        g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      } catch {
        /**/
      }
    }
    setTimeout(() => {
      for (const o of oscillators) {
        try {
          o.stop();
        } catch {
          /**/
        }
      }
      for (const s of sources) {
        try {
          s.stop();
        } catch {
          /**/
        }
      }
    }, 1200);
  };
}
