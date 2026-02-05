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

type AccessRow = {
  principal: string;
  role: string;
  resource: string;
  lastUsed: string;
  expiry: string;
};

const rows: AccessRow[] = [
  {
    principal: "cs-team@acme",
    role: "CS / Support",
    resource: "Customer Records (masked PII)",
    lastUsed: "01-20-2026, 15:14",
    expiry: "01-19-2027",
  },
  {
    principal: "security@acme",
    role: "Security Lead",
    resource: "PII Reveal (time-limited)",
    lastUsed: "01-20-2026, 09:14",
    expiry: "01-19-2027",
  },
  {
    principal: "infra@acme",
    role: "CTO",
    resource: "Secrets & Key Rotation",
    lastUsed: "01-19-2026, 10:14",
    expiry: "01-18-2027",
  },
];

export default function AccessReviewCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Access Review</CardTitle>
          <CardDescription>
            Who has access to what, last used, expiry.
          </CardDescription>
        </div>
        <CardAction>
          <Link to="/security-privacy/access-review">
            <Button>View All</Button>
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Principal</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Last used</TableHead>
              <TableHead>Expiry</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.principal}>
                <TableCell className="font-medium">{r.principal}</TableCell>
                <TableCell>{r.role}</TableCell>
                <TableCell className="max-w-[40%] text-ellipsis overflow-hidden">
                  {r.resource}
                </TableCell>
                <TableCell>{r.lastUsed}</TableCell>
                <TableCell>{r.expiry}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
