import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/sections/HeroSection';
import InsightFlow from '@/components/sections/InsightFlow';
import DashboardPreview from '@/components/sections/DashboardPreview';
import SignatureInteraction from '@/components/sections/SignatureInteraction';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <InsightFlow />
        <DashboardPreview />
        <SignatureInteraction />
      </main>
      <Footer />
    </>
  );
}
