import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "../ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw, Plus, Trash2, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar_url: string | null;
  rating: number;
  order_index: number;
}

export const TestimonialsEditor = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("order_index");

    if (error) {
      toast.error("Failed to load testimonials");
    } else {
      setTestimonials(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async (testimonial: Testimonial) => {
    setIsSaving(true);
    const { error } = await supabase
      .from("testimonials")
      .update(testimonial)
      .eq("id", testimonial.id);

    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Updated!");
      setEditingId(null);
    }
    setIsSaving(false);
  };

  const handleAdd = async () => {
    const newTestimonial = {
      name: "Client Name",
      role: "CEO",
      company: "Company Name",
      content: "Testimonial content goes here...",
      avatar_url: null,
      rating: 5,
      order_index: testimonials.length,
    };

    const { data, error } = await supabase
      .from("testimonials")
      .insert(newTestimonial)
      .select()
      .single();

    if (error) {
      toast.error("Failed to add");
    } else {
      setTestimonials([...testimonials, data]);
      setEditingId(data.id);
      toast.success("Added!");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;

    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete");
    } else {
      setTestimonials(testimonials.filter((t) => t.id !== id));
      toast.success("Deleted!");
    }
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t)));
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
          <h2 className="text-2xl font-bold">Testimonials</h2>
          <p className="text-muted-foreground">Manage client testimonials</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border border-border rounded-lg p-4 bg-card">
            {editingId === testimonial.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(testimonial.id, { name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                      value={testimonial.role}
                      onChange={(e) => updateTestimonial(testimonial.id, { role: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={testimonial.company}
                      onChange={(e) => updateTestimonial(testimonial.id, { company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Testimonial Content</Label>
                  <Textarea
                    value={testimonial.content}
                    onChange={(e) => updateTestimonial(testimonial.id, { content: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rating (1-5)</Label>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      value={testimonial.rating}
                      onChange={(e) => updateTestimonial(testimonial.id, { rating: parseInt(e.target.value) || 5 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Avatar</Label>
                    <ImageUpload
                      value={testimonial.avatar_url || ""}
                      onChange={(url) => updateTestimonial(testimonial.id, { avatar_url: url })}
                      folder="testimonials"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSave(testimonial)} disabled={isSaving}>
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
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingId(testimonial.id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial.id)}>
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
