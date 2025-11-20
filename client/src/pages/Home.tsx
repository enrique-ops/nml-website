import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ValueProposition from '@/components/ValueProposition';
import ServicesGrid from '@/components/ServicesGrid';
import Differentiators from '@/components/Differentiators';
import ProcessTimeline from '@/components/ProcessTimeline';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ValueProposition />
      <ServicesGrid />
      <Differentiators />
      <ProcessTimeline />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
