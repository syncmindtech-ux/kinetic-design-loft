import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "../ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw } from "lucide-react";

interface HeroContent {
  id: string;
  subtitle: string;
  title: string;
  highlight_text: string;
  description: string;
  button_text: string;
  button_link: string;
  image_url: string | null;
}

export const HeroEditor = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchContent = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("hero_content")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      toast.error("Failed to load hero content");
      console.error(error);
    } else if (data) {
      setContent(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);

    const { error } = await supabase
      .from("hero_content")
      .update({
        subtitle: content.subtitle,
        title: content.title,
        highlight_text: content.highlight_text,
        description: content.description,
        button_text: content.button_text,
        button_link: content.button_link,
        image_url: content.image_url,
      })
      .eq("id", content.id);

    if (error) {
      toast.error("Failed to save changes");
      console.error(error);
    } else {
      toast.success("Hero content updated successfully!");
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center text-muted-foreground">
        No hero content found. Please seed the database first.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hero Section</h2>
          <p className="text-muted-foreground">Edit the homepage hero section</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <div className="space-y-2">
          <Label>Subtitle</Label>
          <Input
            value={content.subtitle}
            onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
            placeholder="e.g., Digital Excellence"
          />
        </div>

        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            placeholder="Main heading"
          />
        </div>

        <div className="space-y-2">
          <Label>Highlight Text</Label>
          <Input
            value={content.highlight_text}
            onChange={(e) => setContent({ ...content, highlight_text: e.target.value })}
            placeholder="Text to highlight in color"
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={content.description}
            onChange={(e) => setContent({ ...content, description: e.target.value })}
            rows={4}
            placeholder="Hero description text"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input
              value={content.button_text}
              onChange={(e) => setContent({ ...content, button_text: e.target.value })}
              placeholder="CTA button text"
            />
          </div>
          <div className="space-y-2">
            <Label>Button Link</Label>
            <Input
              value={content.button_link}
              onChange={(e) => setContent({ ...content, button_link: e.target.value })}
              placeholder="/contact"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Hero Image</Label>
          <ImageUpload
            value={content.image_url || ""}
            onChange={(url) => setContent({ ...content, image_url: url })}
            folder="hero"
          />
        </div>
      </div>
    </div>
  );
};
