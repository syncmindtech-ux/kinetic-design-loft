import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, 
  Settings, 
  ShoppingBag, 
  Search, 
  Figma,
  ArrowUpRight,
  TrendingUp
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "WordPress Development",
    description: "Custom WordPress solutions with powerful themes and plugins tailored to your business needs.",
    features: ["Custom Themes", "Plugin Development", "WooCommerce", "Performance Optimization"],
  },
  {
    icon: Settings,
    title: "Website Maintenance",
    description: "Keep your website running smoothly with our comprehensive maintenance and support services.",
    features: ["Security Updates", "Performance Monitoring", "Bug Fixes", "Content Updates"],
  },
  {
    icon: ShoppingBag,
    title: "Shopify Stores",
    description: "E-commerce solutions that drive sales and provide seamless shopping experiences.",
    features: ["Store Setup", "Theme Customization", "Payment Integration", "Inventory Management"],
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Data-driven SEO strategies to boost your visibility and organic traffic.",
    features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Analytics & Reporting"],
  },
  {
    icon: Figma,
    title: "Figma Design",
    description: "Beautiful UI/UX designs that combine aesthetics with user-centered functionality.",
    features: ["UI Design", "UX Research", "Prototyping", "Design Systems"],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Strategic digital marketing campaigns that grow your brand and drive measurable results.",
    features: ["Social Media", "PPC Advertising", "Email Marketing", "Brand Strategy"],
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        <service.icon className="w-7 h-7 text-primary" />
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
