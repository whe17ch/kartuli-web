"use client";

import { useState, useEffect, useCallback } from "react";
import { loadState, updateState, updateStreak, type AppState } from "@/lib/store";
import Welcome from "@/components/Welcome";
import SourceLanguageScreen from "@/components/SourceLanguage";
import ExperienceLevelScreen from "@/components/ExperienceLevel";
import DailyGoalScreen from "@/components/DailyGoal";
import HomeScreen from "@/components/Home";
import LessonFlow from "@/components/LessonFlow";
import AlphabetScreen from "@/components/AlphabetScreen";
import CultureScreen from "@/components/CultureScreen";
import TutorScreen from "@/components/TutorScreen";
import ProfileScreen from "@/components/ProfileScreen";
import WordGarden from "@/components/WordGarden";
import GardenReward from "@/components/GardenReward";
import BottomNav from "@/components/BottomNav";

type Screen =
  | "welcome"
  | "source_language"
  | "experience_level"
  | "daily_goal"
  | "home"
  | "lesson"
  | "alphabet"
  | "culture"
  | "tutor"
  | "profile"
  | "garden_reward"
  | "word_garden";

type Tab = "home" | "learn" | "tandem" | "culture" | "profile";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [state, setState] = useState<AppState | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");

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

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
    const tabScreenMap: Record<Tab, Screen> = {
      home: "home",
      learn: "alphabet",
      tandem: "tutor",
      culture: "culture",
      profile: "profile",
    };
    setScreen(tabScreenMap[tab]);
  }, []);

  if (!state) return null;

  const showBottomNav = ["home", "alphabet", "culture", "tutor", "profile", "word_garden"].includes(screen);

  return (
    <div className="phone-frame bg-cream">
      <div className={showBottomNav ? "pb-16" : ""}>
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
            onStartLesson={() => setScreen("lesson")}
            onOpenGarden={() => setScreen("word_garden")}
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
        {screen === "alphabet" && (
          <AlphabetScreen onBack={() => { setActiveTab("home"); setScreen("home"); }} />
        )}
        {screen === "culture" && (
          <CultureScreen onBack={() => { setActiveTab("home"); setScreen("home"); }} />
        )}
        {screen === "tutor" && (
          <TutorScreen onBack={() => { setActiveTab("home"); setScreen("home"); }} />
        )}
        {screen === "profile" && (
          <ProfileScreen onBack={() => { setActiveTab("home"); setScreen("home"); }} />
        )}
        {screen === "word_garden" && (
          <div className="min-h-screen bg-cream">
            <div className="flex items-center justify-between px-4 pt-12 pb-2">
              <button onClick={() => { setActiveTab("home"); setScreen("home"); }} className="p-2 text-ink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <span className="font-pixel text-[11px] text-ink tracking-wider">WORD GARDEN</span>
              <div className="w-6" />
            </div>
            <WordGarden items={state.gardenItems} />
          </div>
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
      </div>

      {showBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto">
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      )}
    </div>
  );
}
