// ============= CHICKEN SVG GRAPHICS =============
// Shared SVG generation code for the Virtual Chicken Game
// Used by both index.html and index-debug.html

const BREED_COLORS = {
  "isa-brown": {
    body: "#8B4513",
    bodyLight: "#A0522D",
    bodyDark: "#5D3A1A",
    wing: "#6B3410",
    wingDark: "#4A2508",
    beak: "#FFA500",
    comb: "#DC143C",
    wattle: "#B22222",
    feet: "#FFA500",
    eye: "#2F1810",
  },
  silkie: {
    body: "#F5F5DC",
    bodyLight: "#FFFAF0",
    bodyDark: "#D2C8B4",
    wing: "#E8E4D0",
    wingDark: "#C8C0A8",
    beak: "#4A4A4A",
    comb: "#8B4789",
    wattle: "#6B3569",
    feet: "#4A4A4A",
    eye: "#2F2F2F",
    fluffy: true,
  },
  leghorn: {
    body: "#FFFFFF",
    bodyLight: "#FFFFFF",
    bodyDark: "#E8E8E8",
    wing: "#F0F0F0",
    wingDark: "#D0D0D0",
    beak: "#FFD700",
    comb: "#FF0000",
    wattle: "#CC0000",
    feet: "#FFD700",
    eye: "#1A1A1A",
  },
  plymouth: {
    body: "#606060",
    bodyLight: "#808080",
    bodyDark: "#404040",
    wing: "#505050",
    wingDark: "#303030",
    beak: "#FFD700",
    comb: "#DC143C",
    wattle: "#B22222",
    feet: "#FFD700",
    eye: "#1A1A1A",
    barred: true,
  },
  orpington: {
    body: "#DAA520",
    bodyLight: "#FFD700",
    bodyDark: "#B8860B",
    wing: "#CD853F",
    wingDark: "#8B6914",
    beak: "#FFA500",
    comb: "#FF4500",
    wattle: "#DC143C",
    feet: "#FFA500",
    eye: "#2F1810",
  },
};

// Generate beautiful SVG chicken graphics
function generateChickenSVG(stage, breedId, decorations = [], health = {}) {
  const colors = BREED_COLORS[breedId] || BREED_COLORS["isa-brown"];
  const isSick = health.isSick;
  const happiness = health.happiness || 70;

  // Get decoration flags
  const hasHeadband = decorations.includes("headband");
  const hasCrown = decorations.includes("crown");
  const hasJumper = decorations.includes("jumper");
  const hasNecklace = decorations.includes("necklace");
  const hasBowtie = decorations.includes("bow-tie");
  const hasCape = decorations.includes("superhero-cape");
  const hasUnicornHorn = decorations.includes("unicorn-horn");
  const hasEyepatch = decorations.includes("eyepatch");
  const hasFascinator = decorations.includes("fascinator-hat");
  const hasDuckDisguise = decorations.includes("duck-disguise");
  const hasPandaMask = decorations.includes("panda-mask");
  const hasSillyEyebrows = decorations.includes("silly-eyebrows");
  const hasAngryEyebrows = decorations.includes("angry-eyebrows");
  const hasCuteFace = decorations.includes("cute-face-kit");

  // Size based on stage
  const sizeMap = {
    egg: 100,
    hatching: 110,
    "chick-week": 115,
    chick: 120,
    pullet: 130,
    pullet2: 140,
    teenager: 150,
    laying: 160,
    adult: 165,
    mature: 170,
  };
  const size = sizeMap[stage] || 150;

  // Egg stage - special rendering
  if (stage === "egg") {
    return generateEggSVG(colors, size);
  }

  // Hatching stage - egg with chick peeking
  if (stage === "hatching") {
    return generateHatchingSVG(colors, size);
  }

  // Baby chick stages
  if (stage === "chick-week" || stage === "chick") {
    return generateChickSVG(colors, size, stage, {
      hasHeadband,
      hasCrown,
      hasCuteFace,
      hasSillyEyebrows,
      hasAngryEyebrows,
      isSick,
      happiness,
    });
  }

  // Grown chicken stages
  return generateGrownChickenSVG(colors, size, stage, {
    hasHeadband,
    hasCrown,
    hasJumper,
    hasNecklace,
    hasBowtie,
    hasCape,
    hasUnicornHorn,
    hasEyepatch,
    hasFascinator,
    hasDuckDisguise,
    hasPandaMask,
    hasSillyEyebrows,
    hasAngryEyebrows,
    hasCuteFace,
    isSick,
    happiness,
  });
}

function generateEggSVG(colors, size) {
  const w = size;
  const h = size * 1.3;
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>
      <linearGradient id="eggGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FFF8DC;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#F5DEB3;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#DEB887;stop-opacity:1" />
      </linearGradient>
      <filter id="eggShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#8B4513" flood-opacity="0.3"/>
      </filter>
      <radialGradient id="eggShine" cx="30%" cy="30%" r="50%">
        <stop offset="0%" style="stop-color:white;stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:white;stop-opacity:0" />
      </radialGradient>
    </defs>
    <!-- Egg shadow -->
    <ellipse cx="${w / 2}" cy="${h - 15}" rx="${w * 0.35}" ry="8" fill="rgba(0,0,0,0.15)"/>
    <!-- Main egg -->
    <ellipse cx="${w / 2}" cy="${h / 2}" rx="${w * 0.38}" ry="${h * 0.42}" fill="url(#eggGrad)" filter="url(#eggShadow)"/>
    <!-- Egg shine -->
    <ellipse cx="${w * 0.38}" cy="${h * 0.35}" rx="${w * 0.15}" ry="${h * 0.18}" fill="url(#eggShine)"/>
    <!-- Cute spots -->
    <circle cx="${w * 0.6}" cy="${h * 0.4}" r="4" fill="#DEB887" opacity="0.5"/>
    <circle cx="${w * 0.55}" cy="${h * 0.55}" r="3" fill="#DEB887" opacity="0.4"/>
    <circle cx="${w * 0.35}" cy="${h * 0.6}" r="3.5" fill="#DEB887" opacity="0.45"/>
  </svg>`;
}

function generateHatchingSVG(colors, size) {
  const w = size * 1.1;
  const h = size * 1.3;
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>
      <linearGradient id="hatchEggGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FFF8DC;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#DEB887;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="hatchChickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.bodyLight};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colors.body};stop-opacity:1" />
      </linearGradient>
    </defs>
    <!-- Egg bottom half -->
    <path d="M ${w * 0.18} ${h * 0.5} Q ${w * 0.15} ${h * 0.75} ${w * 0.3} ${h * 0.85} Q ${w * 0.5} ${h * 0.95} ${w * 0.7} ${h * 0.85} Q ${w * 0.85} ${h * 0.75} ${w * 0.82} ${h * 0.5} Z" fill="url(#hatchEggGrad)" stroke="#D2B48C" stroke-width="1"/>
    <!-- Chick body -->
    <ellipse cx="${w * 0.5}" cy="${h * 0.45}" rx="${w * 0.25}" ry="${h * 0.2}" fill="url(#hatchChickGrad)"/>
    <!-- Chick head -->
    <circle cx="${w * 0.5}" cy="${h * 0.28}" r="${w * 0.18}" fill="url(#hatchChickGrad)"/>
    <!-- Rosy cheeks (Sanrio style) -->
    <ellipse cx="${w * 0.35}" cy="${h * 0.32}" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
    <ellipse cx="${w * 0.65}" cy="${h * 0.32}" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
    <!-- Big cute eyes (Sanrio style) -->
    <ellipse cx="${w * 0.43}" cy="${h * 0.26}" rx="6" ry="7" fill="#1A1A1A"/>
    <ellipse cx="${w * 0.57}" cy="${h * 0.26}" rx="6" ry="7" fill="#1A1A1A"/>
    <!-- Big sparkle highlights -->
    <ellipse cx="${w * 0.41}" cy="${h * 0.24}" rx="3" ry="3.5" fill="white"/>
    <ellipse cx="${w * 0.55}" cy="${h * 0.24}" rx="3" ry="3.5" fill="white"/>
    <!-- Small secondary sparkles -->
    <circle cx="${w * 0.45}" cy="${h * 0.28}" r="1.5" fill="white" opacity="0.8"/>
    <circle cx="${w * 0.59}" cy="${h * 0.28}" r="1.5" fill="white" opacity="0.8"/>
    <!-- Cute small beak -->
    <ellipse cx="${w * 0.5}" cy="${h * 0.34}" rx="5" ry="3" fill="${colors.beak}"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.33}" rx="3" ry="1.5" fill="#FFD700" opacity="0.3"/>
    <!-- Tiny comb -->
    <ellipse cx="${w * 0.5}" cy="${h * 0.14}" rx="5" ry="8" fill="${colors.comb}"/>
    <!-- Egg shell pieces -->
    <path d="M ${w * 0.15} ${h * 0.52} L ${w * 0.22} ${h * 0.35} L ${w * 0.3} ${h * 0.48} Z" fill="#FFF8DC" stroke="#D2B48C" stroke-width="1"/>
    <path d="M ${w * 0.75} ${h * 0.48} L ${w * 0.82} ${h * 0.32} L ${w * 0.88} ${h * 0.5} Z" fill="#FFF8DC" stroke="#D2B48C" stroke-width="1"/>
    <!-- Sparkles -->
    <text x="${w * 0.1}" y="${h * 0.2}" font-size="14">✨</text>
    <text x="${w * 0.8}" y="${h * 0.15}" font-size="12">⭐</text>
  </svg>`;
}

function generateChickSVG(colors, size, stage, opts) {
  const w = size;
  const h = size * 1.1;
  const isWeekOld = stage === "chick-week";
  const fluffiness = colors.fluffy ? 1.3 : 1;
  const uid = Math.random().toString(36).substr(2, 9);

  // Eye expression based on state
  let eyeStyle = "";
  if (opts.isSick) {
    eyeStyle = "swirl";
  } else if (opts.happiness > 70) {
    eyeStyle = "happy";
  }

  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>
      <linearGradient id="chickBodyGrad${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.bodyLight};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colors.body};stop-opacity:1" />
      </linearGradient>
      <filter id="chickFluff${uid}" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <radialGradient id="chickBlush${uid}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#FF91A4;stop-opacity:0.7" />
        <stop offset="100%" style="stop-color:#FFB6C1;stop-opacity:0" />
      </radialGradient>
      <!-- Sanrio-style eye sparkle gradient -->
      <radialGradient id="eyeSparkle${uid}" cx="30%" cy="30%" r="60%">
        <stop offset="0%" style="stop-color:white;stop-opacity:1" />
        <stop offset="100%" style="stop-color:white;stop-opacity:0" />
      </radialGradient>
    </defs>

    <!-- Shadow -->
    <ellipse cx="${w / 2}" cy="${h - 10}" rx="${w * 0.3}" ry="6" fill="rgba(0,0,0,0.15)"/>

    <!-- Tiny feet -->
    <path d="M ${w * 0.38} ${h * 0.88} L ${w * 0.32} ${h * 0.95} M ${w * 0.38} ${h * 0.88} L ${w * 0.38} ${h * 0.96} M ${w * 0.38} ${h * 0.88} L ${w * 0.44} ${h * 0.95}" stroke="${colors.feet}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M ${w * 0.62} ${h * 0.88} L ${w * 0.56} ${h * 0.95} M ${w * 0.62} ${h * 0.88} L ${w * 0.62} ${h * 0.96} M ${w * 0.62} ${h * 0.88} L ${w * 0.68} ${h * 0.95}" stroke="${colors.feet}" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Body - fluffy ball -->
    <ellipse cx="${w / 2}" cy="${h * 0.65}" rx="${w * 0.32 * fluffiness}" ry="${h * 0.25 * fluffiness}" fill="url(#chickBodyGrad${uid})" ${colors.fluffy ? `filter="url(#chickFluff${uid})"` : ""}/>

    <!-- Tiny wing -->
    <ellipse cx="${w * 0.35}" cy="${h * 0.65}" rx="${w * 0.12}" ry="${h * 0.12}" fill="${colors.wing}" transform="rotate(-15 ${w * 0.35} ${h * 0.65})"/>

    <!-- Head -->
    <circle cx="${w / 2}" cy="${h * 0.35}" r="${w * 0.26 * fluffiness}" fill="url(#chickBodyGrad${uid})" ${colors.fluffy ? `filter="url(#chickFluff${uid})"` : ""}/>

    <!-- Sanrio-style rosy cheeks (always visible) -->
    <ellipse cx="${w * 0.3}" cy="${h * 0.4}" rx="9" ry="6" fill="url(#chickBlush${uid})"/>
    <ellipse cx="${w * 0.7}" cy="${h * 0.4}" rx="9" ry="6" fill="url(#chickBlush${uid})"/>
    ${opts.hasCuteFace ? `
    <!-- Extra sparkle marks for cute face -->
    <text x="${w * 0.22}" y="${h * 0.28}" font-size="8" opacity="0.7">✦</text>
    <text x="${w * 0.72}" y="${h * 0.28}" font-size="8" opacity="0.7">✦</text>
    ` : ""}

    <!-- Eyes (Sanrio kawaii style) -->
    ${eyeStyle === "happy" ? `
    <!-- Happy curved eyes (∪ shape) -->
    <path d="M ${w * 0.36} ${h * 0.34} Q ${w * 0.42} ${h * 0.28} ${w * 0.48} ${h * 0.34}" stroke="#1A1A1A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M ${w * 0.52} ${h * 0.34} Q ${w * 0.58} ${h * 0.28} ${w * 0.64} ${h * 0.34}" stroke="#1A1A1A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <!-- Tiny sparkles above happy eyes -->
    <circle cx="${w * 0.38}" cy="${h * 0.27}" r="2" fill="white"/>
    <circle cx="${w * 0.62}" cy="${h * 0.27}" r="2" fill="white"/>
    ` : eyeStyle === "swirl" ? `
    <!-- Sick swirly eyes -->
    <circle cx="${w * 0.42}" cy="${h * 0.32}" r="7" fill="none" stroke="#1A1A1A" stroke-width="2"/>
    <path d="M ${w * 0.42} ${h * 0.32} m -4,0 a 4,4 0 1,1 4,-4" fill="none" stroke="#1A1A1A" stroke-width="1.5"/>
    <circle cx="${w * 0.58}" cy="${h * 0.32}" r="7" fill="none" stroke="#1A1A1A" stroke-width="2"/>
    <path d="M ${w * 0.58} ${h * 0.32} m -4,0 a 4,4 0 1,1 4,-4" fill="none" stroke="#1A1A1A" stroke-width="1.5"/>
    ` : `
    <!-- Big round Sanrio-style eyes -->
    <ellipse cx="${w * 0.42}" cy="${h * 0.32}" rx="8" ry="9" fill="#1A1A1A"/>
    <ellipse cx="${w * 0.58}" cy="${h * 0.32}" rx="8" ry="9" fill="#1A1A1A"/>
    <!-- Large primary sparkle -->
    <ellipse cx="${w * 0.40}" cy="${h * 0.30}" rx="3.5" ry="4" fill="white"/>
    <ellipse cx="${w * 0.56}" cy="${h * 0.30}" rx="3.5" ry="4" fill="white"/>
    <!-- Secondary smaller sparkle -->
    <circle cx="${w * 0.44}" cy="${h * 0.35}" r="2" fill="white" opacity="0.7"/>
    <circle cx="${w * 0.60}" cy="${h * 0.35}" r="2" fill="white" opacity="0.7"/>
    `}

    ${opts.hasSillyEyebrows ? `
    <!-- Silly wavy eyebrows -->
    <path d="M ${w * 0.35} ${h * 0.24} Q ${w * 0.4} ${h * 0.2} ${w * 0.45} ${h * 0.24}" stroke="#4A3728" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M ${w * 0.55} ${h * 0.24} Q ${w * 0.6} ${h * 0.2} ${w * 0.65} ${h * 0.24}" stroke="#4A3728" stroke-width="3" fill="none" stroke-linecap="round"/>
    ` : ""}

    ${opts.hasAngryEyebrows ? `
    <!-- Angry V eyebrows -->
    <line x1="${w * 0.33}" y1="${h * 0.26}" x2="${w * 0.46}" y2="${h * 0.22}" stroke="#4A3728" stroke-width="3" stroke-linecap="round"/>
    <line x1="${w * 0.67}" y1="${h * 0.26}" x2="${w * 0.54}" y2="${h * 0.22}" stroke="#4A3728" stroke-width="3" stroke-linecap="round"/>
    ` : ""}

    <!-- Cute small beak -->
    <ellipse cx="${w * 0.5}" cy="${h * 0.44}" rx="6" ry="4" fill="${colors.beak}"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.43}" rx="4" ry="2" fill="#FFE4B5" opacity="0.4"/>

    <!-- Tiny comb -->
    <ellipse cx="${w * 0.5}" cy="${h * 0.12}" rx="5" ry="${isWeekOld ? 6 : 8}" fill="${colors.comb}"/>

    ${opts.hasHeadband ? `
    <!-- Flower headband -->
    <ellipse cx="${w * 0.5}" cy="${h * 0.15}" rx="${w * 0.28}" ry="3" fill="#90EE90" transform="rotate(-5 ${w * 0.5} ${h * 0.15})"/>
    <circle cx="${w * 0.35}" cy="${h * 0.14}" r="7" fill="#FF69B4"/>
    <circle cx="${w * 0.5}" cy="${h * 0.12}" r="8" fill="#FFB6C1"/>
    <circle cx="${w * 0.65}" cy="${h * 0.14}" r="7" fill="#FF69B4"/>
    <circle cx="${w * 0.35}" cy="${h * 0.14}" r="3" fill="#FFD700"/>
    <circle cx="${w * 0.5}" cy="${h * 0.12}" r="3.5" fill="#FFD700"/>
    <circle cx="${w * 0.65}" cy="${h * 0.14}" r="3" fill="#FFD700"/>
    ` : ""}

    ${opts.hasCrown ? `
    <!-- Royal crown -->
    <polygon points="${w * 0.32},${h * 0.12} ${w * 0.38},${h * 0.02} ${w * 0.44},${h * 0.1} ${w * 0.5},${h * 0.0} ${w * 0.56},${h * 0.1} ${w * 0.62},${h * 0.02} ${w * 0.68},${h * 0.12}" fill="#FFD700" stroke="#DAA520" stroke-width="1"/>
    <circle cx="${w * 0.5}" cy="${h * 0.08}" r="3" fill="#FF0000"/>
    <circle cx="${w * 0.38}" cy="${h * 0.07}" r="2" fill="#00BFFF"/>
    <circle cx="${w * 0.62}" cy="${h * 0.07}" r="2" fill="#00BFFF"/>
    ` : ""}
  </svg>`;
}

function generateGrownChickenSVG(colors, size, stage, opts) {
  const w = size;
  const h = size * 1.2;
  const fluffiness = colors.fluffy ? 1.15 : 1;
  const isLayingOrOlder = ["laying", "adult", "mature"].includes(stage);
  const isMature = stage === "mature";
  const uid = Math.random().toString(36).substr(2, 9);

  // Size scaling based on age
  const ageScale = {
    pullet: 0.85,
    pullet2: 0.9,
    teenager: 0.95,
    laying: 1.0,
    adult: 1.02,
    mature: 1.05,
  }[stage] || 1;

  // Eye expression based on state
  let eyeStyle = "";
  if (opts.isSick) {
    eyeStyle = "sick";
  } else if (opts.happiness > 70) {
    eyeStyle = "happy";
  }

  // Barred pattern for Plymouth Rock
  const barredPattern = colors.barred ? `
    <pattern id="barred${uid}" patternUnits="userSpaceOnUse" width="8" height="8">
      <rect width="8" height="4" fill="${colors.body}"/>
      <rect y="4" width="8" height="4" fill="${colors.bodyDark}"/>
    </pattern>
  ` : "";

  const bodyFill = colors.barred ? `url(#barred${uid})` : `url(#bodyGrad${uid})`;

  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>
      <linearGradient id="bodyGrad${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.bodyLight};stop-opacity:1" />
        <stop offset="50%" style="stop-color:${colors.body};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colors.bodyDark};stop-opacity:1" />
      </linearGradient>
      <linearGradient id="wingGrad${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.wing};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colors.wingDark};stop-opacity:1" />
      </linearGradient>
      <radialGradient id="blush${uid}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#FF91A4;stop-opacity:0.65" />
        <stop offset="100%" style="stop-color:#FFB6C1;stop-opacity:0" />
      </radialGradient>
      <!-- Sanrio-style eye gradient for depth -->
      <radialGradient id="eyeGrad${uid}" cx="40%" cy="35%" r="60%">
        <stop offset="0%" style="stop-color:#3A3A3A;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1A1A1A;stop-opacity:1" />
      </radialGradient>
      <filter id="fluff${uid}" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      ${barredPattern}
    </defs>

    <!-- Ground shadow -->
    <ellipse cx="${w / 2}" cy="${h - 8}" rx="${w * 0.35 * ageScale}" ry="8" fill="rgba(0,0,0,0.15)"/>

    ${opts.hasCape ? `
    <!-- Superhero cape -->
    <path d="M ${w * 0.3} ${h * 0.35} Q ${w * 0.2} ${h * 0.5} ${w * 0.15} ${h * 0.85} L ${w * 0.35} ${h * 0.75} Q ${w * 0.4} ${h * 0.6} ${w * 0.45} ${h * 0.45}" fill="#DC143C" opacity="0.9"/>
    <path d="M ${w * 0.7} ${h * 0.35} Q ${w * 0.8} ${h * 0.5} ${w * 0.85} ${h * 0.85} L ${w * 0.65} ${h * 0.75} Q ${w * 0.6} ${h * 0.6} ${w * 0.55} ${h * 0.45}" fill="#DC143C" opacity="0.9"/>
    ` : ""}

    <!-- Feet -->
    <g stroke="${colors.feet}" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M ${w * 0.38} ${h * 0.85} L ${w * 0.3} ${h * 0.95} M ${w * 0.38} ${h * 0.85} L ${w * 0.38} ${h * 0.97} M ${w * 0.38} ${h * 0.85} L ${w * 0.46} ${h * 0.95}"/>
      <path d="M ${w * 0.62} ${h * 0.85} L ${w * 0.54} ${h * 0.95} M ${w * 0.62} ${h * 0.85} L ${w * 0.62} ${h * 0.97} M ${w * 0.62} ${h * 0.85} L ${w * 0.7} ${h * 0.95}"/>
    </g>

    <!-- Tail feathers -->
    <g fill="url(#wingGrad${uid})">
      <ellipse cx="${w * 0.22}" cy="${h * 0.52}" rx="${w * 0.08}" ry="${h * 0.15}" transform="rotate(-30 ${w * 0.22} ${h * 0.52})"/>
      <ellipse cx="${w * 0.18}" cy="${h * 0.48}" rx="${w * 0.06}" ry="${h * 0.12}" transform="rotate(-45 ${w * 0.18} ${h * 0.48})"/>
      <ellipse cx="${w * 0.25}" cy="${h * 0.55}" rx="${w * 0.07}" ry="${h * 0.13}" transform="rotate(-20 ${w * 0.25} ${h * 0.55})"/>
    </g>

    <!-- Body -->
    <ellipse cx="${w * 0.52}" cy="${h * 0.62}" rx="${w * 0.32 * ageScale * fluffiness}" ry="${h * 0.22 * ageScale * fluffiness}" fill="${bodyFill}" ${colors.fluffy ? `filter="url(#fluff${uid})"` : ""}/>

    ${opts.hasJumper ? `
    <!-- Cozy jumper/sweater -->
    <ellipse cx="${w * 0.52}" cy="${h * 0.62}" rx="${w * 0.33 * ageScale}" ry="${h * 0.23 * ageScale}" fill="none" stroke="#FF6B6B" stroke-width="4"/>
    <path d="M ${w * 0.35} ${h * 0.5} Q ${w * 0.52} ${h * 0.45} ${w * 0.69} ${h * 0.5}" stroke="#FF6B6B" stroke-width="6" fill="none"/>
    <line x1="${w * 0.4}" y1="${h * 0.55}" x2="${w * 0.4}" y2="${h * 0.7}" stroke="#FFE4E1" stroke-width="2"/>
    <line x1="${w * 0.5}" y1="${h * 0.53}" x2="${w * 0.5}" y2="${h * 0.72}" stroke="#FFE4E1" stroke-width="2"/>
    <line x1="${w * 0.6}" y1="${h * 0.55}" x2="${w * 0.6}" y2="${h * 0.7}" stroke="#FFE4E1" stroke-width="2"/>
    ` : ""}

    <!-- Wing -->
    <ellipse cx="${w * 0.38}" cy="${h * 0.6}" rx="${w * 0.14 * ageScale}" ry="${h * 0.14 * ageScale}" fill="url(#wingGrad${uid})" transform="rotate(-10 ${w * 0.38} ${h * 0.6})" ${colors.fluffy ? `filter="url(#fluff${uid})"` : ""}/>

    <!-- Neck -->
    <ellipse cx="${w * 0.62}" cy="${h * 0.42}" rx="${w * 0.12 * fluffiness}" ry="${h * 0.1 * fluffiness}" fill="${bodyFill}"/>

    <!-- Head -->
    <ellipse cx="${w * 0.65}" cy="${h * 0.28}" rx="${w * 0.18 * fluffiness}" ry="${h * 0.14 * fluffiness}" fill="${bodyFill}" ${colors.fluffy ? `filter="url(#fluff${uid})"` : ""}/>

    <!-- Sanrio-style rosy cheeks (always visible) -->
    ${!opts.hasPandaMask ? `
    <ellipse cx="${w * 0.54}" cy="${h * 0.32}" rx="7" ry="5" fill="url(#blush${uid})"/>
    <ellipse cx="${w * 0.76}" cy="${h * 0.32}" rx="7" ry="5" fill="url(#blush${uid})"/>
    ` : ""}
    ${opts.hasCuteFace && !opts.hasPandaMask ? `
    <!-- Extra kawaii sparkles for cute face -->
    <text x="${w * 0.48}" y="${h * 0.2}" font-size="7" opacity="0.6">✦</text>
    <text x="${w * 0.78}" y="${h * 0.2}" font-size="7" opacity="0.6">✦</text>
    ` : ""}

    ${opts.hasPandaMask ? `
    <!-- Panda face mask -->
    <ellipse cx="${w * 0.65}" cy="${h * 0.28}" rx="${w * 0.19}" ry="${h * 0.15}" fill="white"/>
    <ellipse cx="${w * 0.58}" cy="${h * 0.25}" rx="${w * 0.07}" ry="${h * 0.06}" fill="black"/>
    <ellipse cx="${w * 0.72}" cy="${h * 0.25}" rx="${w * 0.07}" ry="${h * 0.06}" fill="black"/>
    <!-- Kawaii panda sparkles -->
    <ellipse cx="${w * 0.56}" cy="${h * 0.24}" rx="3" ry="3.5" fill="white"/>
    <ellipse cx="${w * 0.70}" cy="${h * 0.24}" rx="3" ry="3.5" fill="white"/>
    <circle cx="${w * 0.60}" cy="${h * 0.27}" r="1.5" fill="white" opacity="0.6"/>
    <circle cx="${w * 0.74}" cy="${h * 0.27}" r="1.5" fill="white" opacity="0.6"/>
    <ellipse cx="${w * 0.65}" cy="${h * 0.33}" rx="4" ry="3" fill="black"/>
    <!-- Panda blush -->
    <ellipse cx="${w * 0.52}" cy="${h * 0.30}" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>
    <ellipse cx="${w * 0.78}" cy="${h * 0.30}" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>
    ` : opts.hasDuckDisguise ? `
    <!-- Duck disguise -->
    <ellipse cx="${w * 0.75}" cy="${h * 0.3}" rx="${w * 0.12}" ry="${h * 0.06}" fill="#FFA500"/>
    ` : `
    <!-- Cute rounded beak -->
    <ellipse cx="${w * 0.78}" cy="${h * 0.29}" rx="6" ry="4" fill="${colors.beak}"/>
    <ellipse cx="${w * 0.77}" cy="${h * 0.28}" rx="4" ry="2" fill="#FFE4B5" opacity="0.3"/>
    `}

    <!-- Eyes (Sanrio kawaii style) -->
    ${opts.hasPandaMask ? "" : eyeStyle === "happy" ? `
    <!-- Happy curved eyes (∪ shape) -->
    <path d="M ${w * 0.55} ${h * 0.27} Q ${w * 0.60} ${h * 0.21} ${w * 0.65} ${h * 0.27}" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M ${w * 0.66} ${h * 0.27} Q ${w * 0.71} ${h * 0.21} ${w * 0.76} ${h * 0.27}" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Tiny sparkles above happy eyes -->
    <circle cx="${w * 0.57}" cy="${h * 0.20}" r="2" fill="white" opacity="0.8"/>
    <circle cx="${w * 0.73}" cy="${h * 0.20}" r="2" fill="white" opacity="0.8"/>
    ` : eyeStyle === "sick" ? `
    <!-- Sick spiral eyes -->
    <g fill="none" stroke="${colors.eye}" stroke-width="1.5">
      <circle cx="${w * 0.6}" cy="${h * 0.25}" r="6"/>
      <path d="M ${w * 0.6} ${h * 0.25} m -3.5,0 a 3.5,3.5 0 1,1 3.5,-3.5" stroke-width="1.2"/>
      <circle cx="${w * 0.71}" cy="${h * 0.25}" r="6"/>
      <path d="M ${w * 0.71} ${h * 0.25} m -3.5,0 a 3.5,3.5 0 1,1 3.5,-3.5" stroke-width="1.2"/>
    </g>
    ` : `
    <!-- Big round Sanrio-style eyes -->
    <ellipse cx="${w * 0.60}" cy="${h * 0.25}" rx="6" ry="7" fill="url(#eyeGrad${uid})"/>
    <ellipse cx="${w * 0.71}" cy="${h * 0.25}" rx="6" ry="7" fill="url(#eyeGrad${uid})"/>
    <!-- Large primary sparkle -->
    <ellipse cx="${w * 0.58}" cy="${h * 0.23}" rx="3" ry="3.5" fill="white"/>
    <ellipse cx="${w * 0.69}" cy="${h * 0.23}" rx="3" ry="3.5" fill="white"/>
    <!-- Secondary smaller sparkle -->
    <circle cx="${w * 0.62}" cy="${h * 0.27}" r="1.5" fill="white" opacity="0.7"/>
    <circle cx="${w * 0.73}" cy="${h * 0.27}" r="1.5" fill="white" opacity="0.7"/>
    `}

    ${opts.hasEyepatch ? `
    <!-- Pirate eye patch -->
    <ellipse cx="${w * 0.6}" cy="${h * 0.25}" rx="7" ry="6" fill="#1A1A1A"/>
    <line x1="${w * 0.53}" y1="${h * 0.22}" x2="${w * 0.75}" y2="${h * 0.15}" stroke="#1A1A1A" stroke-width="2"/>
    ` : ""}

    ${opts.hasSillyEyebrows && !opts.hasPandaMask ? `
    <!-- Silly wavy eyebrows -->
    <path d="M ${w * 0.54} ${h * 0.19} Q ${w * 0.58} ${h * 0.15} ${w * 0.64} ${h * 0.19}" stroke="#5D4037" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M ${w * 0.66} ${h * 0.19} Q ${w * 0.7} ${h * 0.15} ${w * 0.76} ${h * 0.19}" stroke="#5D4037" stroke-width="3" fill="none" stroke-linecap="round"/>
    ` : ""}

    ${opts.hasAngryEyebrows && !opts.hasPandaMask ? `
    <!-- Angry V eyebrows -->
    <line x1="${w * 0.52}" y1="${h * 0.21}" x2="${w * 0.64}" y2="${h * 0.17}" stroke="#5D4037" stroke-width="3" stroke-linecap="round"/>
    <line x1="${w * 0.78}" y1="${h * 0.21}" x2="${w * 0.67}" y2="${h * 0.17}" stroke="#5D4037" stroke-width="3" stroke-linecap="round"/>
    ` : ""}

    <!-- Comb -->
    <g fill="${colors.comb}">
      ${isLayingOrOlder ? `
      <!-- Larger comb for adult -->
      <ellipse cx="${w * 0.62}" cy="${h * 0.13}" rx="6" ry="10"/>
      <ellipse cx="${w * 0.68}" cy="${h * 0.11}" rx="5" ry="12"/>
      <ellipse cx="${w * 0.74}" cy="${h * 0.14}" rx="5" ry="9"/>
      ` : `
      <!-- Smaller comb for younger -->
      <ellipse cx="${w * 0.64}" cy="${h * 0.15}" rx="4" ry="7"/>
      <ellipse cx="${w * 0.69}" cy="${h * 0.14}" rx="4" ry="8"/>
      `}
    </g>

    <!-- Wattle -->
    <ellipse cx="${w * 0.7}" cy="${h * 0.36}" rx="4" ry="${isLayingOrOlder ? 8 : 5}" fill="${colors.wattle}"/>

    ${opts.hasHeadband ? `
    <!-- Flower headband -->
    <ellipse cx="${w * 0.65}" cy="${h * 0.17}" rx="${w * 0.2}" ry="3" fill="#90EE90" transform="rotate(-10 ${w * 0.65} ${h * 0.17})"/>
    <circle cx="${w * 0.52}" cy="${h * 0.18}" r="7" fill="#FF69B4"/>
    <circle cx="${w * 0.65}" cy="${h * 0.15}" r="8" fill="#FFB6C1"/>
    <circle cx="${w * 0.78}" cy="${h * 0.18}" r="7" fill="#FF1493"/>
    <circle cx="${w * 0.52}" cy="${h * 0.18}" r="3" fill="#FFD700"/>
    <circle cx="${w * 0.65}" cy="${h * 0.15}" r="3.5" fill="#FFD700"/>
    <circle cx="${w * 0.78}" cy="${h * 0.18}" r="3" fill="#FFD700"/>
    ` : ""}

    ${opts.hasFascinator ? `
    <!-- Fancy fascinator hat -->
    <ellipse cx="${w * 0.65}" cy="${h * 0.12}" rx="${w * 0.15}" ry="4" fill="#4B0082"/>
    <circle cx="${w * 0.65}" cy="${h * 0.08}" r="8" fill="#8B008B"/>
    <path d="M ${w * 0.6} ${h * 0.02} Q ${w * 0.55} ${h * -0.02} ${w * 0.5} ${h * 0.05}" stroke="#FF69B4" stroke-width="2" fill="none"/>
    <path d="M ${w * 0.7} ${h * 0.02} Q ${w * 0.75} ${h * -0.02} ${w * 0.8} ${h * 0.05}" stroke="#FF69B4" stroke-width="2" fill="none"/>
    <circle cx="${w * 0.65}" cy="${h * 0.04}" r="3" fill="#FFD700"/>
    ` : ""}

    ${opts.hasCrown ? `
    <!-- Royal crown -->
    <polygon points="${w * 0.5},${h * 0.12} ${w * 0.54},${h * 0.02} ${w * 0.58},${h * 0.1} ${w * 0.65},${h * -0.02} ${w * 0.72},${h * 0.1} ${w * 0.76},${h * 0.02} ${w * 0.8},${h * 0.12}" fill="#FFD700" stroke="#DAA520" stroke-width="1.5"/>
    <rect x="${w * 0.5}" y="${h * 0.12}" width="${w * 0.3}" height="5" fill="#FFD700" stroke="#DAA520" stroke-width="1"/>
    <circle cx="${w * 0.65}" cy="${h * 0.07}" r="4" fill="#FF0000"/>
    <circle cx="${w * 0.54}" cy="${h * 0.06}" r="2.5" fill="#00BFFF"/>
    <circle cx="${w * 0.76}" cy="${h * 0.06}" r="2.5" fill="#00FF00"/>
    ` : ""}

    ${opts.hasUnicornHorn ? `
    <!-- Magical unicorn horn -->
    <defs>
      <linearGradient id="hornGrad${uid}" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style="stop-color:#FFB6C1"/>
        <stop offset="33%" style="stop-color:#DDA0DD"/>
        <stop offset="66%" style="stop-color:#87CEEB"/>
        <stop offset="100%" style="stop-color:#FFFFFF"/>
      </linearGradient>
    </defs>
    <polygon points="${w * 0.65},${h * -0.05} ${w * 0.6},${h * 0.12} ${w * 0.7},${h * 0.12}" fill="url(#hornGrad${uid})" stroke="#FFD700" stroke-width="1"/>
    <!-- Sparkles around horn -->
    <text x="${w * 0.52}" y="${h * 0.05}" font-size="10" fill="#FFD700">✨</text>
    <text x="${w * 0.75}" y="${h * 0.02}" font-size="8" fill="#FF69B4">⭐</text>
    ` : ""}

    ${opts.hasNecklace ? `
    <!-- Pearl necklace -->
    <g fill="#FFF8DC" stroke="#DAA520" stroke-width="0.5">
      <circle cx="${w * 0.52}" cy="${h * 0.42}" r="3"/>
      <circle cx="${w * 0.57}" cy="${h * 0.44}" r="3.5"/>
      <circle cx="${w * 0.63}" cy="${h * 0.45}" r="4"/>
      <circle cx="${w * 0.69}" cy="${h * 0.44}" r="3.5"/>
      <circle cx="${w * 0.74}" cy="${h * 0.42}" r="3"/>
    </g>
    ` : ""}

    ${opts.hasBowtie ? `
    <!-- Fancy bow tie -->
    <g transform="translate(${w * 0.58}, ${h * 0.42})">
      <polygon points="-12,-6 0,0 -12,6" fill="#FF1493"/>
      <polygon points="12,-6 0,0 12,6" fill="#FF1493"/>
      <circle cx="0" cy="0" r="4" fill="#FFD700"/>
    </g>
    ` : ""}

    ${isMature ? `
    <!-- Mature chicken star/trophy indicator -->
    <text x="${w * 0.85}" y="${h * 0.2}" font-size="16">🏆</text>
    ` : ""}

    ${stage === "laying" ? `
    <!-- Egg for laying hen -->
    <ellipse cx="${w * 0.25}" cy="${h * 0.82}" rx="10" ry="13" fill="#FFF8DC" stroke="#DEB887" stroke-width="1"/>
    ` : ""}
  </svg>`;
}
