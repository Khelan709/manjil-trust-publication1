import Container from './Container';

const BACKGROUNDS = {
  surface: 'bg-surface',
  low: 'bg-surface-container-low',
  base: 'bg-surface-container',
  high: 'bg-surface-container-high',
  primary: 'bg-primary text-on-primary',
  primaryContainer: 'bg-primary-container text-on-primary',
};

/** Full-width page band with a tonal background and a centred Container. */
export default function Section({
  bg = 'surface',
  padding = 'py-space-xxl',
  className = '',
  innerClassName = '',
  children,
  ...rest
}) {
  return (
    <section className={`w-full ${BACKGROUNDS[bg]} ${padding} ${className}`} {...rest}>
      <Container className={innerClassName}>{children}</Container>
    </section>
  );
}
