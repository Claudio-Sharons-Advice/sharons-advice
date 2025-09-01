// app/guides/page.tsx
import { GUIDES } from "./guides";

export const metadata = {
  title: "Essential Guides | Sharon’s Advice",
  description:
    "A compact list of printable guides. Choose a guide to view details, print, or download.",
};

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="pt-6 lg:pt-10">
        <h1 className="text-3xl font-bold">Essential Guides</h1>
        <p className="mt-2 text-neutral-700">
          Pick a guide to view the full steps, then print or download the PDF.
        </p>
      </header>

      <ul className="mt-6 space-y-4">
        {GUIDES.map((g) => (
          <li
            key={g.slug}
            className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold">{g.title}</h2>
            <p className="mt-1 text-neutral-700">{g.blurb}</p>

            <div className="mt-4 flex gap-3">
              <a
                href={`/guides/${g.slug}`}
                className="rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
              >
                View guide
              </a>
              <a
                href="/chat"
                className="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-100"
              >
                Ask Sharon
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
