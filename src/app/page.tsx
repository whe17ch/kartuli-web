"use client";

import { useState, useEffect, useCallback } from "react";
import { loadState, updateState, updateStreak, type AppState } from "@/lib/store";
import Welcome from "@/components/Welcome";
import SourceLanguageScreen from "@/components/SourceLanguage";
import ExperienceLevelScreen from "@/components/ExperienceLevel";
import DailyGoalScreen from "@/components/DailyGoal";
import HomeScreen from "@/components/Home";
import LessonFlow from "@/components/LessonFlow";
import GardenReward from "@/components/GardenReward";
import WordGarden from "@/components/WordGarden";

type Screen =
  | "welcome"
  | "source_language"
  | "experience_level"
  | "daily_goal"
  | "home"
  | "lesson"
  | "garden_reward"
  | "garden";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [state, setState] = useState<AppState | null>(null);
  const [activeTab, setActiveTab] = useState<"home" | "garden">("home");

  useEffect(() => {
    const s = loadState();
    setState(s);
    if (s.onboardingComplete) {
      updateStreak();
      setScreen("home");
    }
  }, []);

  const refresh = useCallback(() => {
    setState(loadState());
  }, []);

  if (!state) return null;

  return (
    <div className="phone-frame bg-cream">
      {screen === "welcome" && (
        <Welcome onStart={() => setScreen("source_language")} />
      )}
      {screen === "source_language" && (
        <SourceLanguageScreen
          onContinue={(lang) => {
            updateState({ sourceLanguage: lang });
            refresh();
            setScreen("experience_level");
          }}
        />
      )}
      {screen === "experience_level" && (
        <ExperienceLevelScreen
          onContinue={(level) => {
            updateState({ experienceLevel: level });
            refresh();
            setScreen("daily_goal");
          }}
        />
      )}
      {screen === "daily_goal" && (
        <DailyGoalScreen
          onContinue={(goal) => {
            updateState({ dailyGoal: goal, onboardingComplete: true });
            updateStreak();
            refresh();
            setScreen("home");
          }}
        />
      )}
      {screen === "home" && (
        <HomeScreen
          state={state}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === "garden") setScreen("garden");
          }}
          onStartLesson={() => setScreen("lesson")}
        />
      )}
      {screen === "lesson" && (
        <LessonFlow
          onClose={() => {
            refresh();
            setScreen("home");
          }}
          onComplete={() => {
            refresh();
            setScreen("garden_reward");
          }}
        />
      )}
      {screen === "garden_reward" && (
        <GardenReward
          onDone={() => {
            refresh();
            setActiveTab("home");
            setScreen("home");
          }}
        />
      )}
      {screen === "garden" && (
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            <WordGarden items={state.gardenItems} />
          </div>
          <BottomNav
            activeTab="garden"
            onTabChange={(tab) => {
              setActiveTab(tab);
              if (tab === "home") setScreen("home");
            }}
          />
        </div>
      )}
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
