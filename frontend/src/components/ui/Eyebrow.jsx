/** Small tracked uppercase label that sits above section headings. */
export default function Eyebrow({ children, className = '' }) {
  return (
    <span className={`font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold ${className}`}>
      {children}
    </span>
  );
}
