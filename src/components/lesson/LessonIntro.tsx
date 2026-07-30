"use client";

import { motion } from "framer-motion";

export default function LessonIntro({
  title,
  glyph,
  minutes,
  onStart,
}: {
  title: string;
  glyph: string;
  minutes: number;
  onStart: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 pb-8">
      {/* Nino placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-24 h-32 rounded-card bg-rose/20 flex items-center justify-center mb-6"
      >
        <span className="text-rose text-sm">Nino</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-ink mb-2"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-ink/60 mb-8"
      >
        ~{minutes} minutes
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="text-[120px] leading-none text-ink mb-12"
      >
        {glyph}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={onStart}
        className="w-full h-[52px] bg-rose text-white font-semibold rounded-card text-lg hover:bg-rose/80 transition-colors"
      >
        Start
      </motion.button>
    </div>
  );
}
