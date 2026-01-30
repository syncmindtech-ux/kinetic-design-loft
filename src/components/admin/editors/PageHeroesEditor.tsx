import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "../ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw } from "lucide-react";

interface PageHero {
  id: string;
  page_slug: string;
  title: string;
  subtitle: string;
  description: string;
  background_image: string;
}

export const PageHeroesEditor = () => {
  const [heroes, setHeroes] = useState<PageHero[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchHeroes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("page_heroes")
      .select("*")
      .order("page_slug");

    if (error) {
      toast.error("Failed to load page heroes");
    } else {
      setHeroes(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleSave = async (hero: PageHero) => {
    setIsSaving(true);
    const { error } = await supabase
      .from("page_heroes")
      .update(hero)
      .eq("id", hero.id);

    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Updated!");
      setEditingId(null);
    }
    setIsSaving(false);
  };

  const updateHero = (id: string, updates: Partial<PageHero>) => {
    setHeroes(heroes.map((h) => (h.id === id ? { ...h, ...updates } : h)));
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
      <div>
        <h2 className="text-2xl font-bold">Page Heroes</h2>
        <p className="text-muted-foreground">Edit hero sections for each page</p>
      </div>

      <div className="grid gap-4">
        {heroes.map((hero) => (
          <div key={hero.id} className="border border-border rounded-lg p-4 bg-card">
            {editingId === hero.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Page Slug (read-only)</Label>
                    <Input value={hero.page_slug} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input
                      value={hero.subtitle}
                      onChange={(e) => updateHero(hero.id, { subtitle: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={hero.title}
                    onChange={(e) => updateHero(hero.id, { title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={hero.description}
                    onChange={(e) => updateHero(hero.id, { description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Background Image</Label>
                  <ImageUpload
                    value={hero.background_image}
                    onChange={(url) => updateHero(hero.id, { background_image: url })}
                    folder="page-heroes"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSave(hero)} disabled={isSaving}>
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
                  src={hero.background_image}
                  alt={hero.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold capitalize">{hero.page_slug} Page</h4>
                  <p className="text-sm text-muted-foreground">{hero.title}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setEditingId(hero.id)}>
                  Edit
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
