"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import type { SourceLanguage } from "@/lib/store";

export default function Speaking({
  prompt,
  lang,
  onComplete,
  onSkip,
}: {
  prompt: string;
  lang: SourceLanguage | null;
  onComplete: () => void;
  onSkip: () => void;
}) {
  const [state, setState] = useState<"idle" | "listening" | "success">("idle");
  const [confidence, setConfidence] = useState<number | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRef.current = recorder;
      recorder.start();
      setState("listening");

      // Auto-stop after 3 seconds
      setTimeout(() => {
        if (recorder.state === "recording") {
          recorder.stop();
          stream.getTracks().forEach((t) => t.stop());
        }
        // Placeholder scoring - always 85%
        setConfidence(85);
        setState("success");
      }, 3000);
    } catch {
      // If mic not available, simulate
      setState("listening");
      setTimeout(() => {
        setConfidence(85);
        setState("success");
      }, 3000);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-screen pb-8">
      <h2 className="text-xl font-bold text-ink mb-2">{prompt}</h2>
      <p className="text-text-secondary text-sm mb-12">
        {lang === "de" ? "Drücke den Knopf und sprich" : "Press the button and speak"}
      </p>

      {/* Mic button */}
      <motion.button
        onClick={state === "idle" ? startRecording : undefined}
        animate={state === "listening" ? { scale: [1, 1.15, 1] } : {}}
        transition={state === "listening" ? { repeat: Infinity, duration: 1.5 } : {}}
        className={`w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4 transition-colors ${
          state === "success"
            ? "bg-mint"
            : state === "listening"
              ? "bg-rose-light"
              : "bg-rose hover:bg-rose-light"
        }`}
      >
        <span className="text-white text-3xl">
          {state === "success" ? "✓" : "🎤"}
        </span>
      </motion.button>

      {/* State label */}
      <p className="text-sm text-text-secondary mb-8 h-5">
        {state === "listening" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Listening...
          </motion.span>
        )}
        {state === "success" && confidence !== null && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-mint font-medium"
          >
            {confidence}% confidence — Accepted!
          </motion.span>
        )}
      </p>

      {/* Skip option */}
      {state !== "success" && (
        <button
          onClick={onSkip}
          className="text-sm text-text-muted mb-8 min-h-tap flex items-center"
        >
          {lang === "de" ? "Ich kann gerade nicht sprechen" : "I can't speak right now"}
        </button>
      )}

      <button
        disabled={state !== "success"}
        onClick={onComplete}
        className={`w-full h-btn rounded-card font-semibold text-lg transition-all ${
          state === "success"
            ? "bg-rose text-white hover:bg-rose-light"
            : "bg-gray-200 text-text-muted cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
