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
  lessonId,
  onClose,
  onComplete,
}: {
  lessonId?: string;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [skippedIds, setSkippedIds] = useState<string[]>([]);

  useEffect(() => {
    const url = lessonId ? `/lessons/${lessonId}.json` : "/lesson_ani.json";
    fetch(url)
      .then((r) => r.json())
      .then(setLesson)
      .catch(() => {
        // Fallback to original lesson
        if (lessonId) {
          fetch("/lesson_ani.json")
            .then((r) => r.json())
            .then(setLesson);
        }
      });
  }, [lessonId]);

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
        <div className="animate-pulse text-ink/40">Loading lesson...</div>
      </div>
    );
  }

  // Use exercise IDs from the loaded lesson data
  const introExercise = lesson.exercises.find((e) => e.type === "introduction") || lesson.exercises[0];
  const traceExercise = lesson.exercises.find((e) => e.type === "tracing") || lesson.exercises[1];
  const listenExercise = lesson.exercises.find((e) => e.type === "multipleChoice") || lesson.exercises[2];
  const speakExercise = lesson.exercises.find((e) => e.type === "speaking") || lesson.exercises[3];

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Progress bar */}
      <div className="flex items-center px-5 pt-4 gap-3">
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-ink/60 text-xl min-w-[44px] min-h-[44px]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
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
              markComplete(introExercise.id);
              next();
            }}
          />
        )}
        {step === "tracing" && (
          <LetterTracing
            glyph={lesson.letter.glyph}
            onComplete={() => {
              markComplete(traceExercise.id);
              next();
            }}
          />
        )}
        {step === "listen" && (
          <ListenChoose
            alternatives={listenExercise.alternatives || []}
            correctAnswer={listenExercise.answer}
            lang={lang}
            successFeedback={t(listenExercise.successFeedback || {}, lang)}
            retryFeedback={t(listenExercise.retryFeedback || {}, lang)}
            onComplete={() => {
              markComplete(listenExercise.id);
              next();
            }}
          />
        )}
        {step === "speaking" && (
          <Speaking
            prompt={t(speakExercise.prompt, lang)}
            lang={lang}
            onComplete={() => {
              markComplete(speakExercise.id);
              next();
            }}
            onSkip={() => {
              markSkipped(speakExercise.id);
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
