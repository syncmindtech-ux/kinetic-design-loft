import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, 
  Palette, 
  ShoppingBag, 
  Search, 
  Figma,
  CheckCircle2,
  Rocket,
  Target,
  TrendingUp
} from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const serviceDetails = [
  {
    icon: Globe,
    title: "Website Development",
    description: "We create custom  websites using wordpress and web flow that are fast, secure, and easy to manage. From simple blogs to complex e-commerce platforms, we deliver solutions that grow with your business.",
    benefits: [
      "Custom theme development from scratch",
      "Plugin development and customization",
      "WooCommerce integration for online stores",
      "Advanced animations and interactions",
      "CMS integration for dynamic content",
      "Responsive design for all devices",
      "SEO-friendly architecture"
    ],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop"
  },
  {
    icon: Palette,
    title: "Maintenance & Support",
    description: "Keep your website secure, fast, and performing at its best with ongoing maintenance and dedicated support. We handle the technical details so you can focus on growing your business—without downtime or surprises.",
    benefits: [
      "Regular updates and security monitoring",
      "Performance optimization and uptime checks",
      "Bug fixes and issue resolution",
      "Content updates and layout adjustments",
      "Backup management and recovery support",
      "Technical assistance when you need it"
    ],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=500&fit=crop"
  },
  {
    icon: ShoppingBag,
    title: "Shopify E-commerce",
    description: "Launch and scale your online store with Shopify. We create conversion-optimized shopping experiences that turn visitors into loyal customers.",
    benefits: [
      "Custom Shopify theme development",
      "App integration and customization",
      "Payment gateway setup",
      "Inventory management solutions",
      "Abandoned cart recovery",
      "Analytics and conversion tracking"
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop"
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Improve your search engine rankings and drive organic traffic with our comprehensive SEO services. We use data-driven strategies to deliver measurable results.",
    benefits: [
      "In-depth keyword research and analysis",
      "On-page SEO optimization",
      "Technical SEO audits and fixes",
      "Content strategy and optimization",
      "Link building campaigns",
      "Monthly reporting and insights"
    ],
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
  description: "Data-driven digital marketing strategies designed to grow brand recognition, attract the right audience, and convert traffic into measurable business results.",
  benefits: [
    "Search engine optimization (SEO)",
    "Social media marketing and management",
    "Pay-per-click (PPC) advertising",
    "Content marketing and copywriting",
    "Email marketing campaigns",
    "Analytics, tracking, and performance reporting"
    ],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop"
  }
];

const stats = [
  { icon: Rocket, value: "6+", label: "Projects Completed" },
  { icon: Target, value: "98%", label: "Client Satisfaction" },
  { icon: TrendingUp, value: "250%", label: "Average ROI Increase" },
];

export const ServiceDetails = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section ref={ref} className="py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-32">
            {serviceDetails.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact">
                    <Button variant="hero">Get Started</Button>
                  </Link>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl overflow-hidden"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
