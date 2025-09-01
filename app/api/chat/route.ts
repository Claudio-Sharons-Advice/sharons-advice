// app/api/chat/route.ts
import OpenAI from "openai";
import { headers } from "next/headers";
import { rateLimit } from "../../lib/rateLimit";

export const runtime = "nodejs";

// --- ENV + client setup ---
const apiKey = process.env.OPENAI_API_KEY;
console.log("[chat env] OPENAI_API_KEY prefix:", apiKey?.slice(0, 6) || "MISSING");
if (!apiKey) console.error("[chat] Missing OPENAI_API_KEY");
const openai = apiKey ? new OpenAI({ apiKey }) : null;

// --- System prompt ---
const SYSTEM_PROMPT = `
You are “Sharon’s Advice,” a compassionate funeral-planning guide for Vancouverites (in British Columbia).
You have worked in the industry for decades and know the system inside and out.
You are here to help people navigate this complex and confusing time smoothly, confidently, and help them avoid getting ripped off.

STYLE & FORMAT
- Warm, steady tone. Plain language (Grade 6–8).
- Keep answers brief: 3–6 sentences or short bullet steps.
- Ask at most ONE clarifying question when needed.
- Offer a low-cost, ethical option first.
- End with: “Would you like a short printable checklist?” when appropriate.
- Add: “This is general information only.” when advice could be interpreted as legal/medical/financial.

SCOPE
- Topics: immediate steps, paperwork, costs, simple funerals/cremation, grief resources.
- Use BC terms/resources when relevant (Vital Statistics, Service BC, Coroners Service of BC, Service Canada/CPP/OAS, CRA).
- If unsure or rules vary by municipality/provider, say so and suggest who to call in BC.

DON’TS
- Do not provide legal, medical, or tax advice.
- Do not invent prices or policies; give ranges and note they vary by provider.
- If user goes off-topic (crypto, fitness, coding, etc.), steer back to funeral planning.
`;

const CRISIS =
  /suicide|self-harm|kill myself|end my life|hurt myself|i don't want to live/i;

// Broader off-topic detector (includes typos like "crypo" and topics like weather/investing/smut)
const OFF_TOPIC_RE =
  /\b(crypto|crypt?o|bitcoin|stocks?|trading|invest(ing)?|weather|forecast|sports?|news|politics?|election|gaming|movies?|music|celebs?|shopping|coupons?|fitness|diet|workout|sex|porn|smut|nsfw|dating|recipes?)\b/i;

function isOffTopic(text: string) {
  return OFF_TOPIC_RE.test(text || "");
}
function offTopicTurns(history: { role: "user" | "assistant"; content: string }[]) {
  return history.filter((m) => m.role === "user" && isOffTopic(m.content)).length;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  // Early env guard
  if (!apiKey || !openai) {
    return json(
      {
        reply:
          "Config error: missing OpenAI API key on the server. Add OPENAI_API_KEY to .env.local and restart.",
      },
      500
    );
  }

  // Rate limit by IP (inside handler)
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = await rateLimit(`chat:${ip}`);
  if (!rl.success) {
    return json(
      { reply: "You’ve sent a few messages quickly. Please wait a moment and try again." },
      429
    );
  }

  // Read body (now also accepts sessionId)
  const { history, sessionId } = (await req.json()) as {
    history: { role: "user" | "assistant"; content: string }[];
    sessionId?: string;
  };
  console.log("[chat] session:", sessionId);

  const last = history[history.length - 1]?.content ?? "";
  console.log("[chat] incoming last:", last);

  // Crisis safety
  if (CRISIS.test(last)) {
    const reply =
      "I’m really sorry you’re feeling this way. If you’re in immediate danger, please call 911. " +
      "In BC, you can reach the 310Mental Health Support line at 310-6789 (no area code) or 1-800-SUICIDE (1-800-784-2433) 24/7. " +
      "When you’re ready, I can return to funeral planning. You’re not alone.";
    return json({ reply });
  }

  // Off-topic deflection: gentle on 1st, firmer on 2nd, then fall through to model
  const count = offTopicTurns(history);
  if (isOffTopic(last)) {
    if (count === 1) {
      const firstReplies = [
        "I’m here to guide you with funeral planning in BC — like immediate steps, paperwork, or grief support. Which of those feels most urgent for you?",
        "Let’s keep this focused on funeral planning. Do you need help with costs, paperwork, or arranging a service?",
        "I can share practical steps for funerals in BC — immediate steps, bereavement checklists, or planning guidance. Where would you like to start?",
      ];
      return json({ reply: firstReplies[Math.floor(Math.random() * firstReplies.length)] });
    } else if (count === 2) {
      const secondReplies = [
        `I understand, but I can only talk about funerals and related steps in BC. Would you like the <a href="/guides/immediate-steps-bc" class="underline">Immediate Steps</a> guide or the <a href="/guides/bereaved-checklist" class="underline">Bereaved Checklist</a>?`,
        `That topic’s outside my scope. I can walk you through low-cost cremation/burial, required paperwork, or grief supports in BC. Want a short checklist? Try <a href="/guides/immediate-steps-bc" class="underline">Immediate Steps</a>.`,
      ];
      return json({ reply: secondReplies[Math.floor(Math.random() * secondReplies.length)] });
    }
    // count >= 3 → fall through to OpenAI (still under SYSTEM_PROMPT)
  }

  // Cap message lengths a bit
  const trimmedHistory = history.map((m) => ({
    ...m,
    content: (m.content || "").slice(0, 2000),
  }));

  // Call OpenAI
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmedHistory],
  });

  const ai = completion.choices[0]?.message?.content ?? "Sorry—no response.";
  return json({ reply: ai });
}
