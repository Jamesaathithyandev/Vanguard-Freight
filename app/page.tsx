import FreightHero from '@/components/FreightHero';
import CompanyOverviewSection from '@/components/CompanyOverviewSection';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <FreightHero />
      <CompanyOverviewSection />
    </>
  );
}
