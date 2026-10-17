import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

/**
 * Site shell: fixed header + page content + footer.
 * `pt-28` offsets the 112px fixed header (36px top bar + 80px nav bar).
 */
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded focus:bg-primary focus:text-on-primary"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="w-full pt-28 bg-surface min-h-[calc(100vh-112px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
