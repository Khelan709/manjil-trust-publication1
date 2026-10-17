import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import FormField from './FormField';
import AttachmentField from './AttachmentField';
import useSubmit from '../../hooks/useSubmit';
import { api } from '../../services/api';
import { AUTHOR_STATUSES, JOURNAL_TRACKS, WAIVER_TYPES } from '../../data/waiver';
import { ROUTES } from '../../data/routes';
import { useSettings } from '../../content/ContentContext';

const EMPTY = {
  fullName: '', email: '', institution: '', country: '',
  authorStatus: '', waiverType: '', journalTrack: '',
  manuscriptTitle: '', manuscriptId: '', justification: '',
};

/** APC waiver request → POST /api/waiver-requests (multipart, optional institutional certificate). */
export default function WaiverRequestForm() {
  const f = useSettings().ui.forms.waiver;
  const [values, setValues] = useState(EMPTY);
  const [declared, setDeclared] = useState(false);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [docket, setDocket] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fileInput = useRef(null);

  const { status, message, submit, reset, loading } = useSubmit(async (formData) => {
    const result = await api.submitWaiverRequest(formData);
    setDocket(result.docket || '');
    return result;
  });

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(values).forEach(([k, v]) => data.append(k, v));
    data.append('declaration', declared ? 'true' : 'false');
    if (file) data.append('attachment', file);
    if (await submit(data)) setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setValues(EMPTY);
    setDeclared(false);
    setFile(null);
    if (fileInput.current) fileInput.current.value = '';
    reset();
  };

  const select = (id, label, options, placeholder) => (
    <FormField as="select" id={id} name={id} label={label} required value={values[id]} onChange={onChange}>
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </FormField>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <FormField id="fullName" name="fullName" label={f.fullNameLabel} required type="text" autoComplete="name" value={values.fullName} onChange={onChange} placeholder={f.fullNamePlaceholder} />
          <FormField id="email" name="email" label={f.emailLabel} required type="email" autoComplete="email" value={values.email} onChange={onChange} placeholder={f.emailPlaceholder} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <FormField id="institution" name="institution" label={f.institutionLabel} type="text" autoComplete="organization" value={values.institution} onChange={onChange} placeholder={f.institutionPlaceholder} />
          <FormField id="country" name="country" label={f.countryLabel} required type="text" autoComplete="country-name" value={values.country} onChange={onChange} placeholder={f.countryPlaceholder} />
        </div>

        {select('authorStatus', f.authorStatusLabel, AUTHOR_STATUSES, f.authorStatusPlaceholder)}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {select('journalTrack', f.journalTrackLabel, JOURNAL_TRACKS, f.journalTrackPlaceholder)}
          {select('waiverType', f.waiverTypeLabel, WAIVER_TYPES, f.waiverTypePlaceholder)}
        </div>

        <FormField id="manuscriptTitle" name="manuscriptTitle" label={f.manuscriptTitleLabel} required type="text" value={values.manuscriptTitle} onChange={onChange} placeholder={f.manuscriptTitlePlaceholder} />
        <FormField id="manuscriptId" name="manuscriptId" label={f.manuscriptIdLabel} type="text" value={values.manuscriptId} onChange={onChange} placeholder={f.manuscriptIdPlaceholder} />
        <FormField as="textarea" id="justification" name="justification" label={f.justificationLabel} required rows={5} value={values.justification} onChange={onChange} placeholder={f.justificationPlaceholder} />

        <AttachmentField
          label={f.attachmentLabel}
          hint={f.attachmentHint}
          file={file}
          error={fileError}
          inputRef={fileInput}
          onPick={setFile}
          onError={setFileError}
        />

        <label className="flex items-start gap-space-sm font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
          <input type="checkbox" required checked={declared} onChange={(e) => setDeclared(e.target.checked)} className="mt-1 h-4 w-4 accent-primary shrink-0" />
          <span>
            {f.declaration}
            <span className="text-error" aria-hidden="true"> *</span>
          </span>
        </label>

        {status === 'error' && <p role="alert" className="font-body-sm text-body-sm text-error bg-error-container/50 rounded p-space-sm">{message}</p>}

        <div className="pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {f.disclaimerBefore} <Link to={ROUTES.openAccess} className="underline text-primary">{f.disclaimerLink}</Link>.
          </p>
          <button type="submit" disabled={loading} className="w-full sm:w-auto px-space-xl py-space-sm rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-fixed-dim shadow-sm flex items-center justify-center gap-space-xs disabled:opacity-60">
            <span>{loading ? f.submitting : f.submit}</span>
            {!loading && <Icon name="arrow_forward" size={16} />}
          </button>
        </div>
      </form>

      <Modal open={showModal} onClose={closeModal} labelledBy="waiver-modal-title">
        <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
          <Icon name="check_circle" size={32} />
        </div>
        <h3 id="waiver-modal-title" className="font-headline-md text-headline-md text-primary font-bold">{f.successTitle}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {f.successText.replace('{docket}', docket || '#MT-WVR')}
        </p>
        <button type="button" onClick={closeModal} className="w-full py-space-sm rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-fixed-dim">{f.closeButton}</button>
      </Modal>
    </>
  );
}
