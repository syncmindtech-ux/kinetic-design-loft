import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Zap, Users, Award } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "We deliver projects on time without compromising on quality.",
  },
  {
    icon: Users,
    title: "Client-Focused",
    description: "Your vision is our priority. We work closely with you every step.",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description: "Our work has been recognized by industry leaders and clients alike.",
  },
];

const highlights = [
  "Pixel-perfect designs that stand out",
  "SEO-optimized from the ground up",
  "Mobile-first responsive development",
  "Ongoing support and maintenance",
  "Performance-focused architecture",
  "Conversion-driven user experience",
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-1/2 h-96 bg-primary/5 blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-primary font-medium text-sm tracking-wider uppercase"
            >
              About Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mt-4 mb-6"
            >
              We're a Team of
              <br />
              <span className="text-primary">Digital Craftsmen</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8 leading-relaxed"
            >
              With over 5 years of experience, we've helped businesses of all sizes 
              establish their digital presence. Our team combines creativity with 
              technical expertise to deliver websites that not only look stunning 
              but also drive real business results.
            </motion.p>

            {/* Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 10 }}
                className="glass rounded-2xl p-6 flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Quote Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 p-6 border-l-4 border-primary bg-secondary/30 rounded-r-xl"
            >
              <p className="text-foreground/90 italic">
                "Great design is not just about how it looks, but how it works 
                and converts visitors into customers."
              </p>
              <p className="text-primary font-medium mt-3">— Our Philosophy</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
