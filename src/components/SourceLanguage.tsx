"use client";

import { useState } from "react";
import type { SourceLanguage } from "@/lib/store";
import { CrossStitchCorner, CornerCross } from "./CrossStitchOrnament";

interface Props {
  onContinue: (lang: SourceLanguage) => void;
}

export default function SourceLanguageScreen({ onContinue }: Props) {
  const [selected, setSelected] = useState<SourceLanguage>("en");

  const languages = [
    { id: "en" as SourceLanguage, label: "English", flag: "🇬🇧" },
    { id: "de" as SourceLanguage, label: "Deutsch", flag: "🇩🇪" },
  ];

  return (
    <div className="min-h-screen bg-cream relative flex flex-col px-6 py-12">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <div className="absolute top-3 right-3">
        <CrossStitchCorner />
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-full bg-rose flex items-center justify-center">
          <span className="font-pixel text-[8px] text-white">1</span>
        </div>
        <h2 className="font-pixel text-[11px] text-ink uppercase tracking-wider">
          SOURCE LANGUAGE
        </h2>
      </div>

      <p className="text-ink/60 text-sm mb-6">Choose your native language</p>

      <div className="space-y-3 flex-1">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setSelected(lang.id)}
            className={`card w-full flex items-center gap-3 transition-all ${
              selected === lang.id
                ? "border-rose ring-1 ring-rose/30"
                : "border-card-border"
            }`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="font-semibold text-ink flex-1 text-left">{lang.label}</span>
            {selected === lang.id && (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#7DBE9F">
                <circle cx="10" cy="10" r="10"/>
                <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => onContinue(selected)}
        className="btn-primary mt-8"
      >
        CONTINUE <span>→</span>
      </button>
    </div>
  );
}
