'use client';

import { useState } from 'react';

export default function DownloadPdfButton({
  targetId,
  filename = 'immediate-steps-bc.pdf',
}: {
  targetId: string;
  filename?: string;
}) {
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    setBusy(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default; // dynamic import
      const el = document.getElementById(targetId);
      if (!el) throw new Error(`Element #${targetId} not found`);

      await html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(el)
        .save();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-100 print:hidden disabled:opacity-60"
      disabled={busy}
    >
      {busy ? 'Preparing…' : 'Download PDF'}
    </button>
  );
}
