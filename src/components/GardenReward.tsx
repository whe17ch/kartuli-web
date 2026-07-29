"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GrowthStage = "soil" | "seed" | "sprout" | "leaf" | "label";

const stages: GrowthStage[] = ["soil", "seed", "sprout", "leaf", "label"];

const stageEmoji: Record<GrowthStage, string> = {
  soil: "🟤",
  seed: "🌰",
  sprout: "🌱",
  leaf: "🌿",
  label: "🪴",
};

export default function GardenReward({ onDone }: { onDone: () => void }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    stages.forEach((_, i) => {
      if (i > 0) {
        timers.push(setTimeout(() => setCurrentStage(i), i * 800));
      }
    });
    timers.push(setTimeout(() => setShowLabel(true), stages.length * 800));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-screen bg-cream">
      {/* Growth animation */}
      <div className="relative w-32 h-48 flex items-end justify-center mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={stages[currentStage]}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-7xl"
          >
            {stageEmoji[stages[currentStage]]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Label */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <p className="text-2xl font-bold text-ink mb-2">ა — ani</p>
            <p className="text-mint font-medium">Planted in your garden!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {showLabel && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onDone}
          className="w-full h-btn bg-rose text-white font-semibold rounded-card text-lg hover:bg-rose-light transition-colors mt-8"
        >
          Done
        </motion.button>
      )}
    </div>
  );
}
