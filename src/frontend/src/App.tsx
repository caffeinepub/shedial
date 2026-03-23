import { Toaster } from "@/components/ui/sonner";
import {
  BookOpen,
  Home,
  Leaf,
  MessageCircle,
  Music,
  Presentation,
  Shield,
  SmilePlus,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { AudioProvider } from "./context/AudioContext";
import ChatTab from "./pages/serenemind/ChatTab";
import ExercisesTab from "./pages/serenemind/ExercisesTab";
import HomeTab from "./pages/serenemind/HomeTab";
import JournalTab from "./pages/serenemind/JournalTab";
import MoodTab from "./pages/serenemind/MoodTab";
import MusicTab from "./pages/serenemind/MusicTab";
import PitchTab from "./pages/serenemind/PitchTab";
import PrivacyTab from "./pages/serenemind/PrivacyTab";
import SignupTab from "./pages/serenemind/SignupTab";

type TabId =
  | "home"
  | "chat"
  | "exercises"
  | "music"
  | "mood"
  | "journal"
  | "pitch"
  | "privacy"
  | "signup";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", icon: <Home size={20} /> },
  { id: "chat", label: "Chat", icon: <MessageCircle size={20} /> },
  { id: "exercises", label: "Exercises", icon: <Leaf size={20} /> },
  { id: "music", label: "Music", icon: <Music size={20} /> },
  { id: "mood", label: "Mood", icon: <SmilePlus size={20} /> },
  { id: "journal", label: "Journal", icon: <BookOpen size={20} /> },
  { id: "pitch", label: "Pitch", icon: <Presentation size={20} /> },
  { id: "privacy", label: "Privacy", icon: <Shield size={20} /> },
  { id: "signup", label: "Account", icon: <UserCircle size={20} /> },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return (
    <AudioProvider>
      <div className="desktop-bg min-h-screen flex items-start justify-center">
        <div className="w-full max-w-[430px] min-h-screen relative flex flex-col bg-background shadow-modal">
          <div className="flex-1 overflow-y-auto pb-20">
            <div className={activeTab === "home" ? "block" : "hidden"}>
              <HomeTab onNavigate={(tab) => setActiveTab(tab as TabId)} />
            </div>
            <div className={activeTab === "chat" ? "block" : "hidden"}>
              <ChatTab />
            </div>
            <div className={activeTab === "exercises" ? "block" : "hidden"}>
              <ExercisesTab />
            </div>
            <div className={activeTab === "music" ? "block" : "hidden"}>
              <MusicTab />
            </div>
            <div className={activeTab === "mood" ? "block" : "hidden"}>
              <MoodTab />
            </div>
            <div className={activeTab === "journal" ? "block" : "hidden"}>
              <JournalTab />
            </div>
            <div className={activeTab === "pitch" ? "block" : "hidden"}>
              <PitchTab />
            </div>
            <div className={activeTab === "privacy" ? "block" : "hidden"}>
              <PrivacyTab />
            </div>
            <div className={activeTab === "signup" ? "block" : "hidden"}>
              <SignupTab />
            </div>
          </div>
          <nav className="nav-bar fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
            <div className="flex items-center overflow-x-auto scrollbar-hide relative">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  data-ocid={`nav.${tab.id}.link`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex flex-col items-center gap-0.5 py-3 px-2 transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  style={{ minWidth: 60 }}
                >
                  {activeTab === tab.id && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary" />
                  )}
                  <span
                    className={`transition-transform duration-200 ${
                      activeTab === tab.id ? "scale-110" : "scale-100"
                    }`}
                  >
                    {tab.icon}
                  </span>
                  <span
                    className={`text-[9px] ${
                      activeTab === tab.id ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
      <Toaster />
    </AudioProvider>
  );
}
