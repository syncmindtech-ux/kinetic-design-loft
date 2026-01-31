import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "../ImageUpload";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw, Plus, Trash2, GripVertical } from "lucide-react";

interface Banner {
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

export const BannersEditor = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const fetchBanners = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("order_index");

    if (error) {
      toast.error("Failed to load banners");
    } else {
      setBanners(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSave = async (banner: Banner) => {
    setIsSaving(true);
    const { error } = await supabase
      .from("banners")
      .update(banner)
      .eq("id", banner.id);

    if (error) {
      toast.error("Failed to save banner");
    } else {
      toast.success("Banner updated!");
      setEditingId(null);
    }
    setIsSaving(false);
  };

  const handleAdd = async () => {
    const newBanner = {
      subtitle: "New Banner",
      title: "Banner Title",
      description: "Banner description text",
      button_text: "Learn More",
      button_link: "/",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
      is_reversed: false,
      order_index: banners.length,
    };

    const { data, error } = await supabase
      .from("banners")
      .insert(newBanner)
      .select()
      .single();

    if (error) {
      toast.error("Failed to add banner");
    } else {
      setBanners([...banners, data]);
      setEditingId(data.id);
      toast.success("Banner added!");
    }
  };

  const openDeleteDialog = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    const { error } = await supabase.from("banners").delete().eq("id", itemToDelete);

    if (error) {
      toast.error("Failed to delete banner");
    } else {
      setBanners(banners.filter((b) => b.id !== itemToDelete));
      toast.success("Banner deleted!");
    }
    setItemToDelete(null);
  };

  const updateBanner = (id: string, updates: Partial<Banner>) => {
    setBanners(banners.map((b) => (b.id === id ? { ...b, ...updates } : b)));
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
          <h2 className="text-2xl font-bold">Banners</h2>
          <p className="text-muted-foreground">Manage homepage banner sections</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </div>

      <div className="space-y-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="border border-border rounded-lg p-4 bg-card"
          >
            {editingId === banner.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input
                      value={banner.subtitle}
                      onChange={(e) => updateBanner(banner.id, { subtitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={banner.title}
                      onChange={(e) => updateBanner(banner.id, { title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={banner.description}
                    onChange={(e) => updateBanner(banner.id, { description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input
                      value={banner.button_text}
                      onChange={(e) => updateBanner(banner.id, { button_text: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Button Link</Label>
                    <Input
                      value={banner.button_link}
                      onChange={(e) => updateBanner(banner.id, { button_link: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Background Image</Label>
                  <ImageUpload
                    value={banner.image_url}
                    onChange={(url) => updateBanner(banner.id, { image_url: url })}
                    folder="banners"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`reversed-${banner.id}`}
                    checked={banner.is_reversed}
                    onChange={(e) => updateBanner(banner.id, { is_reversed: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor={`reversed-${banner.id}`}>Reverse Layout</Label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSave(banner)} disabled={isSaving}>
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
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="w-20 h-14 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{banner.title}</h4>
                  <p className="text-sm text-muted-foreground">{banner.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingId(banner.id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(banner.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Banner"
        description="Are you sure you want to delete this banner? This action cannot be undone."
      />
    </div>
  );
};
