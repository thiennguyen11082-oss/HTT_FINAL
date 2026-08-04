import LegalPage from '../components/LegalPage';
import { seo } from '../lib/seo';
import { privacyPage } from '../content/legal';

export default function PrivacyPage() {
  return <LegalPage doc={privacyPage} seo={seo.privacy} />;
}
