import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageHero
        title="About SyncMindTech"
        subtitle="Our Story"
        description="We're a passionate team of digital craftsmen dedicated to creating exceptional web experiences that drive results."
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
      />
      <About />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default AboutPage;
