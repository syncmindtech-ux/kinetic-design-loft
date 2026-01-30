import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { PortfolioExtended } from "@/components/PortfolioExtended";
import { Footer } from "@/components/Footer";

const WorkPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageHero
        title="Our Work"
        subtitle="Portfolio"
        description="Explore our collection of successful projects and see how we've helped businesses transform their digital presence."
        backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop"
        pageSlug="work"
      />
      <PortfolioExtended />
      <Footer />
    </div>
  );
};

export default WorkPage;
