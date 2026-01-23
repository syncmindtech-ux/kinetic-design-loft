import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/heroimage.png')",
        }}
      />

      {/* Strong left gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/80 to-black/20" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-24">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[58%] text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-5 py-2.5 rounded-full mb-10"
            >
              <Sparkles className="w-4 h-4 text-red-500" />
              <span className="text-sm text-white/90">
                Innovating Digital Excellence
              </span>
            </motion.div>

            {/* Headings */}
            <h1 className="text-[44px] sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05]">
              We Build
            </h1>

            <h1 className="text-[44px] sm:text-6xl md:text-7xl font-extrabold leading-[1.05]">
              <span className="text-red-500">Stunning</span>{" "}
              <span className="text-white">Websites</span>
            </h1>

            <h1 className="text-[44px] sm:text-6xl md:text-7xl font-extrabold leading-[1.05] mb-8">
              <span className="text-white">That </span>
              <span className="text-red-500">Convert</span>
            </h1>

            {/* Subtext */}
            <p className="text-white/85 max-w-2xl text-lg mb-12">
              WordPress • Webflow • Shopify • SEO • Figma Design
              <br />
              <span className="text-white/70">
                From concept to launch, we create digital experiences that captivate and convert.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Link to="/contact">
                <Button
                  size="xl"
                  className="bg-red-500 hover:bg-red-600 text-white px-10 h-14"
                >
                  Start Your Project
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>

              <Link to="/work">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/50 bg-white/10 text-white hover:bg-red-600 h-14 px-10"
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="hidden lg:flex w-[42%] justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="rounded-3xl p-10 shadow-2xl"
            >
              <img
                src="/output-onlinegiftools (3).gif"
                alt="Website analytics animation"
                className="w-[420px] max-w-full"
                loading="lazy"
                onError={(e: any) => {
                  if (!e.currentTarget.dataset.fallback) {
                    e.currentTarget.dataset.fallback = "1";
                    e.currentTarget.src = "/Data%20extraction.gif";
                  }
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="mt-28 bg-white rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 px-10 py-8 ">
          {[
            { value: "5+", label: "Projects Delivered" },
            { value: "5+%", label: "Client Satisfaction" },
            { value: "5+", label: "Happy Clients" },
            { value: "2+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
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
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
