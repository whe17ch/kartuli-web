"use client";

import { useState } from "react";
import { CrossStitchCorner, CornerCross } from "./CrossStitchOrnament";
import { PixelCity, PixelHeart } from "./PixelArt";

interface LessonScreenProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function LessonScreen({ onClose, onComplete }: LessonScreenProps) {
  const [activeTab, setActiveTab] = useState("listen");
  const tabs = ["Listen", "Speak", "Read", "Write"];
  const [step, setStep] = useState(1);
  const totalSteps = 31;

  return (
    <div className="min-h-screen bg-cream relative">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <div className="absolute top-3 right-3 z-10">
        <CrossStitchCorner />
      </div>

      {/* Top nav */}
      <div className="flex items-center justify-between px-4 pt-12 pb-2">
        <button onClick={onClose} className="p-2 text-ink">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <span className="font-pixel text-[10px] text-ink tracking-wider">LESSON 1 · GREETINGS</span>
        <PixelHeart size={18} color="#D23F5A" />
      </div>

      {/* Progress */}
      <div className="px-5 mb-3">
        <div className="flex items-center gap-2 mb-1.5">
          <PixelHeart size={14} color="#D23F5A" />
          <span className="text-xs text-ink/60">{step} / {totalSteps}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
      </div>

      {/* Hero pixel art */}
      <div className="px-5 mb-4">
        <div className="rounded-xl overflow-hidden">
          <PixelCity width={390} height={180} />
        </div>
      </div>

      {/* Word display card */}
      <div className="px-5 mb-4">
        <div className="card text-center py-5">
          <p className="text-3xl font-bold text-ink mb-2" style={{ fontFamily: "serif" }}>
            გამარჯობა
          </p>
          <p className="text-sky font-medium text-sm mb-1">gamarjoba</p>
          <p className="text-ink/60 text-sm">hello</p>
          <button className="mt-3 mx-auto w-10 h-10 rounded-full border border-card-border flex items-center justify-center text-ink/50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="px-5 mb-4">
        <div className="flex border-b border-card-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`flex-1 pb-2 text-sm font-medium transition-colors ${
                activeTab === tab.toLowerCase()
                  ? "text-rose border-b-2 border-rose"
                  : "text-ink/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Practice section */}
      <div className="px-5 mb-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D23F5A" strokeWidth="2"><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"/></svg>
            <p className="font-semibold text-sm text-ink">Practice pronunciation</p>
          </div>
          <p className="text-xs text-ink/50 mb-4">Tap the mic and say it out loud.</p>

          {/* Mic button */}
          <div className="flex flex-col items-center">
            <button className="w-16 h-16 rounded-2xl bg-sky flex items-center justify-center shadow-lg shadow-sky/30 transition-transform active:scale-95">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <rect x="9" y="1" width="6" height="12" rx="3"/>
                <path d="M5 10a7 7 0 0014 0" fill="none" stroke="white" strokeWidth="2"/>
                <line x1="12" y1="17" x2="12" y2="21" stroke="white" strokeWidth="2"/>
                <line x1="8" y1="21" x2="16" y2="21" stroke="white" strokeWidth="2"/>
              </svg>
            </button>

            {/* Waveform placeholder */}
            <div className="flex items-end justify-center gap-[2px] mt-3 h-6">
              {[3, 6, 10, 14, 8, 16, 12, 6, 10, 14, 8, 4, 12, 6, 10, 8, 14, 6, 10, 4].map((h, i) => (
                <div key={i} className="w-[3px] rounded-full bg-sky/30" style={{ height: `${h}px` }} />
              ))}
            </div>

            <p className="text-sm text-ink/50 mt-3">You&apos;ve got this!</p>
          </div>
        </div>
      </div>

      {/* Word list item */}
      <div className="px-5 mb-6">
        <div className="card flex items-center gap-3">
          <PixelHeart size={16} color="#7DBE9F" />
          <div className="flex-1">
            <p className="font-semibold text-ink text-sm" style={{ fontFamily: "serif" }}>მადლობა</p>
            <p className="text-sky text-xs">madloba</p>
            <p className="text-ink/50 text-xs">thank you</p>
          </div>
          <button className="text-ink/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 010 7.07"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Continue button at bottom */}
      <div className="px-5 pb-8">
        <button
          onClick={() => {
            if (step < totalSteps) {
              setStep(step + 1);
            } else {
              onComplete();
            }
          }}
          className="btn-primary"
        >
          {step < totalSteps ? "NEXT" : "COMPLETE"} <span>→</span>
        </button>
      </div>
    </div>
  );
}
