import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Clock, ArrowRight, User, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from "@/hooks/useCMSData";
import { format } from "date-fns";

interface BlogPostType {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  author_role: string;
  image_url: string;
  read_time: string;
  is_featured: boolean;
  published_at: string;
}

const fallbackPosts: BlogPostType[] = [
  {
    id: "featured",
    title: "The Future of Web Design: Trends to Watch in 2024",
    excerpt: "Explore the cutting-edge design trends that are shaping the digital landscape.",
    content: "<p>The digital landscape is evolving at an unprecedented pace...</p>",
    image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=600&fit=crop",
    author: "Sarah Chen",
    author_role: "Lead Designer",
    read_time: "8 min read",
    category: "Design",
    is_featured: true,
    published_at: "2024-01-15",
  },
  {
    id: "seo-strategies",
    title: "10 SEO Strategies That Actually Work in 2024",
    excerpt: "Discover proven SEO techniques that will boost your search rankings.",
    content: "<p>Search engine optimization continues to evolve...</p>",
    image_url: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    author: "Emily Davis",
    author_role: "SEO Specialist",
    read_time: "6 min read",
    category: "SEO",
    is_featured: false,
    published_at: "2024-01-12",
  },
  {
    id: "wordpress-vs-custom",
    title: "WordPress vs Custom Development: Which Is Right for You?",
    excerpt: "A comprehensive comparison to help you make the right choice.",
    content: "<p>Choosing between WordPress and custom development...</p>",
    image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    author: "Michael Roberts",
    author_role: "Developer",
    read_time: "10 min read",
    category: "Development",
    is_featured: false,
    published_at: "2024-01-10",
  },
];

const BlogPage = () => {
  const featuredRef = useRef(null);
  const isFeaturedInView = useInView(featuredRef, { once: true, margin: "-100px" });
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visiblePosts, setVisiblePosts] = useState(6);
  
  const { data: blogPosts, isLoading } = useBlogPosts();

  const allBlogPosts = blogPosts && blogPosts.length > 0 ? blogPosts : fallbackPosts;
  
  const featuredPost = allBlogPosts.find(p => p.is_featured) || allBlogPosts[0];
  const regularPosts = allBlogPosts.filter(p => p.id !== featuredPost?.id);

  // Get unique categories
  const uniqueCategories = Array.from(new Set(allBlogPosts.map(p => p.category)));
  const categories = [
    { name: "All Posts", slug: "all" },
    ...uniqueCategories.map(cat => ({ name: cat, slug: cat }))
  ];

  const filteredPosts = activeCategory === "all"
    ? regularPosts
    : regularPosts.filter(post => post.category === activeCategory);

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
    if (slug === "all") return regularPosts.length;
    return regularPosts.filter(post => post.category === slug).length;
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero
        title="Our Blog"
        subtitle="Insights & Resources"
        description="Expert tips, industry insights, and the latest trends in web design, development, and digital marketing."
        backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=1080&fit=crop"
        pageSlug="blog"
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
                  src={selectedPost.image_url}
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
                    {formatDate(selectedPost.published_at)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {selectedPost.read_time}
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
                  src={featuredPost.image_url}
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
                    {formatDate(featuredPost.published_at)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredPost.read_time}
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
                        src={post.image_url}
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
                          {formatDate(post.published_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.read_time}
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