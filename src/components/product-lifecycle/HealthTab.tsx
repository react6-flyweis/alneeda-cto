import UsageRevenueChart from "@/components/ui/charts/UsageRevenueChart";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

type DataPoint = { week: string; revenue: number; usage: number };
type Incident = {
  id: string;
  title: string;
  status: string;
  age: string;
  severity: string;
};

export default function HealthTab({
  data,
  chartH,
  incidents,
}: {
  data: DataPoint[];
  chartH: number;
  incidents: Incident[];
}) {
  const severityColor: Record<string, string> = {
    High: "bg-amber-100 text-amber-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="space-y-5">
      <Card>
        <CardContent>
          <h2 className="text-lg font-medium mb-4">Usage & Revenue Trend</h2>

          <div className="overflow-auto">
            <div className="p-4">
              <UsageRevenueChart data={data} height={chartH} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Recent Incidents</h2>
            <Link to="/incidents" className="text-sm text-muted-foreground">
              View all
            </Link>
          </div>

          <Table>
            <TableHeader>
              <tr>
                <TableHead>Incident</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Severity</TableHead>
              </tr>
            </TableHeader>

            <TableBody>
              {incidents.map((inc) => (
                <TableRow key={inc.id}>
                  <TableCell className="text-sm font-medium">
                    {inc.id}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {inc.title}
                  </TableCell>
                  <TableCell className="text-sm">{inc.status}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {inc.age}
                  </TableCell>
                  <TableCell className="text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${severityColor[inc.severity]}`}
                    >
                      {inc.severity}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
