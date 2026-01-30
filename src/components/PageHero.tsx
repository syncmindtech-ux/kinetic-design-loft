import { motion } from "framer-motion";
import { usePageHero } from "@/hooks/useCMSData";

interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  pageSlug?: string;
}

export const PageHero = ({ title, subtitle, description, backgroundImage, pageSlug }: PageHeroProps) => {
  const { data: heroData } = usePageHero(pageSlug || "");
  
  // Use CMS data if available, otherwise use props
  const displayTitle = heroData?.title || title;
  const displaySubtitle = heroData?.subtitle || subtitle;
  const displayDescription = heroData?.description || description;
  const displayBackground = heroData?.background_image || backgroundImage;

  return (
    <section 
      className="relative h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${displayBackground})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4"
        >
          {displaySubtitle}
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
        >
          {displayTitle}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto"
        >
          {displayDescription}
        </motion.p>
      </div>
    </section>
  );
};
