"use client";

import { CrossStitchCorner, CornerCross } from "./CrossStitchOrnament";
import { NinoAvatar, PixelCity } from "./PixelArt";

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-cream relative flex flex-col items-center justify-center px-6 py-12">
      <CornerCross position="tl" />
      <CornerCross position="tr" />
      <CornerCross position="bl" />
      <CornerCross position="br" />
      <div className="absolute top-3 right-3">
        <CrossStitchCorner />
      </div>

      {/* Brand */}
      <div className="text-center mb-8">
        <h1 className="font-pixel text-[20px] text-ink tracking-wider">KARTULI</h1>
        <p className="font-pixel text-[11px] text-ink/60 mt-2">ქართული</p>
      </div>

      {/* Subtitle */}
      <p className="text-center text-ink/70 text-sm mb-8">
        Learn Georgian. Discover Georgia.
      </p>

      {/* Nino + City illustration */}
      <div className="relative mb-8">
        <PixelCity width={260} height={140} />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 rounded-full bg-card-bg border-2 border-card-border flex items-center justify-center shadow-md">
            <NinoAvatar size={64} />
          </div>
        </div>
      </div>

      {/* Spacer for avatar overlap */}
      <div className="h-6" />

      {/* Carousel dots */}
      <div className="flex gap-2 mb-10">
        <div className="w-2.5 h-2.5 rounded-full bg-rose" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
      </div>

      {/* CTA */}
      <button onClick={onStart} className="btn-primary max-w-xs w-full">
        START LEARNING <span>→</span>
      </button>

      <button className="mt-4 text-sm text-ink/50 underline">
        I already have an account
      </button>
    </div>
  );
}
