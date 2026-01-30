import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw, Plus, Trash2 } from "lucide-react";

interface ProcessStep {
  id: string;
  step_number: string;
  icon: string;
  title: string;
  description: string;
  order_index: number;
}

const iconOptions = ["MessageSquare", "PenTool", "Code", "Rocket", "Search", "Settings", "Zap", "Check"];

export const ProcessEditor = () => {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchSteps = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("process_steps")
      .select("*")
      .order("order_index");

    if (error) {
      toast.error("Failed to load steps");
    } else {
      setSteps(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleSave = async (step: ProcessStep) => {
    setIsSaving(true);
    const { error } = await supabase
      .from("process_steps")
      .update(step)
      .eq("id", step.id);

    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Updated!");
      setEditingId(null);
    }
    setIsSaving(false);
  };

  const handleAdd = async () => {
    const newStep = {
      step_number: String(steps.length + 1).padStart(2, "0"),
      icon: "MessageSquare",
      title: "New Step",
      description: "Step description",
      order_index: steps.length,
    };

    const { data, error } = await supabase
      .from("process_steps")
      .insert(newStep)
      .select()
      .single();

    if (error) {
      toast.error("Failed to add");
    } else {
      setSteps([...steps, data]);
      setEditingId(data.id);
      toast.success("Added!");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this step?")) return;

    const { error } = await supabase.from("process_steps").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete");
    } else {
      setSteps(steps.filter((s) => s.id !== id));
      toast.success("Deleted!");
    }
  };

  const updateStep = (id: string, updates: Partial<ProcessStep>) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, ...updates } : s)));
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
          <h2 className="text-2xl font-bold">Process Steps</h2>
          <p className="text-muted-foreground">Manage your workflow process steps</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Step
        </Button>
      </div>

      <div className="grid gap-4">
        {steps.map((step) => (
          <div key={step.id} className="border border-border rounded-lg p-4 bg-card">
            {editingId === step.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Step Number</Label>
                    <Input
                      value={step.step_number}
                      onChange={(e) => updateStep(step.id, { step_number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={step.title}
                      onChange={(e) => updateStep(step.id, { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <select
                      value={step.icon}
                      onChange={(e) => updateStep(step.id, { icon: e.target.value })}
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
                    value={step.description}
                    onChange={(e) => updateStep(step.id, { description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSave(step)} disabled={isSaving}>
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
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                  {step.step_number}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-muted-foreground truncate max-w-md">
                    {step.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingId(step.id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(step.id)}>
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
