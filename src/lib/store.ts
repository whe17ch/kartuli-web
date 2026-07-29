"use client";

export type SourceLanguage = "en" | "de";
export type ExperienceLevel = "beginner" | "alphabet" | "some_words" | "basic_conversations";
export type DailyGoal = 5 | 10 | 15 | 20;

export interface AppState {
  onboardingComplete: boolean;
  sourceLanguage: SourceLanguage | null;
  experienceLevel: ExperienceLevel | null;
  dailyGoal: DailyGoal | null;
  lessonProgress: Record<string, number>; // lessonId -> step index
  completedExercises: Record<string, string[]>; // lessonId -> exercise ids
  skippedExercises: Record<string, string[]>;
  streak: number;
  lastActiveDate: string | null;
  gardenItems: { id: string; label: string; plantedAt: string }[];
}

const DEFAULT_STATE: AppState = {
  onboardingComplete: false,
  sourceLanguage: null,
  experienceLevel: null,
  dailyGoal: null,
  lessonProgress: {},
  completedExercises: {},
  skippedExercises: {},
  streak: 0,
  lastActiveDate: null,
  gardenItems: [],
};

const STORAGE_KEY = "kartuli_state";

export function loadState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function updateState(partial: Partial<AppState>): AppState {
  const current = loadState();
  const next = { ...current, ...partial };
  saveState(next);
  return next;
}

export function updateStreak(): AppState {
  const state = loadState();
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastActiveDate === today) return state;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const newStreak = state.lastActiveDate === yesterday ? state.streak + 1 : 1;
  return updateState({ streak: newStreak, lastActiveDate: today });
}

export function t(obj: Record<string, string> | string, lang?: SourceLanguage | null): string {
  if (typeof obj === "string") return obj;
  const l = lang || loadState().sourceLanguage || "en";
  return obj[l] || obj["en"] || Object.values(obj)[0] || "";
}
