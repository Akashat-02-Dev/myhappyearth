import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ImpactMetrics from '@/components/ImpactMetrics';
import Categories from '@/components/products/CategoryCaraousel';
import MissionVision from '@/components/MissionVision';
import ImpactStats from '@/components/ImpactStats';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-earth-light font-sans selection:bg-earth-sage selection:text-earth-deep">
      <Navbar />
      
      {/* THE FIX: Removed 'pt-8' from this div. 
        Now the Hero will hit the absolute top of the browser!
      */}
      <div className="flex flex-col gap-y-24 md:gap-y-32 pb-24">
        <Hero />
        <ImpactMetrics />
        {/* Add any other sections here like <WhyChooseUs /> */}
        <MissionVision />
        <Categories />
        <ImpactStats />
        <Testimonials />
      </div>

      <Footer /> 
    </main>
  );
}