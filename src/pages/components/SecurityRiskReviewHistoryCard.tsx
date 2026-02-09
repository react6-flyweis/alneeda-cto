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
};

const rows: RiskRow[] = [
  {
    name: "Third-Party Analytics SDK Update",
    findings:
      "New SDK version collects additional device telemetry. Reviewed data collection scope.",
    resolution:
      "Approved with custom configuration to limit data collection to anonymized IDs",
  },
  {
    name: "CCPA Compliance Audit",
    findings: "Minor gaps in data deletion workflows for California users",
    resolution: "--",
  },
  {
    name: "New Payment Processor Integration",
    findings:
      "Requires PCI DSS compliance verification and security assessment",
    resolution: "--",
  },
  {
    name: "User Profile API Changes",
    findings: "Added new optional fields for user preferences",
    resolution: "No PII impact, approved for deployment",
  },
];

export default function SecurityRiskReviewHistoryCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Security Risk Review History</CardTitle>
          <CardDescription>Recent Security Risk</CardDescription>
        </div>
        <CardAction>
          <Link to="/security-privacy/risk-history">
            <Button>View All</Button>
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Findings</TableHead>
              <TableHead>Resolution</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.name}>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell className="max-w-[50%] text-ellipsis overflow-hidden">
                  {r.findings}
                </TableCell>
                <TableCell className="max-w-[30%] text-ellipsis overflow-hidden">
                  {r.resolution}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
