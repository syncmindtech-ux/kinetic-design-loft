import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Twitter, Mail } from "lucide-react";

const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "10+ years in digital strategy and web development.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    bio: "Creating beautiful, user-centered designs.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Michael Roberts",
    role: "Senior Developer",
    bio: "Full-stack expert with a passion for clean code.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Emily Davis",
    role: "SEO Specialist",
    bio: "Data-driven approach to search optimization.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
];

const values = [
  {
    title: "Innovation",
    description: "We stay ahead of the curve, constantly exploring new technologies and methodologies to deliver cutting-edge solutions.",
  },
  {
    title: "Quality",
    description: "Every project we undertake meets the highest standards. We don't cut corners, and we don't compromise on excellence.",
  },
  {
    title: "Transparency",
    description: "Open communication is at the heart of how we work. You'll always know where your project stands.",
  },
  {
    title: "Partnership",
    description: "We don't just build websites; we build lasting relationships. Your success is our success.",
  },
];

export const TeamSection = () => {
  const teamRef = useRef(null);
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const valuesRef = useRef(null);
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Values Section */}
      <section ref={valuesRef} className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              What <span className="text-primary">Drives Us</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Our core values shape everything we do and how we work with our clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Team</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Meet the <span className="text-primary">Experts</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A talented team of designers, developers, and strategists dedicated to your success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group glass rounded-2xl overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex gap-3">
                      <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              From Startup to <span className="text-primary">Industry Leader</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              What started as a small team with big dreams has grown into a full-service digital agency 
              trusted by businesses around the world. Our journey has been defined by constant learning, 
              adapting to new technologies, and always putting our clients first.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { year: "2019", event: "Founded in San Francisco" },
              { year: "2020", event: "Expanded to 10 team members" },
              { year: "2022", event: "100+ projects completed" },
              { year: "2024", event: "Global client base" },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-4xl font-bold text-primary mb-2">{milestone.year}</div>
                <p className="text-foreground">{milestone.event}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-4 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
