import PageShell from '../components/PageShell';
import { seo } from '../lib/seo';
import { DetailBlocks, ClosingBand } from '../components/DetailSections';
import { servicesPage as p } from '../content/pages';

export default function ServicesPage() {
  return (
    <PageShell
      index={p.index}
      eyebrow={p.eyebrow}
      title={p.title}
      lede={p.lede}
      backTo={p.backTo}
      seo={seo.services}
    >
      <DetailBlocks sections={p.sections} />
      {p.closing && <ClosingBand {...p.closing} />}
    </PageShell>
  );
}

