import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "../ImageUpload";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw, Plus, Trash2, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  link: string | null;
  order_index: number;
}

const categoryOptions = ["E-Commerce", "WordPress", "Shopify", "SEO", "Design", "Maintenance"];

export const ProjectsEditor = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index");

    if (error) {
      toast.error("Failed to load projects");
    } else {
      setProjects(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (project: Project) => {
    setIsSaving(true);
    const { error } = await supabase
      .from("projects")
      .update(project)
      .eq("id", project.id);

    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Updated!");
      setEditingId(null);
    }
    setIsSaving(false);
  };

  const handleAdd = async () => {
    const newProject = {
      title: "New Project",
      category: "WordPress",
      description: "Project description",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      link: "",
      order_index: projects.length,
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(newProject)
      .select()
      .single();

    if (error) {
      toast.error("Failed to add");
    } else {
      setProjects([...projects, data]);
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

    const { error } = await supabase.from("projects").delete().eq("id", itemToDelete);

    if (error) {
      toast.error("Failed to delete");
    } else {
      setProjects(projects.filter((p) => p.id !== itemToDelete));
      toast.success("Deleted!");
    }
    setItemToDelete(null);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, ...updates } : p)));
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
          <h2 className="text-2xl font-bold">Projects/Work</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border border-border rounded-lg p-4 bg-card">
            {editingId === project.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={project.title}
                      onChange={(e) => updateProject(project.id, { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select
                      value={project.category}
                      onChange={(e) => updateProject(project.id, { category: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project Link (URL)</Label>
                  <Input
                    value={project.link || ""}
                    onChange={(e) => updateProject(project.id, { link: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project Image</Label>
                  <ImageUpload
                    value={project.image_url}
                    onChange={(url) => updateProject(project.id, { image_url: url })}
                    folder="projects"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSave(project)} disabled={isSaving}>
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
                  src={project.image_url}
                  alt={project.title}
                  className="w-20 h-14 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold flex items-center gap-2">
                    {project.title}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </a>
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingId(project.id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(project.id)}>
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
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );
};
