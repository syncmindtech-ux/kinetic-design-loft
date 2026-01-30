import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Rocket, Shield, Clock, HeartHandshake, Award, Users, Zap, Check } from "lucide-react";
import { useWhyChooseUs } from "@/hooks/useCMSData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Lightbulb,
  Rocket,
  Shield,
  Clock,
  HeartHandshake,
  Award,
  Users,
  Zap,
  Check,
};

const fallbackReasons = [
  { id: '1', icon: "Target", title: "Results-Driven Approach", description: "We focus on delivering measurable results that align with your business goals.", order_index: 0 },
  { id: '2', icon: "Lightbulb", title: "Innovative Solutions", description: "Our team stays ahead of industry trends, implementing cutting-edge technologies.", order_index: 1 },
  { id: '3', icon: "Rocket", title: "Fast & Efficient Delivery", description: "We understand the importance of time-to-market. Our streamlined processes ensure on-time delivery.", order_index: 2 },
  { id: '4', icon: "Shield", title: "Secure & Reliable", description: "Security is at the core of everything we build.", order_index: 3 },
  { id: '5', icon: "Clock", title: "24/7 Support & Maintenance", description: "We provide ongoing support, updates, and maintenance.", order_index: 4 },
  { id: '6', icon: "HeartHandshake", title: "Client-Centric Partnership", description: "We believe in building lasting relationships.", order_index: 5 },
];

export const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: reasons } = useWhyChooseUs();

  const displayReasons = reasons && reasons.length > 0 ? reasons : fallbackReasons;

  return (
    <section className="py-24 md:py-32 relative bg-[#f6f5f5] dark:bg-secondary/30">
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
          {displayReasons.map((reason, index) => {
            const IconComponent = iconMap[reason.icon] || Target;
            return (
              <motion.div
                key={reason.id}
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
                  <IconComponent className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
