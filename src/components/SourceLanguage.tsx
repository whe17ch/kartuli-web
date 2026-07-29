"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SourceLanguage } from "@/lib/store";

const languages = [
  { id: "en" as SourceLanguage, label: "English", flag: "🇬🇧" },
  { id: "de" as SourceLanguage, label: "Deutsch", flag: "🇩🇪" },
];

export default function SourceLanguageScreen({
  onContinue,
}: {
  onContinue: (lang: SourceLanguage) => void;
}) {
  const [selected, setSelected] = useState<SourceLanguage | null>(null);

  return (
    <div className="min-h-screen flex flex-col px-screen pt-16 pb-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-ink mb-2"
      >
        I speak
      </motion.h1>
      <p className="text-text-secondary mb-8">Choose your language</p>

      <div className="space-y-3 flex-1">
        {languages.map((lang) => (
          <motion.button
            key={lang.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelected(lang.id)}
            className={`w-full flex items-center p-4 rounded-card border-2 transition-all min-h-tap ${
              selected === lang.id
                ? "border-rose bg-rose/5"
                : "border-gray-200 bg-white"
            }`}
          >
            <span className="text-3xl mr-4">{lang.flag}</span>
            <span className="text-lg font-medium text-ink">{lang.label}</span>
            <span className="ml-auto">
              {selected === lang.id && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-rose rounded-full flex items-center justify-center text-white text-sm"
                >
                  ✓
                </motion.span>
              )}
            </span>
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
        Continue
      </button>
    </div>
  );
}
