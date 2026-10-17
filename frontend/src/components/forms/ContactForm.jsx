import { useRef, useState } from 'react';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import FormField from './FormField';
import AttachmentField from './AttachmentField';
import useSubmit from '../../hooks/useSubmit';
import { api } from '../../services/api';
import { INQUIRY_CATEGORIES } from '../../data/contact';
import { useSettings } from '../../content/ContentContext';

const EMPTY = { fullName: '', affiliation: '', email: '', phone: '', category: '', subject: '', message: '' };

/** Institutional inquiry form → POST /api/contact (multipart, optional attachment). */
export default function ContactForm() {
  const f = useSettings().ui.forms.contact;
  const [values, setValues] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [docket, setDocket] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fileInput = useRef(null);

  const { status, message, submit, reset, loading } = useSubmit(async (formData) => {
    const result = await api.submitInquiry(formData);
    setDocket(result.docket || '');
    return result;
  });

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(values).forEach(([k, v]) => data.append(k, v));
    if (file) data.append('attachment', file);
    if (await submit(data)) setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setValues(EMPTY);
    setFile(null);
    if (fileInput.current) fileInput.current.value = '';
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <FormField id="fullName" name="fullName" label={f.fullNameLabel} required value={values.fullName} onChange={onChange} placeholder={f.fullNamePlaceholder} type="text" autoComplete="name" />
          <FormField id="affiliation" name="affiliation" label={f.affiliationLabel} required value={values.affiliation} onChange={onChange} placeholder={f.affiliationPlaceholder} type="text" autoComplete="organization" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <FormField id="email" name="email" label={f.emailLabel} required value={values.email} onChange={onChange} placeholder={f.emailPlaceholder} type="email" autoComplete="email" />
          <FormField id="phone" name="phone" label={f.phoneLabel} value={values.phone} onChange={onChange} placeholder={f.phonePlaceholder} type="tel" autoComplete="tel" />
        </div>
        <FormField as="select" id="category" name="category" label={f.categoryLabel} required value={values.category} onChange={onChange}>
          <option value="" disabled>{f.categoryPlaceholder}</option>
          {INQUIRY_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </FormField>
        <FormField id="subject" name="subject" label={f.subjectLabel} required value={values.subject} onChange={onChange} placeholder={f.subjectPlaceholder} type="text" />
        <FormField as="textarea" id="message" name="message" label={f.messageLabel} required rows={5} value={values.message} onChange={onChange} placeholder={f.messagePlaceholder} />

        <AttachmentField
          label={f.attachmentLabel}
          hint={f.attachmentHint}
          file={file}
          error={fileError}
          inputRef={fileInput}
          onPick={setFile}
          onError={setFileError}
        />

        {status === 'error' && <p role="alert" className="font-body-sm text-body-sm text-error bg-error-container/50 rounded p-space-sm">{message}</p>}

        <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <p className="font-body-sm text-body-sm text-on-surface-variant">{f.disclaimer}</p>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-space-xl py-space-sm rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-fixed-dim shadow-sm flex items-center justify-center gap-space-xs disabled:opacity-60"
          >
            <span>{loading ? f.submitting : f.submit}</span>
            {!loading && <Icon name="arrow_forward" size={16} />}
          </button>
        </div>
      </form>

      <Modal open={showModal} onClose={closeModal} labelledBy="inquiry-modal-title">
        <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
          <Icon name="check_circle" size={32} />
        </div>
        <h3 id="inquiry-modal-title" className="font-headline-md text-headline-md text-primary font-bold">{f.successTitle}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {f.successText.replace('{docket}', docket || '#MT-INQ')}
        </p>
        <button type="button" onClick={closeModal} className="w-full py-space-sm rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-fixed-dim">
          {f.successButton}
        </button>
      </Modal>
    </>
  );
}
