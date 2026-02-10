import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type RiskRow = {
  name: string;
  findings: string;
  resolution: string;
  requestDate: string;
  resolvedDate?: string;
  requestedBy: string;
  status: string;
  risk: string;
};

const rows: RiskRow[] = [
  {
    name: "Third-Party Analytics SDK Update",
    findings:
      "New SDK version collects additional device telemetry. Reviewed data collection scope.",
    resolution:
      "Approved with custom configuration to limit data collection to anonymized IDs",
    requestDate: "01-20-2026",
    resolvedDate: "01-25-2026",
    requestedBy: "Sarah Chen",
    status: "Approved",
    risk: "Medium",
  },
  {
    name: "CCPA Compliance Audit",
    findings: "Minor gaps in data deletion workflows for California users",
    resolution: "--",
    requestDate: "01-21-2026",
    resolvedDate: "--",
    requestedBy: "Michael Torres",
    status: "In Review",
    risk: "High",
  },
  {
    name: "New Payment Processor Integration",
    findings:
      "Requires PCI DSS compliance verification and security assessment",
    resolution: "--",
    requestDate: "01-22-2026",
    resolvedDate: "--",
    requestedBy: "Emily Watson",
    status: "Pending",
    risk: "Critical",
  },
  {
    name: "User Profile API Changes",
    findings: "Added new optional fields for user preferences",
    resolution: "No PII impact, approved for deployment",
    requestDate: "01-20-2026",
    resolvedDate: "01-24-2026",
    requestedBy: "David Kim",
    status: "Approved",
    risk: "Low",
  },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const base = "inline-flex items-center px-3 py-1 rounded text-xs font-medium";
  const map: Record<string, string> = {
    Approved: "bg-emerald-50 text-emerald-600",
    "In Review": "bg-sky-50 text-sky-600",
    Pending: "bg-amber-50 text-amber-600",
    Rejected: "bg-rose-50 text-rose-600",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-700";
  return <span className={`${base} ${cls}`}>{status}</span>;
};

const RiskBadge: React.FC<{ level: string }> = ({ level }) => {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium";
  const map: Record<string, string> = {
    Low: "bg-emerald-50 text-emerald-600",
    Medium: "bg-amber-50 text-amber-600",
    High: "bg-amber-100 text-amber-700",
    Critical: "bg-rose-50 text-rose-600",
  };
  const cls = map[level] ?? "bg-gray-100 text-gray-700";
  return <span className={`${base} ${cls}`}>{level}</span>;
};

export default function SecurityRiskReviewHistoryCard() {
  return (
    <Card>
      <CardHeader className="flex flex-col">
        <div className="w-full flex items-center justify-between">
          <div>
            <CardTitle>Security Risk Review History</CardTitle>
            <CardDescription>Recent Security Risk</CardDescription>
          </div>
          <CardAction>
            <Link to="/product-security-governance/risk-history">
              <Button>View All</Button>
            </Link>
          </CardAction>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-225">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Findings</TableHead>
                <TableHead>Resolution</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Resolved Date</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((r) => (
                <TableRow
                  key={r.name}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <TableCell className="py-4 pr-6 text-sm text-gray-600 font-medium">
                    {r.name}
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-sm text-gray-600 max-w-[40%] text-ellipsis overflow-hidden">
                    {r.findings}
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-sm text-gray-600 max-w-[30%] text-ellipsis overflow-hidden">
                    {r.resolution}
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-sm text-gray-600">
                    {r.requestDate}
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-sm text-gray-600">
                    {r.resolvedDate ?? "--"}
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-sm text-gray-600">
                    {r.requestedBy}
                  </TableCell>
                  <TableCell className="py-4 pr-6">
                    <StatusBadge status={r.status} />
                  </TableCell>
                  <TableCell className="py-4 pr-6">
                    <RiskBadge level={r.risk} />
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
