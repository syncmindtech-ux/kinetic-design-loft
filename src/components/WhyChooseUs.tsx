import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Rocket, Shield, Clock, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Results-Driven Approach",
    description: "We focus on delivering measurable results that align with your business goals. Every design decision is backed by data and strategy to ensure maximum impact and ROI.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description: "Our team stays ahead of industry trends, implementing cutting-edge technologies and creative solutions that set your brand apart from the competition.",
  },
  {
    icon: Rocket,
    title: "Fast & Efficient Delivery",
    description: "We understand the importance of time-to-market. Our streamlined processes ensure your project is delivered on schedule without compromising quality.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Security is at the core of everything we build. From SSL certificates to secure payment gateways, we ensure your website and customer data are protected.",
  },
  {
    icon: Clock,
    title: "24/7 Support & Maintenance",
    description: "Our relationship doesn't end at launch. We provide ongoing support, updates, and maintenance to keep your website running smoothly around the clock.",
  },
  {
    icon: HeartHandshake,
    title: "Client-Centric Partnership",
    description: "We believe in building lasting relationships. Your success is our success, and we work as an extension of your team to achieve your digital vision.",
  },
];

export const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
  <section className="py-24 md:py-32 relative bg-[#f6f5f5]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium text-sm tracking-wider uppercase"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6"
          >
            Built on <span className="text-primary">Trust</span> & Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            We combine creativity, technology, and strategy to deliver exceptional digital experiences 
            that drive growth and transform businesses.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group glass rounded-2xl p-8 hover:shadow-xl transition-shadow duration-500"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
              >
                <reason.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
