"use client";

import { CrossStitchCorner, CornerCross } from "./CrossStitchOrnament";
import { NinoAvatar, PixelVase } from "./PixelArt";
import type { AppState } from "@/lib/store";

interface HomeProps {
  state: AppState;
  onStartLesson: () => void;
}

export default function HomeScreen({ state, onStartLesson }: HomeProps) {
  const streak = state.streak || 47;

  // Week tracker data
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const dayStatus = ["done", "done", "done", "today", "future", "future", "future"];
  const daysLearned = dayStatus.filter((s) => s === "done").length;

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      {/* Corner decorations */}
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <div className="absolute top-3 right-3 z-10">
        <CrossStitchCorner />
      </div>

      {/* Header */}
      <header className="pt-12 pb-4 px-5 flex items-center justify-between">
        <div />
        <div className="text-center">
          <h1 className="font-pixel text-[16px] text-ink tracking-wider">KARTULI</h1>
          <p className="font-pixel text-[9px] text-ink/60 mt-1">ქართული</p>
        </div>
        <button className="p-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
        </button>
      </header>

      {/* Content */}
      <div className="px-5 pb-6 space-y-4">
        {/* Streak Card */}
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center overflow-hidden border-2 border-card-border">
            <NinoAvatar size={40} />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-ink/60">Day</span>
              <span className="text-2xl font-bold text-ink">{streak}</span>
            </div>
            <p className="text-xs text-ink/50">Study streak</p>
            <div className="flex gap-1 mt-1.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i < 7 ? "bg-mint" : "bg-gray-200"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Continue Lesson */}
        <div>
          <p className="section-label mb-2">CONTINUE LESSON</p>
          <div className="card">
            <p className="text-sm text-ink font-medium mb-3">
              Lesson 12 • Greetings & Introductions
            </p>
            <button onClick={onStartLesson} className="btn-primary">
              CONTINUE <span className="ml-1">→</span>
            </button>
          </div>
        </div>

        {/* Today's Word */}
        <div>
          <p className="section-label mb-2">TODAY&apos;S WORD</p>
          <div className="card flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-ink" style={{ fontFamily: "serif" }}>
                  მადლობა
                </span>
                <button className="text-sky">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
                  </svg>
                </button>
              </div>
              <p className="text-sky text-sm font-medium">madloba</p>
              <p className="text-ink/70 text-sm">thank you</p>
            </div>
            <div className="ml-3 flex-shrink-0">
              <PixelVase size={60} />
            </div>
          </div>
        </div>

        {/* Daily Cultural Fact */}
        <div>
          <p className="section-label mb-2">DAILY CULTURAL FACT</p>
          <div className="card flex gap-3">
            <div className="w-20 h-16 rounded-lg bg-cream flex items-center justify-center overflow-hidden flex-shrink-0">
              <svg width="80" height="64" viewBox="0 0 80 64" fill="none">
                {/* Mini Tbilisi baths */}
                <rect width="80" height="64" fill="#E8D5B7" rx="8"/>
                <ellipse cx="25" cy="35" rx="12" ry="10" fill="#C4956A"/>
                <ellipse cx="50" cy="35" rx="10" ry="8" fill="#B8956A"/>
                <rect x="18" y="35" width="14" height="12" fill="#C4956A"/>
                <rect x="43" y="35" width="14" height="12" fill="#B8956A"/>
                <rect x="0" y="47" width="80" height="17" fill="#A09070"/>
                <path d="M0 20 L10 12 L20 18 L30 10 L40 16 L50 8 L60 14 L70 10 L80 18" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.3"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-ink">Tbilisi&apos;s Sulfur Baths</p>
              <p className="text-xs text-ink/60 mt-0.5 line-clamp-2">
                The Abanotubani district is famous for its natural sulfur baths, part of Tbilisi&apos;s history for centuries.
              </p>
              <button className="text-rose font-pixel text-[8px] uppercase tracking-wider mt-2 flex items-center gap-1">
                Explore <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* This Week */}
        <div>
          <p className="section-label mb-2">THIS WEEK</p>
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {days.map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-1.5">
                    <span className="text-[9px] text-ink/40 font-medium">{day}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        dayStatus[i] === "done"
                          ? "bg-mint"
                          : dayStatus[i] === "today"
                          ? "bg-sky"
                          : "bg-gray-200"
                      }`}
                    >
                      {dayStatus[i] === "done" && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-ink">
                  {daysLearned}<span className="text-sm font-normal text-ink/50">/5</span>
                </p>
                <p className="text-[10px] text-ink/40">days learned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
