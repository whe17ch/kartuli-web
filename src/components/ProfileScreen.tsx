"use client";

import { CrossStitchCorner, CornerCross } from "./CrossStitchOrnament";
import { NinoAvatar } from "./PixelArt";

export default function ProfileScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-cream relative flex flex-col items-center justify-center px-6">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <div className="absolute top-3 right-3">
        <CrossStitchCorner />
      </div>

      <div className="w-20 h-20 rounded-full bg-card-bg border-2 border-card-border flex items-center justify-center mb-4 shadow-sm">
        <NinoAvatar size={64} />
      </div>
      <h2 className="font-pixel text-[11px] text-ink tracking-wider mb-2">PROFILE</h2>
      <p className="text-ink/50 text-sm text-center">Coming next — stay tuned!</p>
    </div>
  );
}
