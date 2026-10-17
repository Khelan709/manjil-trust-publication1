/**
 * Link to a downloadable file. While `href` is empty (file not uploaded yet) it
 * renders an inert button with a tooltip, so the layout is final and wiring a
 * real file later is a one-line data change.
 */
export default function FileLink({ href, className = '', children, ...rest }) {
  if (href) {
    return <a href={href} download className={className} {...rest}>{children}</a>;
  }
  return (
    <button type="button" title="This file will be available soon" aria-disabled="true" className={className} {...rest}>
      {children}
    </button>
  );
}
