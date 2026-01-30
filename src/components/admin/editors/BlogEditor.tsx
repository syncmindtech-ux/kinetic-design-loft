import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "../ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw, Plus, Trash2 } from "lucide-react";

interface BlogPost {
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

const categoryOptions = ["Development", "Design", "SEO", "Marketing", "E-Commerce", "Tips"];

export const BlogEditor = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      toast.error("Failed to load posts");
    } else {
      setPosts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = async (post: BlogPost) => {
    setIsSaving(true);
    const { error } = await supabase
      .from("blog_posts")
      .update(post)
      .eq("id", post.id);

    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Updated!");
      setEditingId(null);
    }
    setIsSaving(false);
  };

  const handleAdd = async () => {
    const newPost = {
      title: "New Blog Post",
      excerpt: "Brief excerpt of the post...",
      content: "Full blog post content goes here...",
      category: "Development",
      author: "SyncMindTech",
      author_role: "Team",
      image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
      read_time: "5 min read",
      is_featured: false,
      published_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("blog_posts")
      .insert(newPost)
      .select()
      .single();

    if (error) {
      toast.error("Failed to add");
    } else {
      setPosts([data, ...posts]);
      setEditingId(data.id);
      toast.success("Added!");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete");
    } else {
      setPosts(posts.filter((p) => p.id !== id));
      toast.success("Deleted!");
    }
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border border-border rounded-lg p-4 bg-card">
            {editingId === post.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={post.title}
                      onChange={(e) => updatePost(post.id, { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select
                      value={post.category}
                      onChange={(e) => updatePost(post.id, { category: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Excerpt</Label>
                  <Textarea
                    value={post.excerpt}
                    onChange={(e) => updatePost(post.id, { excerpt: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Full Content (Markdown supported)</Label>
                  <Textarea
                    value={post.content}
                    onChange={(e) => updatePost(post.id, { content: e.target.value })}
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Author</Label>
                    <Input
                      value={post.author}
                      onChange={(e) => updatePost(post.id, { author: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Author Role</Label>
                    <Input
                      value={post.author_role}
                      onChange={(e) => updatePost(post.id, { author_role: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Read Time</Label>
                    <Input
                      value={post.read_time}
                      onChange={(e) => updatePost(post.id, { read_time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`featured-${post.id}`}
                      checked={post.is_featured}
                      onChange={(e) => updatePost(post.id, { is_featured: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor={`featured-${post.id}`}>Featured Post</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <ImageUpload
                    value={post.image_url}
                    onChange={(url) => updatePost(post.id, { image_url: url })}
                    folder="blog"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSave(post)} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button variant="outline" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-20 h-14 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold flex items-center gap-2">
                    {post.title}
                    {post.is_featured && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {post.category} • {post.author} • {post.read_time}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingId(post.id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
