import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  quickReplies?: string[];
  isEmergency?: boolean;
}

const botResponses: Record<string, string[]> = {
  anxious: [
    "I hear you. Anxiety can feel overwhelming, but you are not alone in this. Let us slow down together.",
    "When anxiety rises, grounding can help. Try naming 5 things you can see around you right now.",
    "Your feelings are valid. Take one slow breath with me - in for 4, hold for 4, out for 6.",
    "Anxiety is your mind trying to protect you. Gently remind it: you are safe in this moment.",
  ],
  sad: [
    "I am so glad you told me. Sadness is heavy, and you deserve a soft place to put it down for a moment.",
    "It is okay to feel sad. You do not need to fix it right now - just be with it gently.",
    "I see you. What you are carrying sounds hard. Would it help to write about what is weighing on you?",
    "Sometimes sadness just needs to be witnessed. I am right here with you.",
  ],
  angry: [
    "That frustration is real. Let us take a breath together before anything else.",
    "Anger is often pain in disguise. Is there something underneath this feeling that wants to be heard?",
    "It is okay to feel this. Try placing both feet on the floor and taking three slow breaths.",
  ],
  sleep: [
    "Rest can feel elusive when the mind is busy. A body scan exercise might help - shall we try?",
    "Try the 4-7-8 method: breathe in 4 counts, hold 7, exhale 8. It gently signals your body to relax.",
    "Dimming your screens and a short breathing exercise before bed can help your nervous system settle.",
  ],
  overwhelmed: [
    "One thing at a time. Right now, the only thing you need to do is breathe.",
    "When everything feels like too much, it helps to ask: what is the one smallest next step?",
    "Let us decompress together. Try a short breathing exercise - it creates space around the overwhelm.",
  ],
  crisis: [
    "I hear you, and I am so glad you reached out. Please contact someone who cares about you right now. You do not have to face this alone.",
  ],
  default: [
    "Thank you for sharing that with me. I am here and listening.",
    "That sounds really meaningful. Would you like to explore it further, or try a short exercise?",
    "I appreciate you trusting me with that. How long have you been feeling this way?",
    "You are doing well just by reaching out. What would feel most helpful right now?",
    "I am with you. Sometimes just putting feelings into words is the first step.",
  ],
};

const keywordMap: { keywords: string[]; key: string }[] = [
  {
    keywords: ["anxious", "anxiety", "panic", "scared", "worry", "worried"],
    key: "anxious",
  },
  {
    keywords: [
      "sad",
      "depressed",
      "depression",
      "down",
      "unhappy",
      "hopeless",
      "empty",
    ],
    key: "sad",
  },
  { keywords: ["angry", "frustrated", "mad", "upset", "rage"], key: "angry" },
  { keywords: ["sleep", "insomnia", "tired", "exhausted"], key: "sleep" },
  {
    keywords: ["overwhelmed", "too much", "stressed", "stress", "burnout"],
    key: "overwhelmed",
  },
  {
    keywords: [
      "help",
      "crisis",
      "hurt myself",
      "suicidal",
      "end it",
      "give up",
    ],
    key: "crisis",
  },
];

const counters: Record<string, number> = {};

function getBotResponse(input: string): {
  text: string;
  showEmergency: boolean;
} {
  const lower = input.toLowerCase();
  for (const { keywords, key } of keywordMap) {
    if (keywords.some((kw) => lower.includes(kw))) {
      const responses = botResponses[key];
      const idx = (counters[key] || 0) % responses.length;
      counters[key] = idx + 1;
      return { text: responses[idx], showEmergency: key === "crisis" };
    }
  }
  const responses = botResponses.default;
  const idx = (counters.default || 0) % responses.length;
  counters.default = idx + 1;
  return { text: responses[idx], showEmergency: false };
}

export default function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "bot",
      text: "Hi there. I am here with you. How are you feeling today?",
      quickReplies: ["I feel anxious", "I feel sad", "I am overwhelmed"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }); // run on every render

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", text: text.trim() },
    ]);
    setInput("");
    setIsTyping(true);
    setTimeout(
      () => {
        const { text: botText, showEmergency } = getBotResponse(text);
        const newMsgs: Message[] = [
          {
            id: (Date.now() + 1).toString(),
            role: "bot",
            text: botText,
            quickReplies: showEmergency
              ? undefined
              : ["Try a breathing exercise", "Open journal", "Tell me more"],
          },
        ];
        if (showEmergency)
          newMsgs.push({
            id: (Date.now() + 2).toString(),
            role: "bot",
            text: "emergency",
            isEmergency: true,
          });
        setIsTyping(false);
        setMessages((prev) => [...prev, ...newMsgs]);
      },
      1000 + Math.random() * 500,
    );
  };

  return (
    <div className="flex flex-col" style={{ height: "100dvh" }}>
      <div className="lavender-gradient px-6 pt-12 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
            <Heart size={18} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-foreground">
              Therapist Chat
            </h1>
            <p className="text-xs text-muted-foreground">
              Gentle and non-judgmental support
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-medium">
              Here for you
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.role === "user" ? (
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-3xl rounded-br-md px-4 py-2.5 max-w-[75%] text-sm shadow-soft">
                  {msg.text}
                </div>
              </div>
            ) : msg.isEmergency ? (
              <div className="flex justify-start">
                <a
                  href="tel:988"
                  data-ocid="chat.emergency.button"
                  className="rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-soft text-white"
                  style={{ backgroundColor: "#D85B57" }}
                >
                  Get Emergency Help (988 Crisis Line)
                </a>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-accent/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart size={12} className="text-accent-foreground" />
                </div>
                <div className="space-y-2 max-w-[80%]">
                  <div className="bg-card rounded-3xl rounded-bl-md px-4 py-2.5 text-sm text-foreground shadow-soft">
                    {msg.text}
                  </div>
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-2">
                      {msg.quickReplies.map((qr) => (
                        <button
                          type="button"
                          key={qr}
                          data-ocid="chat.quick_reply.button"
                          onClick={() => sendMessage(qr)}
                          className="text-xs bg-secondary text-secondary-foreground rounded-full px-3 py-1.5 font-medium hover:bg-primary/10 transition-colors"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-accent/40 flex items-center justify-center shrink-0">
              <Heart size={12} className="text-accent-foreground" />
            </div>
            <div className="bg-card rounded-3xl rounded-bl-md px-4 py-3 shadow-soft">
              <div className="flex gap-1 items-center">
                <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="flex gap-2 items-center">
          <Input
            data-ocid="chat.message.input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="How are you feeling..."
            className="flex-1 rounded-full bg-background border-border"
          />
          <Button
            data-ocid="chat.send.button"
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="rounded-full w-10 h-10 p-0 bg-primary text-primary-foreground"
          >
            <Send size={16} />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}
