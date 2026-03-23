import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

interface MoodEntry {
  emoji: string;
  label: string;
  score: number;
  note: string;
  timestamp: number;
}

const moods = [
  { emoji: "😊", label: "Happy", score: 5 },
  { emoji: "😌", label: "Calm", score: 4 },
  { emoji: "😐", label: "Neutral", score: 3 },
  { emoji: "😔", label: "Sad", score: 2 },
  { emoji: "😰", label: "Anxious", score: 1 },
];

const KEY = "sereneMind_moods";
const load = (): MoodEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};
const save = (e: MoodEntry[]) => localStorage.setItem(KEY, JSON.stringify(e));

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MoodTab() {
  const [entries, setEntries] = useState<MoodEntry[]>(load);
  const [selected, setSelected] = useState<(typeof moods)[number] | null>(null);
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (!selected) return;
    const entry: MoodEntry = {
      emoji: selected.emoji,
      label: selected.label,
      score: selected.score,
      note: note.trim(),
      timestamp: Date.now(),
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    save(updated);
    setNote("");
    setSelected(null);
    toast.success("Mood saved 💛");
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const target = new Date();
    target.setDate(target.getDate() - (6 - i));
    const dayStart = new Date(
      target.getFullYear(),
      target.getMonth(),
      target.getDate(),
    ).getTime();
    const dayEnd = dayStart + 86400000;
    const entry = entries.find(
      (e) => e.timestamp >= dayStart && e.timestamp < dayEnd,
    );
    const label = target.toLocaleDateString("en-US", { weekday: "short" });
    return { label, entry };
  });

  return (
    <div className="min-h-screen">
      <div className="lavender-gradient px-6 pt-12 pb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Mood Tracker
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Check in with how you are feeling
        </p>
      </div>
      <div className="px-6 py-6 space-y-6">
        <section>
          <h2 className="font-semibold text-foreground mb-3">
            How are you feeling right now?
          </h2>
          <div className="flex justify-between">
            {moods.map((m) => (
              <button
                type="button"
                key={m.label}
                data-ocid={`mood.${m.label.toLowerCase()}.button`}
                onClick={() => setSelected(m)}
                className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-200 ${
                  selected?.label === m.label
                    ? "bg-primary/20 scale-110"
                    : "bg-secondary hover:bg-primary/10"
                }`}
              >
                <span className="text-3xl">{m.emoji}</span>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {selected && (
          <div className="slide-up space-y-3">
            <p className="text-sm text-muted-foreground">
              Add a note (optional)
            </p>
            <Textarea
              data-ocid="mood.note.textarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind..."
              className="rounded-2xl resize-none"
              rows={3}
            />
            <Button
              data-ocid="mood.save.submit_button"
              onClick={handleSave}
              className="w-full rounded-full bg-primary text-primary-foreground"
            >
              Save Mood {selected.emoji}
            </Button>
          </div>
        )}

        <section>
          <h2 className="font-semibold text-foreground mb-3">This Week</h2>
          <div className="card-soft p-4">
            <div className="flex justify-between">
              {last7Days.map((day) => (
                <div
                  key={day.label}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-xl">
                    {day.entry?.emoji || "\u00b7"}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {day.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {last7Days.some((d) => d.entry) && (
          <section>
            <h2 className="font-semibold text-foreground mb-3">Weekly Trend</h2>
            <div className="card-soft p-4">
              <div className="flex items-end gap-2 h-20">
                {last7Days.map((day) => (
                  <div
                    key={`trend-${day.label}`}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-full rounded-t-lg bg-primary/70 transition-all duration-500"
                      style={{
                        height: day.entry
                          ? `${(day.entry.score / 5) * 64}px`
                          : "4px",
                        opacity: day.entry ? 1 : 0.2,
                      }}
                    />
                    <span className="text-[9px] text-muted-foreground">
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {entries.slice(0, 5).length > 0 ? (
          <section>
            <h2 className="font-semibold text-foreground mb-3">
              Recent Entries
            </h2>
            <div className="space-y-2">
              {entries.slice(0, 5).map((entry, i) => (
                <div
                  key={entry.timestamp}
                  data-ocid={`mood.history.item.${i + 1}`}
                  className="card-soft p-4 flex items-start gap-3"
                >
                  <span className="text-2xl">{entry.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-foreground">
                        {entry.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {entry.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div
            data-ocid="mood.history.empty_state"
            className="text-center py-8"
          >
            <p className="text-4xl mb-3">🌱</p>
            <p className="text-muted-foreground text-sm">
              Start tracking your mood above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
