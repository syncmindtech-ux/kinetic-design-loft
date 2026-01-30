import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Home,
  Briefcase,
  Users,
  MessageSquare,
  Image,
  BookOpen,
  Phone,
  Megaphone,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { HeroEditor } from "@/components/admin/editors/HeroEditor";
import { BannersEditor } from "@/components/admin/editors/BannersEditor";
import { ServicesEditor } from "@/components/admin/editors/ServicesEditor";
import { WhyChooseUsEditor } from "@/components/admin/editors/WhyChooseUsEditor";
import { ProcessEditor } from "@/components/admin/editors/ProcessEditor";
import { TestimonialsEditor } from "@/components/admin/editors/TestimonialsEditor";
import { ProjectsEditor } from "@/components/admin/editors/ProjectsEditor";
import { BlogEditor } from "@/components/admin/editors/BlogEditor";
import { PageHeroesEditor } from "@/components/admin/editors/PageHeroesEditor";
import { CTAEditor } from "@/components/admin/editors/CTAEditor";
import { ContactInfoEditor } from "@/components/admin/editors/ContactInfoEditor";

const menuItems = [
  { id: "hero", label: "Hero Section", icon: Home },
  { id: "banners", label: "Banners", icon: Image },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "why-choose-us", label: "Why Choose Us", icon: Users },
  { id: "process", label: "Process Steps", icon: Settings },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "projects", label: "Projects/Work", icon: LayoutDashboard },
  { id: "blog", label: "Blog Posts", icon: BookOpen },
  { id: "page-heroes", label: "Page Heroes", icon: FileText },
  { id: "cta", label: "CTA Section", icon: Megaphone },
  { id: "contact", label: "Contact Info", icon: Phone },
];

const AdminDashboard = () => {
  const { user, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/admin");
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const renderEditor = () => {
    switch (activeSection) {
      case "hero": return <HeroEditor />;
      case "banners": return <BannersEditor />;
      case "services": return <ServicesEditor />;
      case "why-choose-us": return <WhyChooseUsEditor />;
      case "process": return <ProcessEditor />;
      case "testimonials": return <TestimonialsEditor />;
      case "projects": return <ProjectsEditor />;
      case "blog": return <BlogEditor />;
      case "page-heroes": return <PageHeroesEditor />;
      case "cta": return <CTAEditor />;
      case "contact": return <ContactInfoEditor />;
      default: return <HeroEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-secondary rounded-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`fixed lg:relative z-40 w-72 h-screen bg-card border-r border-border overflow-y-auto flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            CMS Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {user?.email}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {activeSection === item.id && (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => window.open("/", "_blank")}
          >
            <Home className="w-4 h-4 mr-2" />
            View Website
          </Button>
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderEditor()}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
