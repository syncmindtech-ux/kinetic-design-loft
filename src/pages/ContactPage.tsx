import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageHero
        title="Get In Touch"
        subtitle="Contact Us"
        description="Ready to start your project? Let's discuss how we can help bring your vision to life."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop"
      />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
