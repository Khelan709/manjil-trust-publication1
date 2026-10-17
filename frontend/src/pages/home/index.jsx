import Hero from './Hero';
import FlagshipJournals from './FlagshipJournals';
import Programs from './Programs';
import Workflow from './Workflow';
import Subscriptions from './Subscriptions';
import BulletinBanner from './BulletinBanner';
import FaqSection from '../../components/sections/FaqSection';
import useDocumentTitle from '../../hooks/useDocumentTitle';

/** Home page. */
export default function Home() {
  useDocumentTitle('');
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FlagshipJournals />
      <Programs />
      <Workflow />
      <Subscriptions />
      <FaqSection page="home" />
      <BulletinBanner />
    </div>
  );
}
