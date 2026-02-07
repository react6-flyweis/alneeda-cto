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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Gate = {
  id: string;
  title: string;
  desc?: string;
  required?: boolean;
};

const CHECKLIST: Gate[] = [
  {
    id: "documentation",
    title: "Documentation Complete",
    desc: "All technical and user documentation has been completed",
  },
  {
    id: "testing",
    title: "Testing Completed",
    desc: "All test cases passed including UAT",
    required: true,
  },
  {
    id: "security",
    title: "Security Review",
    desc: "Security audit completed with no critical issues",
    required: true,
  },
  {
    id: "compliance",
    title: "Compliance Check",
    desc: "All regulatory requirements met",
    required: true,
  },
  {
    id: "dependencies",
    title: "Dependencies Met",
    desc: "All external dependencies and integrations verified",
  },
  {
    id: "training",
    title: "Team Training",
    desc: "Support and operations teams trained",
  },
];

export default function ActivationRequestDialog({
  productId,
}: {
  productId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<boolean[]>(() => {
    // preselect testing, security, compliance to match screenshot
    return CHECKLIST.map((g) =>
      ["testing", "security", "compliance"].includes(g.id),
    );
  });
  const [comments, setComments] = useState("");

  function toggle(idx: number) {
    const copy = [...selected];
    copy[idx] = !copy[idx];
    setSelected(copy);
  }

  const requiredOk = CHECKLIST.map((g) => g.required ?? false).every(
    (isReq, i) => !isReq || selected[i],
  );

  function onSubmit() {
    if (!requiredOk) return;
    console.log("Activation request submitted", {
      productId,
      checklist: CHECKLIST.map((g, i) => ({
        id: g.id,
        title: g.title,
        checked: !!selected[i],
      })),
      comments,
    });
    setOpen(false);
    setComments("");
    setSelected(
      CHECKLIST.map((g) =>
        ["testing", "security", "compliance"].includes(g.id),
      ),
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Activation Request</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader className="text-left">
          <DialogTitle>Activation Request</DialogTitle>
          <DialogDescription>
            Complete the checklist to activate this product
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="divide-y rounded-md border">
            {CHECKLIST.map((g, idx) => (
              <div key={g.id} className="flex items-start gap-4 p-4">
                <div className="mt-1">
                  <Checkbox
                    className="bg-gray-100"
                    checked={!!selected[idx]}
                    onCheckedChange={() => toggle(idx)}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{g.title}</div>
                    {g.required && (
                      <div className={cn("text-sm text-muted-foreground ml-2")}>
                        *
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {g.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium">Comments (Optional)</div>
            <div className="mt-2">
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add any additional context or notes"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="grid grid-cols-2 pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button className="ml-2" disabled={!requiredOk} onClick={onSubmit}>
            Submit for Approval
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
