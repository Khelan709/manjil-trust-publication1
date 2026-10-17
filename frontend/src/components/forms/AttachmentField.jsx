import Icon from '../ui/Icon';
import { ATTACHMENT } from '../../data/contact';

/**
 * File picker with client-side checks (PDF/DOCX/ZIP, ≤15MB — same limits as the API).
 * Controlled by the parent: pass `file`, `error`, and the two callbacks.
 */
export default function AttachmentField({ label, hint, file, error, inputRef, onPick, onError }) {
  const handleChange = (e) => {
    const picked = e.target.files?.[0];
    onError('');
    if (!picked) return onPick(null);
    const ext = picked.name.split('.').pop().toLowerCase();
    if (!ATTACHMENT.allowedExtensions.includes(ext)) {
      onError('Please attach a PDF, DOCX or ZIP file.');
      e.target.value = '';
      return onPick(null);
    }
    if (picked.size > ATTACHMENT.maxBytes) {
      onError('File exceeds the 15MB limit.');
      e.target.value = '';
      return onPick(null);
    }
    return onPick(picked);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-label-md text-label-md text-primary">{label}</span>
      <div className="bg-surface-container-low rounded p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm min-w-0">
          <Icon name="attach_file" size={24} className="text-primary shrink-0" />
          <div className="min-w-0">
            <span className="font-label-sm text-label-sm text-primary block truncate">{file ? file.name : ATTACHMENT.hint}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">{hint}</span>
          </div>
        </div>
        <label className="cursor-pointer px-space-md py-1.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-sm text-label-sm whitespace-nowrap focus-within:outline focus-within:outline-2 focus-within:outline-primary">
          Browse File
          <input ref={inputRef} type="file" accept={ATTACHMENT.accept} className="sr-only" onChange={handleChange} />
        </label>
      </div>
      {error && <p role="alert" className="font-label-sm text-label-sm text-error">{error}</p>}
    </div>
  );
}
