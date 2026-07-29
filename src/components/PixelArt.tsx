"use client";

// Pixel art placeholder components

export function NinoAvatar({ size = 48 }: { size?: number }) {
  const px = Math.max(2, Math.floor(size / 16));
  // 16x16 pixel art woman face
  const pattern = [
    [0,0,0,0,0,4,4,4,4,4,4,0,0,0,0,0],
    [0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0],
    [0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0],
    [0,0,4,3,3,3,3,3,3,3,3,3,3,4,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
    [0,3,3,2,2,3,3,3,3,2,2,3,3,3,0,0],
    [0,3,3,2,1,3,3,3,3,2,1,3,3,3,0,0],
    [0,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
    [0,3,3,3,3,3,5,5,3,3,3,3,3,3,0,0],
    [0,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
    [0,0,3,3,3,6,6,6,6,3,3,3,0,0,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,0,0,0,0],
    [0,0,0,4,4,3,3,3,3,4,4,0,0,0,0,0],
    [0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0],
    [0,4,4,0,0,4,4,4,4,0,0,4,4,0,0,0],
    [0,4,0,0,0,0,4,4,0,0,0,0,4,0,0,0],
  ];

  const colors: Record<number, string> = {
    0: "transparent",
    1: "#2A2A2A",  // eye pupil
    2: "#4A3728",  // eye
    3: "#F5D0A9",  // skin
    4: "#3D2B1F",  // hair
    5: "#E8A088",  // nose
    6: "#D23F5A",  // lips
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${16*px} ${16*px}`}>
      {pattern.map((row, y) =>
        row.map((cell, x) =>
          cell !== 0 ? (
            <rect key={`${x}-${y}`} x={x*px} y={y*px} width={px} height={px} fill={colors[cell]} />
          ) : null
        )
      )}
    </svg>
  );
}

export function PixelFlower({ size = 40 }: { size?: number }) {
  const px = Math.max(1, Math.floor(size / 10));
  const pattern = [
    [0,0,0,3,0,0,0,0,0,0],
    [0,0,3,3,3,0,0,0,0,0],
    [0,0,0,3,0,0,1,0,0,0],
    [0,0,0,3,0,1,2,1,0,0],
    [0,0,0,3,3,1,1,1,0,0],
    [1,0,0,0,3,0,3,0,0,0],
    [2,1,0,0,0,3,0,0,0,0],
    [1,1,0,0,0,3,0,1,0,0],
    [0,3,3,0,0,3,1,2,1,0],
    [0,0,3,3,3,3,0,1,0,0],
  ];
  const colors: Record<number, string> = {
    0: "transparent",
    1: "#D23F5A",
    2: "#A83248",
    3: "#5B8C6B",
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${10*px} ${10*px}`}>
      {pattern.map((row, y) =>
        row.map((cell, x) =>
          cell !== 0 ? (
            <rect key={`${x}-${y}`} x={x*px} y={y*px} width={px} height={px} fill={colors[cell]} />
          ) : null
        )
      )}
    </svg>
  );
}

export function PixelVase({ size = 80 }: { size?: number }) {
  const px = Math.max(1, Math.floor(size / 14));
  // Vase with flowers
  const pattern = [
    [0,0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,1,2,1,0,0,1,2,1,0,0,0,0],
    [0,0,0,1,0,1,0,0,1,0,0,0,0,0],
    [0,0,0,3,1,2,1,0,3,0,0,0,0,0],
    [0,0,0,3,0,1,0,3,0,0,0,0,0,0],
    [0,0,0,0,3,3,3,0,0,0,0,0,0,0],
    [0,0,0,4,4,4,4,4,0,0,0,0,0,0],
    [0,0,4,4,5,5,5,4,4,0,0,0,0,0],
    [0,0,4,5,5,5,5,5,4,0,0,0,0,0],
    [0,0,4,5,5,5,5,5,4,0,0,0,0,0],
    [0,0,4,4,5,5,5,4,4,0,0,0,0,0],
    [0,0,0,4,5,5,5,4,0,0,0,0,0,0],
    [0,0,0,4,4,4,4,4,0,0,0,0,0,0],
    [0,0,0,0,4,4,4,0,0,0,0,0,0,0],
  ];
  const colors: Record<number, string> = {
    0: "transparent",
    1: "#D23F5A",
    2: "#A83248",
    3: "#5B8C6B",
    4: "#C4956A",
    5: "#DEB887",
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${14*px} ${14*px}`}>
      {pattern.map((row, y) =>
        row.map((cell, x) =>
          cell !== 0 ? (
            <rect key={`${x}-${y}`} x={x*px} y={y*px} width={px} height={px} fill={colors[cell]} />
          ) : null
        )
      )}
    </svg>
  );
}

export function PixelCity({ width = 200, height = 120 }: { width?: number; height?: number }) {
  // A stylized Tbilisi cityscape with church, buildings, mountains
  return (
    <svg width={width} height={height} viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
      {/* Sky */}
      <rect width="200" height="120" fill="#E8D5B7" rx="8"/>
      {/* Mountains */}
      <polygon points="0,80 30,45 60,70 90,35 120,65 150,40 180,60 200,50 200,80" fill="#C4A882" opacity="0.5"/>
      {/* Church tower */}
      <rect x="80" y="35" width="12" height="40" fill="#B8956A"/>
      <rect x="76" y="30" width="20" height="8" fill="#A88455"/>
      <polygon points="86,15 76,30 96,30" fill="#D23F5A"/>
      <circle cx="86" cy="22" r="2" fill="#D7A623"/>
      {/* Buildings */}
      <rect x="20" y="55" width="25" height="25" fill="#C4956A" rx="2"/>
      <rect x="22" y="58" width="5" height="6" fill="#FFF4E3"/>
      <rect x="30" y="58" width="5" height="6" fill="#FFF4E3"/>
      <rect x="22" y="68" width="5" height="6" fill="#FFF4E3"/>
      <rect x="30" y="68" width="5" height="6" fill="#FFF4E3"/>
      <rect x="50" y="50" width="22" height="30" fill="#D2A87A" rx="2"/>
      <rect x="52" y="53" width="4" height="5" fill="#FFF4E3"/>
      <rect x="58" y="53" width="4" height="5" fill="#FFF4E3"/>
      <rect x="64" y="53" width="4" height="5" fill="#FFF4E3"/>
      <rect x="55" y="68" width="8" height="12" fill="#8B6F4E" rx="4 4 0 0"/>
      <rect x="110" y="50" width="30" height="30" fill="#C9A070" rx="2"/>
      <rect x="112" y="53" width="5" height="5" fill="#FFF4E3"/>
      <rect x="120" y="53" width="5" height="5" fill="#FFF4E3"/>
      <rect x="128" y="53" width="5" height="5" fill="#FFF4E3"/>
      <rect x="112" y="63" width="5" height="5" fill="#FFF4E3"/>
      <rect x="120" y="63" width="5" height="5" fill="#FFF4E3"/>
      <rect x="150" y="60" width="20" height="20" fill="#B8956A" rx="2"/>
      <rect x="152" y="63" width="4" height="4" fill="#FFF4E3"/>
      <rect x="160" y="63" width="4" height="4" fill="#FFF4E3"/>
      {/* Dome */}
      <ellipse cx="160" cy="60" rx="10" ry="6" fill="#D23F5A" opacity="0.7"/>
      {/* Ground */}
      <rect x="0" y="78" width="200" height="42" fill="#A09070" rx="0"/>
      {/* Bridge */}
      <rect x="95" y="85" width="40" height="4" fill="#8B7355" rx="2"/>
      <rect x="100" y="85" width="3" height="10" fill="#8B7355"/>
      <rect x="127" y="85" width="3" height="10" fill="#8B7355"/>
      {/* Trees */}
      <circle cx="175" cy="73" r="6" fill="#5B8C6B"/>
      <rect x="174" y="73" width="3" height="8" fill="#8B6F4E"/>
      <circle cx="15" cy="73" r="5" fill="#5B8C6B"/>
      <rect x="14" y="73" width="2" height="7" fill="#8B6F4E"/>
    </svg>
  );
}

export function PixelHeart({ size = 12, color = "#D23F5A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M2 1h2v1h-2zM8 1h2v1h-2zM1 2h1v1h-1zM4 2h1v1h-1zM7 2h1v1h-1zM10 2h1v1h-1zM0 3h1v2h-1zM5 3h2v1h-2zM11 3h1v2h-1zM0 5h1v1h-1zM11 5h1v1h-1zM1 6h1v1h-1zM10 6h1v1h-1zM2 7h1v1h-1zM9 7h1v1h-1zM3 8h1v1h-1zM8 8h1v1h-1zM4 9h1v1h-1zM7 9h1v1h-1zM5 10h2v1h-2z" fill={color}/>
    </svg>
  );
}
