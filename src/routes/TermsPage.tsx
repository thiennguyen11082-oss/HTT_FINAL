import LegalPage from '../components/LegalPage';
import { seo } from '../lib/seo';
import { termsPage } from '../content/legal';

export default function TermsPage() {
  return <LegalPage doc={termsPage} seo={seo.terms} />;
}
