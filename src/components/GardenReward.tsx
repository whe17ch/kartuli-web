"use client";

import { CrossStitchCorner, CornerCross } from "./CrossStitchOrnament";
import { PixelFlower } from "./PixelArt";

interface GardenRewardProps {
  onDone: () => void;
}

export default function GardenReward({ onDone }: GardenRewardProps) {
  return (
    <div className="min-h-screen bg-cream relative flex flex-col items-center justify-center px-6">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <CornerCross position="bl" />
      <CornerCross position="br" />
      <div className="absolute top-3 right-3">
        <CrossStitchCorner />
      </div>

      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-mint/10 flex items-center justify-center">
            <PixelFlower size={60} />
          </div>
        </div>

        <h2 className="font-pixel text-[13px] text-ink tracking-wider mb-3">
          LESSON COMPLETE!
        </h2>
        <p className="text-ink/60 text-sm mb-2">
          You earned a new flower for your garden 🌸
        </p>
        <p className="text-gold font-semibold text-lg mb-8">+1 Garden Reward</p>

        <button onClick={onDone} className="btn-primary max-w-xs mx-auto">
          CONTINUE <span>→</span>
        </button>
      </div>
    </div>
  );
}
