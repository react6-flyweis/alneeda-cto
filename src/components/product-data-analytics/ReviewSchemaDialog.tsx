import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: {
    name?: string;
    key?: string;
    owner?: string;
    version?: string;
    schema?: string;
  } | null;
  onSubmit?: (action: "approve" | "reject" | "request_changes") => void;
};

export default function ReviewSchemaDialog({
  open,
  onOpenChange,
  event,
  onSubmit,
}: Props) {
  const [option, setOption] = useState<"approve" | "reject">("approve");

  const handleAction = (action: "approve" | "reject" | "request_changes") => {
    if (onSubmit) onSubmit(action);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Schema</DialogTitle>
          <DialogDescription>
            {event?.name} {event?.version ? `(${event.version})` : ""} •{" "}
            {event?.owner}
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <h4 className="text-sm font-medium">Schema Preview</h4>
          <div className="mt-1 rounded border border-border bg-muted p-4 text-sm overflow-auto max-h-64">
            <pre className="whitespace-pre-wrap">
              {event?.schema ?? "No schema available."}
            </pre>
          </div>
        </div>

        <div className="mt-2">
          <h4 className="text-sm font-medium">Select Option</h4>
          <RadioGroup
            value={option}
            onValueChange={(v) => setOption(v as "approve" | "reject")}
            className="mt-2 flex items-center gap-6"
          >
            <label
              className={`inline-flex items-center gap-3 cursor-pointer text-green-500`}
            >
              <RadioGroupItem
                value="approve"
                className="size-5 border-green-500 focus:ring-green-500"
              />
              <span className="ml-2">Approve</span>
            </label>

            <label
              className={`inline-flex items-center gap-3 cursor-pointer text-rose-600 `}
            >
              <RadioGroupItem
                value="reject"
                className="size-5 border-rose-600 focus:ring-rose-600"
              />
              <span className="ml-2">Reject</span>
            </label>
          </RadioGroup>
        </div>

        <div className="mt-6 border-t pt-4">
          <DialogFooter className="grid grid-cols-3 gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button
              variant="default"
              onClick={() => {
                handleAction("request_changes");
                onOpenChange(false);
              }}
            >
              Request Changes
            </Button>

            <Button
              onClick={() => {
                handleAction(option === "approve" ? "approve" : "reject");
                onOpenChange(false);
              }}
            >
              Approve
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
