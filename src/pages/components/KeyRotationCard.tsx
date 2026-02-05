import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type KeyRow = {
  key: string;
  system: string;
  cadence: string;
  lastRotated: string;
  nextDue: string;
  compliance: "Pass" | "Due" | "Overdue";
};

const keyRows: KeyRow[] = [
  {
    key: "Payments API signing key",
    system: "payments-service",
    cadence: "Every 30d",
    lastRotated: "01-20-2026, 15:14",
    nextDue: "02-19-2026",
    compliance: "Due",
  },
  {
    key: "Session token encryption",
    system: "auth",
    cadence: "Every 60d",
    lastRotated: "01-20-2026, 09:14",
    nextDue: "03-19-2026",
    compliance: "Pass",
  },
  {
    key: "Webhook secret",
    system: "integrations",
    cadence: "Every 90d",
    lastRotated: "01-19-2026, 10:14",
    nextDue: "04-18-2026",
    compliance: "Overdue",
  },
];

const complianceScore = 33;

export default function KeyRotationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Rotation</CardTitle>
        <CardDescription>
          Rotation cadence and compliance status.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Compliance score</div>
              <div className="text-sm text-muted-foreground mt-1">
                Pass = <span className="text-emerald-600">on schedule</span>,
                Due = <span className="text-amber-600">approaching</span>,
                Overdue = <span className="text-red-600">breach risk</span>
              </div>
            </div>

            <div className="hidden sm:block w-32 text-right">
              <span className="text-lg font-semibold text-emerald-600">
                {complianceScore}%
              </span>
            </div>
          </div>

          <div className="mt-3">
            <Progress value={complianceScore} />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>System</TableHead>
              <TableHead>Cadence</TableHead>
              <TableHead>Last Rotated</TableHead>
              <TableHead>Next due</TableHead>
              <TableHead>Compliance</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {keyRows.map((k) => (
              <TableRow key={k.key}>
                <TableCell className="font-medium">{k.key}</TableCell>
                <TableCell className="text-muted-foreground">
                  {k.system}
                </TableCell>
                <TableCell>{k.cadence}</TableCell>
                <TableCell>{k.lastRotated}</TableCell>
                <TableCell>{k.nextDue}</TableCell>
                <TableCell>
                  <Badge
                    className={cn("rounded", {
                      "bg-red-50 text-red-600": k.compliance === "Overdue",
                      "bg-amber-100 text-amber-700": k.compliance === "Due",
                      "bg-emerald-100 text-emerald-700":
                        k.compliance === "Pass",
                    })}
                  >
                    {k.compliance}
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
