import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TerminalHero } from '@/components/TerminalHero';
import { FeaturedNotes } from '@/components/FeaturedNotes';
import { StatsSection } from '@/components/StatsSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <TerminalHero />
        <StatsSection />
        <FeaturedNotes />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
