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
import { Button } from "@/components/ui/button";
import ProductApprovalDialog from "@/components/product-approval/ProductApprovalDialog";

interface ApprovalItem {
  id: string;
  product: string;
  change: string;
  submitted: string;
  risk: "Low" | "Medium" | "High";
  status: "Awaiting Review" | "Escalated" | "Blocked";
}

const sampleData: ApprovalItem[] = [
  {
    id: "APQ-1042",
    product: "Global Product Catalog",
    change: "New lifecycle state: 'Sunset Pending'",
    submitted: "01-27-2026, 14:12",
    risk: "Medium",
    status: "Awaiting Review",
  },
  {
    id: "APQ-1043",
    product: "Pricing Rules Engine",
    change: "Increase max discount threshold to 35%",
    submitted: "01-26-2026, 10:12",
    risk: "High",
    status: "Escalated",
  },
  {
    id: "APQ-1044",
    product: "Compliance Labels",
    change: "Add restricted label: 'Export-Controlled'",
    submitted: "01-25-2026, 11:12",
    risk: "High",
    status: "Awaiting Review",
  },
  {
    id: "APQ-1045",
    product: "Order Orchestrator",
    change: "Enable region fallback routing",
    submitted: "01-24-2026, 12:12",
    risk: "Low",
    status: "Awaiting Review",
  },
];

function RiskBadge({ risk }: { risk: ApprovalItem["risk"] }) {
  const map: Record<typeof risk, string> = {
    Low: "bg-emerald-100 text-emerald-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-amber-100 text-amber-700",
  };
  return (
    <Badge className={`text-xs px-2 py-1 rounded ${map[risk]}`}>{risk}</Badge>
  );
}

function StatusBadge({ status }: { status: ApprovalItem["status"] }) {
  const map: Record<typeof status, string> = {
    "Awaiting Review": "bg-violet-50 text-violet-700",
    Escalated: "bg-sky-50 text-sky-700",
    Blocked: "bg-slate-50 text-slate-700",
  };
  return (
    <Badge className={`text-xs px-2 py-1 rounded ${map[status]}`}>
      {status}
    </Badge>
  );
}

export default function ApprovalTab() {
  return (
    <Card className="">
      <CardHeader className="">
        <div className="">
          <CardTitle className="text-lg">Approval Queue</CardTitle>
          <CardDescription>
            Triage incoming product changes with risk and policy context.
          </CardDescription>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="">
            <Input placeholder="Search" />
          </div>

          <div className="flex items-center gap-3">
            <Select defaultValue="all-status">
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="awaiting">Awaiting Review</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-risk">
              <SelectTrigger className="w-44 bg-white">
                <SelectValue placeholder="All Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-risk">All Risk Level</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
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
              <TableHead>Change</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.id}</TableCell>
                <TableCell>{s.product}</TableCell>
                <TableCell className="max-w-[40%] truncate">
                  {s.change}
                </TableCell>
                <TableCell>{s.submitted}</TableCell>
                <TableCell>
                  <RiskBadge risk={s.risk} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={s.status} />
                </TableCell>
                <TableCell className="text-right">
                  <ProductApprovalDialog
                    item={{
                      id: s.id,
                      product: s.product,
                      change: s.change,
                    }}
                    onSubmit={(payload) => {
                      console.log("Product approval", payload);
                    }}
                  >
                    <Button className="bg-[#07182A] text-white px-4 py-2 rounded-lg">
                      Approve/Reject
                    </Button>
                  </ProductApprovalDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
