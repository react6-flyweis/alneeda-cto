import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Rule = {
  dataset: string;
  rule: string;
  lastRun: string;
  severity: string;
  status: string;
};

const SEVERITY_STYLES: Record<string, string> = {
  Error: "bg-rose-100 text-rose-800",
  Warning: "bg-amber-100 text-amber-800",
  Info: "bg-indigo-100 text-indigo-800",
};

const RULE_STATUS_STYLES: Record<string, string> = {
  Passing: "bg-emerald-100 text-emerald-800",
  Failing: "bg-rose-100 text-rose-800",
};

const qualityData = [
  { day: "Mon", passing: 110, failing: 25 },
  { day: "Tue", passing: 130, failing: 20 },
  { day: "Wed", passing: 95, failing: 20 },
  { day: "Thu", passing: 170, failing: 28 },
  { day: "Fri", passing: 140, failing: 22 },
  { day: "Sat", passing: 180, failing: 25 },
  { day: "Sun", passing: 179, failing: 27 },
];

const latestRules: Rule[] = [
  {
    dataset: "events_raw",
    rule: "Freshness < 30 minutes",
    lastRun: "2026-01-20",
    severity: "Error",
    status: "Passing",
  },
  {
    dataset: "events_raw",
    rule: "user_id is not null",
    lastRun: "2026-01-21",
    severity: "Error",
    status: "Failing",
  },
  {
    dataset: "payments",
    rule: "currency is ISO-4217",
    lastRun: "2026-01-22",
    severity: "Warning",
    status: "Failing",
  },
  {
    dataset: "events_raw",
    rule: "Schema coverage > 95%",
    lastRun: "2026-01-20",
    severity: "Info",
    status: "Passing",
  },
];

export default function DataQualityCard() {
  return (
    <Card className="py-4">
      <CardHeader className="flex flex-col">
        <div className="w-full flex items-center justify-between">
          <CardTitle className="text-lg">Data Quality Summary</CardTitle>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Passing vs failing (7d)
        </p>
      </CardHeader>

      <CardContent>
        <div className="bg-white rounded-lg border border-[#0000001A] p-4">
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={qualityData}
                margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 12"
                  stroke="#E6EEF6"
                  vertical={false}
                />
                <XAxis dataKey="day" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend verticalAlign="bottom" />
                <Bar dataKey="passing" fill="#06B58D" />
                <Bar dataKey="failing" fill="#F87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Latest rules</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b border-border">
                  <th className="py-3 px-6 w-2/12 font-medium">Dataset</th>
                  <th className="py-3 px-6 w-6/12 font-medium">Rule</th>
                  <th className="py-3 px-6 w-2/12 font-medium">Last Run</th>
                  <th className="py-3 px-6 w-1/12 font-medium">Severity</th>
                  <th className="py-3 px-6 w-1/12 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {latestRules.map((r, i) => (
                  <tr key={`${r.dataset}-${i}`}>
                    <td className="py-6 px-6 text-sm text-muted-foreground">
                      {r.dataset}
                    </td>
                    <td className="py-6 px-6">{r.rule}</td>
                    <td className="py-6 px-6 text-sm text-muted-foreground">
                      {r.lastRun
                        .split("-")
                        .slice(1)
                        .concat(r.lastRun.split("-")[0])
                        .join("-")}
                    </td>
                    <td className="py-6 px-6">
                      <Badge
                        className={`rounded-md px-2 py-0.5 text-xs font-medium ${SEVERITY_STYLES[r.severity] ?? "bg-slate-100 text-slate-800"}`}
                      >
                        {r.severity}
                      </Badge>
                    </td>
                    <td className="py-6 px-6">
                      <Badge
                        className={`rounded-md px-2 py-0.5 text-xs font-medium ${RULE_STATUS_STYLES[r.status] ?? "bg-slate-100 text-slate-800"}`}
                      >
                        {r.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
