"use client";

import { useState } from "react";
import type { DailyGoal } from "@/lib/store";
import { CrossStitchCorner, CornerCross } from "./CrossStitchOrnament";

interface Props {
  onContinue: (goal: DailyGoal) => void;
}

const goals: DailyGoal[] = [5, 10, 15, 20];

export default function DailyGoalScreen({ onContinue }: Props) {
  const [selected, setSelected] = useState<DailyGoal | null>(null);

  return (
    <div className="min-h-screen bg-cream relative flex flex-col px-6 py-12">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <div className="absolute top-3 right-3">
        <CrossStitchCorner />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-full bg-rose flex items-center justify-center">
          <span className="font-pixel text-[8px] text-white">3</span>
        </div>
        <h2 className="font-pixel text-[11px] text-ink uppercase tracking-wider">
          DAILY GOAL
        </h2>
      </div>

      <p className="text-ink/60 text-sm mb-8">Set a daily goal that fits you</p>

      <div className="grid grid-cols-4 gap-3 flex-1">
        {goals.map((g) => (
          <button
            key={g}
            onClick={() => setSelected(g)}
            className={`card flex flex-col items-center justify-center py-5 transition-all ${
              selected === g
                ? "border-rose ring-1 ring-rose/30 bg-rose/5"
                : "border-card-border"
            }`}
          >
            <span className="font-bold text-xl text-ink">{g}</span>
            <span className="text-xs text-ink/50 mt-1">min</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => selected && onContinue(selected)}
        disabled={!selected}
        className={`btn-primary mt-8 ${!selected ? "opacity-40" : ""}`}
      >
        START LEARNING <span>→</span>
      </button>
    </div>
  );
}
