/**
 * Per-IP sliding-window rate limiting for the chat endpoint, backed by Upstash
 * Redis.
 *
 * Fail-open by design: if Redis is unconfigured or unreachable, requests are
 * allowed through and the reason is logged server-side. A Redis outage should
 * degrade cost protection, not take the chatbot offline. Every fail-open path
 * logs, so a silently-unprotected endpoint is visible in the function logs.
 *
 * Files under `api/` whose path segment starts with `_` are not routed as
 * serverless functions by Vercel, so this module is shared code, not an
 * endpoint.
 */
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import type { VercelRequest } from '@vercel/node';

/** Requests allowed per IP per window when CHATBOT_RATE_LIMIT_MAX is unset. */
const DEFAULT_MAX_REQUESTS = 15;
/** Window length when CHATBOT_RATE_LIMIT_WINDOW is unset. */
const DEFAULT_WINDOW = '1 h';

/**
 * Namespaces every key this limiter writes, so the Redis instance stays safe to
 * share with anything else that may point at it later.
 */
const KEY_PREFIX = 'chat-rl';

/** Matches the `@upstash/ratelimit` Duration format, e.g. "30 s", "15 m", "1 h". */
const DURATION_PATTERN = /^\d+\s*(ms|s|m|h|d)$/;

type Duration = Parameters<typeof Ratelimit.slidingWindow>[1];

export type RateLimitDecision =
  | { allowed: true; skipped: boolean }
  | { allowed: false; retryAfterSeconds: number };

/**
 * Reads the configured request ceiling. Falls back to the default when unset or
 * not a positive integer, so a typo in the Vercel dashboard can't disable the
 * limiter or set it to zero and lock everyone out.
 */
function resolveMaxRequests(): number {
  const raw = process.env.CHATBOT_RATE_LIMIT_MAX;
  if (!raw) return DEFAULT_MAX_REQUESTS;

  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    console.error(
      `[rate-limit] Invalid CHATBOT_RATE_LIMIT_MAX ${JSON.stringify(raw)}; using default ${DEFAULT_MAX_REQUESTS}`
    );
    return DEFAULT_MAX_REQUESTS;
  }

  return parsed;
}

/**
 * Reads the configured window. An unparseable value would throw inside
 * `slidingWindow`, so it's validated here and defaulted instead.
 */
function resolveWindow(): Duration {
  const raw = process.env.CHATBOT_RATE_LIMIT_WINDOW;
  if (!raw) return DEFAULT_WINDOW;

  const trimmed = raw.trim();
  if (!DURATION_PATTERN.test(trimmed)) {
    console.error(
      `[rate-limit] Invalid CHATBOT_RATE_LIMIT_WINDOW ${JSON.stringify(raw)}; using default "${DEFAULT_WINDOW}"`
    );
    return DEFAULT_WINDOW;
  }

  return trimmed as Duration;
}

/**
 * Built once per warm function instance and reused across invocations. `null`
 * means Redis credentials are absent — the limiter stays dormant rather than
 * failing requests.
 */
let limiter: Ratelimit | null | undefined;

/**
 * Resolves Redis REST credentials.
 *
 * The Vercel Upstash integration injects `KV_REST_API_URL` / `KV_REST_API_TOKEN`,
 * so those are preferred. `UPSTASH_REDIS_REST_*` is accepted as a fallback for a
 * manually configured instance and is what Upstash's own docs use. Both halves
 * must come from the same pair — mixing a URL and token from different
 * instances would authenticate against the wrong database.
 */
function resolveRedisCredentials(): { url: string; token: string } | null {
  const integrationUrl = process.env.KV_REST_API_URL;
  const integrationToken = process.env.KV_REST_API_TOKEN;
  if (integrationUrl && integrationToken) {
    return { url: integrationUrl, token: integrationToken };
  }

  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (upstashUrl && upstashToken) {
    return { url: upstashUrl, token: upstashToken };
  }

  return null;
}

function getLimiter(): Ratelimit | null {
  if (limiter !== undefined) return limiter;

  const credentials = resolveRedisCredentials();

  if (!credentials) {
    console.error(
      '[rate-limit] No Redis credentials (KV_REST_API_URL/TOKEN or UPSTASH_REDIS_REST_URL/TOKEN) — chat endpoint is running UNRATE-LIMITED'
    );
    limiter = null;
    return limiter;
  }

  const { url, token } = credentials;

  try {
    limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      // Sliding window rather than fixed: a fixed window lets a caller spend a
      // full allowance at the end of one window and again at the start of the
      // next, doubling the effective burst.
      limiter: Ratelimit.slidingWindow(resolveMaxRequests(), resolveWindow()),
      prefix: KEY_PREFIX,
      analytics: false,
    });
  } catch (error) {
    console.error('[rate-limit] Failed to initialise limiter:', error);
    limiter = null;
  }

  return limiter;
}

/**
 * Best-effort client identifier. Vercel terminates TLS at the edge, so the
 * socket address is the proxy — `x-forwarded-for` is the real client and its
 * first entry is the originating IP.
 */
export function getClientIdentifier(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;

  const firstHop = raw?.split(',')[0]?.trim();
  if (firstHop) return firstHop;

  const realIp = req.headers['x-real-ip'];
  const resolvedRealIp = Array.isArray(realIp) ? realIp[0] : realIp;
  if (resolvedRealIp) return resolvedRealIp;

  return req.socket?.remoteAddress ?? 'unknown';
}

/**
 * Consumes one token for `identifier`.
 *
 * `skipped: true` means no limit was applied (Redis unconfigured or erroring).
 */
export async function checkRateLimit(identifier: string): Promise<RateLimitDecision> {
  const activeLimiter = getLimiter();
  if (!activeLimiter) return { allowed: true, skipped: true };

  try {
    const { success, reset } = await activeLimiter.limit(identifier);

    if (success) return { allowed: true, skipped: false };

    // `reset` is an epoch-ms timestamp for when the next token frees up.
    const retryAfterSeconds = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return { allowed: false, retryAfterSeconds };
  } catch (error) {
    console.error('[rate-limit] Redis lookup failed, allowing request:', error);
    return { allowed: true, skipped: true };
  }
}
