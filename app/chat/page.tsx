// app/chat/page.tsx
"use client";

import { useEffect, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const quickPrompts = [
  "Immediate steps after a death in BC",
  "What paperwork do I need?",
  "Low-cost cremation options in Vancouver",
  "How to register a death in BC",
];

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Let’s take this one step at a time. Has your loved one passed away already, or are you pre-planning? If they have passed, were they at home, in hospital, or in long-term care? I can guide you based on that.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const existing = localStorage.getItem("sa_session_id");
    if (existing) setSessionId(existing);
    else {
      const id = uuid();
      localStorage.setItem("sa_session_id", id);
      setSessionId(id);
    }
  }, []);

  async function send(history: Msg[]) {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, sessionId }),
      });
      const data = await res.json();
      const reply: Msg = { role: "assistant", content: data.reply };
      setMessages((m) => [...m, reply]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "⚠️ Sorry — something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const user: Msg = { role: "user", content: input.trim() };
    const next = [...messages, user];
    setMessages(next);
    setInput("");
    await send(next);
  }

  async function handleQuick(text: string) {
    const user: Msg = { role: "user", content: text };
    const next = [...messages, user];
    setMessages(next);
    await send(next);
  }

  return (
    <main className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col p-4">
      <h1 className="mb-2 text-2xl font-semibold">Chat with “Sharon”</h1>
      <p className="mb-4 text-sm text-neutral-600">
        This is an early prototype. Please verify important details with official BC resources.
      </p>

      <div className="mb-2 flex flex-wrap gap-2">
        {quickPrompts.map((q) => (
          <button
            key={q}
            onClick={() => handleQuick(q)}
            className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-sm hover:bg-neutral-100"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto rounded-lg border border-neutral-200 bg-white p-4">
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          const className = `max-w-[85%] rounded-md px-3 py-2 ${
            isUser ? "ml-auto bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-900"
          }`;

        // assistant bubbles can include safe links from our API
          if (!isUser) {
            return (
              <div key={i} className={className} dangerouslySetInnerHTML={{ __html: m.content }} />
            );
          }
          return (
            <div key={i} className={className}>
              {m.content}
            </div>
          );
        })}
        {loading && (
          <div className="bg-neutral-100 text-neutral-500 rounded-md px-3 py-2">…</div>
        )}
      </div>

      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question…"
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-400"
        />
        <button className="rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800">
          Send
        </button>
      </form>

      <div className="mt-2 text-right">
        <a href="/guides" className="text-sm text-neutral-600 underline hover:text-neutral-800">
          Or view the printed guides
        </a>
      </div>
    </main>
  );
}
