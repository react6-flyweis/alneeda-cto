import { Link } from "react-router-dom";
import { Edit2 } from "lucide-react";
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

import { rows, riskColorMap } from "@/pages/product-security-privacy/piiFields";

export default function PIIExposureRulesCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>PII Exposure Rules</CardTitle>
          <CardDescription>Recent Rules</CardDescription>
        </div>
        <CardAction>
          <Link to="/product-security-governance/pii-rules">
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.slice(0, 4).map((r) => (
              <TableRow key={r.field}>
                <TableCell className="max-w-[20%]">
                  <div className="font-medium">{r.field}</div>
                  <div className="text-xs text-gray-500 mt-1">String</div>
                </TableCell>
                <TableCell>{r.retentionDays}</TableCell>
                <TableCell>{r.lastReviewed}</TableCell>
                <TableCell className="max-w-[30%] text-ellipsis overflow-hidden">
                  {r.purposes}
                </TableCell>
                <TableCell>{r.protection}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-3 py-1 text-xs rounded-md font-medium ${riskColorMap[r.risk]}`}
                  >
                    {r.risk}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    to={`/product-security-governance/pii-rules/${r.field}/edit`}
                    className="p-2 rounded-md hover:bg-gray-50 inline-flex items-center"
                    aria-label={`Edit ${r.field}`}
                  >
                    <Edit2 className="size-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
