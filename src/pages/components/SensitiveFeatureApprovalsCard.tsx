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

type FeatureRow = {
  name: string;
  description: string;
  requestedBy: string;
  requestDate: string;
  pii: string;
};

const rows: FeatureRow[] = [
  {
    name: "Social Login Integration",
    description:
      "Allow users to sign in using Google, Apple, and Microsoft accounts",
    requestedBy: "Product Team",
    requestDate: "01-20-2026",
    pii: "email, full_name",
  },
  {
    name: "Advanced Analytics Dashboard",
    description:
      "New dashboard with detailed user behavior analytics and cohort analysis",
    requestedBy: "Analytics Team",
    requestDate: "01-21-2026",
    pii: "ip_address, device_id, email",
  },
  {
    name: "Two-Factor Authentication",
    description:
      "Add SMS and authenticator app based 2FA for all user accounts",
    requestedBy: "Security Team",
    requestDate: "01-22-2026",
    pii: "phone_number",
  },
  {
    name: "Customer Data Export",
    description:
      "Enable customers to export all their data in machine-readable format",
    requestedBy: "Legal Team",
    requestDate: "01-20-2026",
    pii: "email, full_name, phone_number, billing_address",
  },
];

export default function SensitiveFeatureApprovalsCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Sensitive Feature Approvals</CardTitle>
          <CardDescription>Recent Feature Approvals</CardDescription>
        </div>
        <CardAction>
          <Link to="/security-privacy/approvals">
            <Button>View All</Button>
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature Name</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>PII Fields Accessed</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.name}>
                <TableCell className="max-w-[40%]">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {r.description}
                  </div>
                </TableCell>
                <TableCell>{r.requestedBy}</TableCell>
                <TableCell>{r.requestDate}</TableCell>
                <TableCell className="max-w-[40%] text-ellipsis overflow-hidden">
                  {r.pii}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
