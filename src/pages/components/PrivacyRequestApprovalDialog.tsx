import React, { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
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

interface PrivacyRequest {
  id: string;
  type: string;
  subject: string;
  requested: string;
  status: "Needs Approval" | "Queued" | "Completed";
  approvals: string;
  expiry: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request?: PrivacyRequest | null;
  onSubmit?: (action: "approve" | "reject") => void;
}

const PrivacyRequestApprovalDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  request,
  onSubmit,
}) => {
  const [option, setOption] = useState<"approve" | "reject">("approve");

  const handleSubmit = () => {
    if (onSubmit) onSubmit(option);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Privacy Request Approval</DialogTitle>
          <DialogDescription>
            Review and approve or reject the privacy request for{" "}
            <strong>{request?.subject}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <h4 className="text-sm font-medium">Approval Progress</h4>
          <ul className="mt-3 space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle className="size-5 text-green-500" />

              <div>
                <div className="text-sm font-medium">Approver One</div>
              </div>
            </li>

            <li className="flex items-center gap-3 text-muted-foreground">
              <Circle className="size-5" />

              <div>
                <div className="text-sm">You (CTO)</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-3">
          <h4 className="text-sm font-medium">Select Option</h4>
          <RadioGroup
            value={option}
            onValueChange={(v) => setOption(v as "approve" | "reject")}
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

        <div className="mt-6 border-t pt-4">
          <DialogFooter className="grid grid-cols-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                handleSubmit();
                onOpenChange(false);
              }}
            >
              Submit
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyRequestApprovalDialog;
