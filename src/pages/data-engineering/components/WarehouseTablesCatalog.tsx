import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const tables = [
  {
    table: "gold.kpi_daily",
    owner: "Analytics Eng",
    refresh: "Daily",
    lastRefreshed: "01-20-2026, 15:14",
    pii: "No",
  },
  {
    table: "mart.marketing_attribution_hourly",
    owner: "Data Eng Lead",
    refresh: "Hourly",
    lastRefreshed: "01-20-2026, 09:14",
    pii: "No",
  },
  {
    table: "raw.events",
    owner: "Data Eng Lead",
    refresh: "Stream",
    lastRefreshed: "01-19-2026, 10:14",
    pii: "Yes",
  },
  {
    table: "gold.kpi_daily",
    owner: "Analytics Eng",
    refresh: "Daily",
    lastRefreshed: "01-20-2026, 15:14",
    pii: "No",
  },
];

const PiiBadge: React.FC<{ val: string }> = ({ val }) => {
  const base = "inline-flex items-center px-3 py-1 rounded text-xs font-medium";
  const cls =
    val === "Yes" ? "bg-rose-50 text-rose-600" : "bg-sky-50 text-sky-600";
  return <span className={`${base} ${cls}`}>{val}</span>;
};

export default function WarehouseTablesCatalog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Warehouse tables catalog</CardTitle>
        <CardDescription>
          Owners, refresh schedules, and PII flags.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-3 pr-6">Table</th>
                <th className="py-3 pr-6">Owner</th>
                <th className="py-3 pr-6">Refresh</th>
                <th className="py-3 pr-6">Last Refreshed</th>
                <th className="py-3 pr-6">PII</th>
              </tr>
            </thead>

            <tbody>
              {tables.map((t, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-4 pr-6 text-sm text-gray-600 font-medium">
                    {t.table}
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">{t.owner}</td>
                  <td className="py-4 pr-6 text-sm text-gray-600">
                    {t.refresh}
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">
                    {t.lastRefreshed}
                  </td>
                  <td className="py-4 pr-6">
                    <PiiBadge val={t.pii} />
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
