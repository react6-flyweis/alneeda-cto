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

const ModelDeploymentDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#0E2B4B] text-white" size="sm">
          Deployment Pipeline
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Model Deployment Pipeline</DialogTitle>
          <DialogDescription>
            Shadow deployments, gradual rollouts, approvals, and rollback with
            audit.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border p-6 mt-2 bg-muted/50">
          <h3 className="font-semibold text-lg mb-3">
            Workflow: Deploy a new ranking model
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Train + validate offline; run safety checks.</li>
            <li>Shadow deploy; compare with current model.</li>
            <li>Obtain approval token if required.</li>
            <li>Canary deploy; monitor; then promote or rollback.</li>
            <li>Write post-deploy validation record.</li>
          </ol>
        </div>

        <DialogFooter className="w-full border-t pt-4 grid">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModelDeploymentDialog;
