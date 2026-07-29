"use client";

import { useState, useEffect, useCallback } from "react";
import { loadState, updateState, t } from "@/lib/store";
import type { LessonData } from "@/lib/lesson-data";
import LessonIntro from "./lesson/LessonIntro";
import SoundIntro from "./lesson/SoundIntro";
import LetterTracing from "./lesson/LetterTracing";
import ListenChoose from "./lesson/ListenChoose";
import Speaking from "./lesson/Speaking";
import CulturalMoment from "./lesson/CulturalMoment";
import LessonSummary from "./lesson/LessonSummary";

type Step = "intro" | "sound" | "tracing" | "listen" | "speaking" | "cultural" | "summary";
const STEPS: Step[] = ["intro", "sound", "tracing", "listen", "speaking", "cultural", "summary"];

export default function LessonFlow({
  onClose,
  onComplete,
}: {
  onClose: () => void;
  onComplete: () => void;
}) {
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [skippedIds, setSkippedIds] = useState<string[]>([]);

  useEffect(() => {
    fetch("/lesson_ani.json")
      .then((r) => r.json())
      .then(setLesson);
  }, []);

  const lang = loadState().sourceLanguage;
  const step = STEPS[stepIndex];
  const progress = ((stepIndex) / (STEPS.length - 1)) * 100;

  const next = useCallback(() => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1);
    }
  }, [stepIndex]);

  const markComplete = useCallback((exerciseId: string) => {
    setCompletedIds((prev) => [...new Set([...prev, exerciseId])]);
  }, []);

  const markSkipped = useCallback((exerciseId: string) => {
    setSkippedIds((prev) => [...new Set([...prev, exerciseId])]);
  }, []);

  const handleFinish = useCallback(() => {
    if (!lesson) return;
    const state = loadState();
    const gardenItem = {
      id: lesson.gardenReward.id,
      label: lesson.gardenReward.label,
      plantedAt: new Date().toISOString(),
    };
    const existing = state.gardenItems.some((g) => g.id === gardenItem.id);
    updateState({
      completedExercises: {
        ...state.completedExercises,
        [lesson.id]: completedIds,
      },
      skippedExercises: {
        ...state.skippedExercises,
        [lesson.id]: skippedIds,
      },
      gardenItems: existing ? state.gardenItems : [...state.gardenItems, gardenItem],
    });
    onComplete();
  }, [lesson, completedIds, skippedIds, onComplete]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-muted">Loading lesson...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Progress bar */}
      <div className="flex items-center px-screen pt-4 gap-3">
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-text-secondary text-xl min-w-tap min-h-tap"
        >
          ✕
        </button>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {step === "intro" && (
          <LessonIntro
            title={t(lesson.title, lang)}
            glyph={lesson.letter.glyph}
            minutes={lesson.estimatedMinutes}
            onStart={next}
          />
        )}
        {step === "sound" && (
          <SoundIntro
            letter={lesson.letter}
            lang={lang}
            onContinue={() => {
              markComplete("ani_intro");
              next();
            }}
          />
        )}
        {step === "tracing" && (
          <LetterTracing
            glyph={lesson.letter.glyph}
            onComplete={() => {
              markComplete("ani_trace");
              next();
            }}
          />
        )}
        {step === "listen" && (
          <ListenChoose
            alternatives={lesson.exercises[2].alternatives || []}
            correctAnswer={lesson.exercises[2].answer}
            lang={lang}
            successFeedback={t(lesson.exercises[2].successFeedback || {}, lang)}
            retryFeedback={t(lesson.exercises[2].retryFeedback || {}, lang)}
            onComplete={() => {
              markComplete("ani_listen_choose");
              next();
            }}
          />
        )}
        {step === "speaking" && (
          <Speaking
            prompt={t(lesson.exercises[3].prompt, lang)}
            lang={lang}
            onComplete={() => {
              markComplete("ani_speak");
              next();
            }}
            onSkip={() => {
              markSkipped("ani_speak");
              next();
            }}
          />
        )}
        {step === "cultural" && (
          <CulturalMoment
            title={t(lesson.culturalMoment.title, lang)}
            body={t(lesson.culturalMoment.body, lang)}
            onContinue={() => {
              markComplete("cultural");
              next();
            }}
          />
        )}
        {step === "summary" && (
          <LessonSummary
            glyph={lesson.letter.glyph}
            name={lesson.letter.name}
            message={t(lesson.completionMessage, lang)}
            completedIds={completedIds}
            skippedIds={skippedIds}
            onContinue={handleFinish}
          />
        )}
      </div>
    </div>
  );
}
