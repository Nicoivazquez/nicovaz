// Private analytics endpoint for /analytics ("The Ledger").
//
// Required Vercel environment variables:
//   ANALYTICS_PASSWORD        — the password that unlocks the ledger
//   POSTHOG_PERSONAL_API_KEY  — PostHog personal API key with the query:read scope
// Optional:
//   POSTHOG_PROJECT_ID        — defaults to the Supervious project (433725)
//   POSTHOG_HOST              — defaults to https://us.posthog.com
/* global process */
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.posthog.com";
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID || "433725";

// Only count traffic to the personal site — its events share a PostHog project
// with Supervious, so every query must filter by host.
const HOST_FILTER =
  "(properties.$host ILIKE '%nicovaz.com%' OR properties.$host ILIKE '%nico-site%')";

const WRONG_PASSWORD_DELAY_MS = 400;
const MAX_ATTEMPTS_PER_WINDOW = 10;
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000;
const MAX_TRACKED_IPS = 500;
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

// Best-effort in-memory rate limit (per warm function instance).
const attempts = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  if (attempts.size > MAX_TRACKED_IPS) {
    for (const [key, value] of attempts) {
      if (now - value.windowStart >= ATTEMPT_WINDOW_MS) attempts.delete(key);
    }
  }
  const entry = attempts.get(ip) || { count: 0, windowStart: now };
  const fresh = now - entry.windowStart < ATTEMPT_WINDOW_MS
    ? entry
    : { count: 0, windowStart: now };
  const next = { ...fresh, count: fresh.count + 1 };
  attempts.set(ip, next);
  return next.count > MAX_ATTEMPTS_PER_WINDOW;
}

function safeEqual(given, expected) {
  const a = createHash("sha256").update(String(given)).digest();
  const b = createHash("sha256").update(String(expected)).digest();
  return timingSafeEqual(a, b);
}

// Short-lived HMAC token so the client never has to store the raw password.
// Signed with the password itself — no extra server secret needed.
function signToken(secret, expiresAt) {
  return createHmac("sha256", secret).update(`ledger:${expiresAt}`).digest("hex");
}

function issueToken(secret) {
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  return `${expiresAt}.${signToken(secret, expiresAt)}`;
}

function tokenIsValid(token, secret) {
  const [expiresAtRaw, signature] = String(token).split(".");
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now() || !signature) return false;
  return safeEqual(signature, signToken(secret, expiresAt));
}

async function runHogQL(apiKey, query) {
  const res = await fetch(`${POSTHOG_HOST}/api/projects/${PROJECT_ID}/query/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
  });
  if (!res.ok) {
    throw new Error(`PostHog query failed with status ${res.status}`);
  }
  const data = await res.json();
  return data.results || [];
}

const QUERIES = {
  daily: `
    SELECT toDate(timestamp) AS day, uniq(person_id) AS visitors, count() AS pageviews
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 30 DAY
      AND ${HOST_FILTER}
    GROUP BY day
    ORDER BY day`,
  totals: `
    SELECT
      uniqIf(person_id, timestamp >= now() - INTERVAL 7 DAY) AS visitors_7d,
      uniqIf(person_id, timestamp >= now() - INTERVAL 30 DAY) AS visitors_30d,
      uniq(person_id) AS visitors_year,
      countIf(timestamp >= now() - INTERVAL 30 DAY) AS pageviews_30d,
      count() AS pageviews_year
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 365 DAY
      AND ${HOST_FILTER}`,
  countries: `
    SELECT properties.$geoip_country_name AS country, uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 30 DAY
      AND ${HOST_FILTER}
      AND properties.$geoip_country_name IS NOT NULL
    GROUP BY country
    ORDER BY visitors DESC
    LIMIT 15`,
  cities: `
    SELECT
      concat(properties.$geoip_city_name, ', ', properties.$geoip_country_code) AS city,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 30 DAY
      AND ${HOST_FILTER}
      AND properties.$geoip_city_name IS NOT NULL
    GROUP BY city
    ORDER BY visitors DESC
    LIMIT 15`,
  slides: `
    SELECT properties.slide AS slide, uniq(person_id) AS visitors, count() AS views
    FROM events
    WHERE event = 'slide_view'
      AND timestamp >= now() - INTERVAL 30 DAY
      AND ${HOST_FILTER}
      AND properties.slide IS NOT NULL
    GROUP BY slide
    ORDER BY views DESC
    LIMIT 15`,
  referrers: `
    SELECT properties.$referring_domain AS referrer, uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL 30 DAY
      AND ${HOST_FILTER}
      AND properties.$referring_domain IS NOT NULL
    GROUP BY referrer
    ORDER BY visitors DESC
    LIMIT 15`,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const expected = process.env.ANALYTICS_PASSWORD;
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  if (!expected || !apiKey) {
    console.error("Ledger unconfigured: set ANALYTICS_PASSWORD and POSTHOG_PERSONAL_API_KEY.");
    return res.status(503).json({ error: "The ledger is not configured yet." });
  }

  // Prefer the Vercel-asserted client IP, which callers can't spoof
  const ip = (
    req.headers["x-vercel-forwarded-for"] ||
    req.headers["x-forwarded-for"] ||
    "unknown"
  ).split(",")[0].trim();
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many attempts. Try again later." });
  }

  const { password, token } = req.body || {};
  const authed = token
    ? tokenIsValid(token, expected)
    : Boolean(password) && safeEqual(password, expected);
  if (!authed) {
    await new Promise(resolve => setTimeout(resolve, WRONG_PASSWORD_DELAY_MS));
    return res.status(401).json({ error: "Wrong password, traveler." });
  }

  try {
    const [daily, totals, countries, cities, slides, referrers] = await Promise.all(
      Object.values(QUERIES).map(q => runHogQL(apiKey, q))
    );
    const t = totals[0] || [0, 0, 0, 0, 0];
    return res.status(200).json({
      token: issueToken(expected),
      totals: {
        visitors7d: t[0],
        visitors30d: t[1],
        visitorsYear: t[2],
        pageviews30d: t[3],
        pageviewsYear: t[4],
      },
      daily: daily.map(([day, visitors, pageviews]) => ({ day, visitors, pageviews })),
      countries: countries.map(([name, visitors]) => ({ name, visitors })),
      cities: cities.map(([name, visitors]) => ({ name, visitors })),
      slides: slides.map(([name, visitors, views]) => ({ name, visitors, views })),
      referrers: referrers.map(([name, visitors]) => ({ name, visitors })),
    });
  } catch (error) {
    console.error("Ledger query failed:", error);
    return res.status(502).json({ error: "Could not reach the archives. Try again shortly." });
  }
}
