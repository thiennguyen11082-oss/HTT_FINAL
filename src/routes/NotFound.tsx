import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Backdrop from '../components/Backdrop';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen">
        <Backdrop />
        <div className="shell relative flex min-h-screen flex-col justify-center py-40">
          <span className="kicker mb-7">404 — Not found</span>
          <h1 className="display-2 ink-gradient max-w-[16ch]">This page does not exist.</h1>
          <p className="lede mt-7">
            The link may be out of date, or the page may have moved. Everything lives off the
            home page.
          </p>
          <Link to="/" className="btn btn-primary mt-10 w-fit">
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
