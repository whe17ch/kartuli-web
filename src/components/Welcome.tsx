"use client";

import { motion } from "framer-motion";

export default function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-screen relative overflow-hidden">
      {/* Corner crosses */}
      <Cross className="top-6 left-6" />
      <Cross className="top-6 right-6" />
      <Cross className="bottom-6 left-6" />
      <Cross className="bottom-6 right-6" />

      {/* Animated clouds */}
      <div className="absolute top-16 left-4 w-24 h-10 bg-sky/20 rounded-full animate-cloud-drift" />
      <div className="absolute top-28 right-8 w-32 h-12 bg-sky/15 rounded-full animate-cloud-drift-slow" />
      <div className="absolute top-40 left-12 w-20 h-8 bg-sky/10 rounded-full animate-cloud-drift" />

      {/* Tbilisi scene placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-48 h-32 rounded-card bg-sky/30 flex items-center justify-center mb-6"
      >
        <span className="text-sky text-sm">Tbilisi scene</span>
      </motion.div>

      {/* Nino character placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="w-28 h-36 rounded-card bg-rose/20 flex items-center justify-center mb-8"
      >
        <span className="text-rose text-sm">Nino</span>
      </motion.div>

      {/* Wordmarks */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-4xl font-bold text-ink mb-1"
      >
        Kartuli
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-2xl text-text-secondary mb-12"
      >
        ქართული
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        onClick={onStart}
        className="w-full h-btn bg-rose text-white font-semibold rounded-card text-lg hover:bg-rose-light transition-colors"
      >
        Start learning
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-text-secondary text-sm min-h-tap flex items-center"
      >
        Sign in
      </motion.button>
    </div>
  );
}

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
