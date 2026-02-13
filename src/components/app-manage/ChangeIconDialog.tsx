import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
  icon?: string; // optional image URL or base64
}

interface ChangeIconDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: NavigationTab | null;
  onSave: (updated: NavigationTab) => void;
  onCancel?: () => void;
}

export default function ChangeIconDialog({
  open,
  onOpenChange,
  tab,
  onSave,
  onCancel,
}: ChangeIconDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // object URL for selected file

  // keep preview in sync with selectedFile and avoid leaking object URLs
  // create object URL when a file is selected (we create/revoke in handler to satisfy lint rules)
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // source shown in the UI: user-selected preview takes precedence, otherwise use tab.icon
  const previewSource = preview ?? tab?.icon ?? null;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;

    // clear selection
    if (!f) {
      setSelectedFile(null);
      if (preview) {
        URL.revokeObjectURL(preview);
        setPreview(null);
      }
      return;
    }

    // revoke previous preview then create a new object URL
    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(f);
    setSelectedFile(f);
    setPreview(url);
  }

  function handleSave() {
    if (!tab) return;

    const updated: NavigationTab = {
      ...tab,
      // store the preview URL for demo purposes; real app should upload and store server URL
      icon: selectedFile ? (preview ?? undefined) : tab.icon,
    };

    onSave(updated);
    // clear local state and close
    setSelectedFile(null);
    onOpenChange(false);
  }

  function handleClose() {
    // revoke/clear local state and close dialog
    setSelectedFile(null);
    onOpenChange(false);
    onCancel?.();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm p-3 max-h-[80vh] ">
        <DialogHeader className="flex items-start justify-between pb-2 border-b">
          <DialogTitle className="text-xl font-semibold">
            Change Icon
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="mb-6">
            <Label className="mb-3 text-base">Upload Icon</Label>

            <label
              htmlFor="icon-upload"
              className="w-full h-20 flex items-center gap-6 border border-gray-200 rounded-md px-6 cursor-pointer hover:bg-gray-50"
            >
              {/* preview on the left */}
              <div className="w-14 h-14 shrink-0 rounded bg-gray-50 flex items-center justify-center overflow-hidden">
                {previewSource ? (
                  <img
                    src={previewSource}
                    alt="icon-preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded" />
                )}
              </div>

              {/* center text + icon */}
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Upload className="w-4 h-4" />
                  <span className="font-medium">Upload new icon</span>
                </div>
              </div>

              <input
                id="icon-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                aria-label="Upload new icon"
              />
            </label>
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              onClick={handleClose}
              variant="secondary"
              className="flex-1 h-10 rounded-full bg-[#4A4553] text-white hover:bg-[#3f3a45]"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              className="flex-1 h-10 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
