import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Introduction from '../components/sections/Introduction';
import Pricing from '../components/sections/Pricing';
import Process from '../components/sections/Process';
import Projects from '../components/sections/Projects';
import Services from '../components/sections/Services';
import Faq from '../components/sections/Faq';
import Contact from '../components/sections/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSeo, seo } from '../lib/seo';

export default function Home() {
  useSeo(seo.home);

  return (
    <>
      <Preloader />
      <Header />
      <BackToTop />

      <main>
        <Hero />
        {/* The argument runs before the proof: what we build and why it works,
            then the price, then how it happens, then the evidence. */}
        <Introduction />
        <Pricing />
        <Process />
        <Projects />
        <Services />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
