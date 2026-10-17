import InfoBar from './InfoBar';
import OaHero from './OaHero';
import Pillars from './Pillars';
import ApcSection from './ApcSection';
import Compliance from './Compliance';
import AuthorCta from './AuthorCta';
import FaqSection from '../../components/sections/FaqSection';
import useDocumentTitle from '../../hooks/useDocumentTitle';

export default function OpenAccess() {
  useDocumentTitle('Open Access Policy');
  return (
    <div className="flex flex-col w-full">
      <InfoBar />
      <OaHero />
      <Pillars />
      <ApcSection />
      <Compliance />
      <FaqSection page="openAccess" />
      <AuthorCta />
    </div>
  );
}
