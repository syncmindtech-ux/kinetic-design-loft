import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Banner } from "@/components/Banner";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* First Banner */}
      <Banner
        subtitle="Web Development Excellence"
        title="Custom Websites That Drive Growth"
        description="We specialize in building high-performance websites using WordPress, Webflow, and Shopify. Our solutions are tailored to your unique business needs, ensuring a seamless user experience that converts visitors into customers."
        buttonText="Explore Services"
        buttonLink="/services"
        imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80"
      />
      
      <Services />
      
      {/* Second Banner */}
      <Banner
        subtitle="Design & Strategy"
        title="Beautiful Designs That Tell Your Story"
        description="Our expert designers use Figma to craft pixel-perfect interfaces that capture your brand essence. From wireframes to final designs, we create visually stunning experiences that resonate with your audience and set you apart."
        buttonText="View Our Work"
        buttonLink="/work"
        imageUrl="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80"
        reverse
      />
      
      <WhyChooseUs />
      <Process />
      
      {/* Third Banner */}
      <Banner
        subtitle="SEO & Digital Marketing"
        title="Dominate Search Rankings & Grow Your Traffic"
        description="Our data-driven SEO strategies help your business climb the search rankings and attract qualified organic traffic. We optimize every aspect of your online presence to ensure maximum visibility and sustainable growth."
        buttonText="Get Started"
        buttonLink="/contact"
        imageUrl="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1920&q=80"
      />
      
      <About />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
