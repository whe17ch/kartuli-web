"use client";

import { CrossStitchCorner, CornerCross } from "./CrossStitchOrnament";
import { NinoAvatar } from "./PixelArt";

interface TutorScreenProps {
  onBack: () => void;
}

const chatMessages = [
  {
    from: "nino",
    georgian: "გამარჯობა!",
    transliteration: "(gamarjoba!)",
    english: "Hello!",
  },
  {
    from: "nino",
    georgian: "როგორ ხარ?",
    transliteration: "(rogor khar?)",
    english: "How are you?",
  },
  {
    from: "user",
    georgian: "კარგად, მადლობა!",
    transliteration: "(kargad, madloba!)",
    english: "Good, thank you!",
  },
];

const partners = [
  { name: "Mari", city: "Tbilisi", langs: "GE, EN", online: true },
  { name: "Ana", city: "Kutaisi", langs: "GE, EN", online: true },
  { name: "Giorgi", city: "Batumi", langs: "GE, RU", online: true },
];

const suggestions = ["Order food", "Ask for directions", "Check prices"];

export default function TutorScreen({ onBack }: TutorScreenProps) {
  return (
    <div className="min-h-screen bg-cream relative">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <div className="absolute top-3 right-3 z-10">
        <CrossStitchCorner />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-3">
        <button onClick={onBack} className="p-2 text-ink">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="text-center">
          <span className="font-pixel text-[10px] text-ink tracking-wider">KARTULI TUTOR</span>
          <span className="font-pixel text-[8px] text-ink/40 ml-1">/ TANDEM</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm flex items-center gap-0.5"><svg width="14" height="14" viewBox="0 0 24 24"><defs><linearGradient id="flame1" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#FF6B35"/><stop offset="100%" stopColor="#FF4444"/></linearGradient></defs><path d="M12 2C8 7 4 10 4 14a8 8 0 0016 0c0-4-4-7-8-12z" fill="url(#flame1)"/></svg> 7</span>
          <div className="w-7 h-7 rounded-full bg-card-bg border border-card-border overflow-hidden flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>
      </div>

      {/* AI Tutor section */}
      <div className="px-5 mb-4">
        <p className="section-label mb-3">AI TUTOR</p>

        {/* Nino profile */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-card-bg border border-card-border overflow-hidden flex items-center justify-center">
            <NinoAvatar size={40} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-ink text-sm">Nino</p>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-mint" />
                <span className="text-[10px] text-mint font-medium">Online</span>
              </span>
            </div>
            <p className="text-xs text-ink/40">Your Georgian tutor</p>
          </div>
        </div>

        {/* Chat messages */}
        <div className="space-y-2 mb-3">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`rounded-2xl px-3 py-2 max-w-[75%] ${
                  msg.from === "user"
                    ? "bg-mint/15 text-ink"
                    : "bg-card-bg border border-card-border"
                }`}
              >
                <p className="text-sm font-semibold" style={{ fontFamily: "serif" }}>
                  {msg.georgian}
                </p>
                <p className="text-[10px] text-ink/40">{msg.transliteration}</p>
                <p className="text-xs text-ink/60">{msg.english}</p>
              </div>
            </div>
          ))}

          {/* Suggestion card */}
          <div className="flex justify-start">
            <div className="bg-gold/10 border border-gold/20 rounded-2xl px-3 py-2 max-w-[75%]">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[8px] font-pixel text-rose uppercase tracking-wider bg-rose/10 px-1.5 py-0.5 rounded">
                  Suggestion
                </span>
                <button className="text-ink/30 ml-auto">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  </svg>
                </button>
              </div>
              <p className="text-xs text-ink/70">Try a more natural phrasing:</p>
              <p className="text-sm font-medium text-ink" style={{ fontFamily: "serif" }}>
                &ldquo;კარგად ვარ, გმადლობ!&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
          {suggestions.map((s) => (
            <button key={s} className="text-xs border border-card-border rounded-full px-3 py-1.5 text-ink/60 whitespace-nowrap bg-card-bg">
              {s}
            </button>
          ))}
          <button className="text-xs text-ink/30 px-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6M23 20v-6h-6"/>
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/>
            </svg>
          </button>
        </div>

        {/* Input field */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-card-bg border border-card-border rounded-xl px-3 py-2.5 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M6 8h.01M2 12h20"/>
            </svg>
            <span className="text-sm text-ink/30">Type in Georgian or English...</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-rose flex items-center justify-center shadow-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <rect x="9" y="1" width="6" height="12" rx="3"/>
              <path d="M5 10a7 7 0 0014 0" fill="none" stroke="white" strokeWidth="2"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke="white" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Tandem Partners */}
      <div className="px-5 mb-4">
        <p className="section-label mb-3">TANDEM PARTNERS</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {partners.map((p) => (
            <div key={p.name} className="card min-w-[140px] flex flex-col items-center py-4 px-3">
              <div className="relative mb-2">
                <div className="w-14 h-14 rounded-full bg-cream border-2 border-card-border flex items-center justify-center overflow-hidden">
                  <NinoAvatar size={48} />
                </div>
                {p.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-mint rounded-full border-2 border-card-bg" />
                )}
              </div>
              <p className="font-semibold text-sm text-ink">{p.name}</p>
              <p className="text-[10px] text-ink/40">{p.city}</p>
              <p className="text-[9px] text-ink/30 mt-0.5">Speaks: {p.langs}</p>
            </div>
          ))}
        </div>
        <button className="btn-primary mt-3">
          FIND MORE PARTNERS <span>→</span>
        </button>
      </div>

      {/* Your Progress */}
      <div className="px-5 mb-6">
        <p className="section-label mb-3">YOUR PROGRESS</p>
        <div className="card">
          <div className="grid grid-cols-3 gap-2 text-center mb-3">
            <div>
              <p className="text-lg font-bold text-ink flex items-center justify-center gap-1"><svg width="16" height="16" viewBox="0 0 24 24"><defs><linearGradient id="flame2" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#FF6B35"/><stop offset="100%" stopColor="#FF4444"/></linearGradient></defs><path d="M12 2C8 7 4 10 4 14a8 8 0 0016 0c0-4-4-7-8-12z" fill="url(#flame2)"/></svg> 7</p>
              <p className="text-[9px] text-ink/40">Day Streak</p>
            </div>
            <div>
              <p className="text-lg font-bold text-ink flex items-center justify-center gap-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg> 28</p>
              <p className="text-[9px] text-ink/40">Lessons</p>
            </div>
            <div>
              <p className="text-lg font-bold text-ink flex items-center justify-center gap-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="#7DBE9F"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg> 82%</p>
              <p className="text-[9px] text-ink/40">Accuracy</p>
            </div>
          </div>
          <p className="text-center text-xs text-ink/50">
            Consistency is your superpower.
          </p>
        </div>
      </div>
    </div>
  );
}
