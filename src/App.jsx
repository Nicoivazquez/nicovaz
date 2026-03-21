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

// ── Slide content ────────────────────────────────────────────────────────────

function HeroSlide({ next }) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-full text-center px-8 overflow-hidden">
      {/* Background topographic lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `repeating-radial-gradient(circle at 50% 50%, transparent, transparent 40px, #D4A843 40px, #D4A843 41px)`,
      }} />
      <GoldenMotes />

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
        {["San Francisco", "Argentine roots", "Building 3 startups", "INFJ"].map(tag => (
          <span key={tag}
            className="px-3 py-1 text-[#8B9DAF] text-xs border border-[#704214]/40 rounded-sm"
            style={{ fontFamily: "Inter, sans-serif", background: "rgba(112,66,20,0.08)" }}>
            {tag}
          </span>
        ))}
      </div>

      <button onClick={next} className="wax-seal px-8 py-3 rounded-sm text-sm tracking-wide"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Chart the Territory →
      </button>
    </div>
  );
}

function ProjectsSlide() {
  return (
    <div className="px-8 py-12 min-h-full flex flex-col justify-center max-w-4xl mx-auto w-full">
      <CartoucheLabel>What I'm Building</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Projects</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        Consciousness tech, developer tools, physical wellness, and research.
      </p>
      <AlchemicalDivider />
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            glyph: "◎",
            name: "Attune",
            desc: "Virtual coworking meets emotional development — Focusmate for EQ. Practice modalities, facilitator marketplace, and a trophy system that rewards inner work.",
            tags: ["Consciousness Tech", "Next.js", "LiveKit"],
            accent: "#6B3FA0",
          },
          {
            glyph: "✧",
            name: "Quill",
            desc: "Open-source, local-first audio transcription. 8 adapters, speaker diarization, AI chat with your transcripts, and native Obsidian integration.",
            tags: ["Go", "React", "Open Source"],
            accent: "#4A8B7F",
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
          <div key={v.name} className="card-alchemist flex gap-3 p-5 rounded-sm"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-xl flex-shrink-0 w-7 text-center mt-0.5" style={{ color: v.accent }}>{v.glyph}</span>
            <div>
              <h3 className="text-[#EDE0CC] font-semibold text-sm mb-1"
                style={{ fontFamily: "Playfair Display, serif" }}>{v.name}</h3>
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

function AthleticsSlide() {
  return (
    <div className="px-8 py-12 min-h-full flex flex-col justify-center max-w-3xl mx-auto w-full">
      <CartoucheLabel>Physical Terrain</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Movement & Sport</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        Life is the true marathon. This is just training for that.
      </p>
      <AlchemicalDivider />
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { symbol: "◌", name: "Trail Running", detail: "Marathons, ultras, Born to Run philosophy" },
          { symbol: "◇", name: "Freediving", detail: "Breath, depth, stillness" },
          { symbol: "△", name: "Climbing", detail: "Bouldering & outdoor rock" },
          { symbol: "◆", name: "Tennis", detail: "Competitive play & technique study" },
          { symbol: "≋", name: "Swimming", detail: "Open water & laps" },
          { symbol: "⊕", name: "Cycling", detail: "Endurance cross-training" },
        ].map(a => (
          <div key={a.name} className="card-alchemist p-5 rounded-sm flex items-center gap-4"
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
      <div className="card-alchemist p-5 rounded-sm"
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
    <div className="px-8 py-12 min-h-full flex flex-col justify-center max-w-3xl mx-auto w-full">
      <CartoucheLabel>The Legend</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>What I Live By</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        Strong opinions, loosely held. These are the current ones.
      </p>
      <AlchemicalDivider />
      <div className="grid gap-4">
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
          <div key={f.theme} className="card-alchemist flex gap-4 p-5 rounded-sm"
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
      ],
    },
    tools: {
      label: "Tools",
      glyph: "⚙",
      items: [
        { name: "Obsidian", note: "Second brain. Local-first markdown, no lock-in." },
        { name: "MacWhisper", note: "Local audio transcription. Fast, private, runs on-device." },
        { name: "VoiceLink", note: "Voice-first communication. Clean and simple." },
        { name: "Ocean", note: "Personality insights and self-understanding." },
        { name: "OpenClaw", note: "My multi-agent OS. Six agents running the venture portfolio." },
        { name: "Co-Pilot", note: "AI pair programming. Second pair of hands in the editor." },
        { name: "Signal", note: "Encrypted messaging. Privacy by default." },
      ],
    },
    gear: {
      label: "Gear",
      glyph: "⛺",
      items: [
        { name: "Shaman Warrior Sandals", note: "Minimalist running sandals. Born to Run philosophy on your feet." },
        { name: "Garmin Watch", note: "Running, HRV, training load. The data layer for everything physical." },
        { name: "Fuji XS-10 / X100V", note: "Film and digital. The Fuji colors are unmatched for street and travel." },
        { name: "La Sportiva TC Pro", note: "High-performance climbing shoe. Precision on rock." },
        { name: "Massage Gun", note: "Daily recovery tool. Quick and effective between sessions." },
        { name: "Spiky Lacrosse Ball", note: "Roll out your feet. Simple, cheap, life-changing for runners." },
      ],
    },
    food: {
      label: "Food",
      glyph: "⚗",
      items: [
        { name: "Nona's Argentine Recipes", note: "Family recipes from my grandmother. The foundation of everything I cook." },
        { name: "Fries Friday", note: "Weekly tradition — friends over, fries from a different spot each time." },
        { name: "Isabelle Page Recipe Book", note: "Vegan cookbook. Clean, creative plant-based cooking." },
        { name: "Fasting Protocols", note: "3-day water fast quarterly. Monthly one-day fasts. Reset the system." },
        { name: "No Alcohol, No Caffeine", note: "Dropped both. Sleep quality and morning clarity made it permanent." },
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
    <div className="px-8 py-12 h-full flex flex-col max-w-3xl mx-auto w-full">
      <CartoucheLabel>The Codex</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Recommendations</h2>
      <p className="text-[#8B9DAF] mb-5 text-sm" style={{ fontFamily: "Lora, serif" }}>
        What people always ask me about. My actual answers.
      </p>

      {/* Tab bar */}
      <div className="flex gap-1 mb-5 border-b border-[#704214]/30 pb-0">
        {tabs.map(([key, val]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="px-4 py-2 text-xs transition-all relative flex-shrink-0"
            style={{
              fontFamily: "Inter, sans-serif",
              color: activeTab === key ? "#D4A843" : "#704214",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {val.label}
            {activeTab === key && (
              <div className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#D4A843]"
                style={{ borderRadius: "40% 60% 50% 50%" }} />
            )}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 overflow-y-auto flex-1">
        {current.items.map((item, i) => (
          <div key={item.name} className="card-alchemist flex gap-4 p-4 rounded-sm"
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
    <div className="px-8 py-12 min-h-full flex flex-col justify-center max-w-3xl mx-auto w-full">
      <CartoucheLabel>Inner Cartography</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Consciousness & Community</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        An engineer's approach to the inner world. No dogma — just practice.
      </p>
      <AlchemicalDivider />
      <div className="grid gap-4">
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
            desc: "Grounding barefoot, morning sunlight, breathwork, 8+ hours of sleep. The purpose of my day is to let go of my blockages and grow.",
          },
          {
            glyph: "✦",
            theme: "Community as Practice",
            desc: "Men's group, intentional gatherings, Burning Man. The best game in life is making the most amount of friends possible.",
          },
        ].map(f => (
          <div key={f.theme} className="card-alchemist flex gap-4 p-5 rounded-sm"
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
      <div className="card-alchemist p-5 rounded-sm mt-5"
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
    <div className="px-8 py-12 min-h-full flex flex-col justify-center items-center text-center max-w-3xl mx-auto w-full">
      <div className="relative mb-8">
        <CompassRose size={80} className="opacity-60" />
        <div className="absolute inset-0 rounded-full breathing-glow"
          style={{ boxShadow: "0 0 50px rgba(212,168,67,0.15)" }} />
      </div>

      <CartoucheLabel>Terra Incognita</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-4"
        style={{ fontFamily: "Playfair Display, serif" }}>Where I'm Headed</h2>
      <AlchemicalDivider />

      <p className="text-[#8B9DAF] max-w-xl mb-8 leading-relaxed"
        style={{ fontFamily: "Lora, serif" }}>
        The endgame is a physical home for everything I'm building in the digital space —
        tools that help people grow, create, and connect. And eventually, a place to live it.
      </p>

      <div className="grid gap-4 w-full max-w-xl mb-8">
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
    <div className="px-8 py-12 min-h-full flex flex-col justify-center items-center text-center max-w-3xl mx-auto w-full">
      <CartoucheLabel>Open Routes</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Let's Connect</h2>
      <AlchemicalDivider />

      <p className="text-[#8B9DAF] max-w-lg mb-8 leading-relaxed"
        style={{ fontFamily: "Lora, serif" }}>
        I'm interested in conversations around consciousness, community building, extreme athletics,
        sound money, and anyone building something genuinely meaningful. If you're here, you probably
        make my life better — not worse.
      </p>

      <div className="grid gap-4 w-full max-w-md mb-8">
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
  { id: "athletics",       label: "Athletics",       Component: AthleticsSlide },
  { id: "philosophy",      label: "Philosophy",      Component: PhilosophySlide },
  { id: "recommendations", label: "Codex",           Component: RecommendationsSlide },
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

      {/* Navigation — leather codex header */}
      <nav className="leather-bg flex items-center justify-between px-6 py-4 border-b border-[#704214]/40 flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <CompassRose size={28} />
          <span className="text-[#EDE0CC] font-bold tracking-tight text-lg"
            style={{ fontFamily: "Playfair Display, serif" }}>Nico</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              className="px-3 py-1.5 text-xs font-medium transition-all flex-shrink-0 relative"
              style={{
                fontFamily: "Inter, sans-serif",
                color: active === i ? "#D4A843" : "#704214",
                background: active === i ? "rgba(212,168,67,0.08)" : "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {s.label}
              {active === i && (
                <div className="absolute bottom-0.5 left-2 right-2 h-px bg-[#D4A843]"
                  style={{ borderRadius: "40% 60% 50% 50%" }} />
              )}
            </button>
          ))}
        </div>
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

      {/* Footer pagination */}
      <div className="leather-bg flex justify-between items-center px-6 py-3 border-t border-[#704214]/40 flex-shrink-0">
        <button
          onClick={() => go(Math.max(active - 1, 0))}
          disabled={active === 0}
          className="text-[#704214] hover:text-[#D4A843] disabled:opacity-20 text-xs transition-colors"
          style={{ fontFamily: "Inter, sans-serif", background: "none", border: "none", cursor: active === 0 ? "default" : "pointer" }}
        >
          ← Prev
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="transition-all"
              style={{
                width: active === i ? "16px" : "6px",
                height: "6px",
                borderRadius: active === i ? "3px" : "50%",
                background: active === i ? "#D4A843" : "#704214",
                opacity: active === i ? 1 : 0.4,
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(Math.min(active + 1, slides.length - 1))}
          disabled={active === slides.length - 1}
          className="text-[#704214] hover:text-[#D4A843] disabled:opacity-20 text-xs transition-colors"
          style={{ fontFamily: "Inter, sans-serif", background: "none", border: "none", cursor: active === slides.length - 1 ? "default" : "pointer" }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
