// app/guides/[slug]/page.tsx
import { notFound } from "next/navigation";
import { GUIDES } from "../guides";

// full guide components (client components you already made)
import ImmediateStepsCard from "../../components/ImmediateStepsCard";
import BereavedChecklistCard from "../../components/BereavedChecklistCard";

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = GUIDES.find((g) => g.slug === slug);
  return {
    title: meta ? `${meta.title} | Sharon's Advice` : "Guide | Sharon's Advice",
    description: meta?.blurb ?? "Funeral planning guide",
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let Content: React.ReactNode = null;

  switch (slug) {
    case "immediate-steps-bc":
      Content = <ImmediateStepsCard />;
      break;
    case "bereaved-checklist":
      Content = <BereavedChecklistCard />;
      break;
    default:
      notFound();
  }

  const meta = GUIDES.find((g) => g.slug === slug);

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mt-4 text-sm">
        <a href="/guides" className="text-neutral-600 underline hover:text-neutral-800">
          ← Back to all guides
        </a>
      </nav>

      <header className="pt-4">
        <h1 className="text-3xl font-bold">{meta?.title ?? "Guide"}</h1>
        {meta?.blurb && <p className="mt-2 text-neutral-700">{meta.blurb}</p>}
      </header>

      {/* Full guide content (includes Print / Download buttons) */}
      {Content}
    </div>
  );
}
