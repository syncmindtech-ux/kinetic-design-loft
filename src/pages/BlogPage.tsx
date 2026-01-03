import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featuredPost = {
  title: "The Future of Web Design: Trends to Watch in 2024",
  excerpt: "Explore the cutting-edge design trends that are shaping the digital landscape. From AI-powered interfaces to immersive 3D experiences, discover what's next for web design.",
  image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=600&fit=crop",
  author: "Sarah Chen",
  date: "Jan 15, 2024",
  readTime: "8 min read",
  category: "Design Trends"
};

const blogPosts = [
  {
    title: "10 SEO Strategies That Actually Work in 2024",
    excerpt: "Discover proven SEO techniques that will boost your search rankings and drive organic traffic to your website.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    author: "Emily Davis",
    date: "Jan 12, 2024",
    readTime: "6 min read",
    category: "SEO"
  },
  {
    title: "WordPress vs Webflow: Which Is Right for You?",
    excerpt: "A comprehensive comparison of two popular platforms to help you make the right choice for your next project.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    author: "Michael Roberts",
    date: "Jan 10, 2024",
    readTime: "10 min read",
    category: "Development"
  },
  {
    title: "How to Optimize Your Shopify Store for Conversions",
    excerpt: "Learn the secrets to creating a high-converting e-commerce experience that turns visitors into customers.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    author: "Alex Johnson",
    date: "Jan 8, 2024",
    readTime: "7 min read",
    category: "E-commerce"
  },
  {
    title: "The Psychology of Color in Web Design",
    excerpt: "Understanding how color choices influence user behavior and can improve your website's effectiveness.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    author: "Sarah Chen",
    date: "Jan 5, 2024",
    readTime: "5 min read",
    category: "Design"
  },
  {
    title: "Building a Design System from Scratch",
    excerpt: "A step-by-step guide to creating a scalable design system that ensures consistency across your products.",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
    author: "Sarah Chen",
    date: "Jan 3, 2024",
    readTime: "12 min read",
    category: "Design"
  },
  {
    title: "The Ultimate Guide to Website Performance",
    excerpt: "Speed matters. Learn how to optimize your website for lightning-fast performance and better user experience.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    author: "Michael Roberts",
    date: "Jan 1, 2024",
    readTime: "9 min read",
    category: "Development"
  },
];

const categories = [
  { name: "All Posts", count: 24 },
  { name: "Design", count: 8 },
  { name: "Development", count: 6 },
  { name: "SEO", count: 5 },
  { name: "E-commerce", count: 5 },
];

const BlogPage = () => {
  const featuredRef = useRef(null);
  const isFeaturedInView = useInView(featuredRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero
        title="Our Blog"
        subtitle="Insights & Resources"
        description="Expert tips, industry insights, and the latest trends in web design, development, and digital marketing."
        backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=1080&fit=crop"
      />

      {/* Featured Post */}
      <section ref={featuredRef} className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Featured Article</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Latest From Our Team</h2>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 50 }}
            animate={isFeaturedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group glass rounded-3xl overflow-hidden cursor-pointer"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {featuredPost.category}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">{featuredPost.author}</span>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="glass rounded-2xl p-6 sticky top-32">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                        <span>{category.name}</span>
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{category.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="font-semibold mb-4">Newsletter</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest articles and insights delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-4 py-2 text-sm rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none"
                    />
                    <Button variant="hero" size="sm" className="w-full">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group glass rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 text-foreground text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{post.author}</span>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Load More */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mt-12"
              >
                <Button variant="heroOutline" size="lg">
                  Load More Articles
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
