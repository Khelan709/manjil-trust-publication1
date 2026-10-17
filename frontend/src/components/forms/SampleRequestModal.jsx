import { useState } from 'react';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import useSubmit from '../../hooks/useSubmit';
import { api } from '../../services/api';
import { SAMPLE_DISCIPLINES } from '../../data/resources';
import { useSettings } from '../../content/ContentContext';

const EMPTY = { institution: '', designation: '', email: '', discipline: SAMPLE_DISCIPLINES[0], address: '' };
const CONTROL =
  'w-full px-space-md py-space-sm rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary';
const LABEL = 'font-label-sm text-label-sm text-on-surface font-semibold block mb-1';

/** "Request Print Inspection Copies" form → POST /api/sample-requests */
export default function SampleRequestModal({ open, onClose }) {
  const f = useSettings().ui.forms.sample;
  const [values, setValues] = useState(EMPTY);
  const { status, message, submit, reset, loading } = useSubmit((v) => api.requestSamples(v));

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const close = () => {
    onClose();
    reset();
    setValues(EMPTY);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit(values);
  };

  return (
    <Modal open={open} onClose={close} labelledBy="sample-modal-title" panelClassName="max-w-lg gap-space-md p-space-lg">
      <div className="flex items-center justify-between pb-space-xs w-full">
        <div className="flex items-center gap-space-xs">
          <Icon name="local_shipping" className="text-primary" />
          <h3 id="sample-modal-title" className="font-headline-sm text-headline-sm text-primary font-bold">{f.title}</h3>
        </div>
        <button type="button" onClick={close} aria-label="Close" className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface">
          <Icon name="close" size={18} />
        </button>
      </div>

      {status === 'success' ? (
        <div className="flex flex-col items-center text-center gap-space-md py-space-md w-full">
          <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-secondary"><Icon name="check_circle" size={32} /></div>
          <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
          <button type="button" onClick={close} className="w-full py-space-sm rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-fixed-dim">Close</button>
        </div>
      ) : (
        <>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {f.intro}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm w-full">
            <div>
              <label className={LABEL} htmlFor="sr-institution">{f.institutionLabel}</label>
              <input id="sr-institution" name="institution" required value={values.institution} onChange={onChange} className={CONTROL} placeholder={f.institutionPlaceholder} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <div>
                <label className={LABEL} htmlFor="sr-designation">{f.designationLabel}</label>
                <input id="sr-designation" name="designation" required value={values.designation} onChange={onChange} className={CONTROL} placeholder={f.designationPlaceholder} />
              </div>
              <div>
                <label className={LABEL} htmlFor="sr-email">{f.emailLabel}</label>
                <input id="sr-email" name="email" type="email" required value={values.email} onChange={onChange} className={CONTROL} placeholder={f.emailPlaceholder} />
              </div>
            </div>
            <div>
              <label className={LABEL} htmlFor="sr-discipline">{f.disciplineLabel}</label>
              <select id="sr-discipline" name="discipline" value={values.discipline} onChange={onChange} className={CONTROL}>
                {SAMPLE_DISCIPLINES.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="sr-address">{f.addressLabel}</label>
              <textarea id="sr-address" name="address" required rows={2} value={values.address} onChange={onChange} className={CONTROL} placeholder={f.addressPlaceholder} />
            </div>
            {status === 'error' && <p role="alert" className="font-body-sm text-body-sm text-error">{message}</p>}
            <button type="submit" disabled={loading} className="mt-space-xs w-full py-space-sm bg-secondary-container text-on-secondary-fixed font-label-md text-label-md rounded font-semibold hover:bg-secondary-fixed-dim disabled:opacity-60">
              {loading ? f.submitting : f.submit}
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}
