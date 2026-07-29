"use client";

import { motion } from "framer-motion";

const activities = [
  { id: "ani_intro", label: "Learned sound" },
  { id: "ani_trace", label: "Traced letter" },
  { id: "ani_listen_choose", label: "Listening exercise" },
  { id: "ani_speak", label: "Speaking exercise" },
  { id: "cultural", label: "Cultural moment" },
];

function Cross({ className }: { className: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative w-4 h-4">
        <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-rose -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 h-full w-[1.5px] bg-rose -translate-x-1/2" />
      </div>
    </div>
  );
}

export default function LessonSummary({
  glyph,
  name,
  message,
  completedIds,
  skippedIds,
  onContinue,
}: {
  glyph: string;
  name: string;
  message: string;
  completedIds: string[];
  skippedIds: string[];
  onContinue: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-screen pb-8 relative">
      <Cross className="top-6 left-6" />
      <Cross className="top-6 right-6" />
      <Cross className="bottom-6 left-6" />
      <Cross className="bottom-6 right-6" />

      {/* Nino celebrating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-28 rounded-card bg-rose/20 flex items-center justify-center mb-4"
      >
        <span className="text-rose text-sm">🎉 Nino</span>
      </motion.div>

      {/* Letter + name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-2"
      >
        <span className="text-7xl text-ink">{glyph}</span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-text-secondary mb-4"
      >
        {name}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-ink mb-8"
      >
        {message}
      </motion.p>

      {/* Activity checkmarks */}
      <div className="w-full space-y-3 mb-8">
        {activities.map((activity, i) => {
          const isCompleted = completedIds.includes(activity.id);
          const isSkipped = skippedIds.includes(activity.id);
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted ? "bg-mint" : "bg-gray-200"
                }`}
              >
                {isCompleted && <span className="text-white text-sm">✓</span>}
                {isSkipped && <span className="text-text-muted text-xs">—</span>}
              </div>
              <span className={`text-sm ${isCompleted ? "text-ink" : "text-text-muted"}`}>
                {activity.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={onContinue}
        className="w-full h-btn bg-rose text-white font-semibold rounded-card text-lg hover:bg-rose-light transition-colors"
      >
        Continue to garden
      </button>
    </div>
  );
}
