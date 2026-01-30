import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, 
  Settings, 
  ShoppingBag, 
  Search, 
  ArrowUpRight,
  TrendingUp,
  Code,
  Palette,
  Zap,
  Shield
} from "lucide-react";
import { useServices } from "@/hooks/useCMSData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Settings,
  ShoppingBag,
  Search,
  Figma: Palette,
  TrendingUp,
  Code,
  Palette,
  Zap,
  Shield,
};

const ServiceCard = ({ service, index }: { service: { title: string; description: string; icon: string; features: string[] }; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const IconComponent = iconMap[service.icon] || Globe;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative glass rounded-2xl p-8 overflow-hidden cursor-pointer"
    >
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
      >
        <IconComponent className="w-7 h-7 text-primary" />
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
        {service.title}
        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
      </h3>
      <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
        {service.description}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-2">
        {service.features.map((feature) => (
          <span
            key={feature}
            className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground"
          >
            {feature}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const Services = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { data: services, isLoading } = useServices();

  // Fallback services if data is not yet loaded
  const fallbackServices = [
    { id: '1', title: "Website Development", description: "Custom website development using WordPress and Webflow, with powerful themes and plugins tailored to your business needs.", icon: "Globe", features: ["Custom Themes", "Plugin Development", "Webflow Sites", "Performance Optimization"], order_index: 0 },
    { id: '2', title: "Website Maintenance", description: "Keep your website running smoothly with our comprehensive maintenance and support services.", icon: "Settings", features: ["Security Updates", "Performance Monitoring", "Bug Fixes", "Content Updates"], order_index: 1 },
    { id: '3', title: "Shopify Stores", description: "E-commerce solutions that drive sales and provide seamless shopping experiences.", icon: "ShoppingBag", features: ["Store Setup", "Theme Customization", "Payment Integration", "Inventory Management"], order_index: 2 },
    { id: '4', title: "SEO Optimization", description: "Data-driven SEO strategies to boost your visibility and organic traffic.", icon: "Search", features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Analytics & Reporting"], order_index: 3 },
    { id: '5', title: "Figma Design", description: "Beautiful UI/UX designs that combine aesthetics with user-centered functionality.", icon: "Figma", features: ["UI Design", "UX Research", "Prototyping", "Design Systems"], order_index: 4 },
    { id: '6', title: "Digital Marketing", description: "Strategic digital marketing campaigns that grow your brand and drive measurable results.", icon: "TrendingUp", features: ["Social Media", "PPC Advertising", "Email Marketing", "Brand Strategy"], order_index: 5 },
  ];

  const displayServices = services && services.length > 0 ? services : fallbackServices;

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium text-sm tracking-wider uppercase"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6"
          >
            Services That <span className="text-primary">Deliver</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            From design to development, we offer comprehensive digital solutions 
            to help your business thrive online.
          </motion.p>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass rounded-2xl p-8 animate-pulse">
                <div className="w-14 h-14 rounded-xl bg-muted mb-6" />
                <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                <div className="h-20 bg-muted rounded mb-6" />
                <div className="flex gap-2">
                  <div className="h-6 bg-muted rounded-full w-20" />
                  <div className="h-6 bg-muted rounded-full w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
