import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw, Plus, Trash2, X } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order_index: number;
}

const iconOptions = ["Globe", "Settings", "ShoppingBag", "Search", "Figma", "TrendingUp", "Code", "Palette", "Zap", "Shield"];

export const ServicesEditor = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const fetchServices = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("order_index");

    if (error) {
      toast.error("Failed to load services");
    } else {
      setServices(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSave = async (service: Service) => {
    setIsSaving(true);
    const { error } = await supabase
      .from("services")
      .update(service)
      .eq("id", service.id);

    if (error) {
      toast.error("Failed to save service");
    } else {
      toast.success("Service updated!");
      setEditingId(null);
    }
    setIsSaving(false);
  };

  const handleAdd = async () => {
    const newService = {
      title: "New Service",
      description: "Service description",
      icon: "Globe",
      features: ["Feature 1", "Feature 2"],
      order_index: services.length,
    };

    const { data, error } = await supabase
      .from("services")
      .insert(newService)
      .select()
      .single();

    if (error) {
      toast.error("Failed to add service");
    } else {
      setServices([...services, data]);
      setEditingId(data.id);
      toast.success("Service added!");
    }
  };

  const openDeleteDialog = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    const { error } = await supabase.from("services").delete().eq("id", itemToDelete);

    if (error) {
      toast.error("Failed to delete");
    } else {
      setServices(services.filter((s) => s.id !== itemToDelete));
      toast.success("Deleted!");
    }
    setItemToDelete(null);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices(services.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const addFeature = (id: string) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      updateService(id, { features: [...service.features, "New Feature"] });
    }
  };

  const removeFeature = (id: string, index: number) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      const newFeatures = [...service.features];
      newFeatures.splice(index, 1);
      updateService(id, { features: newFeatures });
    }
  };

  const updateFeature = (id: string, index: number, value: string) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      const newFeatures = [...service.features];
      newFeatures[index] = value;
      updateService(id, { features: newFeatures });
    }
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
          <h2 className="text-2xl font-bold">Services</h2>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <div key={service.id} className="border border-border rounded-lg p-4 bg-card">
            {editingId === service.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={service.title}
                      onChange={(e) => updateService(service.id, { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <select
                      value={service.icon}
                      onChange={(e) => updateService(service.id, { icon: e.target.value })}
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
                    value={service.description}
                    onChange={(e) => updateService(service.id, { description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(service.id, index, e.target.value)}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeFeature(service.id, index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addFeature(service.id)}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Feature
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSave(service)} disabled={isSaving}>
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
                  {service.icon.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{service.title}</h4>
                  <p className="text-sm text-muted-foreground truncate max-w-md">
                    {service.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingId(service.id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(service.id)}>
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
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
      />
    </div>
  );
};
