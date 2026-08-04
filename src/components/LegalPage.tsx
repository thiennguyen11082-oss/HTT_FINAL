import PageShell from './PageShell';
import { DetailBlocks } from './DetailSections';
import type { LegalDoc } from '../content/legal';

/**
 * Shared layout for the two legal pages.
 *
 * Same masthead and block renderer as the detail pages, deliberately — a policy
 * that looks like it belongs to a different site reads as boilerplate someone
 * pasted in. Two differences: an effective date, and no closing call to action.
 * Nobody finishes a privacy policy wanting to start a project.
 */
export default function LegalPage({
  doc,
  seo,
}: {
  doc: LegalDoc;
  seo: { title: string; description: string; path: string };
}) {
  return (
    <PageShell
      index={doc.index}
      eyebrow={doc.eyebrow}
      title={doc.title}
      lede={doc.lede}
      seo={seo}
    >
      <div className="shell pt-12 md:pt-16">
        <p className="font-display text-[0.62rem] font-700 uppercase tracking-wide2 text-chalk-faint">
          Last updated {doc.updated}
        </p>
      </div>

      <DetailBlocks sections={doc.sections} />
    </PageShell>
  );
}
