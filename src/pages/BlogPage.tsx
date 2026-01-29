import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Clock, ArrowRight, User, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredPost = {
  id: "featured",
  title: "The Future of Web Design: Trends to Watch in 2024",
  excerpt: "Explore the cutting-edge design trends that are shaping the digital landscape. From AI-powered interfaces to immersive 3D experiences, discover what's next for web design.",
  content: `
    <p>The digital landscape is evolving at an unprecedented pace, and 2024 promises to be a transformative year for web design. As we look ahead, several key trends are emerging that will reshape how we think about creating online experiences.</p>
    
    <h2>1. AI-Powered Design Interfaces</h2>
    <p>Artificial intelligence is no longer just a buzzword—it's becoming an integral part of the design process. From automated layout suggestions to intelligent color palette generation, AI tools are helping designers work smarter and faster. We're seeing a shift from AI as a replacement for designers to AI as a powerful collaborative tool.</p>
    
    <h2>2. Immersive 3D Experiences</h2>
    <p>With WebGL and Three.js becoming more accessible, websites are transforming into immersive 3D experiences. From product showcases to interactive storytelling, 3D elements are creating deeper engagement with users. The key is to use these elements purposefully—enhancing the user experience rather than overwhelming it.</p>
    
    <h2>3. Sustainable Web Design</h2>
    <p>Environmental consciousness is influencing web design decisions. Designers are optimizing for lower energy consumption through efficient code, compressed images, and streamlined user journeys. This trend aligns business goals with environmental responsibility.</p>
    
    <h2>4. Micro-Interactions and Animations</h2>
    <p>Subtle animations continue to play a crucial role in user experience. Thoughtful micro-interactions provide feedback, guide users, and add personality to digital products. The trend is moving toward more organic, physics-based animations that feel natural and intuitive.</p>
    
    <h2>5. Variable Fonts and Typography</h2>
    <p>Typography is becoming more dynamic with variable fonts that can adapt to different screen sizes and contexts. This technology allows for more expressive and responsive typography while maintaining smaller file sizes.</p>
    
    <h2>Looking Ahead</h2>
    <p>As we embrace these trends, the fundamental principles of good design remain unchanged: clarity, usability, and purpose. The best designs will be those that leverage new technologies while staying focused on solving real problems for real users.</p>
  `,
  image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=600&fit=crop",
  author: "Sarah Chen",
  date: "Jan 15, 2024",
  readTime: "8 min read",
  category: "Design"
};

const allBlogPosts = [
  {
    id: "seo-strategies",
    title: "10 SEO Strategies That Actually Work in 2024",
    excerpt: "Discover proven SEO techniques that will boost your search rankings and drive organic traffic to your website.",
    content: `
      <p>Search engine optimization continues to evolve, and staying ahead requires adapting to the latest algorithm changes and best practices. Here are ten strategies that are delivering real results in 2024.</p>
      
      <h2>1. Focus on User Intent</h2>
      <p>Understanding what users are really looking for is more important than ever. Search engines have become sophisticated at matching queries with intent. Create content that directly addresses user questions and needs.</p>
      
      <h2>2. Optimize for Core Web Vitals</h2>
      <p>Page experience signals including Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) directly impact rankings. Prioritize technical performance alongside content quality.</p>
      
      <h2>3. Create Comprehensive Topic Clusters</h2>
      <p>Rather than targeting individual keywords, build content ecosystems around core topics. Link related content together to demonstrate expertise and help users find what they need.</p>
      
      <h2>4. Leverage Video Content</h2>
      <p>Video is increasingly appearing in search results. Create video content that complements your written content and optimize with proper titles, descriptions, and transcripts.</p>
      
      <h2>5. Build Quality Backlinks</h2>
      <p>Despite all the changes, quality backlinks remain a strong ranking factor. Focus on creating linkable content and building genuine relationships within your industry.</p>
      
      <h2>6. Optimize for Featured Snippets</h2>
      <p>Structure your content to answer questions directly and clearly. Use headers, lists, and tables to increase your chances of appearing in position zero.</p>
      
      <h2>7. Prioritize E-E-A-T</h2>
      <p>Experience, Expertise, Authoritativeness, and Trustworthiness matter more than ever. Showcase credentials, cite sources, and build a reputation as a trusted resource.</p>
      
      <h2>8. Local SEO for Local Businesses</h2>
      <p>For businesses serving local markets, optimize your Google Business Profile, gather reviews, and create locally-relevant content.</p>
      
      <h2>9. Voice Search Optimization</h2>
      <p>As voice assistants become more common, optimize for conversational queries and natural language patterns.</p>
      
      <h2>10. Regular Content Audits</h2>
      <p>Periodically review and update existing content. Remove or consolidate underperforming pages and refresh outdated information.</p>
    `,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    author: "Emily Davis",
    date: "Jan 12, 2024",
    readTime: "6 min read",
    category: "SEO"
  },
  {
    id: "wordpress-vs-custom",
    title: "WordPress vs Custom Development: Which Is Right for You?",
    excerpt: "A comprehensive comparison of two popular approaches to help you make the right choice for your next project.",
    content: `
      <p>Choosing between WordPress and custom development is one of the most important decisions you'll make for your web project. Each approach has distinct advantages and trade-offs that depend on your specific needs.</p>
      
      <h2>WordPress: The Content Management Powerhouse</h2>
      <p>WordPress powers over 40% of all websites on the internet for good reason. It offers a mature ecosystem, thousands of plugins, and a familiar interface for content management.</p>
      
      <h3>Pros of WordPress:</h3>
      <ul>
        <li>Quick setup and time to launch</li>
        <li>Extensive plugin ecosystem</li>
        <li>Easy content management for non-technical users</li>
        <li>Large community and support resources</li>
        <li>Cost-effective for standard websites</li>
      </ul>
      
      <h3>Cons of WordPress:</h3>
      <ul>
        <li>Security vulnerabilities require constant updates</li>
        <li>Performance can suffer with many plugins</li>
        <li>Limited customization without development</li>
        <li>Potential for plugin conflicts</li>
      </ul>
      
      <h2>Custom Development: Built for Your Needs</h2>
      <p>Custom development gives you complete control over every aspect of your website. It's ideal for unique requirements that can't be met with existing solutions.</p>
      
      <h3>Pros of Custom Development:</h3>
      <ul>
        <li>Tailored exactly to your requirements</li>
        <li>Optimized performance</li>
        <li>Enhanced security</li>
        <li>Complete ownership and flexibility</li>
        <li>Scalability for growing needs</li>
      </ul>
      
      <h3>Cons of Custom Development:</h3>
      <ul>
        <li>Higher initial investment</li>
        <li>Longer development timeline</li>
        <li>Requires technical expertise to maintain</li>
        <li>Updates and features require development work</li>
      </ul>
      
      <h2>Making the Right Choice</h2>
      <p>Consider WordPress if you need a content-heavy site with standard functionality and want to minimize development costs. Choose custom development if you have unique requirements, need optimal performance, or plan to scale significantly.</p>
    `,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    author: "Michael Roberts",
    date: "Jan 10, 2024",
    readTime: "10 min read",
    category: "Development"
  },
  {
    id: "shopify-conversions",
    title: "How to Optimize Your Shopify Store for Conversions",
    excerpt: "Learn the secrets to creating a high-converting e-commerce experience that turns visitors into customers.",
    content: `
      <p>Running a Shopify store is one thing; optimizing it for maximum conversions is another. Here's how to transform your store into a conversion machine.</p>
      
      <h2>Speed Is Everything</h2>
      <p>Every second of load time costs you conversions. Optimize images, minimize apps, and choose a lightweight theme. Use Shopify's built-in speed reports to identify bottlenecks.</p>
      
      <h2>Streamline the Checkout Process</h2>
      <p>Abandoned carts are often caused by complicated checkout flows. Enable guest checkout, offer multiple payment options, and minimize the number of steps required to complete a purchase.</p>
      
      <h2>High-Quality Product Photography</h2>
      <p>Customers can't touch or try products online. Compensate with high-quality images from multiple angles, zoom functionality, and lifestyle photos showing products in use.</p>
      
      <h2>Compelling Product Descriptions</h2>
      <p>Don't just list features—tell a story. Explain how the product solves problems and improves the customer's life. Use bullet points for quick scanning and detailed paragraphs for those who want more information.</p>
      
      <h2>Social Proof</h2>
      <p>Reviews, testimonials, and user-generated content build trust. Display reviews prominently and encourage customers to share their experiences.</p>
      
      <h2>Mobile Optimization</h2>
      <p>Over half of e-commerce traffic comes from mobile devices. Ensure your store provides an excellent mobile experience with easy navigation and touch-friendly elements.</p>
      
      <h2>Strategic Email Marketing</h2>
      <p>Capture emails and nurture leads with targeted campaigns. Abandoned cart emails alone can recover a significant percentage of lost sales.</p>
    `,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    author: "Alex Johnson",
    date: "Jan 8, 2024",
    readTime: "7 min read",
    category: "E-commerce"
  },
  {
    id: "color-psychology",
    title: "The Psychology of Color in Web Design",
    excerpt: "Understanding how color choices influence user behavior and can improve your website's effectiveness.",
    content: `
      <p>Color is one of the most powerful tools in a designer's arsenal. Understanding the psychology behind color choices can dramatically improve your website's effectiveness.</p>
      
      <h2>The Emotional Impact of Colors</h2>
      <p>Different colors evoke different emotional responses. Understanding these associations helps you choose colors that align with your brand's message.</p>
      
      <h3>Red</h3>
      <p>Excitement, urgency, passion. Often used for calls to action and sale promotions. Use sparingly to avoid overwhelming users.</p>
      
      <h3>Blue</h3>
      <p>Trust, security, professionalism. Popular with financial institutions and technology companies. Creates a sense of reliability.</p>
      
      <h3>Green</h3>
      <p>Growth, nature, health. Associated with environmental consciousness and wellness brands. Also commonly used for success messages.</p>
      
      <h3>Yellow</h3>
      <p>Optimism, warmth, attention. Great for highlighting important elements but can be overwhelming in large amounts.</p>
      
      <h3>Purple</h3>
      <p>Luxury, creativity, wisdom. Often used by premium brands and creative industries.</p>
      
      <h2>Color in Practice</h2>
      <p>Beyond emotional associations, consider practical applications. Ensure sufficient contrast for accessibility, maintain consistency across your brand, and test different color variations to see what resonates with your audience.</p>
      
      <h2>Cultural Considerations</h2>
      <p>Color meanings vary across cultures. White symbolizes purity in Western cultures but mourning in some Eastern cultures. Research your target audience's cultural context when making color decisions.</p>
    `,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    author: "Sarah Chen",
    date: "Jan 5, 2024",
    readTime: "5 min read",
    category: "Design"
  },
  {
    id: "design-system",
    title: "Building a Design System from Scratch",
    excerpt: "A step-by-step guide to creating a scalable design system that ensures consistency across your products.",
    content: `
      <p>A well-crafted design system is the foundation of consistent, scalable product design. Here's how to build one from the ground up.</p>
      
      <h2>What Is a Design System?</h2>
      <p>A design system is more than a component library. It's a comprehensive set of standards, documentation, and tools that guide how products are designed and built.</p>
      
      <h2>Start with Principles</h2>
      <p>Define the core principles that will guide all design decisions. These might include accessibility, simplicity, consistency, or innovation. Principles help team members make aligned decisions independently.</p>
      
      <h2>Audit Existing Designs</h2>
      <p>Before building new components, catalog what already exists. Identify patterns, inconsistencies, and opportunities for consolidation.</p>
      
      <h2>Define Your Foundation</h2>
      <p>Establish the basic building blocks: typography scale, color palette, spacing system, and grid structure. These foundational elements inform everything else.</p>
      
      <h2>Build Core Components</h2>
      <p>Start with the most commonly used components: buttons, form elements, cards, and navigation. Document their variants, states, and usage guidelines.</p>
      
      <h2>Documentation Is Key</h2>
      <p>A design system is only valuable if people can understand and use it. Create clear documentation with examples, dos and don'ts, and implementation guidelines.</p>
      
      <h2>Iterate and Evolve</h2>
      <p>A design system is never finished. Plan for regular reviews, gather feedback from users, and evolve the system as needs change.</p>
    `,
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
    author: "Sarah Chen",
    date: "Jan 3, 2024",
    readTime: "12 min read",
    category: "Design"
  },
  {
    id: "website-performance",
    title: "The Ultimate Guide to Website Performance",
    excerpt: "Speed matters. Learn how to optimize your website for lightning-fast performance and better user experience.",
    content: `
      <p>Website performance directly impacts user experience, conversion rates, and search rankings. Here's everything you need to know about building fast websites.</p>
      
      <h2>Why Performance Matters</h2>
      <p>Studies show that users expect pages to load in under 3 seconds. Each additional second of load time increases bounce rates significantly. Fast websites convert better and rank higher.</p>
      
      <h2>Image Optimization</h2>
      <p>Images are often the largest files on a web page. Use modern formats like WebP, implement lazy loading, and serve appropriately sized images for different devices.</p>
      
      <h2>Minimize HTTP Requests</h2>
      <p>Each resource on your page requires a separate request. Combine files where possible, use CSS sprites, and eliminate unnecessary resources.</p>
      
      <h2>Leverage Browser Caching</h2>
      <p>Configure cache headers to store static resources locally. Returning visitors will load much faster when assets are cached.</p>
      
      <h2>Use a Content Delivery Network</h2>
      <p>CDNs distribute your content across global servers, reducing the distance between users and your content. This dramatically improves load times for international visitors.</p>
      
      <h2>Optimize Critical Rendering Path</h2>
      <p>Prioritize loading the content users see first. Defer non-critical JavaScript, inline critical CSS, and use async loading where appropriate.</p>
      
      <h2>Monitor and Test</h2>
      <p>Use tools like Lighthouse, GTmetrix, and WebPageTest to measure performance. Set up monitoring to catch regressions early.</p>
    `,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    author: "Michael Roberts",
    date: "Jan 1, 2024",
    readTime: "9 min read",
    category: "Development"
  },
];

const categories = [
  { name: "All Posts", slug: "all" },
  { name: "Design", slug: "Design" },
  { name: "Development", slug: "Development" },
  { name: "SEO", slug: "SEO" },
  { name: "E-commerce", slug: "E-commerce" },
];

const BlogPage = () => {
  const featuredRef = useRef(null);
  const isFeaturedInView = useInView(featuredRef, { once: true, margin: "-100px" });
  const [selectedPost, setSelectedPost] = useState<typeof featuredPost | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visiblePosts, setVisiblePosts] = useState(6);

  const filteredPosts = activeCategory === "all"
    ? allBlogPosts
    : allBlogPosts.filter(post => post.category === activeCategory);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMore = visiblePosts < filteredPosts.length;

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 6);
  };

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    setVisiblePosts(6);
  };

  const getCategoryCount = (slug: string) => {
    if (slug === "all") return allBlogPosts.length;
    return allBlogPosts.filter(post => post.category === slug).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero
        title="Our Blog"
        subtitle="Insights & Resources"
        description="Expert tips, industry insights, and the latest trends in web design, development, and digital marketing."
        backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=1080&fit=crop"
      />

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.article
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {selectedPost.category}
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {selectedPost.author}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">{selectedPost.title}</h1>
                <div 
                  className="prose prose-lg max-w-none text-foreground/80"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
                <div className="mt-8 pt-6 border-t border-border">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to all articles
                  </button>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

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
            onClick={() => setSelectedPost(featuredPost)}
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
                    <li key={category.slug}>
                      <button 
                        onClick={() => handleCategoryClick(category.slug)}
                        className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors ${
                          activeCategory === category.slug
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          activeCategory === category.slug
                            ? "bg-primary-foreground/20"
                            : "bg-secondary"
                        }`}>
                          {getCategoryCount(category.slug)}
                        </span>
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
                {displayedPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group glass rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedPost(post)}
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
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mt-12"
                >
                  <Button variant="heroOutline" size="lg" onClick={handleLoadMore}>
                    Load More Articles
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;