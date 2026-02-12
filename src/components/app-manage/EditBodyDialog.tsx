import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

interface BodyItem {
  id: string;
  label: string;
  visible: boolean;
  subHeadline?: string;
}

interface EditBodyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bodyItem: BodyItem | null;
  onSave: (updated: BodyItem) => void;
  onCancel?: () => void;
}

export default function EditBodyDialog({
  open,
  onOpenChange,
  bodyItem,
  onSave,
  onCancel,
}: EditBodyDialogProps) {
  const [local, setLocal] = useState<BodyItem | null>(null);

  useEffect(() => {
    if (open && bodyItem) setLocal({ ...bodyItem });
    if (!open) setLocal(null);
  }, [open, bodyItem]);

  function handleLabelChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!local) return;
    setLocal({ ...local, label: e.target.value });
  }

  function handleSubHeadlineChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!local) return;
    setLocal({ ...local, subHeadline: e.target.value });
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
            <Input value={local?.label ?? ""} onChange={handleLabelChange} />
          </div>

          <div className="mb-4">
            <Label className="mb-1">Sub-headline</Label>
            <Input
              value={local?.subHeadline ?? ""}
              onChange={handleSubHeadlineChange}
            />
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
