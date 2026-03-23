import { Slider } from "@/components/ui/slider";
import { Volume2 } from "lucide-react";
import { useState } from "react";
import { useAudio } from "../../context/AudioContext";
import { createTrackGenerator } from "../../utils/audioGenerators";

interface Track {
  id: string;
  name: string;
  description: string;
  category: string;
  emoji: string;
}

const tracks: Track[] = [
  {
    id: "rain",
    name: "Rain Sounds",
    description: "Soft filtered rainfall",
    category: "Relax",
    emoji: "🌧️",
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    description: "Gentle rolling tides",
    category: "Relax",
    emoji: "🌊",
  },
  {
    id: "forest",
    name: "Forest Morning",
    description: "Layered gentle nature tones",
    category: "Relax",
    emoji: "🌿",
  },
  {
    id: "deep",
    name: "Deep Sleep Ambient",
    description: "Very low drones, 432Hz",
    category: "Sleep",
    emoji: "🌑",
  },
  {
    id: "midnight",
    name: "Midnight Stillness",
    description: "Barely audible calming hum",
    category: "Sleep",
    emoji: "✨",
  },
  {
    id: "lullaby",
    name: "Soft Lullaby Tones",
    description: "Gentle pentatonic notes",
    category: "Sleep",
    emoji: "🌙",
  },
  {
    id: "clearmind",
    name: "Clear Mind",
    description: "Clean sine tones, steady",
    category: "Focus",
    emoji: "💎",
  },
  {
    id: "studyflow",
    name: "Study Flow",
    description: "Soft rhythmic pulse",
    category: "Focus",
    emoji: "📚",
  },
  {
    id: "morning",
    name: "Morning Clarity",
    description: "Bright airy tones",
    category: "Focus",
    emoji: "☀️",
  },
];

const categories = ["Relax", "Sleep", "Focus"];

export default function MusicTab() {
  const [activeCategory, setActiveCategory] = useState("Relax");
  const {
    isPlaying,
    currentTrack,
    playTrack,
    stopTrack,
    volume,
    setVolume,
    audioCtx,
    gainNode,
    stopNodes,
  } = useAudio();

  const handlePlay = (track: Track) => {
    if (currentTrack === track.id && isPlaying) {
      stopTrack();
      return;
    }
    playTrack(track.id, () => {
      if (!audioCtx.current || !gainNode.current) return;
      stopNodes.current = createTrackGenerator(
        audioCtx.current,
        gainNode.current,
        track.id,
      );
    });
  };

  const filtered = tracks.filter((t) => t.category === activeCategory);
  const nowPlaying = tracks.find((t) => t.id === currentTrack);

  return (
    <div className="min-h-screen">
      <div className="lavender-gradient px-6 pt-12 pb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Calm Music
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Ambient sounds for rest, focus and peace
        </p>
      </div>
      <div className="px-6 py-4">
        <div className="flex gap-2 mb-6">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid={`music.${cat.toLowerCase()}.tab`}
              onClick={() => setActiveCategory(cat)}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="card-soft p-4 mb-6">
          <div className="flex items-center gap-3">
            <Volume2 size={16} className="text-muted-foreground shrink-0" />
            <Slider
              data-ocid="music.volume.input"
              value={[volume]}
              min={0}
              max={1}
              step={0.05}
              onValueChange={([v]) => setVolume(v)}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map((track, i) => {
            const playing = isPlaying && currentTrack === track.id;
            return (
              <div
                key={track.id}
                data-ocid={`music.track.item.${i + 1}`}
                className="card-soft p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0 text-2xl">
                  {track.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">
                    {track.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {track.description}
                  </p>
                  {playing && (
                    <div className="flex gap-0.5 mt-1 items-end h-4">
                      {[...Array(5)].map((_, j) => (
                        <span
                          key={`wave-${track.id}-${j}`}
                          className="waveform-bar w-1 bg-primary rounded-full"
                          style={{ animationDelay: `${j * 0.1}s` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  data-ocid={`music.track.button.${i + 1}`}
                  onClick={() => handlePlay(track)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    playing
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {playing ? (
                    <span className="w-3 h-3 flex gap-0.5">
                      <span className="w-1 bg-current rounded-sm h-full" />
                      <span className="w-1 bg-current rounded-sm h-full" />
                    </span>
                  ) : (
                    <span className="ml-0.5 border-t-[6px] border-b-[6px] border-l-[10px] border-t-transparent border-b-transparent border-l-current" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
        {nowPlaying && isPlaying && (
          <div className="mt-6 card-soft p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-base">{nowPlaying.emoji}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Now playing</p>
                <p className="text-sm font-semibold text-foreground">
                  {nowPlaying.name}
                </p>
              </div>
              <button
                type="button"
                data-ocid="music.stop.button"
                onClick={stopTrack}
                className="text-xs text-destructive font-medium"
              >
                Stop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
