import { useEffect } from 'react';

/** Accessible modal dialog with Navy scrim; closes on Escape or scrim click. */
export default function Modal({
  open,
  onClose,
  labelledBy,
  panelClassName = 'max-w-md items-center text-center gap-space-md',
  children,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/60 backdrop-blur-sm p-4 overflow-y-auto" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
        className={`bg-surface-container-lowest p-space-xl rounded shadow-2xl w-full flex flex-col ${panelClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
