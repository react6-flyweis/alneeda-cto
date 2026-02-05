import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pipelines = [
  {
    job: "marketing_attribution_hourly",
    owner: "Data Eng Lead",
    lastRun: "01-20-2026, 15:14",
    nextRun: "01-19-2027",
    sla: "35m",
    status: "Running",
  },
  {
    job: "events_ingest_stream",
    owner: "Analytics Eng",
    lastRun: "01-20-2026, 09:14",
    nextRun: "01-19-2027",
    sla: "5m",
    status: "Delayed",
  },
  {
    job: "golden_kpis_daily",
    owner: "You (CTO)",
    lastRun: "01-19-2026, 10:14",
    nextRun: "01-18-2027",
    sla: "20m",
    status: "On-time",
  },
  {
    job: "marketing_attribution_hourly",
    owner: "Data Eng Lead",
    lastRun: "01-20-2026, 15:14",
    nextRun: "01-19-2027",
    sla: "20m",
    status: "Failed",
  },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const base = "inline-flex items-center px-3 py-1 rounded text-xs font-medium";
  const map: Record<string, string> = {
    Running: "bg-sky-50 text-sky-600",
    Delayed: "bg-amber-50 text-amber-600",
    "On-time": "bg-emerald-50 text-emerald-600",
    Failed: "bg-rose-50 text-rose-600",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-700";
  return <span className={`${base} ${cls}`}>{status}</span>;
};

export default function PipelineHealthTable() {
  const [loadingJob] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader className="flex flex-col">
        <div className="w-full flex items-center justify-between">
          <CardTitle className="text-lg">Pipeline health</CardTitle>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          On-time, delayed, failed — with retry controls.
        </p>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-3 pr-6">Job</th>
                <th className="py-3 pr-6">Owner</th>
                <th className="py-3 pr-6">Last run</th>
                <th className="py-3 pr-6">Next run</th>
                <th className="py-3 pr-6">SLA</th>
                <th className="py-3 pr-6">Status</th>
                <th className="py-3 pr-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {pipelines.map((p, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-4 pr-6 text-sm text-gray-600 font-medium">
                    {p.job}
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">{p.owner}</td>
                  <td className="py-4 pr-6 text-sm text-gray-600">
                    {p.lastRun}
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">
                    {p.nextRun}
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">{p.sla}</td>
                  <td className="py-4 pr-6">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600 text-right">
                    <Button
                      size="sm"
                      disabled={p.status === "Running" || loadingJob != null}
                      variant={p.status === "Running" ? "outline" : "default"}
                    >
                      Retry
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
