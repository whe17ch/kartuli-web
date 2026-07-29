"use client";

import { CrossStitchCorner, CornerCross } from "./CrossStitchOrnament";
import { PixelCity, PixelHeart } from "./PixelArt";

interface CultureScreenProps {
  onBack: () => void;
}

const cultureCards = [
  {
    title: "Supra",
    tag: "Tradition",
    tagColor: "#D23F5A",
    desc: "The Georgian feast — a celebration of food, wine, and heartfelt toasts.",
    colors: ["#D23F5A", "#C4956A", "#D7A623"],
  },
  {
    title: "Narikala",
    tag: "History",
    tagColor: "#7DBE9F",
    desc: "An ancient fortress overlooking Tbilisi, standing since the 4th century.",
    colors: ["#5B8C6B", "#8B7355", "#A09070"],
  },
  {
    title: "Polyphonic Singing",
    tag: "Music",
    tagColor: "#6DA8FD",
    desc: "UNESCO-recognized vocal tradition with three-part harmony unique to Georgia.",
    colors: ["#C4956A", "#8B6F4E", "#D2A87A"],
  },
  {
    title: "Wine & Qvevri",
    tag: "Heritage",
    tagColor: "#D7A623",
    desc: "8,000 years of winemaking tradition using clay vessels buried underground.",
    colors: ["#D7A623", "#C4956A", "#8B6F4E"],
  },
];

function MiniPixelArt({ colors }: { colors: string[] }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56">
      <rect width="56" height="56" rx="8" fill={colors[0]} opacity="0.15"/>
      <rect x="8" y="8" width="16" height="16" rx="2" fill={colors[0]} opacity="0.6"/>
      <rect x="28" y="12" width="12" height="12" rx="2" fill={colors[1]} opacity="0.5"/>
      <rect x="12" y="28" width="20" height="12" rx="2" fill={colors[2]} opacity="0.4"/>
      <rect x="36" y="32" width="8" height="8" rx="2" fill={colors[0]} opacity="0.3"/>
    </svg>
  );
}

export default function CultureScreen({ onBack }: CultureScreenProps) {
  return (
    <div className="min-h-screen bg-cream relative">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <div className="absolute top-3 right-3 z-10">
        <CrossStitchCorner />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-2">
        <button onClick={onBack} className="p-2 text-ink">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <span className="font-pixel text-[11px] text-ink tracking-wider">EXPLORE GEORGIA</span>
        <PixelHeart size={18} color="#D23F5A" />
      </div>

      {/* Hero card */}
      <div className="px-5 mb-5">
        <div className="rounded-2xl overflow-hidden relative">
          <PixelCity width={390} height={200} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-white font-bold text-2xl mb-1">Tbilisi</h2>
            <p className="text-white/80 text-sm mb-3">City of stories, bridges, and baths.</p>
            <button className="font-pixel text-[9px] text-white uppercase tracking-wider bg-rose px-4 py-2 rounded-lg flex items-center gap-2">
              Explore <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Culture Cards header */}
      <div className="px-5 mb-3 flex items-center justify-between">
        <p className="section-label">CULTURE CARDS</p>
        <button className="text-rose font-pixel text-[8px] uppercase tracking-wider">
          See all
        </button>
      </div>

      {/* Culture cards list */}
      <div className="px-5 space-y-3 pb-6">
        {cultureCards.map((card) => (
          <button key={card.title} className="card w-full flex items-center gap-3 text-left">
            <MiniPixelArt colors={card.colors} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-ink text-sm">{card.title}</p>
              <p className="text-xs text-ink/50 line-clamp-2 mt-0.5">{card.desc}</p>
              <span
                className="inline-block mt-1.5 text-[9px] font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${card.tagColor}15`, color: card.tagColor }}
              >
                {card.tag}
              </span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
