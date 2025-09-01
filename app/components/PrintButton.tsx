// components/PrintButton.tsx
'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 print:hidden"
    >
      Print This Page
    </button>
  );
}
