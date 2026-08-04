import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { initScroll, scrollToId, resetScroll } from './lib/scroll';
import Home from './routes/Home';

/**
 * Detail routes are code-split. Home is eager — it is the landing page and
 * must paint immediately.
 */
const ServicesPage = lazy(() => import('./routes/ServicesPage'));
const PricingPage = lazy(() => import('./routes/PricingPage'));
const ProcessPage = lazy(() => import('./routes/ProcessPage'));
const ProjectsPage = lazy(() => import('./routes/ProjectsPage'));
const FaqPage = lazy(() => import('./routes/FaqPage'));
const ContactPage = lazy(() => import('./routes/ContactPage'));
const PrivacyPage = lazy(() => import('./routes/PrivacyPage'));
const TermsPage = lazy(() => import('./routes/TermsPage'));
const NotFound = lazy(() => import('./routes/NotFound'));

function RouteChrome() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const isHome = pathname === '/';

    if (!isHome) {
      document.body.dataset.locked = 'false';
      resetScroll();
      return;
    }

    // Arriving at /#pricing from a detail page: wait for layout, then scroll.
    if (hash) {
      const id = hash.slice(1);
      const t = setTimeout(() => scrollToId(id), 700);
      return () => clearTimeout(t);
    }
  }, [pathname, hash]);

  return null;
}

function Shell() {
  useEffect(() => {
    initScroll();
  }, []);

  return (
    <>
      <RouteChrome />
      <Suspense fallback={<div className="min-h-screen bg-obsidian" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
