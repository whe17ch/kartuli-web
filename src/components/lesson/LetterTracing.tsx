"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LetterTracing({
  glyph,
  onComplete,
}: {
  glyph: string;
  onComplete: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [coverage, setCoverage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Draw ghost letter
  const drawGhost = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "200px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(244, 63, 94, 0.08)";
    ctx.fillText(glyph, canvas.width / 2, canvas.height / 2);
  }, [glyph]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(2, 2);
    drawGhost();

    // Stroke preview animation
    const timer = setTimeout(() => setShowPreview(false), 2000);
    return () => clearTimeout(timer);
  }, [drawGhost]);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = "#1A1A1A";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    // Approximate coverage
    setCoverage((prev) => {
      const next = Math.min(prev + 0.5, 100);
      if (next >= 50 && !completed) {
        setCompleted(true);
      }
      return next;
    });
  };

  const stopDraw = () => setIsDrawing(false);

  const reset = () => {
    setCoverage(0);
    setCompleted(false);
    drawGhost();
  };

  const replay = () => {
    setShowPreview(true);
    setTimeout(() => setShowPreview(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col items-center px-screen pb-8 pt-4">
      <h2 className="text-xl font-bold text-ink mb-2">Trace the letter</h2>
      <p className="text-text-secondary text-sm mb-4">Follow the shape with your finger</p>

      <div className="relative w-full aspect-square max-w-[300px] mb-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-card border-2 border-gray-200 touch-none cursor-crosshair bg-white"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />

        {/* Stroke preview overlay */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.span
                initial={{ pathLength: 0, opacity: 0.6 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5 }}
                className="text-[180px] text-rose/30"
              >
                {glyph}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success overlay */}
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-mint/20 rounded-card flex items-center justify-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-5xl"
              >
                ✓
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Coverage indicator */}
      <div className="w-full max-w-[300px] mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              completed ? "bg-mint" : "bg-rose"
            }`}
            style={{ width: `${coverage}%` }}
          />
        </div>
        <p className="text-xs text-text-muted mt-1 text-center">{Math.round(coverage)}% coverage</p>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-card border border-gray-200 text-text-secondary text-sm min-h-tap"
        >
          Reset
        </button>
        <button
          onClick={replay}
          className="px-4 py-2 rounded-card border border-gray-200 text-text-secondary text-sm min-h-tap"
        >
          Replay
        </button>
      </div>

      <button
        disabled={!completed}
        onClick={onComplete}
        className={`w-full h-btn rounded-card font-semibold text-lg transition-all ${
          completed
            ? "bg-rose text-white hover:bg-rose-light"
            : "bg-gray-200 text-text-muted cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
