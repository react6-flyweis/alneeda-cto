import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ChecklistItem = {
  title: string;
  subtitle: string;
  assignee: string;
  due: string;
  status: string;
  checked?: boolean;
};

type Props = {
  items: ChecklistItem[];
  statusColors: Record<string, string>;
};

export default function ChecklistTab({ items, statusColors }: Props) {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {items.map((it, idx) => (
            <div key={idx} className="flex items-start gap-3 pb-4 border-b">
              <div className="pt-1">
                <Checkbox defaultChecked={it.checked} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="font-medium">{it.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {it.subtitle}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={cn("text-sm text-muted-foreground")}>
                      Assigned to:{" "}
                      <span className="font-medium">{it.assignee}</span>
                    </span>
                    <span className={cn("text-sm text-muted-foreground")}>
                      Due: <span className="font-medium">{it.due}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="ml-4">
                <Badge
                  className={`${statusColors[it.status] ?? "bg-gray-50 text-gray-600"} rounded`}
                >
                  {it.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
