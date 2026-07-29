"use client";

import { motion } from "framer-motion";
import type { AppState } from "@/lib/store";

export default function HomeScreen({
  state,
  activeTab,
  onTabChange,
  onStartLesson,
}: {
  state: AppState;
  activeTab: string;
  onTabChange: (tab: "home" | "garden") => void;
  onStartLesson: () => void;
}) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const todayIndex = (new Date().getDay() + 6) % 7; // Mon=0

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 px-screen pt-8 pb-4 space-y-4 overflow-y-auto">
        {/* Streak card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-card p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <p className="text-2xl font-bold text-ink">{state.streak}</p>
              <p className="text-sm text-text-secondary">day streak</p>
            </div>
          </div>
        </motion.div>

        {/* Continue lesson */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onStartLesson}
          className="w-full bg-rose text-white rounded-card p-5 text-left shadow-sm"
        >
          <p className="text-sm opacity-80 mb-1">Continue learning</p>
          <p className="text-xl font-bold">First Letter: ა</p>
          <p className="text-sm opacity-80 mt-1">~4 minutes</p>
        </motion.button>

        {/* Today's word */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-card p-4 shadow-sm border border-gray-100"
        >
          <p className="text-sm text-text-secondary mb-2">Today&apos;s Word</p>
          <p className="text-3xl font-bold text-ink mb-1">მადლობა</p>
          <p className="text-lg text-text-secondary">madloba</p>
          <p className="text-sm text-text-muted mt-1">&ldquo;thank you&rdquo;</p>
        </motion.div>

        {/* Cultural fact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-card p-4 shadow-sm border border-gray-100"
        >
          <p className="text-sm text-gold font-medium mb-2">🌍 Did you know?</p>
          <p className="text-sm text-text-secondary">
            The Georgian alphabet is one of only 14 scripts in the world currently in use.
            It has been a UNESCO Intangible Cultural Heritage since 2016.
          </p>
        </motion.div>

        {/* Weekly learning */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-card p-4 shadow-sm border border-gray-100"
        >
          <p className="text-sm text-text-secondary mb-3">This week</p>
          <div className="flex justify-between">
            {days.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-xs text-text-muted">{day}</span>
                <div
                  className={`w-6 h-6 rounded-full ${
                    i <= todayIndex && state.lastActiveDate
                      ? "bg-mint"
                      : i === todayIndex
                        ? "bg-rose/30"
                        : "bg-gray-200"
                  }`}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom nav */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}

function BottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: "home" | "garden") => void;
}) {
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "alphabet", label: "Alphabet", icon: "ა" },
    { id: "garden", label: "Garden", icon: "🌱" },
    { id: "culture", label: "Culture", icon: "🏛️" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];
  return (
    <nav className="flex justify-around items-center h-16 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isDisabled = !["home", "garden"].includes(tab.id);
        return (
          <button
            key={tab.id}
            onClick={() => {
              if (isDisabled) return;
              onTabChange(tab.id as "home" | "garden");
            }}
            className={`flex flex-col items-center justify-center min-w-tap min-h-tap ${
              isActive ? "text-rose" : isDisabled ? "text-text-muted" : "text-text-secondary"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[10px] mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
