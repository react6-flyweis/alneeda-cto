import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Decision = "approve" | "reject";

type FeatureRow = {
  name: string;
  description: string;
  requestedBy: string;
  requestDate: string;
  pii: string;
  securityNotes: string;
  assignedReviewers: string;
  risk: "Low" | "Medium" | "High";
  status: "Pending" | "In Review" | "Approved";
};

export default function FeatureApprovalDialog({
  open,
  onOpenChange,
  feature,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: FeatureRow | null;
  onConfirm: (payload: { decision: Decision; comment: string }) => void;
}) {
  const [decision, setDecision] = useState<Decision>("approve");
  const [comment, setComment] = useState("");

  function reset() {
    setDecision("approve");
    setComment("");
  }

  function handleClose() {
    onOpenChange(false);
    // small delay so parent can reset selected feature if needed
    setTimeout(reset, 200);
  }

  function handleSubmit() {
    onConfirm({ decision, comment });
    handleClose();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-xl overflow-y-auto max-h-[90vh]"
      >
        <DialogHeader className="text-left border-b">
          <DialogTitle className="text-lg">
            {feature ? feature.name : "Feature Approval"}
          </DialogTitle>
          <DialogDescription>
            {feature ? feature.description : "Review and record your decision."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div>
            <h4 className="text-sm font-medium">Select Option</h4>
            <RadioGroup
              //   value={option}
              //   onValueChange={(v) => setOption(v as "approve" | "reject")}
              className="mt-3 flex items-center gap-6"
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

          <div className="mt-6">
            <div className="text-sm font-medium">Add Review Comment</div>
            <div className="mt-2">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter comments (optional)"
                className="h-20"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="grid grid-cols-2 gap-4 pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={!feature}
            className="ml-2 bg-[#0F172A] text-white px-4 py-2 rounded-[10px]"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
