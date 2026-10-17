const CONTROL =
  'w-full px-space-md py-2.5 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary shadow-inner';

/**
 * Labelled form control in the design's input style.
 * as: 'input' | 'select' | 'textarea'. Extra props go straight to the control.
 */
export default function FormField({ id, label, required = false, as = 'input', children, className = '', ...controlProps }) {
  const Control = as;
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="font-label-md text-label-md text-primary" htmlFor={id}>
        {label} {required && <span className="text-error" aria-hidden="true">*</span>}
      </label>
      {as === 'select' ? (
        <div className="relative">
          <select id={id} required={required} className={`${CONTROL} appearance-none pr-10`} {...controlProps}>{children}</select>
          <span aria-hidden="true" className="material-symbols-outlined text-[20px] pointer-events-none absolute right-3 top-3 text-on-surface-variant">expand_more</span>
        </div>
      ) : (
        <Control id={id} required={required} className={CONTROL} {...controlProps} />
      )}
    </div>
  );
}
