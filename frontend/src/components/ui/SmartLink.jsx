import { Link, NavLink } from 'react-router-dom';
import { useSettings } from '../../content/ContentContext';
import { safeUrl } from '../../utils/links';
import { ROUTES } from '../../data/routes';

/** Resolves "@submit" to the admin-configured Submit Manuscript URL (falls back to the Contact page). */
export function useResolvedTo(to) {
  const settings = useSettings();
  if (to === ROUTES.submit) return settings.links?.submitManuscriptUrl?.trim() || ROUTES.contact;
  return to;
}

const isHttp = (u) => /^https?:\/\//i.test(u);
const isPlainAnchor = (u) => /^(mailto:|tel:)/i.test(u) || u.startsWith('#');

/** Link that works for in-site routes AND admin-supplied external URLs (opened in a new tab, noopener). */
export default function SmartLink({ to, children, ...rest }) {
  const url = safeUrl(useResolvedTo(to));
  if (isHttp(url)) return <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
  if (isPlainAnchor(url)) return <a href={url} {...rest}>{children}</a>;
  return <Link to={url} {...rest}>{children}</Link>;
}

/** NavLink twin: `className` may be a function ({isActive}) like React Router's NavLink. */
export function SmartNavLink({ to, end, className, children, ...rest }) {
  const url = safeUrl(useResolvedTo(to));
  if (isHttp(url) || isPlainAnchor(url)) {
    const cls = typeof className === 'function' ? className({ isActive: false }) : className;
    return (
      <a href={url} className={cls} {...(isHttp(url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return <NavLink to={url} end={end} className={className} {...rest}>{children}</NavLink>;
}
