import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import OpenAccess from './pages/open-access';
import Resources from './pages/resources';
import RequestWaiver from './pages/request-waiver';
import Journals from './pages/journals';
import PlaceholderPage from './pages/PlaceholderPage';
import NotFound from './pages/NotFound';
import { PLACEHOLDER_PAGES, ROUTES } from './data/routes';

// The admin panel is a separate chunk: public visitors never download it.
const AdminApp = lazy(() => import('./admin/AdminApp'));

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}><AdminApp /></Suspense>} />
      {/* Site shell: header + content + footer */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.about} element={<About />} />
        <Route path={ROUTES.contact} element={<Contact />} />
        <Route path={ROUTES.openAccess} element={<OpenAccess />} />
        <Route path={ROUTES.journals} element={<Journals />} />
        <Route path={ROUTES.resources} element={<Resources />} />
        <Route path={ROUTES.requestWaiver} element={<RequestWaiver />} />
        {PLACEHOLDER_PAGES.map((p) => (
          <Route key={p.path} path={p.path} element={<PlaceholderPage {...p} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>
  );
}
