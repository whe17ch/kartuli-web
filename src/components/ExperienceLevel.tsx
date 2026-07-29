"use client";

import { useState } from "react";
import type { ExperienceLevel } from "@/lib/store";
import { CrossStitchCorner, CornerCross } from "./CrossStitchOrnament";
import { PixelHeart } from "./PixelArt";

interface Props {
  onContinue: (level: ExperienceLevel) => void;
}

const levels = [
  {
    id: "beginner" as ExperienceLevel,
    label: "New to Georgian",
    sub: "(Beginner)",
    icon: <PixelHeart size={20} color="#D23F5A" />,
  },
  {
    id: "alphabet" as ExperienceLevel,
    label: "Some Basics",
    sub: "(Intermediate)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="#6DA8FD" strokeWidth="2"/>
        <path d="M6 8h8M6 12h5" stroke="#6DA8FD" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "some_words" as ExperienceLevel,
    label: "I'm Comfortable",
    sub: "(Advanced)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <polygon points="10,1 12.5,7 19,7.5 14,12 15.5,18.5 10,15 4.5,18.5 6,12 1,7.5 7.5,7" fill="#D7A623"/>
      </svg>
    ),
  },
];

export default function ExperienceLevelScreen({ onContinue }: Props) {
  const [selected, setSelected] = useState<ExperienceLevel | null>(null);

  return (
    <div className="min-h-screen bg-cream relative flex flex-col px-6 py-12">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <div className="absolute top-3 right-3">
        <CrossStitchCorner />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-full bg-rose flex items-center justify-center">
          <span className="font-pixel text-[8px] text-white">2</span>
        </div>
        <h2 className="font-pixel text-[11px] text-ink uppercase tracking-wider">
          YOUR EXPERIENCE
        </h2>
      </div>

      <p className="text-ink/60 text-sm mb-6">Choose your experience level</p>

      <div className="space-y-3 flex-1">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => setSelected(level.id)}
            className={`card w-full flex items-center gap-4 transition-all ${
              selected === level.id
                ? "border-rose ring-1 ring-rose/30"
                : "border-card-border"
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center">
              {level.icon}
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-ink">{level.label}</p>
              <p className="text-xs text-ink/40">{level.sub}</p>
            </div>
            {selected === level.id && (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#7DBE9F">
                <circle cx="10" cy="10" r="10"/>
                <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => selected && onContinue(selected)}
        disabled={!selected}
        className={`btn-primary mt-8 ${!selected ? "opacity-40" : ""}`}
      >
        CONTINUE <span>→</span>
      </button>
    </div>
  );
}
