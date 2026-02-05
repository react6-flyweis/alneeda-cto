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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const gatesData = [
  {
    title: "Unit suite *",
    status: "Passed",
    desc: "Fast feedback; must pass before merge and before release promotion.",
  },
  {
    title: "Integration suite *",
    status: "Failed",
    desc: "Service-level checks and contract tests.",
  },
  {
    title: "E2E suite *",
    status: "Failed",
    desc: "Critical user journeys across browser/device matrix.",
  },
  {
    title: "Performance budget",
    status: "Pending",
    desc: "Optional in normal releases; required during quarter-end freeze.",
  },
  {
    title: "Security scan *",
    status: "Running",
    desc: "SAST + dependency scan must be green.",
  },
];

function statusClasses(status: string) {
  switch (status) {
    case "Passed":
      return "bg-blue-100 text-blue-700";
    case "Failed":
      return "bg-red-100 text-red-700";
    case "Running":
      return "bg-violet-100 text-violet-700";
    case "Pending":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function ExceptionApprovalDialog() {
  const [open, setOpen] = useState(false);
  // preselect Integration, E2E, Performance budget
  const [selected, setSelected] = useState<boolean[]>(() => {
    return gatesData.map((g) =>
      ["Integration suite *", "E2E suite *", "Performance budget"].includes(
        g.title,
      ),
    );
  });
  const [token, setToken] = useState("");
  const [justification, setJustification] = useState("");

  const canApprove =
    token.trim() !== "" &&
    justification.trim() !== "" &&
    selected.some(Boolean);

  function toggle(idx: number) {
    const copy = [...selected];
    copy[idx] = !copy[idx];
    setSelected(copy);
  }

  function onApprove() {
    if (!canApprove) return;
    // In a real app we'd call an API here and show success/error states; for now just close.
    console.log("Approving override", {
      gates: gatesData.filter((_, i) => selected[i]).map((g) => g.title),
      token,
      justification,
    });
    setOpen(false);
    setToken("");
    setJustification("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Exception Approvals</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader className="text-left">
          <DialogTitle>Exception approvals with audit</DialogTitle>
          <DialogDescription>
            Overrides are policy-bound: token + justification required, and only
            QA/Release can approve.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="text-sm font-medium">Select gates to override</div>
          <div className="text-sm text-muted-foreground mt-1">
            Gate requirements are immutable for this release record; you can
            only override outcomes.
          </div>

          <div className="mt-4 divide-y rounded-md border">
            {gatesData.map((g, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4">
                <div className="mt-1">
                  <Checkbox
                    checked={!!selected[idx]}
                    onCheckedChange={() => toggle(idx)}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{g.title}</div>
                    <Badge className={cn("rounded", statusClasses(g.status))}>
                      {g.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground ml-3">
                      Owner: CI
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {g.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium">Approval input</div>
            <div className="text-sm text-muted-foreground mt-2">
              Approval Token
            </div>
            <div className="mt-2">
              <Input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Approval Token"
              />
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Justification
            </div>
            <div className="mt-2">
              <Textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Enter justification"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="grid grid-cols-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button className="ml-2" disabled={!canApprove} onClick={onApprove}>
            Approve Override
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
