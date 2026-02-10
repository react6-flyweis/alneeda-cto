import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const activityItems = [
  {
    title: "FDA 510(k) Documentation Approved",
    subtitle:
      "All required documentation has been reviewed and approved by the regulatory team",
    assignee: "Sarah Chen",
    due: "01-15-2026",
    status: "Completed",
  },
  {
    title: "EU MDR Assessment Started",
    subtitle:
      "Beginning comprehensive assessment of EU Medical Device Regulation requirements",
    assignee: "Michael Roberts",
    due: "02-15-2026",
    status: "In Progress",
  },
  {
    title: "Additional Documentation Requested",
    subtitle:
      "Clinical data supplements needed for EU MDR technical documentation",
    assignee: "Michael Roberts",
    due: "02-15-2026",
    status: "In Progress",
  },
  {
    title: "Quality Audit Scheduled",
    subtitle: "Internal QMS audit scheduled for February 10th, 2026",
    assignee: "Michael Roberts",
    due: "02-15-2026",
    status: "Pending",
  },
];

export default function ActivityTab() {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {activityItems.map((a, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-4 pb-4 border-b"
            >
              <div className="flex-1">
                <div className="font-medium">{a.title}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {a.subtitle}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={cn("text-sm text-muted-foreground")}>
                  Assigned to: <span className="font-medium">{a.assignee}</span>
                </span>
                <span className={cn("text-sm text-muted-foreground")}>
                  Due: <span className="font-medium">{a.due}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
