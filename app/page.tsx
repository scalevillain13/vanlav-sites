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
import Faq from '@/components/Faq';
import Anatomy from '@/components/Anatomy';
import Speed from '@/components/Speed';
import Shots from '@/components/Shots';
import Pains from '@/components/Pains';
import Growth from '@/components/Growth';
import { Divider } from '@/components/Glow';
import JsonLd from '@/components/JsonLd';
import { HOME_FAQ } from '@/lib/services-content';
import { homeLd } from '@/lib/seo';
import { NICHES } from '@/lib/niche-content';

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <JsonLd data={homeLd()} />
      <HomeEffects />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Pains />
        <Growth />
        <Divider />
        <Author />
        <Showcase3D />
        <div data-reveal=""><Catalog niches={NICHES.map((n) => ({ slug: n.slug, name: n.name }))} /></div>
        <Shots />
        <Divider mark="diamond" />
        <div data-reveal=""><Process /></div>
        <div data-reveal=""><Benefits /></div>
        <div data-reveal=""><Pricing /></div>
        <div data-reveal=""><CustomBlock /></div>
        <Anatomy />
        <Divider mark="arrows" />
        <Speed />
        <div data-reveal=""><Services /></div>
        <Automation />
        <Divider />
        <div data-reveal=""><Faq items={HOME_FAQ} title="Частые вопросы о разработке сайтов" label="Вопросы и ответы" /></div>
        <div data-reveal=""><CTA /></div>
      </main>
      <Footer />
    </div>
  );
}
