import { useState } from 'react';
import Icon from '../ui/Icon';
import useSubmit from '../../hooks/useSubmit';
import { api } from '../../services/api';

/**
 * Newsletter signup posting to /api/newsletter.
 * variant="stack"  → stacked input + full-width button (footer)
 * variant="inline" → input and button side by side on ≥sm (banners)
 * tone="dark"      → status text styled for dark backgrounds
 */
export default function NewsletterForm({
  variant = 'stack',
  tone = 'light',
  source = 'website',
  placeholder = 'librarian@institution.edu',
  buttonLabel = 'Subscribe to Dispatch',
  buttonIcon,
  buttonClassName,
  inputClassName,
  note,
  noteClassName = '',
}) {
  const [email, setEmail] = useState('');
  const { status, message, submit, loading } = useSubmit((value) => api.subscribeNewsletter(value, source));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await submit(email)) setEmail('');
  };

  const inline = variant === 'inline';
  const statusColour =
    status === 'success'
      ? tone === 'dark' ? 'text-secondary-fixed' : 'text-secondary'
      : tone === 'dark' ? 'text-error-container' : 'text-error';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-space-xs w-full" noValidate={false}>
      <div className={inline ? 'flex flex-col sm:flex-row gap-2' : 'flex flex-col gap-space-xs mt-space-xs'}>
        <label className="sr-only" htmlFor={`newsletter-${source}`}>Email address</label>
        <input
          id={`newsletter-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={
            inputClassName ||
            (inline
              ? 'flex-1 px-4 py-3 rounded bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-secondary-fixed'
              : 'w-full px-space-md py-space-sm rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary shadow-[0_1px_3px_rgba(13,44,84,0.05)]')
          }
        />
        <button
          type="submit"
          disabled={loading}
          className={
            buttonClassName ||
            (inline
              ? 'px-6 py-3 rounded bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container shrink-0 flex items-center justify-center gap-2 disabled:opacity-60'
              : 'w-full px-space-md py-space-sm rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-fixed-dim transition-colors disabled:opacity-60')
          }
        >
          <span>{loading ? 'Sending…' : buttonLabel}</span>
          {buttonIcon && !loading && <Icon name={buttonIcon} size={16} />}
        </button>
      </div>
      {note && status === 'idle' && <p className={`font-label-sm text-label-sm ${noteClassName}`}>{note}</p>}
      <p role="status" aria-live="polite" className={`font-label-sm text-label-sm ${statusColour}`}>
        {message}
      </p>
    </form>
  );
}
