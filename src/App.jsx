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
    <div className="relative flex flex-col items-center justify-center h-full text-center px-8 overflow-hidden">
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
        Ex-Asana SWE turned multi-venture founder. I build at the intersection of technology,
        psychology, and human performance — and spend the rest of my time at altitude.
      </p>

      <div className="flex gap-2 flex-wrap justify-center mb-10">
        {["San Francisco", "Patagonia (soon)", "Building 3 startups", "INFJ"].map(tag => (
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

function VenturesSlide() {
  return (
    <div className="px-8 py-8 h-full flex flex-col justify-center max-w-2xl mx-auto w-full">
      <CartoucheLabel>Current Ventures</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>What I'm Building</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        Three bets at the intersection of health, technology, and consciousness.
      </p>
      <AlchemicalDivider />
      <div className="grid gap-4">
        {[
          {
            glyph: "⚕",
            name: "Harm Reduction Concierge Medicine",
            desc: "High-touch medical service for people who engage with psychedelics and other substances intentionally. Concierge doctor meets harm reduction philosophy.",
            tags: ["Health", "Psychedelics", "Concierge"],
            accent: "#4A8B7F",
          },
          {
            glyph: "⚘",
            name: "High-Quality Food Grocery",
            desc: "A grocery concept built around sourcing integrity — whole foods, transparent supply chains, and an experience that makes eating well effortless.",
            tags: ["Food", "Retail", "Wellness"],
            accent: "#D4A843",
          },
          {
            glyph: "◎",
            name: "Life Logging App",
            desc: "Goal achievement through emotional alignment. Track not just what you do, but how you feel doing it — surfacing the patterns that drive or block growth.",
            tags: ["Mobile", "Psychology", "Productivity"],
            accent: "#6B3FA0",
          },
        ].map(v => (
          <div key={v.name} className="card-alchemist flex gap-4 p-5 rounded-sm"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-2xl flex-shrink-0 w-8 text-center" style={{ color: v.accent }}>{v.glyph}</span>
            <div>
              <h3 className="text-[#EDE0CC] font-semibold text-base mb-1"
                style={{ fontFamily: "Playfair Display, serif" }}>{v.name}</h3>
              <p className="text-[#8B9DAF] text-sm mb-3 leading-relaxed"
                style={{ fontFamily: "Lora, serif" }}>{v.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {v.tags.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 border border-[#704214]/40 text-[#C17817]"
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

function ProjectsSlide() {
  return (
    <div className="px-8 py-8 h-full flex flex-col justify-center max-w-2xl mx-auto w-full">
      <CartoucheLabel>Research & Craft</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Side Projects</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        Where engineering instincts meet psychological curiosity.
      </p>
      <AlchemicalDivider />
      <div className="grid gap-4">
        {[
          {
            symbol: "⬡",
            name: "The Cartographer's Gate",
            desc: "A psychological assessment system that rapidly evaluates ego development stage (Cook-Greuter EDT), attachment patterns, and IFS profile — then routes people to targeted modalities and practitioners. Built on sentence-completion stems + LLM scoring.",
            tags: ["React", "Claude API", "Cook-Greuter", "IFS", "Polyvagal"],
            status: "Active",
          },
          {
            symbol: "✧",
            name: "The Sextant",
            desc: "Two-layer measurement system for personal development: micro Territory Pulse assessments (nervous system, relationships, body, agency) after each session, plus deep ego-stage reassessments every 3–6 months.",
            tags: ["Psychology", "UX", "Assessment"],
            status: "Active",
          },
          {
            symbol: "∿",
            name: "Quantum-Like Brain Dynamics",
            desc: "Exploring the Deco-Kringelbach work on quantum-like network topology in fMRI data — how classical oscillator networks can produce quantum interference patterns, and what that implies for consciousness research.",
            tags: ["Neuroscience", "Research", "Systems"],
            status: "Exploring",
          },
        ].map(p => (
          <div key={p.name} className="card-alchemist flex gap-4 p-5 rounded-sm"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-xl flex-shrink-0 w-8 text-center text-[#D4A843] opacity-70 mt-1">{p.symbol}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-[#EDE0CC] font-semibold text-base"
                  style={{ fontFamily: "Playfair Display, serif" }}>{p.name}</h3>
                <span className={`text-xs px-2 py-0.5 border ${
                  p.status === "Active"
                    ? "border-[#4A8B7F]/40 text-[#4A8B7F] bg-[#4A8B7F]/08"
                    : "border-[#6B3FA0]/40 text-[#6B3FA0] bg-[#6B3FA0]/08"
                }`} style={{ fontFamily: "Inter, sans-serif" }}>
                  {p.status}
                </span>
              </div>
              <p className="text-[#8B9DAF] text-sm mb-3 leading-relaxed"
                style={{ fontFamily: "Lora, serif" }}>{p.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {p.tags.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 border border-[#704214]/40 text-[#C17817]"
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
    <div className="px-8 py-8 h-full flex flex-col justify-center max-w-2xl mx-auto w-full">
      <CartoucheLabel>Physical Terrain</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Physical Pursuits</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        Extreme sports as a lens for pushing edges — physical and psychological.
      </p>
      <AlchemicalDivider />
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { symbol: "◌", name: "Endurance Running", detail: "Long-distance & trail" },
          { symbol: "△", name: "Climbing", detail: "Multi-pitch & bouldering" },
          { symbol: "≋", name: "Swimming", detail: "Open water & laps" },
          { symbol: "◇", name: "Tennis", detail: "Competitive play" },
          { symbol: "⊕", name: "Yoga", detail: "Somatic integration" },
        ].map(a => (
          <div key={a.name} className="card-alchemist p-4 rounded-sm flex items-center gap-3"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-[#D4A843] text-lg w-6 text-center flex-shrink-0">{a.symbol}</span>
            <div>
              <p className="text-[#EDE0CC] font-medium text-sm"
                style={{ fontFamily: "Playfair Display, serif" }}>{a.name}</p>
              <p className="text-[#704214] text-xs mt-0.5"
                style={{ fontFamily: "Inter, sans-serif" }}>{a.detail}</p>
            </div>
          </div>
        ))}
        <div className="card-alchemist p-4 rounded-sm flex items-center gap-3 breathing-glow"
          style={{ background: "rgba(212,168,67,0.06)", borderColor: "rgba(212,168,67,0.3)" }}>
          <span className="text-[#D4A843] text-lg w-6 text-center flex-shrink-0">⛰</span>
          <div>
            <p className="text-[#D4A843] font-medium text-sm"
              style={{ fontFamily: "Playfair Display, serif" }}>Patagonia Retreat</p>
            <p className="text-[#C17817]/60 text-xs mt-0.5"
              style={{ fontFamily: "Inter, sans-serif" }}>Future vision</p>
          </div>
        </div>
      </div>
      <div className="card-alchemist p-4 rounded-sm"
        style={{ background: "rgba(44,24,16,0.2)" }}>
        <p className="text-[#8B9DAF] text-sm leading-relaxed italic"
          style={{ fontFamily: "Lora, serif" }}>
          "I approach training with the same systems-thinking mindset I'd bring to an engineering
          problem — optimizing for recovery protocols, TCM integration, and long-term body
          intelligence over short-term PRs."
        </p>
      </div>
    </div>
  );
}

function PhilosophySlide() {
  return (
    <div className="px-8 py-8 h-full flex flex-col justify-center max-w-2xl mx-auto w-full">
      <CartoucheLabel>The Legend</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Mental Models</h2>
      <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: "Lora, serif" }}>
        The frameworks I actually live by.
      </p>
      <AlchemicalDivider />
      <div className="grid gap-3">
        {[
          {
            glyph: "⊞",
            theme: "Systems over hacks",
            desc: "Sustainable change comes from understanding the system, not gaming individual variables.",
          },
          {
            glyph: "⊗",
            theme: "Science + tradition, not science vs.",
            desc: "TCM, Daoist philosophy, somatic theory, and Western research are different resolution levels of the same terrain.",
          },
          {
            glyph: "◎",
            theme: "Emotional intelligence as primary leverage",
            desc: "Most performance blockers are emotional, not informational. Cook-Greuter, IFS, Kessler — inner architecture first.",
          },
          {
            glyph: "₿",
            theme: "Sound money, Austrian foundations",
            desc: "Bitcoin as first principles — Austrian economics, time preference, and the importance of self-sovereignty.",
          },
          {
            glyph: "∞",
            theme: "INFJ / Schizoid pattern awareness",
            desc: "High idealism, selective depth, aversion to surface-level engagement. I build for the few rather than the many.",
          },
        ].map(f => (
          <div key={f.theme} className="card-alchemist flex gap-4 p-4 rounded-sm"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-[#D4A843] text-base flex-shrink-0 w-6 text-center mt-0.5">{f.glyph}</span>
            <div>
              <p className="text-[#EDE0CC] font-semibold text-sm"
                style={{ fontFamily: "Playfair Display, serif" }}>{f.theme}</p>
              <p className="text-[#8B9DAF] text-xs leading-relaxed mt-1"
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
        { name: "In Search of the Miraculous", author: "P.D. Ouspensky", note: "The clearest map of inner work I've found." },
        { name: "The Body Keeps the Score", author: "Bessel van der Kolk", note: "How trauma lives in the body. Essential foundation." },
        { name: "Ego Development", author: "Susanne Cook-Greuter", note: "The most rigorous framework for adult development." },
        { name: "The Bitcoin Standard", author: "Saifedean Ammous", note: "First principles thinking about money and time." },
        { name: "Radical Acceptance", author: "Tara Brach", note: "The cleanest entry point into somatic self-inquiry." },
      ],
    },
    tools: {
      label: "Tools",
      glyph: "⚙",
      items: [
        { name: "Obsidian", note: "Second brain. Local-first, markdown, no lock-in." },
        { name: "Linear", note: "Best issue tracker. No ceremony." },
        { name: "Claude API", note: "LLM of choice for psychological assessment work." },
        { name: "Cursor", note: "AI-native code editor — biggest productivity unlock this year." },
        { name: "Replit", note: "Fast prototyping when I need to ship an idea in an hour." },
      ],
    },
    gear: {
      label: "Gear",
      glyph: "⛺",
      items: [
        { name: "HOKA Speedgoat 5", note: "Trail running. Nothing else comes close for long days." },
        { name: "La Sportiva Mythos", note: "All-day climbing comfort. Versatile across styles." },
        { name: "Coros Vertix 2S", note: "GPS watch. Battery life that doesn't get in the way." },
        { name: "Theragun Pro", note: "Recovery tool I actually use. Worth it." },
        { name: "Lululemon Pace Breaker", note: "Best running short. Tested on 30+ mile weeks." },
      ],
    },
    food: {
      label: "Food",
      glyph: "⚗",
      items: [
        { name: "Nose-to-Tail Eating", note: "Organ meats, bone broth. High-nutrient density, low processed input." },
        { name: "Ancestral Sourcing", note: "Grass-fed, pasture-raised, wild-caught. Source > calories." },
        { name: "Intermittent Fasting", note: "16:8 as default. Simplifies decisions, sharpens mornings." },
        { name: "Magnesium Glycinate", note: "Non-negotiable supplement. Sleep quality changed." },
        { name: "Raw Dairy", note: "When you can source it properly. Different product than pasteurized." },
      ],
    },
    fitness: {
      label: "Fitness",
      glyph: "◉",
      items: [
        { name: "Zone 2 Training", note: "80% of volume here. Aerobic base is everything." },
        { name: "Yoga Nidra", note: "40 min = 4 hrs sleep in terms of nervous system reset." },
        { name: "Cold Exposure", note: "Morning cold shower. Sets tone for the day. Not optional." },
        { name: "Andrew Huberman Protocol", note: "Morning sunlight, no caffeine for 90min, delayed eating." },
        { name: "HRV Tracking", note: "Single best readiness metric. Overrides how you 'feel'." },
      ],
    },
  };

  const tabs = Object.entries(recs);
  const current = recs[activeTab];

  return (
    <div className="px-8 py-8 h-full flex flex-col max-w-2xl mx-auto w-full">
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

function VisionSlide() {
  return (
    <div className="px-8 py-8 h-full flex flex-col justify-center items-center text-center max-w-2xl mx-auto w-full">
      <div className="relative mb-8">
        <CompassRose size={80} className="opacity-60" />
        <div className="absolute inset-0 rounded-full breathing-glow"
          style={{ boxShadow: "0 0 50px rgba(212,168,67,0.15)" }} />
      </div>

      <CartoucheLabel>Terra Incognita</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-4"
        style={{ fontFamily: "Playfair Display, serif" }}>Where I'm Headed</h2>
      <AlchemicalDivider />

      <p className="text-[#8B9DAF] max-w-lg mb-8 leading-relaxed"
        style={{ fontFamily: "Lora, serif" }}>
        The endgame is a high-end retreat center in Patagonia — a physical home for everything
        I'm building in the digital space. A place where serious people come to do serious inner
        work, with the best facilitators, the best environment, and the right containers.
      </p>

      <div className="grid grid-cols-3 gap-4 w-full max-w-lg mb-8">
        {[
          { label: "Emotional Wellness", glyph: "◎" },
          { label: "Psychedelic Creativity", glyph: "∿" },
          { label: "Patagonian Landscape", glyph: "⛰" },
        ].map(p => (
          <div key={p.label} className="card-alchemist p-4 rounded-sm flex flex-col items-center gap-2"
            style={{ background: "rgba(44,24,16,0.3)" }}>
            <span className="text-[#D4A843] text-2xl">{p.glyph}</span>
            <p className="text-[#8B9DAF] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{p.label}</p>
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
    <div className="px-8 py-8 h-full flex flex-col justify-center items-center text-center max-w-2xl mx-auto w-full">
      <CartoucheLabel>Open Routes</CartoucheLabel>
      <h2 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1"
        style={{ fontFamily: "Playfair Display, serif" }}>Let's Connect</h2>
      <AlchemicalDivider />

      <p className="text-[#8B9DAF] max-w-lg mb-8 leading-relaxed"
        style={{ fontFamily: "Lora, serif" }}>
        I'm interested in conversations around psychedelics + medicine, psychological assessment
        tooling, sound money, extreme athletics, and anyone building something genuinely meaningful.
      </p>

      <div className="grid gap-3 w-full max-w-sm mb-8">
        {[
          {
            label: "Ideal collaborators",
            glyph: "◈",
            items: ["Therapists & facilitators", "Operators in wellness / food", "Engineers who've gone indie"],
          },
          {
            label: "What I'm curious about",
            glyph: "✦",
            items: ["Ego development research", "Regenerative food systems", "Somatic & psychedelic science"],
          },
        ].map(s => (
          <div key={s.label} className="card-alchemist p-4 rounded-sm text-left"
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
        <button className="wax-seal px-6 py-2.5 rounded-sm text-sm tracking-wide"
          style={{ fontFamily: "Inter, sans-serif" }}>
          Get in Touch
        </button>
        <button className="px-6 py-2.5 text-sm border border-[#704214]/50 text-[#8B9DAF] rounded-sm transition-all hover:border-[#D4A843]/40 hover:text-[#EDE0CC]"
          style={{ fontFamily: "Inter, sans-serif", background: "rgba(44,24,16,0.2)", cursor: "pointer" }}>
          Twitter / X
        </button>
      </div>
    </div>
  );
}

// ── Slide registry ───────────────────────────────────────────────────────────

const slides = [
  { id: "hero",            label: "Home",            Component: HeroSlide },
  { id: "ventures",        label: "Ventures",        Component: VenturesSlide },
  { id: "projects",        label: "Projects",        Component: ProjectsSlide },
  { id: "athletics",       label: "Athletics",       Component: AthleticsSlide },
  { id: "philosophy",      label: "Philosophy",      Component: PhilosophySlide },
  { id: "recommendations", label: "Codex",           Component: RecommendationsSlide },
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
    <div className="min-h-screen flex flex-col" style={{ background: "#0F1729" }}>

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
