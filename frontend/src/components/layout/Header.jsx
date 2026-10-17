import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../ui/Icon';
import Container from '../ui/Container';
import { SmartNavLink } from '../ui/SmartLink';
import TopBar from './TopBar';
import { useImages, useSettings } from '../../content/ContentContext';
import { ROUTES } from '../../data/routes';

const linkClass = ({ isActive }) =>
  `transition-colors ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`;

/** Fixed two-tier header: utility strip (TopBar) + logo/navigation bar. Below `lg` the menu collapses. */
export default function Header() {
  const { brand, nav, ui } = useSettings();
  const images = useImages();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="fixed top-0 w-full z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <TopBar />
      <div className="bg-surface/90 backdrop-blur-xl">
        <Container className="h-20 flex items-center justify-between gap-space-lg">
          <Link to={ROUTES.home} className="flex items-center gap-space-md shrink-0" aria-label={`${brand.name} home`}>
            <img src={images.logo.src} alt={images.logo.alt} className="h-14 w-14 object-contain" />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-semibold">{brand.name}</span>
              <span className="hidden sm:block font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
                {brand.tagline}
              </span>
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-space-lg font-label-lg text-label-lg">
            {nav.main.map((item) => (
              <SmartNavLink key={item.label} to={item.to} end={item.end} className={linkClass}>
                {item.label}
              </SmartNavLink>
            ))}
          </nav>

          <div className="flex items-center gap-space-md shrink-0">
            <Link
              to={nav.searchTo}
              className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <Icon name="search" size={18} />
              <span className="hidden md:inline font-label-md text-label-md">{ui.header.search}</span>
            </Link>
            <Link
              to="/admin"
              aria-label="Admin sign in"
              title="Admin sign in"
              className="hidden sm:flex w-8 h-8 rounded-full bg-primary items-center justify-center shrink-0 hover:bg-primary-container transition-colors"
            >
              <Icon name="person" size={18} className="text-on-primary" />
            </Link>
            <button
              type="button"
              className="lg:hidden w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </Container>

        {menuOpen && (
          <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden bg-surface border-t border-outline-variant/40 shadow-lg">
            <Container className="py-space-md flex flex-col gap-space-xs font-label-lg text-label-lg">
              {nav.main.map((item) => (
                <SmartNavLink key={item.label} to={item.to} end={item.end} className={(s) => `${linkClass(s)} py-space-sm`}>
                  {item.label}
                </SmartNavLink>
              ))}
            </Container>
          </nav>
        )}
      </div>
    </header>
  );
}
