import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
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

export default function RevenueApprovalDialog() {
  const [open, setOpen] = useState(false);
  const [decision, setDecision] = useState<"approve" | "reject" | "">(
    "approve",
  );
  const [comment, setComment] = useState("");

  const canSubmit = decision !== "";

  function onSubmit() {
    if (!canSubmit) return;

    console.log("Revenue change review submitted", { decision, comment });
    // TODO: call API and handle success/error states
    setOpen(false);
    setDecision("approve");
    setComment("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
          Approve/Reject
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="text-left">
          <DialogTitle>Revenue Change Approval</DialogTitle>
          <DialogDescription>
            <div className="text-amber-700">Pending approval</div>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="text-sm font-medium">Select Option</div>

          <div className="mt-3">
            <RadioGroup
              value={decision}
              onValueChange={(v: string) =>
                setDecision(v as "approve" | "reject" | "")
              }
            >
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="approve" />
                  <span className="text-emerald-600">Approve</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="reject" />
                  <span className="text-rose-600">Reject</span>
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium">Add Review Comment</div>
            <div className="mt-2">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter review comment"
                className="min-h-30"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="pt-6">
          <div className="flex w-full gap-4">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>

            <Button
              className="flex-1 bg-slate-900 text-white"
              onClick={onSubmit}
              disabled={!canSubmit}
            >
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
