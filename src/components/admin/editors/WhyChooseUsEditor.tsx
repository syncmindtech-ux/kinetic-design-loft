import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw, Plus, Trash2 } from "lucide-react";

interface Reason {
  id: string;
  icon: string;
  title: string;
  description: string;
  order_index: number;
}

const iconOptions = ["Target", "Lightbulb", "Rocket", "Shield", "Clock", "HeartHandshake", "Award", "Users", "Zap", "Check"];

export const WhyChooseUsEditor = () => {
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const fetchReasons = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("why_choose_us")
      .select("*")
      .order("order_index");

    if (error) {
      toast.error("Failed to load reasons");
    } else {
      setReasons(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReasons();
  }, []);

  const handleSave = async (reason: Reason) => {
    setIsSaving(true);
    const { error } = await supabase
      .from("why_choose_us")
      .update(reason)
      .eq("id", reason.id);

    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Updated!");
      setEditingId(null);
    }
    setIsSaving(false);
  };

  const handleAdd = async () => {
    const newReason = {
      icon: "Target",
      title: "New Reason",
      description: "Description of why clients should choose us",
      order_index: reasons.length,
    };

    const { data, error } = await supabase
      .from("why_choose_us")
      .insert(newReason)
      .select()
      .single();

    if (error) {
      toast.error("Failed to add");
    } else {
      setReasons([...reasons, data]);
      setEditingId(data.id);
      toast.success("Added!");
    }
  };

  const openDeleteDialog = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    const { error } = await supabase.from("why_choose_us").delete().eq("id", itemToDelete);

    if (error) {
      toast.error("Failed to delete");
    } else {
      setReasons(reasons.filter((r) => r.id !== itemToDelete));
      toast.success("Deleted!");
    }
    setItemToDelete(null);
  };

  const updateReason = (id: string, updates: Partial<Reason>) => {
    setReasons(reasons.map((r) => (r.id === id ? { ...r, ...updates } : r)));
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
          <h2 className="text-2xl font-bold">Why Choose Us</h2>
          <p className="text-muted-foreground">Manage reasons to choose your company</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Reason
        </Button>
      </div>

      <div className="grid gap-4">
        {reasons.map((reason) => (
          <div key={reason.id} className="border border-border rounded-lg p-4 bg-card">
            {editingId === reason.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={reason.title}
                      onChange={(e) => updateReason(reason.id, { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <select
                      value={reason.icon}
                      onChange={(e) => updateReason(reason.id, { icon: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={reason.description}
                    onChange={(e) => updateReason(reason.id, { description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSave(reason)} disabled={isSaving}>
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
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-semibold">
                  {reason.icon.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{reason.title}</h4>
                  <p className="text-sm text-muted-foreground truncate max-w-md">
                    {reason.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingId(reason.id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(reason.id)}>
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
        title="Delete Reason"
        description="Are you sure you want to delete this item? This action cannot be undone."
      />
    </div>
  );
};
