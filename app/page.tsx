// app/page.tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Welcome to Sharon's Advice</h1>
      <p className="mt-4 text-neutral-700">
        Helping families in Vancouver navigate funeral planning with clarity and care.
      </p>

      <div className="mt-8 space-x-3">
        <a
          href="/guides"
          className="inline-block rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
        >
          View Essential Guides
        </a>
        <a
          href="/chat"
          className="inline-block border border-neutral-300 px-4 py-2 hover:bg-neutral-100"
        >
          Chat with "Sharon"
        </a>
      </div>
    </main>
  );
}
