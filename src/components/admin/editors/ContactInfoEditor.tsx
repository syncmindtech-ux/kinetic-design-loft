import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, RefreshCw } from "lucide-react";

interface ContactInfo {
  id: string;
  email: string;
  phone: string;
  address: string;
  whatsapp_number: string | null;
}

export const ContactInfoEditor = () => {
  const [content, setContent] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchContent = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("contact_info")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      toast.error("Failed to load contact info");
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
      .from("contact_info")
      .update(content)
      .eq("id", content.id);

    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Contact info updated!");
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
        No contact info found. Please seed the database first.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <p className="text-muted-foreground">Edit your contact details</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input
            type="email"
            value={content.email}
            onChange={(e) => setContent({ ...content, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input
            value={content.phone}
            onChange={(e) => setContent({ ...content, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>WhatsApp Number</Label>
          <Input
            value={content.whatsapp_number || ""}
            onChange={(e) => setContent({ ...content, whatsapp_number: e.target.value })}
            placeholder="+1234567890"
          />
        </div>

        <div className="space-y-2">
          <Label>Address</Label>
          <Input
            value={content.address}
            onChange={(e) => setContent({ ...content, address: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
