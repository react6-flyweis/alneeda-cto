import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Category {
  id: string;
  label: string;
  visible?: boolean;
  icon?: string; // data URL or path
}

interface EditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onSave: (updated: Category) => void;
  onCancel?: () => void;
}

export default function EditCategoryDialog({
  open,
  onOpenChange,
  category,
  onSave,
  onCancel,
}: EditCategoryDialogProps) {
  const [local, setLocal] = useState<Category | null>(null);

  useEffect(() => {
    if (open && category) setLocal({ ...category });
    if (!open) setLocal(null);
  }, [open, category]);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!local) return;
    setLocal({ ...local, label: e.target.value });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !local) return;
    const reader = new FileReader();
    reader.onload = () => {
      setLocal({ ...local, icon: String(reader.result) });
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!local) return;
    onSave(local);
    onOpenChange(false);
  }

  function handleClose() {
    onOpenChange(false);
    onCancel?.();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm p-0 gap-0">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Edit Field</h3>
          </div>

          <div className="mb-4">
            <Label className="mb-1">Field Name</Label>
            <Input value={local?.label ?? ""} onChange={handleNameChange} />
          </div>

          <div className="mb-4">
            <Label className="mb-1">Change Icon</Label>

            <div className="border rounded p-3 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  {local?.icon ? (
                    <AvatarImage src={local.icon} />
                  ) : (
                    <AvatarFallback>
                      {(local?.label ?? "").slice(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="text-sm text-muted-foreground">
                  Upload new icon
                </div>
              </div>

              <input
                id="category-icon-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="ml-auto hidden"
              />

              <label htmlFor="category-icon-input" className="ml-auto">
                <Button variant="outline" size="sm">
                  <Upload className="size-4 mr-2" /> Choose file
                </Button>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              onClick={handleClose}
              variant="secondary"
              className="flex-1 h-12 rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-12 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
