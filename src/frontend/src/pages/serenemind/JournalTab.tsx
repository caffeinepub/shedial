import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  prompt: string;
  timestamp: number;
}

const prompts = [
  "What are you feeling right now?",
  "What made you anxious today?",
  "What are 3 things you are grateful for?",
  "Describe a moment of peace you had recently.",
  "What would you tell a friend going through what you are facing?",
  "What do you need most right now?",
  "Write about one small win today, however tiny.",
];

const KEY = "sereneMind_journal";
const load = (): JournalEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};
const save = (e: JournalEntry[]) =>
  localStorage.setItem(KEY, JSON.stringify(e));
const formatDate = (ts: number) =>
  new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function getDailyPrompt() {
  const start = new Date(new Date().getFullYear(), 0, 0).getTime();
  const day = Math.floor((Date.now() - start) / 86400000);
  return prompts[day % prompts.length];
}

export default function JournalTab() {
  const [entries, setEntries] = useState<JournalEntry[]>(load);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const prompt = getDailyPrompt();

  const handleSave = () => {
    if (!content.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      title:
        title.trim() ||
        content.slice(0, 40) + (content.length > 40 ? "..." : ""),
      content: content.trim(),
      prompt,
      timestamp: Date.now(),
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    save(updated);
    setTitle("");
    setContent("");
    toast.success("Journal entry saved 📓");
  };

  const handleDelete = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    save(updated);
    toast("Entry deleted");
  };

  return (
    <div className="min-h-screen">
      <div className="lavender-gradient px-6 pt-12 pb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">
          My Journal
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          A private space to process your thoughts
        </p>
      </div>
      <div className="px-6 py-6 space-y-6">
        <section>
          <div className="card-soft p-5 space-y-4">
            <div className="mint-wash rounded-2xl p-4">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                Today's Prompt
              </p>
              <p className="text-sm font-medium text-foreground italic">
                "{prompt}"
              </p>
            </div>
            <Input
              data-ocid="journal.title.input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entry title (optional)"
              className="rounded-xl border-border"
            />
            <div className="relative">
              <Textarea
                data-ocid="journal.content.textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing freely..."
                className="rounded-2xl resize-none min-h-[140px]"
                rows={6}
              />
              <span className="absolute bottom-3 right-3 text-[10px] text-muted-foreground">
                {content.length} chars
              </span>
            </div>
            <Button
              data-ocid="journal.save.submit_button"
              onClick={handleSave}
              disabled={!content.trim()}
              className="w-full rounded-full bg-primary text-primary-foreground"
            >
              Save Entry
            </Button>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-foreground mb-3">Past Entries</h2>
          {entries.length === 0 ? (
            <div
              data-ocid="journal.entries.empty_state"
              className="text-center py-8"
            >
              <p className="text-4xl mb-3">📓</p>
              <p className="text-muted-foreground text-sm">
                Your journal entries will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, i) => (
                <div
                  key={entry.id}
                  data-ocid={`journal.entry.item.${i + 1}`}
                  className="card-soft overflow-hidden"
                >
                  <button
                    type="button"
                    className="w-full p-4 text-left flex items-start justify-between gap-3"
                    onClick={() =>
                      setExpandedId(expandedId === entry.id ? null : entry.id)
                    }
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {entry.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(entry.timestamp)}
                      </p>
                      {expandedId !== entry.id && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {entry.content}
                        </p>
                      )}
                    </div>
                    {expandedId === entry.id ? (
                      <ChevronUp
                        size={14}
                        className="text-muted-foreground shrink-0"
                      />
                    ) : (
                      <ChevronDown
                        size={14}
                        className="text-muted-foreground shrink-0"
                      />
                    )}
                  </button>
                  {expandedId === entry.id && (
                    <div className="px-4 pb-4 space-y-3 fade-in">
                      {entry.prompt && (
                        <p className="text-xs text-primary italic">
                          Prompt: {entry.prompt}
                        </p>
                      )}
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {entry.content}
                      </p>
                      <button
                        type="button"
                        data-ocid={`journal.entry.delete_button.${i + 1}`}
                        onClick={() => handleDelete(entry.id)}
                        className="flex items-center gap-1.5 text-xs text-destructive font-medium"
                      >
                        <Trash2 size={12} /> Delete entry
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
