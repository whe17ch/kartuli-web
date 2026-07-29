"use client";

import { motion } from "framer-motion";

export default function CulturalMoment({
  title,
  body,
  onContinue,
}: {
  title: string;
  body: string;
  onContinue: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-screen pb-8">
      {/* Globe icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6"
      >
        <span className="text-3xl">🌍</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-ink mb-4 text-center"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-text-secondary text-center mb-6 leading-relaxed"
      >
        {body}
      </motion.p>

      {/* Placeholder image */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full h-40 rounded-card bg-sky/20 flex items-center justify-center mb-8"
      >
        <span className="text-sky text-sm">Tbilisi street scene</span>
      </motion.div>

      <button
        onClick={onContinue}
        className="w-full h-btn bg-rose text-white font-semibold rounded-card text-lg hover:bg-rose-light transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
