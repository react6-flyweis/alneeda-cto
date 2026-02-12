import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface TypographyDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialFont: string;
  onApply: (font: string) => void;
  onCancel: () => void;
}

const fontOptions = [
  "Poppins",
  "Roboto",
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Open Sans",
  "Lato",
];

export default function TypographyDialog({
  open,
  setOpen,
  initialFont,
  onApply,
  onCancel,
}: TypographyDialogProps) {
  const [selectedFont, setSelectedFont] = useState(initialFont);

  const handleApply = () => {
    onApply(selectedFont);
  };

  const handleCancel = () => {
    setSelectedFont(initialFont);
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[80vh] sm:max-w-sm">
        <DialogHeader className="border-b">
          <DialogTitle className="text-lg font-semibold">
            Change Typography
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-80">
          <div className="space-y-2 ">
            {fontOptions.map((font) => (
              <button
                key={font}
                onClick={() => setSelectedFont(font)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg text-left font-semibold transition-colors flex items-center justify-between",
                  selectedFont === font
                    ? "bg-(--bg-light-blue) text-black"
                    : "bg-white hover:bg-gray-50 text-black",
                )}
                style={{ fontFamily: font }}
              >
                <span>{font}</span>
                {selectedFont === font && <Check className="size-5" />}
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className=" py-2 flex gap-4">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 h-12 rounded-full bg-[#3E4250] text-white hover:bg-[#2E3240] hover:text-white border-0"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 h-12 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
