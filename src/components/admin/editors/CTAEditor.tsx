import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw } from "lucide-react";

interface CTAContent {
  id: string;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
}

export const CTAEditor = () => {
  const [content, setContent] = useState<CTAContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchContent = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("cta_content")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      toast.error("Failed to load CTA content");
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
      .from("cta_content")
      .update(content)
      .eq("id", content.id);

    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("CTA content updated!");
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
        No CTA content found. Please seed the database first.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">CTA Section</h2>
          <p className="text-muted-foreground">Edit the call-to-action section</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={content.description}
            onChange={(e) => setContent({ ...content, description: e.target.value })}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input
              value={content.button_text}
              onChange={(e) => setContent({ ...content, button_text: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Button Link</Label>
            <Input
              value={content.button_link}
              onChange={(e) => setContent({ ...content, button_link: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
