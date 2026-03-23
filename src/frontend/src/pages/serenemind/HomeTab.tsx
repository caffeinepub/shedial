import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  BookOpen,
  Dumbbell,
  Heart,
  MessageSquare,
  Music,
  Phone,
  SmilePlus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type TabId = "home" | "chat" | "exercises" | "music" | "mood" | "journal";

interface TrustedContact {
  id: string;
  name: string;
  phone: string;
}

const QUOTES: { text: string; author: string }[] = [
  { text: "You are enough, just as you are.", author: "Meghan Markle" },
  {
    text: "The mind is everything. What you think, you become.",
    author: "Buddha",
  },
  {
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.",
    author: "Lori Deschene",
  },
  { text: "Breathe. You're going to be okay.", author: "Unknown" },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    text: "It's okay to not be okay — as long as you don't stay that way.",
    author: "Unknown",
  },
  {
    text: "Be gentle with yourself. You are a child of the universe.",
    author: "Max Ehrmann",
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
  },
  { text: "Healing is not linear.", author: "Unknown" },
  {
    text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
    author: "A.A. Milne",
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    text: "Every day is a new beginning. Take a deep breath and start again.",
    author: "Unknown",
  },
  {
    text: "You matter. Your feelings matter. Your story matters.",
    author: "Unknown",
  },
  { text: "The only way out is through.", author: "Robert Frost" },
  {
    text: "You are allowed to be both a masterpiece and a work in progress simultaneously.",
    author: "Sophia Bush",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
  {
    text: "Happiness is not something ready-made. It comes from your own actions.",
    author: "Dalai Lama",
  },
  {
    text: "Calm mind brings inner strength and self-confidence.",
    author: "Dalai Lama",
  },
  {
    text: "You have survived 100% of your worst days so far.",
    author: "Unknown",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Tough times never last, but tough people do.",
    author: "Robert H. Schuller",
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
  },
  {
    text: "There is a crack in everything. That's how the light gets in.",
    author: "Leonard Cohen",
  },
  {
    text: "You don't have to be perfect to be worthy of love.",
    author: "Unknown",
  },
  {
    text: "One small positive thought in the morning can change your whole day.",
    author: "Dalai Lama",
  },
  {
    text: "Even the darkest night will end and the sun will rise.",
    author: "Victor Hugo",
  },
  {
    text: "Your present circumstances don't determine where you can go; they merely determine where you start.",
    author: "Nido Qubein",
  },
  { text: "You are not alone in this journey.", author: "Unknown" },
  { text: "Inhale courage. Exhale fear.", author: "Unknown" },
  {
    text: "The most powerful relationship you will ever have is the relationship with yourself.",
    author: "Steve Maraboli",
  },
  {
    text: "Be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
  { text: "Talk to yourself like someone you love.", author: "Brené Brown" },
  { text: "Every storm runs out of rain.", author: "Maya Angelou" },
  {
    text: "You owe yourself the love that you so freely give to others.",
    author: "Unknown",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  { text: "She believed she could, so she did.", author: "R.S. Grey" },
  {
    text: "Your feelings are valid. Your experience is real. You deserve support.",
    author: "Unknown",
  },
  {
    text: "Difficult roads often lead to beautiful destinations.",
    author: "Unknown",
  },
  { text: "You are stronger than your anxiety.", author: "Unknown" },
  {
    text: "The present moment is the only moment available to us.",
    author: "Thich Nhat Hanh",
  },
  {
    text: "It's okay to take life one day at a time — even one breath at a time.",
    author: "Unknown",
  },
  {
    text: "Kindness begins with the understanding that we all struggle.",
    author: "Charles Glassman",
  },
  {
    text: "When you feel like giving up, remember why you started.",
    author: "Unknown",
  },
  {
    text: "The soul always knows what to do to heal itself. The challenge is to silence the mind.",
    author: "Caroline Myss",
  },
  {
    text: "Your worth is not measured by your productivity.",
    author: "Unknown",
  },
  { text: "Anxiety is the dizziness of freedom.", author: "Søren Kierkegaard" },
  {
    text: "Be patient with yourself. Nothing in nature blooms all year.",
    author: "Unknown",
  },
  { text: "It's okay to rest. It's okay to slow down.", author: "Unknown" },
  {
    text: "Your mental health is a priority. Your happiness is an essential.",
    author: "Unknown",
  },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  {
    text: "Sometimes the bravest thing you can do is ask for help.",
    author: "Unknown",
  },
  {
    text: "You are a human being, not a human doing. Your worth isn't in your output.",
    author: "Unknown",
  },
  {
    text: "Let yourself be moved by beauty. Let yourself be healed by peace.",
    author: "Unknown",
  },
  {
    text: "Take rest; a field that has rested gives a bountiful crop.",
    author: "Ovid",
  },
  {
    text: "What you are is what you have been. What you'll be is what you do now.",
    author: "Buddha",
  },
  { text: "Don't believe everything you think.", author: "Unknown" },
  {
    text: "Serenity is not freedom from the storm, but peace within it.",
    author: "Unknown",
  },
  { text: "Small steps are still progress.", author: "Unknown" },
  {
    text: "It's okay if the only thing you did today was breathe.",
    author: "Unknown",
  },
  { text: "Your mind is a garden — tend it with care.", author: "Unknown" },
  {
    text: "Let go of what you can't control. Focus on what you can.",
    author: "Unknown",
  },
  { text: "You are a work of art, beautifully unfinished.", author: "Unknown" },
];

const dayOfYear = Math.floor(
  (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
);
const todayQuote = QUOTES[dayOfYear % QUOTES.length];

function useTrustedContacts() {
  const KEY = "sereneMind_contacts";
  const load = (): TrustedContact[] => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  };
  const [contacts, setContacts] = useState<TrustedContact[]>(load);
  const add = (name: string, phone: string) => {
    const updated = [...contacts, { id: Date.now().toString(), name, phone }];
    setContacts(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };
  const remove = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };
  return { contacts, add, remove };
}

export default function HomeTab({
  onNavigate,
}: { onNavigate: (tab: TabId) => void }) {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const loggedInName = (() => {
    try {
      const u = JSON.parse(localStorage.getItem("sereneMind_user") || "null");
      return u?.name || null;
    } catch {
      return null;
    }
  })();
  const [addContactOpen, setAddContactOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const { contacts, add, remove } = useTrustedContacts();

  const handleAddContact = () => {
    if (!contactName.trim() || !contactPhone.trim()) return;
    add(contactName.trim(), contactPhone.trim());
    setContactName("");
    setContactPhone("");
    setAddContactOpen(false);
    toast.success("Contact added");
  };

  const quickActions = [
    {
      icon: <Dumbbell size={22} />,
      label: "Exercises",
      tab: "exercises" as TabId,
      color: "card-lavender",
    },
    {
      icon: <Music size={22} />,
      label: "Calm Music",
      tab: "music" as TabId,
      color: "card-mint",
    },
    {
      icon: <SmilePlus size={22} />,
      label: "Mood Check",
      tab: "mood" as TabId,
      color: "card-lilac",
    },
    {
      icon: <BookOpen size={22} />,
      label: "Journal",
      tab: "journal" as TabId,
      color: "card-lavender",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="lavender-gradient px-6 pt-12 pb-8">
        <h1 className="font-display text-3xl font-bold text-[#111111] tracking-tight">
          SereneMind
        </h1>
        <p className="text-[#4A4A4A] mt-1 text-sm font-medium">
          Your sanctuary for mental wellness
        </p>
        <div className="card-soft mt-6 p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Heart size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-base">
                {loggedInName
                  ? `Welcome back, ${loggedInName} 🌿`
                  : "Good to see you today 🌿"}
              </p>
              <p className="text-muted-foreground text-sm mt-0.5">
                How are you feeling? Choose an activity to begin.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Daily Inspirational Thought */}
        <div
          data-ocid="home.inspiration.card"
          className="relative rounded-3xl p-5 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(96% 0.03 300 / 0.7), oklch(96% 0.04 160 / 0.6))",
            borderLeft: "4px solid oklch(72% 0.14 300)",
            boxShadow: "0 2px 16px oklch(72% 0.10 300 / 0.12)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={15} className="text-primary" />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(55% 0.14 300)" }}
            >
              Today's Thought
            </span>
          </div>
          <p
            className="text-base leading-relaxed font-medium"
            style={{
              fontStyle: "italic",
              color: "oklch(25% 0.04 300)",
              fontFamily: "Georgia, serif",
            }}
          >
            &ldquo;{todayQuote.text}&rdquo;
          </p>
          <p className="mt-2 text-sm" style={{ color: "oklch(50% 0.08 300)" }}>
            — {todayQuote.author}
          </p>
        </div>

        <section>
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Explore
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                type="button"
                key={action.tab}
                data-ocid={`home.${action.tab}.button`}
                onClick={() => onNavigate(action.tab)}
                className={`${action.color} p-5 flex flex-col items-center gap-2 transition-all duration-200 active:scale-95`}
                style={{ borderRadius: 20 }}
              >
                <span className="text-[#111111]">{action.icon}</span>
                <span className="text-[#111111] font-semibold text-sm">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          data-ocid="home.chat.button"
          onClick={() => onNavigate("chat")}
          className="w-full card-soft p-5 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent/30 flex items-center justify-center shrink-0">
            <MessageSquare size={22} className="text-accent-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Talk to a therapist</p>
            <p className="text-sm text-muted-foreground">
              Gentle, supportive conversation anytime
            </p>
          </div>
        </button>

        <section>
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Emergency Support
          </h2>
          <div className="card-soft p-5 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={20}
                className="text-destructive mt-0.5 shrink-0"
              />
              <p className="text-sm text-muted-foreground">
                If you're in distress, reach out. You are not alone.
              </p>
            </div>
            <Button
              data-ocid="home.emergency.button"
              onClick={() => setEmergencyOpen(true)}
              className="w-full rounded-full font-semibold py-3"
              style={{ backgroundColor: "#D85B57", color: "white" }}
            >
              I need help right now
            </Button>
          </div>
        </section>

        {contacts.length > 0 && (
          <section>
            <h3 className="font-semibold text-sm text-foreground mb-2">
              Your Trusted Contacts
            </h3>
            <div className="space-y-2">
              {contacts.map((c, i) => (
                <div
                  key={c.id}
                  data-ocid={`home.contact_manage.item.${i + 1}`}
                  className="card-soft p-3 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {c.name[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">
                      {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{c.phone}</p>
                  </div>
                  <button
                    type="button"
                    data-ocid={`home.contact.delete_button.${i + 1}`}
                    onClick={() => remove(c.id)}
                    className="p-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="text-center py-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with{" "}
            <Heart size={10} className="inline text-destructive" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>

      <Dialog open={emergencyOpen} onOpenChange={setEmergencyOpen}>
        <DialogContent
          data-ocid="home.emergency.dialog"
          className="max-w-[380px] rounded-3xl border-0 shadow-modal"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-center text-foreground">
              You are not alone 💛
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="mint-wash rounded-2xl p-4 text-center">
              <p className="text-sm text-[#3A3A3A] font-medium">
                You matter deeply. This feeling will pass. Breathe in for 4
                counts, out for 6.
              </p>
            </div>
            {contacts.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">
                  Reach out to a trusted contact:
                </p>
                {contacts.map((c, i) => (
                  <div
                    key={c.id}
                    data-ocid={`home.contact.item.${i + 1}`}
                    className="flex items-center gap-2 bg-secondary/50 rounded-2xl p-3"
                  >
                    <span className="flex-1 font-medium text-sm text-foreground">
                      {c.name}
                    </span>
                    <a
                      href={`tel:${c.phone}`}
                      className="p-2 rounded-full bg-primary/20 text-primary"
                    >
                      <Phone size={14} />
                    </a>
                    <a
                      href={`sms:${c.phone}?body=Hey, I need you right now. Can you talk?`}
                      className="p-2 rounded-full bg-accent/30 text-accent-foreground"
                    >
                      <MessageSquare size={14} />
                    </a>
                  </div>
                ))}
              </div>
            )}
            {contacts.length === 0 && (
              <p className="text-sm text-muted-foreground text-center">
                Add a trusted contact to quickly reach them.
              </p>
            )}
            <Button
              data-ocid="home.add_contact.open_modal_button"
              variant="outline"
              onClick={() => {
                setEmergencyOpen(false);
                setAddContactOpen(true);
              }}
              className="w-full rounded-full"
            >
              + Add Trusted Contact
            </Button>
            <Button
              data-ocid="home.emergency.close_button"
              variant="ghost"
              onClick={() => setEmergencyOpen(false)}
              className="w-full rounded-full text-muted-foreground"
            >
              I'm okay for now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={addContactOpen} onOpenChange={setAddContactOpen}>
        <DialogContent
          data-ocid="home.add_contact.dialog"
          className="max-w-[380px] rounded-3xl border-0 shadow-modal"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-foreground">
              Add Trusted Contact
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cname">Name</Label>
              <Input
                id="cname"
                data-ocid="home.contact_name.input"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Mom, Best Friend"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cphone">Phone Number</Label>
              <Input
                id="cphone"
                data-ocid="home.contact_phone.input"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+1234567890"
                className="rounded-xl"
              />
            </div>
            <Button
              data-ocid="home.add_contact.submit_button"
              onClick={handleAddContact}
              className="w-full rounded-full bg-primary text-primary-foreground"
            >
              Save Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
