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
import { Badge } from "@/components/ui/badge";

type PiiRow = {
  field: string;
  type: string;
  retention: number;
  reviewed: string;
  purposes: string;
  protection: string;
  risk: "High" | "Medium" | "Low";
};

const rows: PiiRow[] = [
  {
    field: "email",
    type: "String",
    retention: 365,
    reviewed: "01-20-2026",
    purposes: "Marketing, Analytics, Personalisation",
    protection: "Encrypted, Anonymised",
    risk: "High",
  },
  {
    field: "full_name",
    type: "String",
    retention: 365,
    reviewed: "01-21-2026",
    purposes: "Compliance, Support, Billing",
    protection: "Encrypted, Anonymised",
    risk: "High",
  },
  {
    field: "ip_address",
    type: "String",
    retention: 730,
    reviewed: "01-22-2026",
    purposes: "Marketing, Personalisation",
    protection: "Anonymised",
    risk: "Low",
  },
  {
    field: "billing_address",
    type: "String",
    retention: 90,
    reviewed: "01-20-2026",
    purposes: "Compliance",
    protection: "Encrypted",
    risk: "Medium",
  },
];

const riskColorMap: Record<PiiRow["risk"], string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export default function PIIExposureRulesCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>PII Exposure Rules</CardTitle>
          <CardDescription>Recent Rules</CardDescription>
        </div>
        <CardAction>
          <Link to="/security-privacy/pii-rules">
            <Button>View All</Button>
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PII Field</TableHead>
              <TableHead>Retention Period (days)</TableHead>
              <TableHead>Last Reviewed</TableHead>
              <TableHead>Allowed Purposes</TableHead>
              <TableHead>Protection Settings</TableHead>
              <TableHead>Risk</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.field}>
                <TableCell className="max-w-[20%]">
                  <div className="font-medium">{r.field}</div>
                  <div className="text-xs text-gray-500 mt-1">{r.type}</div>
                </TableCell>
                <TableCell>{r.retention}</TableCell>
                <TableCell>{r.reviewed}</TableCell>
                <TableCell className="max-w-[30%] text-ellipsis overflow-hidden">
                  {r.purposes}
                </TableCell>
                <TableCell>{r.protection}</TableCell>
                <TableCell>
                  <Badge className={`rounded ${riskColorMap[r.risk]}`}>
                    {r.risk}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
