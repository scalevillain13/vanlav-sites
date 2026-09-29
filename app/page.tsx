import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Author from '@/components/Author';
import Showcase3D from '@/components/Showcase3D';
import Catalog from '@/components/Catalog';
import Process from '@/components/Process';
import Benefits from '@/components/Benefits';
import Pricing from '@/components/Pricing';
import CustomBlock from '@/components/CustomBlock';
import Services from '@/components/Services';
import Automation from '@/components/Automation';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import HomeEffects from '@/components/HomeEffects';

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <HomeEffects />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Author />
        <Showcase3D />
        <div data-reveal=""><Catalog /></div>
        <div data-reveal=""><Process /></div>
        <div data-reveal=""><Benefits /></div>
        <div data-reveal=""><Pricing /></div>
        <div data-reveal=""><CustomBlock /></div>
        <div data-reveal=""><Services /></div>
        <Automation />
        <div data-reveal=""><CTA /></div>
      </main>
      <Footer />
    </div>
  );
}
