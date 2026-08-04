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
    desc: "The Georgian feast — a celebration of food, wine, and heartfelt toasts led by the tamada (toastmaster). Toasts are raised to God, family, country, and the departed.",
    colors: ["#D23F5A", "#C4956A", "#D7A623"],
  },
  {
    title: "Narikala Fortress",
    tag: "History",
    tagColor: "#7DBE9F",
    desc: "An ancient fortress overlooking Tbilisi since the 4th century. Reach it by cable car for panoramic views of the old city, the Mtkvari river, and the sulfur bath district below.",
    colors: ["#5B8C6B", "#8B7355", "#A09070"],
  },
  {
    title: "Polyphonic Singing",
    tag: "Music",
    tagColor: "#6DA8FD",
    desc: "UNESCO-recognized vocal tradition with three-part harmony unique to Georgia. A recording of the Chakrulo song was sent into space on the Voyager Golden Record in 1977.",
    colors: ["#C4956A", "#8B6F4E", "#D2A87A"],
  },
  {
    title: "Wine & Qvevri",
    tag: "Heritage",
    tagColor: "#D7A623",
    desc: "8,000 years of winemaking tradition using qvevri — large clay vessels buried underground. Georgia is considered the birthplace of wine, and amber wine (orange wine) is its signature style.",
    colors: ["#D7A623", "#C4956A", "#8B6F4E"],
  },
  {
    title: "Tonis Puri",
    tag: "Food",
    tagColor: "#C4956A",
    desc: "Traditional Georgian bread baked in a deep clay oven called a tone. The dough is slapped onto the inner walls and bakes in minutes. Fresh tonis puri is a staple at every meal.",
    colors: ["#C4956A", "#D7A623", "#8B6F4E"],
  },
  {
    title: "Georgian Dance",
    tag: "Performing Arts",
    tagColor: "#D23F5A",
    desc: "Men leap, spin on their toes, and perform acrobatic feats while women glide gracefully across the stage. The Georgian National Ballet is world-renowned for its breathtaking energy.",
    colors: ["#D23F5A", "#6DA8FD", "#D7A623"],
  },
  {
    title: "Churchkhela",
    tag: "Food",
    tagColor: "#7DBE9F",
    desc: "Often called the 'Georgian Snickers' — walnuts or hazelnuts threaded on a string, dipped in thickened grape juice, and hung to dry. An ancient energy snack carried by warriors for centuries.",
    colors: ["#7DBE9F", "#8B6F4E", "#C4956A"],
  },
  {
    title: "Sulfur Baths",
    tag: "Wellness",
    tagColor: "#6DA8FD",
    desc: "The Abanotubani district in old Tbilisi is famous for its brick-domed bathhouses fed by natural hot springs. Pushkin and Dumas both praised these baths in their travel writings.",
    colors: ["#6DA8FD", "#5B8C6B", "#A09070"],
  },
  {
    title: "Svetitskhoveli Cathedral",
    tag: "Sacred Sites",
    tagColor: "#D7A623",
    desc: "A UNESCO World Heritage site in Mtskheta, Georgia's ancient capital. Built in the 11th century, it is said to house the robe of Christ and remains the spiritual heart of the nation.",
    colors: ["#D7A623", "#D23F5A", "#8B7355"],
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
        <span className="text-ink/40 font-pixel text-[8px] uppercase tracking-wider">
          {cultureCards.length} topics
        </span>
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
