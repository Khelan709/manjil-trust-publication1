import { Link } from 'react-router-dom';
import Icon from '../../components/ui/Icon';
import { CONTENT_SECTIONS } from '../../data/defaults';

export default function Dashboard() {
  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div>
        <h1 className="font-headline-xl text-headline-xl text-primary font-bold">Dashboard</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Choose an area to edit. Changes go live on the website as soon as you press <strong>Save</strong>.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CONTENT_SECTIONS.map((s) => (
          <Link key={s.key} to={`/admin/content/${s.key}`} className="bg-surface-container-lowest rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-1">
            <span className="font-headline-sm text-headline-sm text-primary font-semibold flex items-center gap-2"><Icon name="edit_note" className="text-secondary" /> {s.label}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">{s.hint}</span>
          </Link>
        ))}
      </div>
      <div className="bg-surface-container-lowest rounded-lg p-5 shadow-sm">
        <h2 className="font-headline-sm text-headline-sm text-primary font-semibold">Quick tips</h2>
        <ul className="list-disc pl-5 mt-2 font-body-sm text-body-sm text-on-surface-variant flex flex-col gap-1">
          <li><strong>Submit Manuscript button:</strong> Site Settings → Links → Submit Manuscript Url. Leave it empty to send visitors to the Contact page.</li>
          <li><strong>LinkedIn icon:</strong> Site Settings → Links → Linkedin Url.</li>
          <li><strong>Files for download buttons:</strong> use the <em>Upload</em> button next to any “File or link URL” field.</li>
          <li><strong>Reset:</strong> every area has a “Reset to defaults” button if you want to undo all edits.</li>
        </ul>
      </div>
    </div>
  );
}
