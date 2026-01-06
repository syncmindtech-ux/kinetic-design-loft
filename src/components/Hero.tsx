import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Innovating Digital Excellence
              </span>
            </motion.div>

            {/* Headings */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
              >
                We Build
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
              >
                <span className="text-gradient">Stunning</span> Websites
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
              >
                That <span className="text-primary">Convert</span>
              </motion.h1>
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
            >
              WordPress • Webflow • Shopify • SEO • Figma Design
              <br />
              <span className="text-foreground/80">
                From concept to launch, we create digital experiences that captivate and convert.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact">
                <Button variant="hero" size="xl" className="group">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/work">
                <Button variant="heroOutline" size="xl">
                  View Our Work
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column - GIF */}
          <div className="hidden lg:flex w-1/2 justify-center items-start pt-8 relative">
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-12 w-[520px] h-[520px] rounded-full bg-primary/10 opacity-30 blur-3xl pointer-events-none"
            />
            <motion.img
              src="/gifs/data-extraction.gif"
              alt="Data extraction animation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-[420px] max-w-[90%] rounded-2xl ring-1 ring-white/10"
              loading="lazy"
              onError={(e: any) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = "1";
                  e.currentTarget.src = "/Data%20extraction.gif";
                }
              }}
            />
          </div>
        </div>

        {/* Stats Section - Full Width under GIF */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "5+", label: "Projects Delivered" },
            { value: "5+%", label: "Client Satisfaction" },
            { value: "5+", label: "Happy Clients" },
            { value: "2+", label: "Years Experience" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

