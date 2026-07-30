"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { SourceLanguage } from "@/lib/store";

export default function ListenChoose({
  alternatives,
  correctAnswer,
  lang,
  successFeedback,
  retryFeedback,
  onComplete,
}: {
  alternatives: string[];
  correctAnswer: string;
  lang: SourceLanguage | null;
  successFeedback: string;
  retryFeedback: string;
  onComplete: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [canSelect, setCanSelect] = useState(true);

  // Auto-play placeholder on mount
  useEffect(() => {
    // Would play audio here
  }, []);

  const handleSelect = (letter: string) => {
    if (!canSelect) return;
    setSelected(letter);
    if (letter === correctAnswer) {
      setIsCorrect(true);
      setFeedback(successFeedback);
    } else {
      setIsCorrect(false);
      setFeedback(retryFeedback);
      setShakeKey((k) => k + 1);
      setCanSelect(false);
      setTimeout(() => {
        setSelected(null);
        setIsCorrect(null);
        setFeedback("");
        setCanSelect(true);
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 pb-8">
      <h2 className="text-xl font-bold text-ink mb-2">
        {lang === "de" ? "Welchen Buchstaben hast du gehört?" : "Which letter did you hear?"}
      </h2>

      {/* Audio play button */}
      <button
        className="w-16 h-16 rounded-full bg-sky flex items-center justify-center mb-8 hover:bg-sky/80 transition-colors"
        onClick={() => {/* play audio */}}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21"/></svg>
      </button>

      {/* Letter tiles */}
      <div className="flex gap-4 mb-8">
        {alternatives.map((letter) => {
          const isThis = selected === letter;
          const correct = isThis && isCorrect === true;
          const incorrect = isThis && isCorrect === false;
          return (
            <motion.button
              key={letter + shakeKey}
              animate={incorrect ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.4 }}
              onClick={() => handleSelect(letter)}
              className={`w-24 h-24 rounded-card text-5xl font-bold flex items-center justify-center transition-all border-2 ${
                correct
                  ? "border-mint bg-mint/10 shadow-[0_0_20px_rgba(6,214,160,0.3)]"
                  : incorrect
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center mb-8 font-medium ${
            isCorrect ? "text-mint" : "text-red-500"
          }`}
        >
          {feedback}
        </motion.p>
      )}

      <button
        disabled={!isCorrect}
        onClick={onComplete}
        className={`w-full h-[52px] rounded-card font-semibold text-lg transition-all ${
          isCorrect
            ? "bg-rose text-white hover:bg-rose/80"
            : "bg-gray-200 text-ink/40 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
