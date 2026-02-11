import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface AuditItem {
  id: string;
  product: string;
  reason: string;
  actor: string;
  timestamp: string;
  correlation: string;
  status: "Block" | "Escalate" | "Approve";
}

const auditData: AuditItem[] = [
  {
    id: "APQ-1042",
    product: "Global Product Catalog",
    reason: "Threshold exceeds policy PRC-12 (requires VP approval)",
    actor: "Governance Bot",
    timestamp: "01-27-2026, 14:12",
    correlation: "corr_3n8bKp",
    status: "Block",
  },
  {
    id: "APQ-1043",
    product: "Pricing Rules Engine",
    reason: "Medium risk change flagged for second reviewer",
    actor: "A. Chen",
    timestamp: "01-26-2026, 10:12",
    correlation: "corr_x1a0Qy",
    status: "Escalate",
  },
  {
    id: "APQ-1044",
    product: "Compliance Labels",
    reason: "Label meets export compliance requirements",
    actor: "Policy Admin",
    timestamp: "01-25-2026, 11:12",
    correlation: "corr_p9V2tM",
    status: "Approve",
  },
  {
    id: "APQ-1045",
    product: "Order Orchestrator",
    reason: "Low risk; rollback plan attached",
    actor: "K. Smith",
    timestamp: "01-24-2026, 12:12",
    correlation: "corr_7wJ4sN",
    status: "Approve",
  },
  {
    id: "APQ-1046",
    product: "Global Product Catalog",
    reason: "Threshold exceeds policy PRC-12 (requires VP approval)",
    actor: "Governance Bot",
    timestamp: "01-23-2026, 14:12",
    correlation: "corr_3n8bKp",
    status: "Block",
  },
  {
    id: "APQ-1047",
    product: "Pricing Rules Engine",
    reason: "Medium risk change flagged for second reviewer",
    actor: "A. Chen",
    timestamp: "01-23-2026, 14:12",
    correlation: "corr_x1a0Qy",
    status: "Escalate",
  },
  {
    id: "APQ-1048",
    product: "Compliance Labels",
    reason: "Label meets export compliance requirements",
    actor: "Policy Admin",
    timestamp: "01-23-2026, 14:12",
    correlation: "corr_p9V2tM",
    status: "Approve",
  },
  {
    id: "APQ-1049",
    product: "Order Orchestrator",
    reason: "Low risk; rollback plan attached",
    actor: "K. Smith",
    timestamp: "01-23-2026, 14:12",
    correlation: "corr_7wJ4sN",
    status: "Approve",
  },
];

function StatusBadge({ status }: { status: AuditItem["status"] }) {
  const map: Record<typeof status, string> = {
    Block: "bg-rose-100 text-rose-700",
    Escalate: "bg-sky-50 text-sky-700",
    Approve: "bg-emerald-100 text-emerald-700",
  };
  return (
    <Badge className={`text-xs px-2 py-1 rounded ${map[status]}`}>
      {status}
    </Badge>
  );
}

export default function AuditTab() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-lg">Audit History</CardTitle>
          <CardDescription>
            Filter by product, actor, and action type to reconstruct decisions.
          </CardDescription>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search" />

          <div className="flex items-center gap-3">
            <Select defaultValue="all-product">
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="All Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-product">All Product</SelectItem>
                <SelectItem value="global">Global Product Catalog</SelectItem>
                <SelectItem value="pricing">Pricing Rules Engine</SelectItem>
                <SelectItem value="compliance">Compliance Labels</SelectItem>
                <SelectItem value="order">Order Orchestrator</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-actions">
              <SelectTrigger className="w-44 bg-white">
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-actions">All Actions</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Correlation</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {auditData.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.id}</TableCell>
                <TableCell>{a.product}</TableCell>
                <TableCell className="max-w-[40%] truncate">
                  {a.reason}
                </TableCell>
                <TableCell>{a.actor}</TableCell>
                <TableCell>{a.timestamp}</TableCell>
                <TableCell className="text-muted-foreground">
                  {a.correlation}
                </TableCell>
                <TableCell className="text-right">
                  <StatusBadge status={a.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
