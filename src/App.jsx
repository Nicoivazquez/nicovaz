import { useState, useEffect, useRef } from "react";

// ── Decorative SVG pieces ────────────────────────────────────────────────────

function CompassRose({ size = 64, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
      {/* Outer ring */}
      <circle cx="50" cy="50" r="46" stroke="#D4A843" strokeWidth="1" opacity="0.4" />
      <circle cx="50" cy="50" r="38" stroke="#D4A843" strokeWidth="0.5" opacity="0.25" />
      {/* Cardinal points */}
      <path d="M50 4 L55 46 L50 50 L45 46 Z" fill="#D4A843" opacity="0.9" />
      <path d="M50 96 L55 54 L50 50 L45 54 Z" fill="#D4A843" opacity="0.5" />
      <path d="M4 50 L46 45 L50 50 L46 55 Z" fill="#D4A843" opacity="0.5" />
      <path d="M96 50 L54 45 L50 50 L54 55 Z" fill="#D4A843" opacity="0.9" />
      {/* Intercardinal */}
      <path d="M50 50 L22 22 L26 30 L30 26 Z" fill="#D4A843" opacity="0.25" />
      <path d="M50 50 L78 22 L74 30 L70 26 Z" fill="#D4A843" opacity="0.25" />
      <path d="M50 50 L22 78 L30 74 L26 70 Z" fill="#D4A843" opacity="0.25" />
      <path d="M50 50 L78 78 L74 70 L70 74 Z" fill="#D4A843" opacity="0.25" />
      {/* Center dot */}
      <circle cx="50" cy="50" r="4" fill="#D4A843" opacity="0.8" />
      <circle cx="50" cy="50" r="2" fill="#EDE0CC" />
      {/* N label */}
      <text x="50" y="18" textAnchor="middle" fill="#D4A843" fontSize="8" fontFamily="Playfair Display, serif" fontWeight="700" opacity="0.9">N</text>
    </svg>
  );
}

function AlchemicalDivider() {
  return (
    <div className="flex items-center gap-3 my-6 opacity-40">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#704214]" />
      <span className="text-[#D4A843] text-xs">✦</span>
      <span className="text-[#704214] text-xs">◈</span>
      <span className="text-[#D4A843] text-xs">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#704214]" />
    </div>
  );
}

function CartoucheLabel({ children, className = "" }) {
  return (
    <div className={`relative inline-flex items-center px-4 py-1 ${className}`}>
      <div className="absolute inset-0 border border-[#D4A843]/40 rounded-sm"
        style={{ borderRadius: "40% 10% 40% 10% / 10% 40% 10% 40%" }} />
      <span className="relative text-[#D4A843] text-xs font-medium tracking-widest uppercase"
        style={{ fontFamily: "Inter, sans-serif" }}>
        {children}
      </span>
    </div>
  );
}

function GoldenMotes() {
  const motes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    delay: `${Math.random() * 6}s`,
    duration: `${5 + Math.random() * 6}s`,
    size: `${2 + Math.random() * 3}px`,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {motes.map(m => (
        <div
          key={m.id}
          className="absolute rounded-full bg-[#D4A843]"
          style={{
            left: m.left,
            bottom: "-10px",
            width: m.size,
            height: m.size,
            opacity: 0,
            animation: `float-mote ${m.duration} ${m.delay} infinite ease-out`,
          }}
        />
      ))}
    </div>
  );
}

// ── Travel map ───────────────────────────────────────────────────────────────

function TravelMap() {
  const stops = [
    { city: "Bali", months: "Jan – Mar", x: 810, y: 275, lx: 0, ly: 30, anchor: "middle", current: true },
    { city: "Madrid", months: "Apr – May", x: 490, y: 120, lx: -15, ly: -18, anchor: "end" },
    { city: "???", months: "Jun", x: 570, y: 140, lx: 18, ly: 5, anchor: "start", undecided: true },
    { city: "Portugal", months: "Jul – Aug", x: 450, y: 155, lx: -18, ly: 18, anchor: "end" },
    { city: "USA", months: "Sep – Oct", x: 185, y: 130, lx: 0, ly: -18, anchor: "middle" },
    { city: "Argentina", months: "Nov →", x: 330, y: 370, lx: 0, ly: 30, anchor: "middle" },
  ];

  const routePath = "M 810 275 Q 650 140 490 120 Q 530 108 570 140 Q 510 125 450 155 Q 320 55 185 130 Q 220 250 330 370";

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-[#EDE0CC]"
          style={{ fontFamily: "Playfair Display, serif" }}>
          Expedition Log
        </h3>
      </div>

      <div className="relative rounded-sm overflow-hidden border border-[#704214]/30"
        style={{ background: "rgba(44,24,16,0.2)" }}>
        <svg viewBox="0 0 1000 450" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          {/* Meridian & parallel grid */}
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="450"
              stroke="#704214" strokeWidth="0.5" opacity="0.08" />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={(i + 1) * 90} x2="1000" y2={(i + 1) * 90}
              stroke="#704214" strokeWidth="0.5" opacity="0.08" />
          ))}

          {/* Continent silhouettes — faint, hand-drawn feel */}
          {/* Europe */}
          <path d="M435 88 L475 80 L520 86 L555 100 L575 118 L565 138 L545 148 L520 142 L495 138 L475 142 L455 152 L435 148 L418 135 L410 115 L420 98Z"
            fill="#704214" opacity="0.07" />
          {/* Africa */}
          <path d="M430 162 L465 155 L510 160 L540 178 L548 215 L540 270 L522 325 L498 365 L472 385 L450 370 L438 325 L428 265 L425 208Z"
            fill="#704214" opacity="0.05" />
          {/* SE Asia */}
          <path d="M705 168 L738 160 L768 170 L788 188 L800 212 L792 232 L772 248 L752 255 L732 248 L718 232 L710 208 L706 188Z"
            fill="#704214" opacity="0.06" />
          {/* Bali */}
          <path d="M795 260 L815 255 L825 265 L818 278 L800 275Z"
            fill="#704214" opacity="0.08" />
          {/* North America */}
          <path d="M95 58 L155 50 L222 65 L278 80 L298 102 L278 128 L258 150 L238 170 L218 182 L198 168 L168 150 L138 130 L118 102 L98 80Z"
            fill="#704214" opacity="0.06" />
          {/* South America */}
          <path d="M258 252 L292 240 L322 250 L342 280 L352 322 L342 362 L322 392 L302 410 L282 400 L262 372 L252 332 L245 292 L250 265Z"
            fill="#704214" opacity="0.06" />

          {/* Ocean labels */}
          <text x="345" y="255" textAnchor="middle" fill="#704214" fontSize="11" opacity="0.15"
            fontFamily="Playfair Display, serif" fontStyle="italic" letterSpacing="8">ATLANTIC</text>
          <text x="110" y="330" textAnchor="middle" fill="#704214" fontSize="10" opacity="0.12"
            fontFamily="Playfair Display, serif" fontStyle="italic" letterSpacing="6">PACIFIC</text>
          <text x="660" y="350" textAnchor="middle" fill="#704214" fontSize="10" opacity="0.12"
            fontFamily="Playfair Display, serif" fontStyle="italic" letterSpacing="6">INDIAN OCEAN</text>

          {/* Route glow */}
          <path d={routePath} fill="none" stroke="#D4A843" strokeWidth="4" opacity="0.06" />
          {/* Route dashed line */}
          <path d={routePath} fill="none" stroke="#D4A843" strokeWidth="1.5"
            strokeDasharray="8 4" opacity="0.5" />

          {/* Stop markers and labels */}
          {stops.map((s, i) => (
            <g key={s.city}>
              <circle cx={s.x} cy={s.y} r="8" fill="none" stroke="#D4A843"
                strokeWidth="1" opacity={s.current ? "0.7" : "0.3"} />
              <circle cx={s.x} cy={s.y} r="4"
                fill={s.undecided ? "none" : "#D4A843"}
                stroke={s.undecided ? "#D4A843" : "none"}
                strokeWidth={s.undecided ? "1" : "0"}
                strokeDasharray={s.undecided ? "2 2" : "none"}
                opacity={s.current ? "1" : "0.6"} />
              {s.current && (
                <circle cx={s.x} cy={s.y} r="14" fill="none" stroke="#D4A843"
                  strokeWidth="1" opacity="0.4"
                  style={{ animation: "breathe 3s infinite" }} />
              )}
              <text x={s.x + s.lx} y={s.y + s.ly}
                textAnchor={s.anchor} fill={s.undecided ? "#8B9DAF" : "#EDE0CC"}
                fontSize="13" fontFamily="Playfair Display, serif" fontWeight="600"
                fontStyle={s.undecided ? "italic" : "normal"}>
                {s.city}
              </text>
              <text x={s.x + s.lx} y={s.y + s.ly + 14}
                textAnchor={s.anchor} fill="#D4A843" fontSize="9"
                fontFamily="Inter, sans-serif" opacity="0.6">
                {s.months}
              </text>
            </g>
          ))}

          {/* Compass rose */}
          <g transform="translate(910, 380) scale(0.45)" opacity="0.35">
            <circle cx="50" cy="50" r="46" stroke="#D4A843" strokeWidth="1" />
            <path d="M50 4 L55 46 L50 50 L45 46Z" fill="#D4A843" opacity="0.9" />
            <path d="M50 96 L55 54 L50 50 L45 54Z" fill="#D4A843" opacity="0.4" />
            <path d="M4 50 L46 45 L50 50 L46 55Z" fill="#D4A843" opacity="0.4" />
            <path d="M96 50 L54 45 L50 50 L54 55Z" fill="#D4A843" opacity="0.9" />
            <circle cx="50" cy="50" r="3" fill="#D4A843" />
            <text x="50" y="18" textAnchor="middle" fill="#D4A843" fontSize="10"
              fontFamily="Playfair Display, serif" fontWeight="700">N</text>
          </g>
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-6 py-3 border-t border-[#704214]/20">
          <span className="flex items-center gap-2 text-[#8B9DAF] text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="w-2 h-2 rounded-full bg-[#D4A843] inline-block"
              style={{ animation: "breathe 3s infinite" }} />
            Now
          </span>
          <span className="flex items-center gap-2 text-[#8B9DAF] text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="w-2 h-2 rounded-full bg-[#D4A843] opacity-60 inline-block" />
            Planned
          </span>
          <span className="flex items-center gap-2 text-[#8B9DAF] text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="w-2 h-2 rounded-full border border-dashed border-[#D4A843] inline-block" />
            Undecided
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Slide content ────────────────────────────────────────────────────────────

function HeroSlide({ next }) {
  return (
    <div className="relative overflow-hidden">
      {/* Background topographic lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `repeating-radial-gradient(circle at 50% 50%, transparent, transparent 40px, #D4A843 40px, #D4A843 41px)`,
      }} />
      <GoldenMotes />

      {/* Hero content — centered in viewport */}
      <div className="flex flex-col items-center justify-center min-h-full text-center px-8 relative">
        {/* Rotating compass */}
        <div className="mb-8 relative">
          <div style={{ animation: "compass-spin 60s linear infinite" }}>
            <CompassRose size={96} />
          </div>
          <div className="absolute inset-0 rounded-full breathing-glow"
            style={{ boxShadow: "0 0 40px rgba(212,168,67,0.2)" }} />
        </div>

        {/* Cartouche title frame */}
        <div className="relative mb-2 px-8 py-2 border border-[#D4A843]/30"
          style={{ borderRadius: "8px 2px 8px 2px / 2px 8px 2px 8px" }}>
          <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#D4A843]/60 to-transparent" />
          <div className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#D4A843]/60 to-transparent" />
          <h1 className="text-5xl font-bold text-[#EDE0CC] tracking-tight"
            style={{ fontFamily: "Playfair Display, serif" }}>Nico</h1>
        </div>

        <p className="text-lg text-[#D4A843] mb-4 italic"
          style={{ fontFamily: "Playfair Display, serif" }}>
          Engineer → Founder → Explorer
        </p>

        <p className="text-[#8B9DAF] max-w-xl text-base leading-relaxed mb-8"
          style={{ fontFamily: "Lora, serif" }}>
          Ex-FAANG engineer turned multi-venture founder. I build at the intersection of technology,
          consciousness, and human performance — and spend the rest of my time venturing,
          doing extreme sports, pouring tea, or going inward.
        </p>

        <div className="flex gap-2 flex-wrap justify-center mb-10">
          {["San Francisco", "Born in Miami", "Building 3 startups", "INFJ"].map(tag => (
            <span key={tag}
              className="px-3 py-1 text-[#8B9DAF] text-xs border border-[#704214]/40 rounded-sm"
              style={{ fontFamily: "Inter, sans-serif", background: "rgba(112,66,20,0.08)" }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 items-center">
          <button onClick={next} className="wax-seal px-8 py-3 rounded-sm text-sm tracking-wide"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Chart the Territory →
          </button>
          <a href="https://instagram.com/whereintheworldisnico" target="_blank" rel="noopener noreferrer"
            className="px-5 py-3 rounded-sm text-sm tracking-wide border border-[#D4A843]/40 text-[#D4A843] hover:bg-[#D4A843]/10 transition-colors"
            style={{ fontFamily: "Inter, sans-serif", textDecoration: "none" }}>
            Instagram →
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-12 flex flex-col items-center gap-1 opacity-30">
          <span className="text-[#D4A843] text-[10px] tracking-widest uppercase"
            style={{ fontFamily: "Inter, sans-serif" }}>Scroll</span>
          <span className="text-[#D4A843] text-sm animate-bounce">↓</span>
        </div>
      </div>

      {/* Travel map */}
      <div className="px-6 py-16 flex items-center justify-center relative">
        <TravelMap />
      </div>
    </div>
  );
}

function ProjectsSlide() {
  return (
    <div className="px-8 py-16 min-h-full flex flex-col items-center text-center max-w-4xl mx-auto w-full">
      <CartoucheLabel>What I'm Building</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Projects</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        Consciousness tech, developer tools, physical wellness, and research.
      </p>
      <AlchemicalDivider />
      <div className="grid grid-cols-2 gap-4 w-full">
        {[
          {
            glyph: "◎",
            name: "The Clearing",
            desc: "Virtual coworking meets emotional development — Focusmate for EQ. Practice modalities, facilitator marketplace, and a trophy system that rewards inner work.",
            tags: ["Consciousness Tech", "Next.js", "LiveKit"],
            accent: "#6B3FA0",
            url: "https://theclearing.app",
          },
          {
            glyph: "✧",
            name: "Quill",
            desc: "Open-source, local-first audio transcription. 8 adapters, speaker diarization, AI chat with your transcripts, and native Obsidian integration.",
            tags: ["Go", "React", "Open Source"],
            accent: "#4A8B7F",
            url: "https://github.com/Nicoivazquez/quill",
          },
          {
            glyph: "☀",
            name: "Red Light Throne",
            desc: "Red light therapy where the sun don't shine. A wellness hardware product — currently building waitlist and validating demand.",
            tags: ["Hardware", "Wellness", "Pre-Launch"],
            accent: "#D4A843",
          },
          {
            glyph: "⬡",
            name: "OpenClaw",
            desc: "Multi-agent operating system built on the Working Geniuses framework. Six specialized agents coordinating through a shared workspace.",
            tags: ["Multi-Agent", "Claude", "AI"],
            accent: "#D4A843",
          },
          {
            glyph: "◈",
            name: "ContentOS",
            desc: "Three-agent content intelligence pipeline: strategy bible, automated research, and content briefs. Feeds into an AI video pipeline.",
            tags: ["Content", "AI Pipeline", "Strategy"],
            accent: "#4A8B7F",
          },
          {
            glyph: "∿",
            name: "Quantum-Like Brain Dynamics",
            desc: "Exploring quantum-like network topology in fMRI data — how classical oscillator networks produce quantum interference patterns.",
            tags: ["Neuroscience", "Research"],
            accent: "#6B3FA0",
          },
        ].map(v => (
          <div key={v.name} className="card-alchemist flex gap-3 p-5 rounded-sm text-left"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-xl flex-shrink-0 w-7 text-center mt-0.5" style={{ color: v.accent }}>{v.glyph}</span>
            <div>
              <h3 className="text-[#EDE0CC] font-semibold text-sm mb-1"
                style={{ fontFamily: "Playfair Display, serif" }}>
                {v.url ? (
                  <a href={v.url} target="_blank" rel="noopener noreferrer"
                    className="hover:text-[#D4A843] transition-colors"
                    style={{ textDecoration: "none", color: "inherit" }}>{v.name} <span className="text-[10px] opacity-50">↗</span></a>
                ) : v.name}
              </h3>
              <p className="text-[#8B9DAF] text-xs mb-2 leading-relaxed"
                style={{ fontFamily: "Lora, serif" }}>{v.desc}</p>
              <div className="flex gap-1.5 flex-wrap">
                {v.tags.map(t => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 border border-[#704214]/40 text-[#C17817]"
                    style={{ fontFamily: "Inter, sans-serif", background: "rgba(193,120,23,0.08)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WritingSlide() {
  const posts = [
    {
      title: "Getting Things Done for Your Inner World",
      date: "Dec 6, 2025",
      desc: "Limitless AI recorder wearable just got acquired by Meta. The next wave of data capture is incoming.",
      url: "https://0to1billion.substack.com/p/getting-things-done-for-your-inner",
    },
    {
      title: "Your Mind is Stuck in a Loop (And You Don't Even Know It)",
      date: "Dec 4, 2025",
      desc: "You finished that workout.",
      url: "https://0to1billion.substack.com/p/your-mind-is-stuck-in-a-loop-and",
    },
    {
      title: "The First Question",
      date: "Nov 22, 2025",
      desc: "How we thought about what Ducky asks first.",
      url: "https://0to1billion.substack.com/p/the-first-question",
    },
    {
      title: "The Execution Gap That's Killing Your Goals",
      date: "Nov 9, 2025",
      desc: "Why you've consumed 1,000 hours of self-help content but haven't changed.",
      url: "https://0to1billion.substack.com/p/the-execution-gap-thats-killing-your",
    },
  ];

  return (
    <div className="px-8 py-16 min-h-full flex flex-col items-center text-center max-w-4xl mx-auto w-full">
      <CartoucheLabel>Letters</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Writing</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        Personal development and random patterns I see in the world.
      </p>
      <AlchemicalDivider />
      <div className="flex flex-col gap-4 w-full">
        {posts.map((post, i) => (
          <a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-alchemist flex gap-4 p-5 rounded-sm text-left group"
            style={{ background: "rgba(44,24,16,0.3)", textDecoration: "none" }}
          >
            <span className="text-[#704214]/50 text-xs mt-1.5 flex-shrink-0 w-4 text-right"
              style={{ fontFamily: "Lora, serif" }}>{i + 1}</span>
            <div className="flex-1">
              <p className="text-[#EDE0CC] font-semibold text-sm group-hover:text-[#D4A843] transition-colors"
                style={{ fontFamily: "Playfair Display, serif" }}>
                {post.title} <span className="text-[10px] opacity-50">↗</span>
              </p>
              <p className="text-[#8B9DAF] text-xs mt-1.5 leading-relaxed"
                style={{ fontFamily: "Lora, serif" }}>{post.desc}</p>
              <span className="text-[#704214] text-[10px] mt-2 inline-block"
                style={{ fontFamily: "Inter, sans-serif" }}>{post.date}</span>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-8">
        <a href="https://0to1billion.substack.com"
          target="_blank" rel="noopener noreferrer"
          className="wax-seal px-6 py-2.5 rounded-sm text-sm tracking-wide inline-flex items-center gap-2"
          style={{ fontFamily: "Inter, sans-serif", textDecoration: "none" }}>
          Subscribe on Substack →
        </a>
      </div>
    </div>
  );
}

function AthleticsSlide() {
  return (
    <div className="px-8 py-16 min-h-full flex flex-col items-center text-center max-w-4xl mx-auto w-full">
      <CartoucheLabel>Physical Terrain</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Movement & Sport</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        Life is the true marathon. This is just training for that.
      </p>
      <AlchemicalDivider />
      <div className="grid grid-cols-2 gap-4 mb-6 w-full">
        {[
          { symbol: "◌", name: "Trail Running", detail: "Marathons, ultras, Born to Run philosophy" },
          { symbol: "◇", name: "Freediving", detail: "Breath, depth, stillness" },
          { symbol: "△", name: "Climbing", detail: "Bouldering & outdoor rock" },
          { symbol: "◆", name: "Tennis", detail: "Competitive play & technique study" },
          { symbol: "≋", name: "Swimming", detail: "Open water & laps" },
          { symbol: "⊕", name: "Cycling", detail: "Endurance cross-training" },
        ].map(a => (
          <div key={a.name} className="card-alchemist p-5 rounded-sm flex items-center gap-4 text-left"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-[#D4A843] text-xl w-7 text-center flex-shrink-0">{a.symbol}</span>
            <div>
              <p className="text-[#EDE0CC] font-medium text-sm"
                style={{ fontFamily: "Playfair Display, serif" }}>{a.name}</p>
              <p className="text-[#704214] text-xs mt-0.5"
                style={{ fontFamily: "Inter, sans-serif" }}>{a.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card-alchemist p-5 rounded-sm w-full text-left"
        style={{ background: "rgba(44,24,16,0.2)" }}>
        <p className="text-[#8B9DAF] text-sm leading-relaxed italic"
          style={{ fontFamily: "Lora, serif" }}>
          "If you get tired, learn to rest, not to quit. Come back from every setback stronger —
          Achilles tendinitis, broken ankle, IT band. The body is the instrument."
        </p>
      </div>
    </div>
  );
}

function PhilosophySlide() {
  return (
    <div className="px-8 py-16 min-h-full flex flex-col items-center text-center max-w-4xl mx-auto w-full">
      <CartoucheLabel>The Legend</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>What I Live By</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        Strong opinions, loosely held. These are the current ones.
      </p>
      <AlchemicalDivider />
      <div className="grid gap-4 w-full">
        {[
          {
            glyph: "◯",
            theme: "Peace as north star",
            desc: "A couple of years ago I decided to make being at peace my main goal in life. Happiness is peace in motion.",
          },
          {
            glyph: "⊕",
            theme: "The warrior's garden",
            desc: "I'd rather be a warrior in a garden than a gardener in a war. Stay sharp, stay gentle.",
          },
          {
            glyph: "◎",
            theme: "Simplicity over complexity",
            desc: "Removal over addition. Always leave things better than you found them. Life is really simple — we insist on making it complicated.",
          },
          {
            glyph: "∞",
            theme: "Play the long game",
            desc: "You don't rise to the level of your goals, you fall to the level of your habits. Be not afraid of growing slowly; be afraid only of standing still.",
          },
          {
            glyph: "⊞",
            theme: "You are what you do",
            desc: "Not what you say you'll do. Data-driven in business, intuition-driven in life. Curiosity will conquer fear more than bravery ever will.",
          },
        ].map(f => (
          <div key={f.theme} className="card-alchemist flex gap-4 p-5 rounded-sm text-left"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-[#D4A843] text-lg flex-shrink-0 w-7 text-center mt-0.5">{f.glyph}</span>
            <div>
              <p className="text-[#EDE0CC] font-semibold text-base"
                style={{ fontFamily: "Playfair Display, serif" }}>{f.theme}</p>
              <p className="text-[#8B9DAF] text-sm leading-relaxed mt-1"
                style={{ fontFamily: "Lora, serif" }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationsSlide() {
  const [activeTab, setActiveTab] = useState("books");

  const recs = {
    books: {
      label: "Books",
      glyph: "📖",
      items: [
        { name: "Surely You're Joking, Mr. Feynman", author: "Richard Feynman", note: "Curiosity as a way of life. The patron saint of cool nerds." },
        { name: "Born to Run", author: "Christopher McDougall", note: "Changed how I think about running, feet, and what humans are built for." },
        { name: "Zero to One", author: "Peter Thiel", note: "Contrarian thinking applied to building. Focus on one thing." },
        { name: "The Untethered Soul", author: "Michael Singer", note: "The clearest map of inner work I've found. Read it twice a year." },
        { name: "Things Hidden Since the Foundation of the World", author: "Rene Girard", note: "Mimetic desire explains most of human behavior. Uncomfortable and true." },
        { name: "Dune", author: "Frank Herbert", note: "Politics, ecology, and power wrapped in sci-fi. The book that made me distrust messiahs." },
        { name: "Einstein", author: "Walter Isaacson", note: "Imagination over credentials. The best ideas come from thought experiments and stubbornness." },
        { name: "Homo Deus", author: "Yuval Noah Harari", note: "Where Sapiens ends, this begins — and the future it paints is equal parts thrilling and terrifying." },
        { name: "Man's Search for Meaning", author: "Viktor E. Frankl", note: "You can't control what happens to you, but you always choose how you meet it." },
        { name: "My Stroke of Insight", author: "Jill Bolte Taylor", note: "A brain scientist watches her own mind dissolve in real time. Rewired how I think about consciousness." },
        { name: "Pre-Suasion", author: "Robert Cialdini", note: "What happens before you ask matters more than how you ask. Changed how I frame everything." },
        { name: "Sapiens", author: "Yuval Noah Harari", note: "The story of us, told from so far back that all your assumptions start to feel arbitrary." },
        { name: "Stealing Fire", author: "Steven Kotler & Jamie Wheal", note: "Altered states aren't fringe — they're how SEALs, Silicon Valley, and athletes find the edge." },
        { name: "The Surrender Experiment", author: "Michael Singer", note: "What happens when you stop forcing life and just say yes. Quietly the most radical book on this list." },
        { name: "The Yoga of Eating", author: "Charles Eisenstein", note: "Threw out every diet rule and replaced them with one: listen to your body." },
        { name: "This Changes Everything", author: "Naomi Klein", note: "Climate isn't a sidebar issue — it's the issue that exposes everything broken about the system." },
        { name: "Why We Sleep", author: "Matthew Walker", note: "Destroyed every excuse I had for sleeping less. The data is brutal and undeniable." },
      ],
    },
    tools: {
      label: "Tools",
      glyph: "⚙",
      items: [
        { name: "Obsidian", note: "Second brain. Local-first markdown, no lock-in." },
        { name: "Quill", note: "Local-first audio transcription (my project). 8 adapters, speaker diarization, AI chat with your transcripts." },
        { name: "VoiceLink", note: "Voice-first communication. Clean and simple." },
        { name: "Claude Code", note: "AI pair programming. The best coding agent in the terminal." },
        { name: "OpenClaw", note: "My multi-agent OS. Six agents running the venture portfolio." },
        { name: "Firefox", note: "Because I love Mozilla. Super privacy-focused and open-source." },
        { name: "Protonmail", note: "Private, encrypted email. No ads, no tracking." },
        { name: "Signal", note: "Encrypted messaging. Privacy by default." },
      ],
    },
    gear: {
      label: "Gear",
      glyph: "⛺",
      items: [
        { name: "Shaman Warrior Sandals", note: "Minimalist running sandals. Born to Run philosophy on your feet." },
        { name: "Cashmere Wool Sweater", note: "Either thrifted or from an environmentally conscious company. Timeless and sustainable." },
        { name: "Merino Wool Socks & Underwear", note: "Merino wool is natural and long-lasting. The best base layer." },
        { name: "Fuji XS-10 / X100V", note: "Film and digital. The Fuji colors are unmatched for street and travel." },
        { name: "La Sportiva TC Pro", note: "High-performance climbing shoe. Precision on rock." },
        { name: "Foam Roller, Massage Gun & Spiky Lacrosse Ball", note: "Daily recovery stack. Roll out, percussion, and deep tissue — quick and effective between sessions." },
      ],
    },
    food: {
      label: "Food",
      glyph: "⚗",
      items: [
        { name: "Canned Fish & Canned Cod Liver", note: "Healthy fats, healthy omegas. Simple, affordable, nutrient-dense." },
        { name: "Grass-Fed Sirloin Steak", note: "Very lean and tender cut of meat that's affordable for everyday consumption." },
        { name: "Isabelle Page Recipe Book", note: "Vegan cookbook. Clean, creative plant-based cooking." },
        { name: "Fasting Protocols", note: "3-day water fast quarterly. Monthly one-day fasts. Reset the system." },
        { name: "No Alcohol, No Caffeine", note: "I don't want to consume poison. And I don't want caffeine to trick me into working on something I don't care about." },
        { name: "Ancestral Sourcing", note: "Grass-fed, pasture-raised, wild-caught. Source matters more than calories." },
      ],
    },
    fitness: {
      label: "Fitness",
      glyph: "◉",
      items: [
        { name: "Zone 2 Training", note: "80% of volume here. Aerobic base is everything for longevity." },
        { name: "5x5 Strength Training", note: "Compound lifts, progressive overload. Simple and effective." },
        { name: "Kettlebell Training", note: "Functional strength, grip, posterior chain. The one tool that does it all." },
        { name: "Knees Over Toes", note: "Ben Patrick methodology. Bulletproof joints, injury-proof movement." },
        { name: "Yoga", note: "Flexibility, breath, body awareness. The counterbalance to everything else." },
        { name: "Sauna", note: "Heat exposure for recovery, growth hormone, and mental reset." },
        { name: "Morning Stack", note: "Grounding barefoot, morning sunlight, breathwork. Non-negotiable first hour." },
        { name: "Sunning Naked", note: "Full-body sun exposure. Vitamin D the way nature intended." },
        { name: "Bryan Johnson Blueprint", note: "Track food, supplements, biomarkers. What gets measured gets managed." },
      ],
    },
  };

  const tabs = Object.entries(recs);
  const current = recs[activeTab];

  return (
    <div className="px-8 py-16 min-h-full flex flex-col items-center text-center max-w-4xl mx-auto w-full">
      <CartoucheLabel>The Codex</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Recommendations</h2>
      <p className="text-[#8B9DAF] mb-5 text-sm" style={{ fontFamily: "Lora, serif" }}>
        What people always ask me about. My actual answers.
      </p>

      {/* Tab bar */}
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        {tabs.map(([key, val]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="px-5 py-2.5 text-sm font-medium tracking-wide transition-all rounded-sm"
            style={{
              fontFamily: "Playfair Display, serif",
              color: activeTab === key ? "#EDE0CC" : "#704214",
              background: activeTab === key ? "rgba(212,168,67,0.15)" : "rgba(44,24,16,0.3)",
              border: activeTab === key ? "1px solid rgba(212,168,67,0.5)" : "1px solid rgba(112,66,20,0.3)",
              cursor: "pointer",
            }}
          >
            <span className="mr-2">{val.glyph}</span>
            {val.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 w-full">
        {current.items.map((item, i) => (
          <div key={item.name} className="card-alchemist flex gap-4 p-4 rounded-sm text-left"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-[#704214]/50 text-xs mt-1 flex-shrink-0 w-4 text-right"
              style={{ fontFamily: "Lora, serif" }}>{i + 1}</span>
            <div>
              <p className="text-[#EDE0CC] font-semibold text-sm"
                style={{ fontFamily: "Playfair Display, serif" }}>
                {item.name}
                {item.author && (
                  <span className="text-[#704214] font-normal text-xs ml-2"
                    style={{ fontFamily: "Inter, sans-serif" }}>— {item.author}</span>
                )}
              </p>
              <p className="text-[#8B9DAF] text-xs mt-1 leading-relaxed"
                style={{ fontFamily: "Lora, serif" }}>{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InnerWorkSlide() {
  return (
    <div className="px-8 py-16 min-h-full flex flex-col items-center text-center max-w-4xl mx-auto w-full">
      <CartoucheLabel>Inner Cartography</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Consciousness & Community</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        An engineer's approach to the inner world. No dogma — just practice.
      </p>
      <AlchemicalDivider />
      <div className="grid gap-4 w-full">
        {[
          {
            glyph: "⊛",
            theme: "Tea House",
            desc: "Weekly volunteering at a community tea house — pouring tea, holding space, building connection one cup at a time.",
          },
          {
            glyph: "∿",
            theme: "Psychedelic Safety",
            desc: "Zendo Project volunteer. Harm reduction at festivals, trip sitting for friends. Safety, set, setting, and dosing always come first.",
          },
          {
            glyph: "◎",
            theme: "Morning Practice",
            desc: "Starts the night before. Going to bed early to get 8+ hours of sleep. Grounding barefoot, morning sunlight. 1–2 hours of exercise, full body — alternating between strength and cardio days.",
          },
          {
            glyph: "✦",
            theme: "Community as Practice",
            desc: "Men's group, intentional gatherings, Burning Man. The best game in life is making the most amount of friends possible.",
          },
        ].map(f => (
          <div key={f.theme} className="card-alchemist flex gap-4 p-5 rounded-sm text-left"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-[#D4A843] text-lg flex-shrink-0 w-7 text-center mt-0.5">{f.glyph}</span>
            <div>
              <p className="text-[#EDE0CC] font-semibold text-base"
                style={{ fontFamily: "Playfair Display, serif" }}>{f.theme}</p>
              <p className="text-[#8B9DAF] text-sm leading-relaxed mt-1"
                style={{ fontFamily: "Lora, serif" }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card-alchemist p-5 rounded-sm mt-5 w-full text-left"
        style={{ background: "rgba(44,24,16,0.2)" }}>
        <p className="text-[#8B9DAF] text-sm leading-relaxed italic"
          style={{ fontFamily: "Lora, serif" }}>
          "Yesterday I was clever, so I wanted to change the world.
          Today I am wise, so I am changing myself." — Rumi
        </p>
      </div>
    </div>
  );
}

function VisionSlide() {
  return (
    <div className="px-8 py-16 min-h-full flex flex-col items-center text-center max-w-4xl mx-auto w-full">
      <CartoucheLabel>Terra Incognita</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Where I'm Headed</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        The map is still being drawn.
      </p>
      <AlchemicalDivider />

      <p className="text-[#8B9DAF] max-w-3xl mb-8 leading-relaxed"
        style={{ fontFamily: "Lora, serif" }}>
        The endgame is a physical home for everything I'm building in the digital space —
        tools that help people grow, create, and connect. And eventually, a place to live it.
      </p>

      <div className="grid gap-4 w-full max-w-3xl mb-8">
        {[
          {
            label: "Tools for Emotional Wellness",
            glyph: "◎",
            desc: "Building technology that helps people grow emotionally — assessment tooling, practice platforms, and facilitator infrastructure.",
          },
          {
            label: "Tools for Creativity",
            glyph: "∿",
            desc: "Psychedelic creativity, consciousness research, and AI systems that amplify human expression and insight.",
          },
          {
            label: "Patagonian Village",
            glyph: "⛰",
            desc: "A place to live, a community, a home. A high-end retreat center and intentional village in the Patagonian landscape.",
          },
        ].map(p => (
          <div key={p.label} className="card-alchemist p-5 rounded-sm flex gap-4 items-start text-left"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-[#D4A843] text-2xl flex-shrink-0 mt-0.5">{p.glyph}</span>
            <div>
              <p className="text-[#EDE0CC] font-semibold text-sm mb-1"
                style={{ fontFamily: "Playfair Display, serif" }}>{p.label}</p>
              <p className="text-[#8B9DAF] text-xs leading-relaxed"
                style={{ fontFamily: "Lora, serif" }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[#C17817] text-sm italic" style={{ fontFamily: "Playfair Display, serif" }}>
        "Building the map before drawing the territory."
      </p>
    </div>
  );
}

function ConnectSlide() {
  return (
    <div className="px-8 py-16 min-h-full flex flex-col items-center text-center max-w-4xl mx-auto w-full">
      <CartoucheLabel>Open Routes</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Let's Connect</h2>
      <AlchemicalDivider />

      <p className="text-[#8B9DAF] max-w-3xl mb-8 leading-relaxed"
        style={{ fontFamily: "Lora, serif" }}>
        I'm interested in conversations around consciousness, community building, extreme athletics,
        sound money, and anyone building something genuinely meaningful. If you're here, you probably
        make my life better — not worse.
      </p>

      <div className="grid gap-4 w-full max-w-3xl mb-8">
        {[
          {
            label: "Ideal collaborators",
            glyph: "◈",
            items: ["Therapists & facilitators", "Engineers who've gone indie", "Community builders & retreat operators"],
          },
          {
            label: "What I'm curious about",
            glyph: "✦",
            items: ["Consciousness research & psychedelic science", "Longevity & biohacking", "Intentional communities"],
          },
        ].map(s => (
          <div key={s.label} className="card-alchemist p-5 rounded-sm text-left"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#D4A843] text-xs">{s.glyph}</span>
              <p className="text-[#D4A843] text-xs font-semibold uppercase tracking-widest"
                style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</p>
            </div>
            {s.items.map(i => (
              <p key={i} className="text-[#8B9DAF] text-sm py-0.5"
                style={{ fontFamily: "Lora, serif" }}>· {i}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <a href="https://instagram.com/whereintheworldisnico" target="_blank" rel="noopener noreferrer"
          className="wax-seal px-6 py-2.5 rounded-sm text-sm tracking-wide inline-flex items-center gap-2"
          style={{ fontFamily: "Inter, sans-serif", textDecoration: "none" }}>
          Instagram →
        </a>
      </div>
    </div>
  );
}

// ── Slide registry ───────────────────────────────────────────────────────────

const slides = [
  { id: "hero",            label: "Home",            Component: HeroSlide },
  { id: "projects",        label: "Projects",        Component: ProjectsSlide },
  { id: "writing",         label: "Writing",         Component: WritingSlide },
  { id: "athletics",       label: "Athletics",       Component: AthleticsSlide },
  { id: "philosophy",      label: "Philosophy",      Component: PhilosophySlide },
  { id: "recommendations", label: "Recommendations",  Component: RecommendationsSlide },
  { id: "innerwork",       label: "Inner Work",      Component: InnerWorkSlide },
  { id: "vision",          label: "Vision",          Component: VisionSlide },
  { id: "connect",         label: "Connect",         Component: ConnectSlide },
];

// ── App shell ────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const prevActive = useRef(0);

  const go = (idx) => {
    prevActive.current = active;
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  const { Component } = slides[active];

  return (
    <div className="h-screen flex flex-col" style={{ background: "#0F1729" }}>

      {/* Navigation — cartographer's atlas header */}
      <nav className="leather-bg flex-shrink-0 relative" style={{ borderBottom: "2px solid rgba(112,66,20,0.5)" }}>
        {/* Decorative top border — double line like old maps */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent" />
        <div className="absolute top-[3px] left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4A843]/15 to-transparent" />

        <div className="flex items-center px-4 py-4 gap-3">
          {/* Logo — clickable to home */}
          <button
            onClick={() => go(0)}
            className="flex items-center gap-3 group flex-shrink-0"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <div className="relative">
              <CompassRose size={40} className="group-hover:opacity-100 opacity-80 transition-opacity" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[#EDE0CC] font-bold tracking-tight text-2xl group-hover:text-[#D4A843] transition-colors"
                style={{ fontFamily: "Playfair Display, serif" }}>Nico</span>
              <span className="text-[#704214] text-[9px] tracking-[0.3em] uppercase -mt-0.5"
                style={{ fontFamily: "Inter, sans-serif" }}>Explorer's Atlas</span>
            </div>
          </button>

          {/* Route Map Navigation — full-width waypoint trail */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Connecting route line behind buttons */}
            <div className="absolute top-1/2 left-4 right-4 -translate-y-[2px] pointer-events-none" style={{ zIndex: 0 }}>
              <div className="h-[2px]" style={{
                background: "repeating-linear-gradient(to right, rgba(112,66,20,0.5) 0px, rgba(112,66,20,0.5) 8px, transparent 8px, transparent 14px)",
              }} />
            </div>

            <div className="flex items-center justify-between w-full relative px-2" style={{ zIndex: 1 }}>
              {slides.slice(1).map((s, idx) => {
                const i = idx + 1;
                const isActive = active === i;
                const isPast = active > i;
                const glyphs = ["◈", "✎", "△", "◯", "📖", "✦", "⊕", "◎"];
                return (
                  <button
                    key={s.id}
                    onClick={() => go(i)}
                    className="flex flex-col items-center gap-1 px-1 py-1 transition-all relative group"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    {/* Waypoint marker — larger & bolder */}
                    <div className="relative flex items-center justify-center transition-all"
                      style={{
                        width: isActive ? "44px" : "34px",
                        height: isActive ? "44px" : "34px",
                      }}>
                      {/* Outer glow ring for active */}
                      {isActive && (
                        <div className="absolute inset-[-8px] rounded-full breathing-glow"
                          style={{
                            border: "1.5px solid rgba(212,168,67,0.35)",
                            boxShadow: "0 0 20px rgba(212,168,67,0.2), 0 0 40px rgba(212,168,67,0.08)",
                          }} />
                      )}
                      {/* Diamond shape for active, circle for others */}
                      <div
                        className="flex items-center justify-center transition-all"
                        style={{
                          width: "100%",
                          height: "100%",
                          background: isActive
                            ? "linear-gradient(135deg, rgba(212,168,67,0.3), rgba(193,120,23,0.2))"
                            : isPast
                              ? "rgba(212,168,67,0.1)"
                              : "rgba(44,24,16,0.6)",
                          border: isActive
                            ? "2px solid #D4A843"
                            : isPast
                              ? "1.5px solid rgba(212,168,67,0.45)"
                              : "1.5px solid rgba(112,66,20,0.5)",
                          borderRadius: isActive ? "6px" : "50%",
                          transform: isActive ? "rotate(45deg)" : "none",
                          boxShadow: isActive
                            ? "0 0 20px rgba(212,168,67,0.25), inset 0 0 8px rgba(212,168,67,0.1)"
                            : isPast
                              ? "0 0 6px rgba(212,168,67,0.1)"
                              : "none",
                        }}
                      >
                        <span style={{
                          transform: isActive ? "rotate(-45deg)" : "none",
                          fontSize: isActive ? "18px" : "14px",
                          opacity: isActive ? 1 : isPast ? 0.75 : 0.5,
                          lineHeight: 1,
                        }}>
                          {glyphs[idx]}
                        </span>
                      </div>
                    </div>
                    {/* Label — bigger text */}
                    <span
                      className="transition-all whitespace-nowrap"
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: isActive ? "13px" : "12px",
                        fontWeight: isActive ? "700" : "500",
                        color: isActive ? "#D4A843" : isPast ? "#9B8A6A" : "#704214",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {s.label}
                    </span>
                    {/* Active underline tick */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full"
                        style={{ background: "linear-gradient(to right, transparent, #D4A843, transparent)" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Decorative bottom border — aged map edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/20 to-transparent" />
      </nav>

      {/* Slide content */}
      <div className="flex-1 overflow-y-auto relative" style={{ minHeight: 0 }}>
        {/* Subtle candlelight vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 20%, rgba(212,168,67,0.04) 0%, transparent 70%)",
          }} />
        <div key={animKey} className="fog-clear h-full">
          <Component next={() => go(Math.min(active + 1, slides.length - 1))} />
        </div>
      </div>

      {/* Footer pagination — cartographer's navigation */}
      <div className="leather-bg flex-shrink-0 relative" style={{ borderTop: "2px solid rgba(112,66,20,0.5)" }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/20 to-transparent" />

        <div className="flex justify-between items-center px-6 py-3">
          {/* West / Prev */}
          <button
            onClick={() => go(Math.max(active - 1, 0))}
            disabled={active === 0}
            className="flex items-center gap-2 group disabled:opacity-20 transition-all"
            style={{ background: "none", border: "none", cursor: active === 0 ? "default" : "pointer" }}
          >
            <span className="text-[#D4A843] text-sm group-hover:text-[#EDE0CC] transition-colors"
              style={{ fontFamily: "Playfair Display, serif" }}>W</span>
            <span className="text-[#704214] text-xs group-hover:text-[#D4A843] transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}>
              ◂ {active > 0 ? slides[active - 1].label : ""}
            </span>
          </button>

          {/* Map waypoints */}
          <div className="flex gap-1.5 items-center">
            <span className="text-[#704214]/30 text-[10px] mr-1" style={{ fontFamily: "Inter, sans-serif" }}>
              {active + 1}/{slides.length}
            </span>
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="transition-all group relative"
                title={s.label}
                style={{
                  width: active === i ? "20px" : "8px",
                  height: "8px",
                  borderRadius: active === i ? "4px" : "50%",
                  background: active === i ? "#D4A843" : i < active ? "rgba(212,168,67,0.4)" : "rgba(112,66,20,0.5)",
                  border: active === i ? "1px solid rgba(212,168,67,0.6)" : "1px solid transparent",
                  cursor: "pointer",
                  padding: 0,
                  boxShadow: active === i ? "0 0 8px rgba(212,168,67,0.3)" : "none",
                }}
              />
            ))}
          </div>

          {/* East / Next */}
          <button
            onClick={() => go(Math.min(active + 1, slides.length - 1))}
            disabled={active === slides.length - 1}
            className="flex items-center gap-2 group disabled:opacity-20 transition-all"
            style={{ background: "none", border: "none", cursor: active === slides.length - 1 ? "default" : "pointer" }}
          >
            <span className="text-[#704214] text-xs group-hover:text-[#D4A843] transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}>
              {active < slides.length - 1 ? slides[active + 1].label : ""} ▸
            </span>
            <span className="text-[#D4A843] text-sm group-hover:text-[#EDE0CC] transition-colors"
              style={{ fontFamily: "Playfair Display, serif" }}>E</span>
          </button>
        </div>
      </div>
    </div>
  );
}
