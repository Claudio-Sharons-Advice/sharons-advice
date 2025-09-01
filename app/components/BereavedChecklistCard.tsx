'use client';

import PrintButton from "../components/PrintButton";
import DownloadPdfButton from "../components/DownloadPdfButton";

export default function BereavedChecklistCard() {
  const targetId = "bereaved-checklist-article";

  return (
    <article
      id={targetId}
      className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Checklist for the Bereaved</h2>
      <p className="mt-1 text-neutral-700">
        A comprehensive list of tasks to complete after a loved one's death. 
        Use this at your own pace—many of these items can wait until later.
      </p>

      {/* --- Index / “Fill This Out Last” --- */}
      <h3 className="mt-8 text-2xl font-semibold">Index</h3>
      <ul className="mt-2 list-disc pl-6 space-y-1">
        <li>Immediate actions (first week)</li>
        <li>Administrative tasks (weeks 2–6)</li>
        <li>Financial & legal steps (months 1–6)</li>
        <li>Emotional & community support</li>
      </ul>
      <p className="mt-2 text-sm text-neutral-500">Note: “Fill This Out Last” means you can defer until urgent matters are settled.</p>

      {/* --- Chapter 1: Immediate actions --- */}
      <h3 className="mt-8 text-2xl font-semibold">Chapter 1: Immediate Actions</h3>
      <p className="mt-1 text-neutral-700">
        These are priorities for the first few days to a week. Lean on close friends or family where possible.
      </p>
      <ul className="mt-2 space-y-2">
        {[
          "Secure home, pets, and valuables.",
          "Notify close family and friends.",
          "Arrange funeral or cremation with a licensed provider.",
          "Gather government ID and important documents.",
        ].map(item => (
          <li key={item} className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 h-5 w-5 accent-neutral-800" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* --- Chapter 2: Administrative tasks --- */}
      <h3 className="mt-8 text-2xl font-semibold">Chapter 2: Administrative Tasks</h3>
      <ul className="mt-2 space-y-2">
        {[
          "Order multiple copies of the Death Certificate.",
          "Contact Service Canada to cancel SIN, CPP, OAS (if applicable).",
          "Notify banks and credit card companies.",
          "Cancel utilities, phone, and subscriptions.",
        ].map(item => (
          <li key={item} className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 h-5 w-5 accent-neutral-800" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* --- Chapter 3: Financial & legal steps --- */}
      <h3 className="mt-8 text-2xl font-semibold">Chapter 3: Financial & Legal Steps</h3>
      <ul className="mt-2 space-y-2">
        {[
          "Meet with the executor to review the will/estate plan.",
          "Contact life insurance providers and file claims.",
          "Update joint accounts, mortgages, or property titles.",
          "Redirect mail and update government records.",
        ].map(item => (
          <li key={item} className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 h-5 w-5 accent-neutral-800" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* --- Chapter 4: Emotional & community support --- */}
      <h3 className="mt-8 text-2xl font-semibold">Chapter 4: Emotional & Community Support</h3>
      <ul className="mt-2 space-y-2">
        {[
          "Reach out to a grief support group or counsellor.",
          "Talk to your family doctor if you need mental health resources.",
          "Lean on friends/community for meals, errands, childcare.",
        ].map(item => (
          <li key={item} className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 h-5 w-5 accent-neutral-800" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* --- Action buttons --- */}
      <div className="mt-6 flex flex-wrap gap-3">
        <PrintButton />
        <DownloadPdfButton targetId={targetId} filename="bereaved-checklist.pdf" />
        <a href="/chat" className="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-100 print:hidden">
          Ask Sharon about this
        </a>
      </div>

      <p className="mt-8 text-sm text-neutral-500">
        Prepared by Sharon’s Advice – Vancouver, BC. This guide is general information only.
        For legal or financial matters, please seek professional advice.
      </p>
    </article>
  );
}
