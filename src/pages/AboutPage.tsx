import { Navigation } from "@/components/Navigation";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24">
        <About />
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
