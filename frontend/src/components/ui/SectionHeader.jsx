import Eyebrow from './Eyebrow';

/** Eyebrow + serif heading + optional description, left or centre aligned. */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  id,
  className = '',
  maxWidth = 'max-w-2xl',
  children,
}) {
  const centred = align === 'center';
  return (
    <div className={`flex flex-col gap-space-xs ${centred ? 'text-center items-center mx-auto max-w-3xl' : maxWidth} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading id={id} className="font-headline-xl text-headline-xl text-primary font-bold">{title}</Heading>
      {description && (
        <p className={`${centred ? 'font-body-lg text-body-lg' : 'font-body-md text-body-md'} text-on-surface-variant`}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
