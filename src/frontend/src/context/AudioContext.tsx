import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface AudioContextValue {
  isPlaying: boolean;
  currentTrack: string | null;
  volume: number;
  playTrack: (trackId: string, generator: () => void) => void;
  stopTrack: () => void;
  setVolume: (v: number) => void;
  audioCtx: React.MutableRefObject<AudioContext | null>;
  gainNode: React.MutableRefObject<GainNode | null>;
  stopNodes: React.MutableRefObject<(() => void) | null>;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.6);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const stopNodes = useRef<(() => void) | null>(null);
  const volumeRef = useRef(0.6);

  const ensureCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new AudioContext();
      gainNodeRef.current = audioCtxRef.current.createGain();
      gainNodeRef.current.gain.value = volumeRef.current;
      gainNodeRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const stopTrack = useCallback(() => {
    if (stopNodes.current) {
      stopNodes.current();
      stopNodes.current = null;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  }, []);

  const playTrack = useCallback(
    (trackId: string, generator: () => void) => {
      if (stopNodes.current) {
        stopNodes.current();
        stopNodes.current = null;
      }
      ensureCtx();
      setCurrentTrack(trackId);
      setIsPlaying(true);
      generator();
    },
    [ensureCtx],
  );

  const setVolume = useCallback((v: number) => {
    volumeRef.current = v;
    setVolumeState(v);
    if (gainNodeRef.current) gainNodeRef.current.gain.value = v;
  }, []);

  return (
    <AudioCtx.Provider
      value={{
        isPlaying,
        currentTrack,
        volume,
        playTrack,
        stopTrack,
        setVolume,
        audioCtx: audioCtxRef,
        gainNode: gainNodeRef,
        stopNodes,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be inside AudioProvider");
  return ctx;
}
