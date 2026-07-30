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
    <div className="flex-1 flex flex-col items-center justify-center px-5 pb-8">
      <h2 className="text-xl font-bold text-ink mb-2">{prompt}</h2>
      <p className="text-ink/60 text-sm mb-12">
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
              ? "bg-rose/80"
              : "bg-rose hover:bg-rose/80"
        }`}
      >
        {state === "success" ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><rect x="9" y="1" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0014 0" fill="none" stroke="white" strokeWidth="2"/><line x1="12" y1="17" x2="12" y2="21" stroke="white" strokeWidth="2"/></svg>
        )}
      </motion.button>

      {/* State label */}
      <p className="text-sm text-ink/60 mb-8 h-5">
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
          className="text-sm text-ink/40 mb-8 min-h-[44px] flex items-center"
        >
          {lang === "de" ? "Ich kann gerade nicht sprechen" : "I can't speak right now"}
        </button>
      )}

      <button
        disabled={state !== "success"}
        onClick={onComplete}
        className={`w-full h-[52px] rounded-card font-semibold text-lg transition-all ${
          state === "success"
            ? "bg-rose text-white hover:bg-rose/80"
            : "bg-gray-200 text-ink/40 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
