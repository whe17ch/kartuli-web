"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DailyGoal } from "@/lib/store";

const goals: { minutes: DailyGoal; label: string }[] = [
  { minutes: 5, label: "Casual" },
  { minutes: 10, label: "Regular" },
  { minutes: 15, label: "Serious" },
  { minutes: 20, label: "Intense" },
];

export default function DailyGoalScreen({
  onContinue,
}: {
  onContinue: (goal: DailyGoal) => void;
}) {
  const [selected, setSelected] = useState<DailyGoal | null>(null);

  return (
    <div className="min-h-screen flex flex-col px-screen pt-16 pb-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-ink mb-2"
      >
        Daily goal
      </motion.h1>
      <p className="text-text-secondary mb-8">How much time per day?</p>

      <div className="space-y-3 flex-1">
        {goals.map((goal, i) => (
          <motion.button
            key={goal.minutes}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(goal.minutes)}
            className={`w-full flex items-center justify-between p-4 rounded-card border-2 transition-all min-h-tap ${
              selected === goal.minutes
                ? "border-rose bg-rose/5"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-ink">{goal.minutes}</span>
              <div className="text-left">
                <p className="font-medium text-ink">min / day</p>
                <p className="text-sm text-text-secondary">{goal.label}</p>
              </div>
            </div>
            {selected === goal.minutes && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 bg-rose rounded-full flex items-center justify-center text-white text-sm"
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={() => selected && onContinue(selected)}
        className={`w-full h-btn rounded-card font-semibold text-lg transition-all ${
          selected
            ? "bg-rose text-white hover:bg-rose-light"
            : "bg-gray-200 text-text-muted cursor-not-allowed"
        }`}
      >
        Let&apos;s go!
      </button>
    </div>
  );
}
