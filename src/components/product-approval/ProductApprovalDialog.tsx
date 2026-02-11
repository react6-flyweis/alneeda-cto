import React, { useState } from "react";
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

export type ApprovalAction = "approve" | "reject";

export type ProductApprovalItem = {
  id: string;
  product: string;
  change?: string;
};

export default function ProductApprovalDialog({
  item,
  open,
  onOpenChange,
  onSubmit,
  children,
}: {
  item?: ProductApprovalItem | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (payload: {
    id?: string;
    action: ApprovalAction;
    comment?: string;
  }) => void;
  children?: React.ReactNode; // trigger element
}) {
  const [option, setOption] = useState<ApprovalAction>("approve");
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit?.({ id: item?.id, action: option, comment: comment.trim() });
    onOpenChange?.(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children ? (
        <DialogTrigger asChild>{children}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className="bg-[#07182A] text-white px-4 py-2 rounded-lg">
            Approve/Reject
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-xl overflow-y-auto max-h-[90vh]">
        <DialogHeader className="text-left">
          <DialogTitle>Product Approval</DialogTitle>
          <DialogDescription>
            {item?.id} {item?.product ? `— ${item.product}` : null}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <h4 className="text-sm font-medium">Select Option</h4>

          <RadioGroup
            value={option}
            onValueChange={(v) => setOption(v as ApprovalAction)}
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
              className={`inline-flex items-center gap-3 cursor-pointer text-rose-600`}
            >
              <RadioGroupItem
                value="reject"
                className="size-5 border-rose-600 focus:ring-rose-600"
              />
              <span className="ml-2">Reject</span>
            </label>
          </RadioGroup>

          <div className="mt-6">
            <label className="text-sm font-medium mb-2 block">Comment</label>
            <Textarea
              className="h-28"
              placeholder="Add a comment (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <DialogFooter className="grid grid-cols-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button
              onClick={() => {
                handleSubmit();
              }}
              className="ml-2 bg-[#07182A] text-white px-6"
            >
              Submit
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
