import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  initialTitle?: string;
  initialRequiresPhotos?: boolean;
  onApply: (payload: { title: string; requiresPhotos: boolean }) => void;
  onCancel: () => void;
}

export default function EditDocumentSectionDialog({
  open,
  setOpen,
  initialTitle = "",
  initialRequiresPhotos = false,
  onApply,
  onCancel,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [requiresPhotos, setRequiresPhotos] = useState<boolean>(
    initialRequiresPhotos,
  );

  useEffect(() => {
    // only sync when dialog is opened to avoid cascading renders
    if (!open) return;
    if (title !== initialTitle) setTitle(initialTitle);
    if (requiresPhotos !== initialRequiresPhotos)
      setRequiresPhotos(initialRequiresPhotos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTitle, initialRequiresPhotos, open]);

  function handleSave() {
    if (title.trim() === "") return;
    onApply({ title: title.trim(), requiresPhotos });
  }

  function handleCancel() {
    setTitle(initialTitle);
    setRequiresPhotos(initialRequiresPhotos);
    onCancel();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md overflow-y-auto max-h-[90vh]">
        <DialogHeader className="border-b">
          <DialogTitle className="text-lg font-semibold">Documents</DialogTitle>
        </DialogHeader>

        <div className="py-2 space-y-6">
          <div>
            <div className="text-sm font-medium mb-2">Tab Name</div>
            <Input
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Need to upload photos</div>

            <Switch
              checked={requiresPhotos}
              onCheckedChange={(v) => setRequiresPhotos(Boolean(v))}
            />
          </div>
        </div>

        <div className="flex gap-4 border-t pt-4">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 h-11 rounded-full bg-[#3E4250] text-white hover:bg-[#2E3240] border-0"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 h-11 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
