import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order_index: number;
}

export interface Banner {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
  image_url: string;
  is_reversed: boolean;
  order_index: number;
}

export interface WhyChooseUs {
  id: string;
  icon: string;
  title: string;
  description: string;
  order_index: number;
}

export interface ProcessStep {
  id: string;
  step_number: string;
  icon: string;
  title: string;
  description: string;
  order_index: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar_url: string | null;
  rating: number;
  order_index: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  link: string | null;
  order_index: number;
}

export interface BlogPost {
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

export interface PageHero {
  id: string;
  page_slug: string;
  title: string;
  subtitle: string;
  description: string;
  background_image: string;
}

export interface HeroContent {
  id: string;
  subtitle: string;
  title: string;
  highlight_text: string;
  description: string;
  button_text: string;
  button_link: string;
  image_url: string | null;
}

export interface CTAContent {
  id: string;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
}

export interface ContactInfo {
  id: string;
  email: string;
  phone: string;
  address: string;
  whatsapp_number: string | null;
}

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order_index");
      if (error) throw error;
      return data as Service[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes cache
  });
};

export const useBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("banners")
        .select("*")
        .order("order_index");
      if (error) throw error;
      return data as Banner[];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useWhyChooseUs = () => {
  return useQuery({
    queryKey: ["why_choose_us"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("why_choose_us")
        .select("*")
        .order("order_index");
      if (error) throw error;
      return data as WhyChooseUs[];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useProcessSteps = () => {
  return useQuery({
    queryKey: ["process_steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("process_steps")
        .select("*")
        .order("order_index");
      if (error) throw error;
      return data as ProcessStep[];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("order_index");
      if (error) throw error;
      return data as Testimonial[];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_index");
      if (error) throw error;
      return data as Project[];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const usePageHero = (slug: string) => {
  return useQuery({
    queryKey: ["page_hero", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_heroes")
        .select("*")
        .eq("page_slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as PageHero | null;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useHeroContent = () => {
  return useQuery({
    queryKey: ["hero_content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_content")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as HeroContent | null;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useCTAContent = () => {
  return useQuery({
    queryKey: ["cta_content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cta_content")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as CTAContent | null;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useContactInfo = () => {
  return useQuery({
    queryKey: ["contact_info"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as ContactInfo | null;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
