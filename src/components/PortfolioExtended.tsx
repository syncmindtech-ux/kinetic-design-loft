import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const categories = ["All", "WordPress", "Shopify", "SEO", "Design", "Maintenance"];

const projects = [
  {
    title: "Apollo Running Store",
    category: "Shopify",
    description: "A modern e-commerce platform for running gear with seamless shopping experience and optimized checkout flow.",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop",
    stats: { metric: "200%", label: "Conversion Increase" },
    link: "https://apollorunning.store/"
  },
  {
    title: "Grace Grid CMS",
    category: "WordPress",
    description: "A clean, modern content management website with elegant grid layouts and intuitive navigation for creative professionals.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop",
    stats: { metric: "150K+", label: "Monthly Visitors" },
    link: "https://grace-grid-cms.lovable.app/"
  },
  {
    title: "Tempo Tune Site",
    category: "Maintenance",
    description: "Comprehensive website maintenance and performance optimization for a music streaming platform with audio features.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    stats: { metric: "99.9%", label: "Uptime" },
    link: "https://tempo-tune-site.lovable.app/"
  },
  {
    title: "Sports Gear Pro",
    category: "Design",
    description: "Athletic brand design with dynamic visuals, product showcases, and high-energy user experience.",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop",
    stats: { metric: "40+", label: "Design Elements" },
    link: "https://apollorunning.store/"
  },
  {
    title: "Content Hub SEO",
    category: "SEO",
    description: "From page 10 to top 3 ranking in just 3 months through comprehensive SEO strategy for a content platform.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    stats: { metric: "Top 3", label: "Google Rankings" },
    link: "https://grace-grid-cms.lovable.app/"
  },
  {
    title: "Runner's Choice",
    category: "Shopify",
    description: "Premium running gear subscription service with custom checkout and seamless inventory management.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
    stats: { metric: "5K+", label: "Subscribers" },
    link: "https://apollorunning.store/"
  },
  {
    title: "Creative Portfolio",
    category: "WordPress",
    description: "Elegant portfolio website with beautiful galleries, smooth transitions, and testimonial sections.",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
    stats: { metric: "300%", label: "Lead Generation" },
    link: "https://tempo-tune-site.lovable.app/"
  },
  {
    title: "Music Platform",
    category: "Maintenance",
    description: "Ongoing maintenance and security updates for a music discovery platform with high traffic and streaming features.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
    stats: { metric: "1M+", label: "Page Views" },
    link: "https://grace-grid-cms.lovable.app/"
  },
];

const testimonials = [
  {
    quote: "SyncMindTech transformed our online presence completely. The results exceeded all our expectations.",
    author: "Jennifer Martinez",
    role: "CEO, TechStart",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "Professional, creative, and incredibly responsive. They delivered our project ahead of schedule.",
    author: "David Thompson",
    role: "Founder, GreenLeaf",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "Our SEO rankings improved dramatically. They really know what they're doing.",
    author: "Lisa Wang",
    role: "Marketing Director, CloudTech",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face"
  },
];

export const PortfolioExtended = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Projects Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative glass rounded-2xl overflow-hidden cursor-pointer block"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-center">
                      <span className="text-2xl font-bold">{project.stats.metric}</span>
                      <p className="text-sm">{project.stats.label}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-primary text-sm font-medium">{project.category}</span>
                  <h3 className="text-xl font-semibold mt-2 flex items-center gap-2">
                    {project.title}
                    <ExternalLink className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{project.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Client Feedback</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl p-8"
              >
                <p className="text-foreground/80 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start <span className="text-primary">Your Project?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your vision to life. Get in touch today for a free consultation.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Start Your Project
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};
