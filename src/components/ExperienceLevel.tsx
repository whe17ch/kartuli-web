"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ExperienceLevel } from "@/lib/store";

const levels: { id: ExperienceLevel; title: string; desc: string }[] = [
  { id: "beginner", title: "Complete beginner", desc: "I've never studied Georgian" },
  { id: "alphabet", title: "I know the alphabet", desc: "I can read Mkhedruli letters" },
  { id: "some_words", title: "I know some words", desc: "I can say basic phrases" },
  { id: "basic_conversations", title: "I can have basic conversations", desc: "I can introduce myself and ask simple questions" },
];

export default function ExperienceLevelScreen({
  onContinue,
}: {
  onContinue: (level: ExperienceLevel) => void;
}) {
  const [selected, setSelected] = useState<ExperienceLevel | null>(null);

  return (
    <div className="min-h-screen flex flex-col px-screen pt-16 pb-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-ink mb-2"
      >
        Your level
      </motion.h1>
      <p className="text-text-secondary mb-8">How much Georgian do you know?</p>

      <div className="space-y-3 flex-1">
        {levels.map((level, i) => (
          <motion.button
            key={level.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(level.id)}
            className={`w-full text-left p-4 rounded-card border-2 transition-all min-h-tap ${
              selected === level.id
                ? "border-rose bg-rose/5"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-ink">{level.title}</p>
                <p className="text-sm text-text-secondary mt-0.5">{level.desc}</p>
              </div>
              {selected === level.id && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-rose rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 ml-3"
                >
                  ✓
                </motion.span>
              )}
            </div>
          </motion.button>
        ))}

        {selected && selected !== "beginner" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-sky/10 border border-sky/30 rounded-card p-4 mt-4"
          >
            <p className="text-sm text-ink">
              📋 Placement path coming next
            </p>
          </motion.div>
        )}
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
        Continue
      </button>
    </div>
  );
}
