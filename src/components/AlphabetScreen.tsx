"use client";

import { useState, useEffect } from "react";
import { CrossStitchCorner, CornerCross } from "./CrossStitchOrnament";
import CrossStitchOrnament from "./CrossStitchOrnament";

interface AlphabetScreenProps {
  gardenItems: { id: string; label: string; plantedAt: string }[];
  onBack: () => void;
  onStartLesson: (lessonId: string) => void;
}

interface LessonIndexEntry {
  id: string;
  file: string;
  letter: string;
  name: string;
  title: { en: string; de: string };
  order: number;
  requiredCompletions: number;
}

const GARDEN_ID_MAP: Record<string, string> = {
  alphabet_01_ani: "garden_ani_sprout",
  alphabet_02_bani: "garden_bani_sprout",
  alphabet_03_gani: "garden_gani_sprout",
  alphabet_04_doni: "garden_doni_sprout",
  alphabet_05_eni: "garden_eni_sprout",
  alphabet_06_vini: "garden_vini_sprout",
  alphabet_07_zeni: "garden_zeni_sprout",
  alphabet_08_tani: "garden_tani_sprout",
  alphabet_09_ini: "garden_ini_sprout",
  alphabet_10_kani: "garden_kani_sprout",
  alphabet_11_lasi: "garden_lasi_sprout",
  alphabet_12_mani: "garden_mani_sprout",
};

export default function AlphabetScreen({ gardenItems, onBack, onStartLesson }: AlphabetScreenProps) {
  const [lessons, setLessons] = useState<LessonIndexEntry[]>([]);
  const [activeLetter, setActiveLetter] = useState(0);

  useEffect(() => {
    fetch("/lessons/index.json")
      .then((r) => r.json())
      .then((data) => setLessons(data.lessons || []))
      .catch(() => {});
  }, []);

  const completedGardenIds = new Set(gardenItems.map((g) => g.id));

  const letters = lessons.length > 0
    ? lessons.map((l) => l.letter)
    : ["ა", "ბ", "გ", "დ", "ე", "ვ", "ზ", "თ", "ი", "კ", "ლ", "მ"];

  const isLearned = (index: number) => {
    if (lessons.length === 0) return false;
    const lesson = lessons[index];
    if (!lesson) return false;
    return completedGardenIds.has(GARDEN_ID_MAP[lesson.id] || "");
  };

  const isCurrent = (index: number) => {
    if (lessons.length === 0) return index === 0;
    // Current = first not-learned
    for (let i = 0; i < lessons.length; i++) {
      if (!isLearned(i)) return i === index;
    }
    return false;
  };

  const learnedCount = lessons.filter((_, i) => isLearned(i)).length;
  const totalLetters = 33; // Full Georgian alphabet

  const activeLesson = lessons[activeLetter];
  const activeIsLearned = isLearned(activeLetter);
  const activeIsCurrent = isCurrent(activeLetter);

  return (
    <div className="min-h-screen bg-cream relative">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <div className="absolute top-3 right-3 z-10">
        <CrossStitchCorner />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-2">
        <button onClick={onBack} className="p-2 text-ink">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <span className="font-pixel text-[11px] text-ink tracking-wider">ALPHABET</span>
        <CrossStitchOrnament className="w-8 h-8" />
      </div>

      {/* Progress */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-ink/60 font-medium">{learnedCount} / {totalLetters} letters</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${(learnedCount / totalLetters) * 100}%` }} />
        </div>
      </div>

      {/* Letter grid */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-6 gap-2">
          {letters.map((letter, i) => {
            const learned = isLearned(i);
            const current = isCurrent(i);
            return (
              <button
                key={i}
                onClick={() => setActiveLetter(i)}
                className={`aspect-square rounded-xl flex items-center justify-center text-lg font-bold transition-all ${
                  activeLetter === i
                    ? "bg-rose text-white shadow-md"
                    : learned
                    ? "bg-mint/20 border-2 border-mint text-ink"
                    : current
                    ? "bg-sky/20 border-2 border-sky text-ink"
                    : "bg-gray-100 text-ink/30 border border-gray-200"
                }`}
                style={{ fontFamily: "serif" }}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Large tracing area */}
      <div className="px-5 mb-4">
        <div className="card flex items-center justify-center py-8">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <text
              x="80"
              y="110"
              textAnchor="middle"
              fontSize="100"
              fill="#E5DFD3"
              fontFamily="serif"
            >
              {letters[activeLetter]}
            </text>
            <text
              x="80"
              y="110"
              textAnchor="middle"
              fontSize="100"
              fill="none"
              stroke="#D23F5A"
              strokeWidth="2"
              fontFamily="serif"
            >
              {letters[activeLetter]}
            </text>
            <circle cx="65" cy="40" r="10" fill="#6DA8FD"/>
            <text x="65" y="44" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">1</text>
            <circle cx="95" cy="90" r="10" fill="#6DA8FD"/>
            <text x="95" y="94" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">2</text>
            <path d="M65 50 L70 65" stroke="#6DA8FD" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrowhead)"/>
            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#6DA8FD"/>
              </marker>
            </defs>
          </svg>
        </div>
        {activeLesson && (
          <div className="mt-2 text-center">
            <p className="text-sm text-ink font-medium">{activeLesson.name}</p>
            {activeIsLearned && (
              <p className="text-xs text-mint font-medium mt-1">✓ Learned</p>
            )}
          </div>
        )}
      </div>

      {/* Write the letter + stages */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="section-label">WRITE THE LETTER</p>
          <button className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 010 7.07" fill="none" stroke="white" strokeWidth="2"/>
            </svg>
          </button>
        </div>
        <div className="flex gap-3">
          {[1.0, 0.6, 0.3, 0.1].map((opacity, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-lg border border-card-border bg-card-bg flex items-center justify-center"
            >
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "serif", opacity, color: "#D23F5A" }}
              >
                {letters[activeLetter]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tip box */}
      <div className="px-5 mb-4">
        <div className="bg-rose/5 border border-rose/10 rounded-xl px-4 py-3 flex items-start gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D23F5A" strokeWidth="2" className="flex-shrink-0"><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/></svg>
          <p className="text-xs text-ink/70">
            <span className="font-semibold text-ink">Tip:</span> Start at the top, curve down and around.
          </p>
        </div>
      </div>

      {/* Practice CTA */}
      <div className="px-5 pb-8">
        {(activeIsLearned || activeIsCurrent) && activeLesson && (
          <button
            onClick={() => onStartLesson(activeLesson.id)}
            className="btn-primary"
          >
            {activeIsLearned ? "REVIEW" : "START LESSON"} <span>→</span>
          </button>
        )}
        {!activeIsLearned && !activeIsCurrent && (
          <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
            LOCKED <span>🔒</span>
          </button>
        )}
      </div>
    </div>
  );
}
