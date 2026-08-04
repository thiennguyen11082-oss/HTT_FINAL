import PageShell from '../components/PageShell';
import { seo } from '../lib/seo';
import { DetailBlocks, ClosingBand } from '../components/DetailSections';
import { processPage as p } from '../content/pages';

export default function ProcessPage() {
  return (
    <PageShell
      index={p.index}
      eyebrow={p.eyebrow}
      title={p.title}
      lede={p.lede}
      backTo={p.backTo}
      seo={seo.process}
    >
      <DetailBlocks sections={p.sections} />
      {p.closing && <ClosingBand {...p.closing} />}
    </PageShell>
  );
}

