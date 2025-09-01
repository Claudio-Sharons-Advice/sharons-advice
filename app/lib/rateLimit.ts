    // lib/rateLimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 20 requests / 10 minutes per IP (tweak as you like)
const WINDOW = "10 m";
const LIMIT = 20;

let ratelimiter: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  ratelimiter = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(LIMIT, WINDOW) });
}

export async function rateLimit(key: string) {
  if (!ratelimiter) {
    // dev fallback: allow
    return { success: true, remaining: LIMIT, reset: Date.now() + 60_000 };
  }
  const res = await ratelimiter.limit(key);
  return res;
}
