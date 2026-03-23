import { Button } from "@/components/ui/button";
import { ChevronLeft, Music, MicOff as MusicOff } from "lucide-react";
import { useState } from "react";
import { useAudio } from "../../context/AudioContext";
import { createAmbientGenerator } from "../../utils/audioGenerators";

interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  emoji: string;
  color: string;
  steps: string[];
}

const exercises: Exercise[] = [
  {
    id: "anxiety",
    name: "Anxiety Relief",
    description:
      "A gentle 5-step breathing and grounding flow to calm your nervous system",
    duration: "5-8 min",
    difficulty: "Beginner",
    emoji: "🌬️",
    color: "card-lavender",
    steps: [
      "Close your eyes and take a slow,\ndeep breath in... for 4 seconds",
      "Hold your breath gently...\nfor 4 seconds",
      "Slowly breathe out...\nfor 6 seconds",
      "Look around and silently name\n5 things you can see",
      "Place your hand on your heart and say:\n\u201cI am safe. This feeling will pass.\u201d",
    ],
  },
  {
    id: "sleep",
    name: "Calm for Sleep",
    description:
      "Ease into restful sleep with body relaxation and gentle visualization",
    duration: "8-10 min",
    difficulty: "Beginner",
    emoji: "🌙",
    color: "card-mint",
    steps: [
      "Lie down comfortably.\nLet your body sink into the surface beneath you.",
      "Breathe in slowly for 4 counts,\nhold for 7, breathe out for 8.",
      "Scan your body from toes to head,\nreleasing tension as you go.",
      "Picture a peaceful place \u2014\nthe sound of gentle waves, soft grass underfoot.",
      "Let your thoughts drift like clouds.\nYou are safe. It is time to rest.",
    ],
  },
  {
    id: "overthinking",
    name: "Overthinking Control",
    description:
      "Break free from thought loops and find clarity with this mindful practice",
    duration: "6-8 min",
    difficulty: "Gentle",
    emoji: "🧠",
    color: "card-lilac",
    steps: [
      "Notice the thought loop. Say to yourself:\n\u201cI see you, thought. You don't control me.\u201d",
      "Take 3 slow breaths.\nEach exhale, let one worry go.",
      "Write or say out loud:\n\u201cWhat is actually in my control right now?\u201d",
      "Name one small thing you can do\nin the next 5 minutes.",
      "\u201cI am more than my thoughts.\nI choose peace, one breath at a time.\u201d",
    ],
  },
];

export default function ExercisesTab() {
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const {
    isPlaying,
    currentTrack,
    playTrack,
    stopTrack,
    audioCtx,
    gainNode,
    stopNodes,
  } = useAudio();
  const isMusicOn = isPlaying && currentTrack === "exercise-ambient";

  const toggleMusic = () => {
    if (isMusicOn) {
      stopTrack();
      return;
    }
    playTrack("exercise-ambient", () => {
      if (!audioCtx.current || !gainNode.current) return;
      stopNodes.current = createAmbientGenerator(
        audioCtx.current,
        gainNode.current,
      );
    });
  };

  const startExercise = (ex: Exercise) => {
    setSelected(ex);
    setStep(0);
    setFinished(false);
  };
  const nextStep = () => {
    if (!selected) return;
    if (step < selected.steps.length - 1) setStep(step + 1);
    else setFinished(true);
  };
  const reset = () => {
    setSelected(null);
    setStep(0);
    setFinished(false);
  };

  if (selected && finished) {
    return (
      <div className="min-h-screen lavender-gradient flex flex-col items-center justify-center px-8 text-center fade-in">
        <div className="text-6xl mb-6">✨</div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          Well done
        </h2>
        <p className="text-muted-foreground mb-8">
          You completed the exercise. Take a moment to notice how you feel.
        </p>
        <Button
          data-ocid="exercises.restart.button"
          onClick={reset}
          className="rounded-full bg-primary text-primary-foreground px-8 py-3"
        >
          Back to Exercises
        </Button>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="min-h-screen lavender-gradient flex flex-col" key={step}>
        <div className="flex items-center justify-between px-6 pt-12 pb-4">
          <button
            type="button"
            data-ocid="exercises.back.button"
            onClick={reset}
            className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
          <span className="font-display font-semibold text-foreground text-sm">
            {selected.name}
          </span>
          <button
            type="button"
            data-ocid="exercises.music.toggle"
            onClick={toggleMusic}
            className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center"
          >
            {isMusicOn ? (
              <MusicOff size={16} className="text-primary" />
            ) : (
              <Music size={16} className="text-muted-foreground" />
            )}
          </button>
        </div>
        <div className="flex justify-center gap-2 pb-4">
          {selected.steps.map((s, i) => (
            <span
              key={s.slice(0, 20)}
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? "bg-primary w-6" : i < step ? "bg-primary/50 w-2" : "bg-muted-foreground/30 w-2"}`}
            />
          ))}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8 fade-in">
          <div className="relative w-40 h-40 mb-8">
            <div className="breathing-circle absolute inset-0 rounded-full bg-primary/20" />
            <div
              className="breathing-circle absolute inset-4 rounded-full bg-primary/15"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">{selected.emoji}</span>
            </div>
          </div>
          <div className="card-soft w-full p-6 text-center">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Step {step + 1} of {selected.steps.length}
            </p>
            <p className="font-display text-xl font-semibold text-foreground whitespace-pre-line leading-relaxed">
              {selected.steps[step]}
            </p>
          </div>
        </div>
        <div className="px-8 pb-12">
          <Button
            data-ocid="exercises.next.button"
            onClick={nextStep}
            className="w-full rounded-full bg-primary text-primary-foreground py-4 text-base font-semibold"
          >
            {step === selected.steps.length - 1 ? "Finish ✨" : "Next →"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="lavender-gradient px-6 pt-12 pb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Guided Exercises
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Step-by-step flows to calm your mind and body
        </p>
      </div>
      <div className="px-6 py-6 space-y-4">
        {exercises.map((ex) => (
          <button
            type="button"
            key={ex.id}
            data-ocid={`exercises.${ex.id}.card`}
            onClick={() => startExercise(ex)}
            className={`${ex.color} w-full p-5 text-left active:scale-[0.98] transition-transform`}
            style={{ borderRadius: 20 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{ex.emoji}</span>
              <span className="font-display font-bold text-[#111111] text-lg">
                {ex.name}
              </span>
            </div>
            <p className="text-[#3A3A3A] text-sm mb-3">{ex.description}</p>
            <div className="flex gap-3">
              <span className="text-xs bg-white/60 rounded-full px-3 py-1 text-[#3A3A3A] font-medium">
                {ex.duration}
              </span>
              <span className="text-xs bg-white/60 rounded-full px-3 py-1 text-[#3A3A3A] font-medium">
                {ex.difficulty}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
