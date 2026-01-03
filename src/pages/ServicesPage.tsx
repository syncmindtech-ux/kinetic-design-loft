import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { Services } from "@/components/Services";
import { ServiceDetails } from "@/components/ServiceDetails";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageHero
        title="Our Services"
        subtitle="What We Offer"
        description="Comprehensive digital solutions tailored to elevate your brand and drive measurable business results."
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
      />
      <Services />
      <ServiceDetails />
      <CTASection />
      <Footer />
    </div>
  );
};

export default ServicesPage;
