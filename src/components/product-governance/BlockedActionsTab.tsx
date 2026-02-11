import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface BlockedActionItem {
  id: string;
  product: string;
  attemptedAction: string;
  actor: string;
  timestamp: string;
  reason: string;
}

const sampleData: BlockedActionItem[] = [
  {
    id: "APQ-1042",
    product: "Global Product Catalog",
    attemptedAction: "Raise max discount threshold",
    actor: "Governance Bot",
    timestamp: "01-27-2026, 14:12",
    reason: "Missing Approval",
  },
  {
    id: "APQ-1043",
    product: "Pricing Rules Engine",
    attemptedAction: "Remove ‘Restricted’ label",
    actor: "A. Chen",
    timestamp: "01-26-2026, 10:12",
    reason: "Data Classification",
  },
  {
    id: "APQ-1044",
    product: "Compliance Labels",
    attemptedAction: "Bulk update lifecycle states",
    actor: "Policy Admin",
    timestamp: "01-25-2026, 11:12",
    reason: "Policy",
  },
  {
    id: "APQ-1045",
    product: "Order Orchestrator",
    attemptedAction: "Raise max discount threshold",
    actor: "K. Smith",
    timestamp: "01-24-2026, 12:12",
    reason: "Missing Approval",
  },
  {
    id: "APQ-1046",
    product: "Global Product Catalog",
    attemptedAction: "Remove ‘Restricted’ label",
    actor: "Governance Bot",
    timestamp: "01-23-2026, 14:12",
    reason: "Data Classification",
  },
];

function ReasonBadge({ reason }: { reason: string }) {
  const map: Record<string, string> = {
    "Missing Approval": "bg-rose-50 text-rose-600",
    "Data Classification": "bg-sky-50 text-sky-600",
    Policy: "bg-amber-50 text-amber-600",
  };
  const cls = map[reason] ?? "bg-gray-100 text-gray-700";
  return <Badge className={`text-xs px-2 py-1 rounded ${cls}`}>{reason}</Badge>;
}

export default function BlockedActionsTab() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sampleData;
    return sampleData.filter((s) =>
      [s.id, s.product, s.attemptedAction, s.actor, s.timestamp, s.reason]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  return (
    <Card>
      <CardHeader className="flex flex-col">
        <div className="w-full flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Blocked Actions</CardTitle>
            <CardDescription>
              Review and unblock attempts that were stopped by governance rules.
            </CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="relative max-w-sm w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search size={16} />
            </div>
            <Input
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Attempted Action</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Block reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell className="max-w-[40%] truncate">
                    {row.attemptedAction}
                  </TableCell>
                  <TableCell>{row.actor}</TableCell>
                  <TableCell>{row.timestamp}</TableCell>
                  <TableCell>
                    <ReasonBadge reason={row.reason} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
