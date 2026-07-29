"use client";

export default function CrossStitchOrnament({ className = "" }: { className?: string }) {
  // Cross-stitch floral ornament - red roses with green leaves
  const px = 4; // pixel size
  // 12x10 grid pattern for a small floral corner
  const pattern = [
    // row 0
    [0,0,0,0,0,0,0,0,3,0,0,0],
    // row 1
    [0,0,0,0,3,0,0,3,1,3,0,0],
    // row 2
    [0,0,3,0,1,3,0,0,1,0,0,0],
    // row 3
    [0,3,1,3,1,1,3,3,0,0,0,0],
    // row 4
    [0,0,1,1,2,1,1,0,0,0,0,0],
    // row 5
    [0,3,1,2,2,2,1,3,0,0,0,0],
    // row 6
    [0,0,1,1,2,1,1,0,0,0,0,0],
    // row 7
    [0,3,1,3,1,1,3,0,0,0,0,0],
    // row 8
    [0,0,3,0,1,0,0,0,0,0,0,0],
    // row 9
    [0,0,0,0,3,0,0,0,0,0,0,0],
  ];

  const colors: Record<number, string> = {
    0: "transparent",
    1: "#D23F5A",  // rose red petals
    2: "#A83248",  // dark rose center
    3: "#5B8C6B",  // green leaves
  };

  return (
    <svg
      className={className}
      width={pattern[0].length * px}
      height={pattern.length * px}
      viewBox={`0 0 ${pattern[0].length * px} ${pattern.length * px}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {pattern.map((row, y) =>
        row.map((cell, x) =>
          cell !== 0 ? (
            <rect
              key={`${x}-${y}`}
              x={x * px}
              y={y * px}
              width={px}
              height={px}
              fill={colors[cell]}
            />
          ) : null
        )
      )}
    </svg>
  );
}

export function CrossStitchCorner() {
  // Larger, more detailed corner ornament with multiple flowers
  const px = 3;
  const pattern = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,3,3,1,3,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,3,1,1,2,1,3,0],
    [0,0,0,0,0,0,0,0,0,0,0,3,1,2,2,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,3,0,3,1,1,3,0,0],
    [0,0,0,0,0,0,0,0,0,3,3,0,0,3,3,0,0,0],
    [0,0,0,0,0,0,0,0,3,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,3,3,0,3,0,0,0,0,0,0,0,0],
    [0,0,0,0,3,1,1,0,0,0,3,0,0,0,0,0,0,0],
    [0,0,0,3,1,2,1,3,0,0,0,3,0,0,0,0,0,0],
    [0,0,3,1,2,2,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,3,1,1,3,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0],
  ];

  const colors: Record<number, string> = {
    0: "transparent",
    1: "#D23F5A",
    2: "#A83248",
    3: "#5B8C6B",
  };

  return (
    <svg
      width={pattern[0].length * px}
      height={pattern.length * px}
      viewBox={`0 0 ${pattern[0].length * px} ${pattern.length * px}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {pattern.map((row, y) =>
        row.map((cell, x) =>
          cell !== 0 ? (
            <rect
              key={`${x}-${y}`}
              x={x * px}
              y={y * px}
              width={px}
              height={px}
              fill={colors[cell]}
            />
          ) : null
        )
      )}
    </svg>
  );
}

export function CornerCross({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const posClasses: Record<string, string> = {
    tl: "top-2 left-2",
    tr: "top-2 right-2",
    bl: "bottom-2 left-2",
    br: "bottom-2 right-2",
  };

  return (
    <span className={`absolute ${posClasses[position]} text-rose font-pixel text-[8px] opacity-40 select-none`}>
      +
    </span>
  );
}
