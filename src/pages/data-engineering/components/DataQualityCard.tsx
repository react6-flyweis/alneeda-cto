import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const checks = [
  {
    check: "Attribution events completeness",
    detail:
      "Missing 8.2% of attribution events since 07:00Z (upstream outage suspected).",
    updated: "01-20-2026, 15:14",
    status: "Failed",
  },
  {
    check: "Checkout event contract",
    detail: "New field 'promo_code' observed without schema registry update.",
    updated: "01-20-2026, 09:14",
    status: "Warning",
  },
  {
    check: "Duplicate session ids",
    detail: "No duplicates above threshold.",
    updated: "01-19-2026, 10:14",
    status: "Pass",
  },
  {
    check: "Attribution events completeness",
    detail:
      "Missing 8.2% of attribution events since 07:00Z (upstream outage suspected).",
    updated: "01-20-2026, 15:14",
    status: "Pass",
  },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const base = "inline-flex items-center px-3 py-1 rounded text-xs font-medium";
  const map: Record<string, string> = {
    Failed: "bg-rose-50 text-rose-600",
    Warning: "bg-amber-50 text-amber-600",
    Pass: "bg-emerald-50 text-emerald-600",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-700";
  return <span className={`${base} ${cls}`}>{status}</span>;
};

export default function DataQualityCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="">
          <CardTitle className="text-lg">Data Quality</CardTitle>
          <CardDescription className="">
            Missing events, schema drift, duplicates — enforce trust in
            dashboards.
          </CardDescription>
        </div>
        <Button size="sm">Run Checks</Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-3 pr-6">Check</th>
                <th className="py-3 pr-6">Detail</th>
                <th className="py-3 pr-6">Updated</th>
                <th className="py-3 pr-6">Status</th>
              </tr>
            </thead>

            <tbody>
              {checks.map((c, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-4 pr-6 text-sm text-gray-600 font-medium">
                    {c.check}
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600 max-w-xl">
                    {c.detail}
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">
                    {c.updated}
                  </td>
                  <td className="py-4 pr-6">
                    <StatusBadge status={c.status} />
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
