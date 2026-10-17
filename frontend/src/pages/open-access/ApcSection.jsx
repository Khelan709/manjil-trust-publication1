import { useState } from 'react';
import Icon from '../../components/ui/Icon';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../data/routes';
import { CURRENCIES } from '../../data/openAccess';
import { useContent } from '../../content/ContentContext';

function CurrencyToggle({ value, onChange }) {
  return (
    <div role="group" aria-label="Currency" className="flex items-center gap-space-xs p-1 rounded-lg bg-surface-container font-label-sm text-label-sm self-start md:self-auto">
      {CURRENCIES.map((c) => (
        <button
          key={c.key}
          type="button"
          aria-pressed={value === c.key}
          onClick={() => onChange(c.key)}
          className={`px-space-md py-1.5 rounded transition-all ${value === c.key ? 'bg-secondary-container text-on-secondary-fixed font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

export default function ApcSection() {
  const ui = useContent('openAccess').ui;
  const APC_TRACKS = useContent('openAccess').apcTracks;
  const W = useContent('openAccess').waivers;
  const [currency, setCurrency] = useState(CURRENCIES[0].key);
  return (
    <Section id="apc-policy" className="scroll-mt-28" innerClassName="flex flex-col gap-space-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <SectionHeader
          eyebrow={ui.apc.eyebrow}
          title={ui.apc.title}
          description={ui.apc.description}
        />
        <CurrencyToggle value={currency} onChange={setCurrency} />
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead>
              <tr className="bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider">
                <th scope="col" className="py-space-md px-space-lg">{ui.apcTable.track}</th>
                <th scope="col" className="py-space-md px-space-md">{ui.apcTable.cycle}</th>
                <th scope="col" className="py-space-md px-space-md">{ui.apcTable.services}</th>
                <th scope="col" className="py-space-md px-space-lg text-right">{ui.apcTable.fee}</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface divide-y divide-surface-container">
              {APC_TRACKS.map((t) => (
                <tr key={t.title} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-md px-space-lg">
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-primary font-semibold">{t.title}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{t.subtitle}</span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-md font-mono-cite text-mono-cite text-on-surface-variant">{t.cycle}</td>
                  <td className="py-space-md px-space-md text-on-surface-variant text-body-sm">{t.services}</td>
                  <td className="py-space-md px-space-lg text-right">
                    <span className="font-headline-md text-headline-md text-primary font-bold">{t.price[currency]}</span>
                    <span className="block font-label-sm text-label-sm text-secondary font-medium">{t.note}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mt-space-md">
        <div className="lg:col-span-7 bg-surface-container-high rounded-xl p-space-xl flex flex-col justify-between gap-space-lg">
          <div className="flex flex-col gap-space-sm">
            <div className="inline-flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              <Icon name="handshake" size={18} className="text-secondary" /> {W.eyebrow}
            </div>
            <h3 className="font-headline-lg text-headline-lg text-primary font-bold">{W.title}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{W.text}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
              {W.tiers.map((t) => (
                <div key={t.group} className="p-space-md bg-surface-container-lowest rounded-lg shadow-sm">
                  <span className={`block font-headline-sm text-headline-sm font-bold ${t.accent ? 'text-secondary' : 'text-primary'}`}>{t.value}</span>
                  <span className="font-label-md text-label-md text-primary font-semibold block mt-0.5">{t.group}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">{t.text}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant italic pt-space-sm">{W.disclaimer}</p>
        </div>

        <div className="lg:col-span-5 bg-surface-container rounded-xl p-space-xl flex flex-col justify-between gap-space-md">
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">{W.procedure.eyebrow}</span>
            <h4 className="font-headline-md text-headline-md text-primary font-semibold">{W.procedure.title}</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{W.procedure.text}</p>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant pt-space-xs">
              {W.procedure.steps.map((s) => (
                <li key={s} className="flex items-start gap-space-xs">
                  <Icon name="done" size={16} className="text-secondary mt-0.5" /> <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            to={ROUTES.requestWaiver}
            className="inline-flex items-center justify-center gap-space-xs py-space-sm px-space-md rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-fixed-dim shadow-sm self-start transition-colors"
          >
            <span>{W.procedure.cta}</span> <Icon name="arrow_forward" size={16} />
          </Link>
        </div>
      </div>
    </Section>
  );
}
