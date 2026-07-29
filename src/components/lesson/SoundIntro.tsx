"use client";

import { motion } from "framer-motion";
import type { SourceLanguage } from "@/lib/store";

export default function SoundIntro({
  letter,
  lang,
  onContinue,
}: {
  letter: {
    glyph: string;
    name: string;
    ipa: string;
    transliteration: string;
    phonetic_en: string;
    phonetic_de: string;
    mnemonic: Record<string, string>;
  };
  lang: SourceLanguage | null;
  onContinue: () => void;
}) {
  const phonetic = lang === "de" ? letter.phonetic_de : letter.phonetic_en;
  const mnemonic = lang === "de" ? letter.mnemonic.de : letter.mnemonic.en;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-screen pb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-[120px] leading-none text-ink mb-4"
      >
        {letter.glyph}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-ink mb-1"
      >
        {letter.name}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 text-text-secondary mb-6"
      >
        <span>/{letter.ipa}/</span>
        <span>•</span>
        <span>{letter.transliteration}</span>
        <span>•</span>
        <span>&ldquo;{phonetic}&rdquo;</span>
      </motion.div>

      {/* Audio play button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="w-16 h-16 rounded-full bg-sky flex items-center justify-center mb-6 hover:bg-sky/80 transition-colors"
        onClick={() => {
          // Placeholder: would play audio
        }}
      >
        <span className="text-white text-2xl ml-1">▶</span>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-text-secondary mb-12"
      >
        {mnemonic}
      </motion.p>

      <button
        onClick={onContinue}
        className="w-full h-btn bg-rose text-white font-semibold rounded-card text-lg hover:bg-rose-light transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
