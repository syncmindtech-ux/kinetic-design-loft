import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, Code, Rocket, Search, Settings, Zap, Check } from "lucide-react";
import { useProcessSteps } from "@/hooks/useCMSData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  PenTool,
  Code,
  Rocket,
  Search,
  Settings,
  Zap,
  Check,
};

const fallbackSteps = [
  { id: '1', step_number: "01", icon: "MessageSquare", title: "Discovery & Strategy", description: "We start by understanding your business, goals, target audience, and competitive landscape.", order_index: 0 },
  { id: '2', step_number: "02", icon: "PenTool", title: "Design & Prototyping", description: "Our designers create stunning visual concepts and interactive prototypes using Figma.", order_index: 1 },
  { id: '3', step_number: "03", icon: "Code", title: "Development & Testing", description: "Our development team brings the designs to life using the best platform for your needs.", order_index: 2 },
  { id: '4', step_number: "04", icon: "Rocket", title: "Launch & Optimize", description: "After thorough quality assurance, we launch your website with SEO optimization baked in.", order_index: 3 },
];

export const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: steps } = useProcessSteps();

  const displaySteps = steps && steps.length > 0 ? steps : fallbackSteps;

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium text-sm tracking-wider uppercase"
          >
            Our Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6"
          >
            How We <span className="text-primary">Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Our proven four-step process ensures every project is delivered with precision, 
            creativity, and a focus on achieving your business objectives.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50 -translate-x-1/2" />

          <div className="space-y-16 lg:space-y-0">
            {displaySteps.map((step, index) => {
              const IconComponent = iconMap[step.icon] || MessageSquare;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className={`lg:flex items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } ${index > 0 ? "lg:mt-16" : ""}`}
                >
                  {/* Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:pl-16"}`}>
                    <motion.div
                      whileHover={{ x: index % 2 === 0 ? -10 : 10 }}
                      transition={{ duration: 0.3 }}
                      className="glass rounded-2xl p-8"
                    >
                      <span className="text-5xl font-bold text-primary/20">{step.step_number}</span>
                      <h3 className="text-2xl font-bold mt-2 mb-4">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Icon - Center */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:flex w-16 h-16 rounded-full bg-primary items-center justify-center flex-shrink-0 z-10"
                  >
                    <IconComponent className="w-7 h-7 text-primary-foreground" />
                  </motion.div>

                  {/* Spacer */}
                  <div className="lg:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
