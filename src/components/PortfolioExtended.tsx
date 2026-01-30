import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useProjects, useTestimonials } from "@/hooks/useCMSData";

const fallbackProjects = [
  {
    id: '1',
    title: "Apollo Running Store",
    category: "Shopify",
    description: "A modern e-commerce platform for running gear with seamless shopping experience.",
    image_url: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop",
    link: "https://apollorunning.store/",
    order_index: 0,
  },
  {
    id: '2',
    title: "Grace Grid CMS",
    category: "WordPress",
    description: "A clean, modern content management website with elegant grid layouts.",
    image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop",
    link: "https://grace-grid-cms.lovable.app/",
    order_index: 1,
  },
  {
    id: '3',
    title: "Tempo Tune Site",
    category: "Maintenance",
    description: "Comprehensive website maintenance for a music streaming platform.",
    image_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    link: "https://tempo-tune-site.lovable.app/",
    order_index: 2,
  },
];

const fallbackTestimonials = [
  {
    id: '1',
    name: "Jennifer Martinez",
    role: "CEO",
    company: "TechStart",
    content: "SyncMindTech transformed our online presence completely. The results exceeded all our expectations.",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    order_index: 0,
  },
  {
    id: '2',
    name: "David Thompson",
    role: "Founder",
    company: "GreenLeaf",
    content: "Professional, creative, and incredibly responsive. They delivered our project ahead of schedule.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    order_index: 1,
  },
  {
    id: '3',
    name: "Lisa Wang",
    role: "Marketing Director",
    company: "CloudTech",
    content: "Our SEO rankings improved dramatically. They really know what they're doing.",
    avatar_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    order_index: 2,
  },
];

export const PortfolioExtended = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  
  const { data: projects } = useProjects();
  const { data: testimonials } = useTestimonials();

  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects;
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

  // Get unique categories from projects
  const categories = ["All", ...Array.from(new Set(displayProjects.map(p => p.category)))];

  const filteredProjects = activeCategory === "All" 
    ? displayProjects 
    : displayProjects.filter(p => p.category === activeCategory);

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
                key={project.id}
                href={project.link || "#"}
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
                    src={project.image_url}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            {displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl p-8"
              >
                <p className="text-foreground/80 italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  {testimonial.avatar_url && (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
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
