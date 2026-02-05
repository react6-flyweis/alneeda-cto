import React from "react";
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

const SafetyPanelDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#0E2B4B] text-white ml-2" size="sm">
          Safety Panel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Safety Panel</DialogTitle>
          <DialogDescription>
            Actions restricted to suggest-only for sensitive workflows.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border p-6 mt-2 bg-muted/50">
          <h3 className="font-semibold text-lg mb-3">Assistive-only rules</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              Support can view suggestions, but cannot auto-execute money/policy
              decisions.
            </li>
            <li>Only ML/CTO can deploy; high-risk models require approvals.</li>
            <li>Training data access is gated and audited.</li>
            <li>Every deployment and rollback produces an audit record.</li>
          </ul>
        </div>

        <DialogFooter className="w-full border-t pt-4 grid">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SafetyPanelDialog;
