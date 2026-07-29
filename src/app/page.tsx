"use client";

import { useState, useEffect, useCallback } from "react";
import { loadState, updateState, updateStreak, type AppState } from "@/lib/store";
import Welcome from "@/components/Welcome";
import SourceLanguageScreen from "@/components/SourceLanguage";
import ExperienceLevelScreen from "@/components/ExperienceLevel";
import DailyGoalScreen from "@/components/DailyGoal";
import HomeScreen from "@/components/Home";
import LessonScreen from "@/components/LessonScreen";
import AlphabetScreen from "@/components/AlphabetScreen";
import CultureScreen from "@/components/CultureScreen";
import TutorScreen from "@/components/TutorScreen";
import ProfileScreen from "@/components/ProfileScreen";
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
  | "garden_reward";

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

  const showBottomNav = ["home", "alphabet", "culture", "tutor", "profile"].includes(screen);

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
          />
        )}
        {screen === "lesson" && (
          <LessonScreen
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
