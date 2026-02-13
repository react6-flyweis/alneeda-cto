import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  initialName?: string;
  onApply: (name: string) => void;
  onCancel: () => void;
}

export default function ChangeDocumentDialog({
  open,
  setOpen,
  initialName = "",
  onApply,
  onCancel,
}: Props) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (!open) return;
    setName(initialName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialName]);

  function handleSave() {
    const trimmed = name.trim();
    if (trimmed === "") return;
    onApply(trimmed);
  }

  function handleCancel() {
    setName(initialName);
    onCancel();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md overflow-y-auto max-h-[90vh]">
        <DialogHeader className="border-b">
          <DialogTitle className="text-lg font-semibold">
            Change Document
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div>
            <div className="text-sm font-medium mb-2">Tab Name</div>
            <Input
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="Enter"
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
