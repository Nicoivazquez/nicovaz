import { useEffect, useState } from "react";
import { CartoucheLabel, AlchemicalDivider } from "./App.jsx";

const STORAGE_KEY = "ledger-key";

const FONTS = {
  display: "Playfair Display, serif",
  body: "Lora, serif",
  ui: "Inter, sans-serif",
};

function StatTile({ label, value }) {
  return (
    <div className="card-alchemist rise-in p-4 sm:p-5 rounded-sm text-center"
      style={{ background: "rgba(44,24,16,0.3)" }}>
      <p className="text-[#EDE0CC] text-2xl sm:text-3xl font-bold" style={{ fontFamily: FONTS.display }}>
        {value.toLocaleString()}
      </p>
      <p className="text-[#8B9DAF] text-[11px] mt-1 uppercase tracking-widest" style={{ fontFamily: FONTS.ui }}>
        {label}
      </p>
    </div>
  );
}

function DailyChart({ daily }) {
  const [hover, setHover] = useState(null);
  if (!daily.length) {
    return (
      <p className="text-[#8B9DAF] text-sm italic py-8 text-center" style={{ fontFamily: FONTS.body }}>
        No footprints recorded yet. Check back once travelers arrive.
      </p>
    );
  }
  const max = Math.max(...daily.map(d => d.visitors), 1);
  const formatDay = iso =>
    new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div>
      <div className="flex items-end gap-[2px] h-32" role="img"
        aria-label={`Daily unique visitors, last ${daily.length} days`}>
        {daily.map(d => (
          <div
            key={d.day}
            className="flex-1 relative"
            style={{ height: "100%" }}
            onMouseEnter={() => setHover(d)}
            onMouseLeave={() => setHover(null)}
          >
            <div
              className="absolute bottom-0 left-0 right-0 rounded-t-[4px] transition-opacity"
              title={`${formatDay(d.day)}: ${d.visitors} visitors, ${d.pageviews} pageviews`}
              style={{
                height: `${Math.max((d.visitors / max) * 100, 2)}%`,
                background: hover && hover.day === d.day ? "#EDE0CC" : "#D4A843",
                opacity: hover && hover.day !== d.day ? 0.45 : 0.9,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[#8B9DAF] text-[10px]" style={{ fontFamily: FONTS.ui }}>
        <span>{formatDay(daily[0].day)}</span>
        <span className="text-[#D4A843]">
          {hover
            ? `${formatDay(hover.day)} — ${hover.visitors} visitors · ${hover.pageviews} pageviews`
            : `peak ${max.toLocaleString()} visitors/day`}
        </span>
        <span>{formatDay(daily[daily.length - 1].day)}</span>
      </div>
    </div>
  );
}

function BreakdownList({ title, rows, valueLabel }) {
  const max = Math.max(...rows.map(r => r.visitors), 1);
  return (
    <div className="card-alchemist rise-in p-5 rounded-sm text-left" style={{ background: "rgba(44,24,16,0.3)" }}>
      <p className="text-[#D4A843] text-xs font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: FONTS.ui }}>
        {title}
      </p>
      {rows.length === 0 && (
        <p className="text-[#8B9DAF] text-xs italic" style={{ fontFamily: FONTS.body }}>Nothing charted yet.</p>
      )}
      {rows.map(row => (
        <div key={row.name} className="mb-2.5">
          <div className="flex justify-between items-baseline gap-3">
            <span className="text-[#EDE0CC] text-sm truncate" style={{ fontFamily: FONTS.body }}>{row.name}</span>
            <span className="text-[#8B9DAF] text-xs flex-shrink-0" style={{ fontFamily: FONTS.ui }}>
              {row.visitors.toLocaleString()}{valueLabel ? ` ${valueLabel}` : ""}
            </span>
          </div>
          <div className="h-[3px] mt-1 rounded-full" style={{ background: "rgba(112,66,20,0.25)" }}>
            <div className="h-full rounded-full" style={{ width: `${(row.visitors / max) * 100}%`, background: "#D4A843", opacity: 0.8 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [password, setPassword] = useState("");
  // locked | loading | open — starts in loading when a key from this session can re-open the ledger
  const [status, setStatus] = useState(() =>
    sessionStorage.getItem(STORAGE_KEY) ? "loading" : "locked"
  );
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  // Authenticates with the password once; afterwards only a short-lived token
  // issued by the server is kept in sessionStorage — never the password itself.
  const unlock = async (credentials) => {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        sessionStorage.removeItem(STORAGE_KEY);
        setStatus("locked");
        setError(body.error || `The archives did not answer (HTTP ${res.status}).`);
        return;
      }
      const body = await res.json();
      if (body.token) sessionStorage.setItem(STORAGE_KEY, body.token);
      setPassword("");
      setData(body);
      setStatus("open");
    } catch {
      setStatus("locked");
      setError("Could not reach the archives. Are you offline?");
    }
  };

  // Re-open automatically if unlocked earlier this session (deferred a tick so
  // the effect itself doesn't set state synchronously)
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const timer = setTimeout(() => unlock({ token: saved }), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-dvh px-4 py-10 sm:px-8 sm:py-16" style={{ background: "#0F1729" }}>
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <CartoucheLabel>The Ledger</CartoucheLabel>
        <h1 className="text-3xl font-bold text-[#EDE0CC] mt-3 mb-1" style={{ fontFamily: FONTS.display }}>
          Visitor Log
        </h1>
        <p className="text-[#8B9DAF] mb-6 text-sm" style={{ fontFamily: FONTS.body }}>
          Who wandered through the atlas, and from where.
        </p>
        <AlchemicalDivider />

        {status !== "open" && (
          <form
            className="card-alchemist w-full max-w-sm p-6 rounded-sm mt-4"
            style={{ background: "rgba(44,24,16,0.3)" }}
            onSubmit={e => {
              e.preventDefault();
              if (password) unlock({ password });
            }}
          >
            <label htmlFor="ledger-password"
              className="block text-[#D4A843] text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ fontFamily: FONTS.ui }}>
              Speak the password
            </label>
            <input
              id="ledger-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-3 py-2.5 rounded-sm text-[#EDE0CC] text-sm mb-3"
              style={{
                fontFamily: FONTS.ui,
                background: "rgba(15,23,41,0.8)",
                border: "1px solid rgba(212,168,67,0.35)",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading" || !password}
              className="wax-seal w-full px-6 py-2.5 rounded-sm text-sm tracking-wide disabled:opacity-50"
              style={{ fontFamily: FONTS.ui }}
            >
              {status === "loading" ? "Consulting the archives…" : "Unlock the Ledger →"}
            </button>
            {error && (
              <p className="text-[#C17817] text-xs mt-3" role="alert" style={{ fontFamily: FONTS.body }}>
                {error}
              </p>
            )}
          </form>
        )}

        {status === "open" && data && (
          <div className="w-full mt-2">
            {/* Headline numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <StatTile label="Visitors · 7 days" value={data.totals.visitors7d} />
              <StatTile label="Visitors · 30 days" value={data.totals.visitors30d} />
              <StatTile label="Visitors · year" value={data.totals.visitorsYear} />
              <StatTile label="Pageviews · 30 days" value={data.totals.pageviews30d} />
            </div>

            {/* Daily visitors */}
            <div className="card-alchemist rise-in p-5 rounded-sm text-left mb-6" style={{ background: "rgba(44,24,16,0.3)" }}>
              <p className="text-[#D4A843] text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: FONTS.ui }}>
                Daily visitors — last 30 days
              </p>
              <DailyChart daily={data.daily} />
            </div>

            {/* Breakdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <BreakdownList title="Countries — 30 days" rows={data.countries} />
              <BreakdownList title="Cities — 30 days" rows={data.cities} />
              <BreakdownList title="Slides read — 30 days"
                rows={data.slides.map(s => ({ name: s.name, visitors: s.views }))} valueLabel="views" />
              <BreakdownList title="Came from — 30 days" rows={data.referrers} />
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  const saved = sessionStorage.getItem(STORAGE_KEY);
                  if (saved) unlock({ token: saved });
                }}
                className="text-[#D4A843] text-xs underline-offset-4 hover:underline"
                style={{ fontFamily: FONTS.ui, background: "none", border: "none", cursor: "pointer" }}
              >
                Refresh
              </button>
              <button
                onClick={() => {
                  sessionStorage.removeItem(STORAGE_KEY);
                  setData(null);
                  setPassword("");
                  setStatus("locked");
                }}
                className="text-[#8B9DAF] text-xs underline-offset-4 hover:underline"
                style={{ fontFamily: FONTS.ui, background: "none", border: "none", cursor: "pointer" }}
              >
                Seal the ledger
              </button>
            </div>
            <p className="text-[#704214] text-[10px] mt-4" style={{ fontFamily: FONTS.ui }}>
              Unique visitors via PostHog · locations approximated from IP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
