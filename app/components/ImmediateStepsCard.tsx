'use client';

import PrintButton from './PrintButton';
import DownloadPdfButton from './DownloadPdfButton';

export default function ImmediateStepsCard() {
  const targetId = 'immediate-steps-article';

  return (
    <article
      id={targetId}
      className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">
        Immediate Steps After a Death (British Columbia)
      </h2>
      <p className="mt-1 text-neutral-700">
        This quick guide covers the first calls to make, securing the home, and
        what documents to gather.
      </p>

      <h3 className="mt-8 text-2xl font-semibold">1. Confirm the death</h3>
      <ul className="mt-2 list-disc pl-6 space-y-1">
        <li>
          If the death was <strong>expected</strong> (e.g., at home under
          palliative care), call the doctor or nurse on duty. They will complete
          a Medical Certificate of Death.
        </li>
        <li>
          If the death was <strong>unexpected</strong>, call <strong>911</strong>{' '}
          immediately. Paramedics and/or police will attend; the coroner may be
          involved.
        </li>
      </ul>

      <h3 className="mt-6 text-2xl font-semibold">
        2. Contact a funeral provider (or cremation service)
      </h3>
      <ul className="mt-2 list-disc pl-6 space-y-1">
        <li>You don’t have to decide everything right now.</li>
        <li>
          Choose a licensed provider. They can transfer your loved one from the
          place of death.
        </li>
        <li>Prices vary widely—compare when you can.</li>
      </ul>

      <h3 className="mt-6 text-2xl font-semibold">
        3. Notify close family and friends
      </h3>
      <ul className="mt-2 list-disc pl-6 space-y-1">
        <li>Start with immediate family, then close friends.</li>
        <li>It’s okay to ask others to help make calls.</li>
      </ul>

      <h3 className="mt-6 text-2xl font-semibold">
        4. Secure property and personal items
      </h3>
      <ul className="mt-2 list-disc pl-6 space-y-1">
        <li>Make sure the home is locked.</li>
        <li>Collect valuables (wallet, jewelry, important documents).</li>
        <li>If they lived alone, ask a trusted neighbour to check in.</li>
      </ul>

      <h3 className="mt-6 text-2xl font-semibold">5. Gather key documents</h3>
      <ul className="mt-2 list-disc pl-6 space-y-1">
        <li>Government ID (driver’s licence, health card, passport)</li>
        <li>Birth certificate (if available)</li>
        <li>Social Insurance Number (SIN)</li>
        <li>Will/estate documents</li>
        <li>Insurance policies</li>
      </ul>

      <h3 className="mt-6 text-2xl font-semibold">6. Take care of yourself</h3>
      <ul className="mt-2 list-disc pl-6 space-y-1">
        <li>Drink water, rest, and ask for help.</li>
        <li>Write down tasks so you don’t have to remember everything.</li>
      </ul>

      <h3 className="mt-6 text-2xl font-semibold">
        ✅ Printable checklist
      </h3>
      <ul className="mt-2 space-y-2">
        {[
          'Confirm death (doctor, nurse, or 911).',
          'Contact a funeral/cremation provider.',
          'Notify close family/friends.',
          'Secure home & valuables.',
          'Collect ID and important documents.',
          'Drink water, rest, ask for help.',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 accent-neutral-800"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <PrintButton />
        <DownloadPdfButton
          targetId={targetId}
          filename="immediate-steps-bc.pdf"
        />
        <a
          href="/chat"
          className="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-100 print:hidden"
        >
          Ask Sharon about this
        </a>
      </div>

      <p className="mt-8 text-sm text-neutral-500">
        Prepared by Sharon’s Advice – Vancouver, BC. This guide is for general
        information only. For legal or medical matters, please contact a
        licensed professional.
      </p>
    </article>
  );
}
