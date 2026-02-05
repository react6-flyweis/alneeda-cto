import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const rows = [
  {
    dataset: "gold.kpi_daily",
    owner: "Analytics Eng",
    audience: "business_readonly",
    token: "--",
    sensitivity: "Curated",
  },
  {
    dataset: "mart.marketing_attributio",
    owner: "Data Eng Lead",
    audience: "business_readonly",
    token: "--",
    sensitivity: "Curated",
  },
  {
    dataset: "raw.events",
    owner: "Data Eng Lead",
    audience: "data_only",
    token: "Required",
    sensitivity: "Sensitive",
  },
  {
    dataset: "gold.kpi_daily",
    owner: "Analytics Eng",
    audience: "business_readonly",
    token: "--",
    sensitivity: "Curated",
  },
];

const SensitivityBadge: React.FC<{ s: string }> = ({ s }) => {
  const base = "inline-flex items-center px-3 py-1 rounded text-xs font-medium";
  const map: Record<string, string> = {
    Curated: "bg-sky-50 text-sky-600",
    Sensitive: "bg-rose-50 text-rose-600",
  };
  const cls = map[s] ?? "bg-gray-100 text-gray-700";
  return <span className={`${base} ${cls}`}>{s}</span>;
};

export default function AccessControlsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Access Controls to Datasets</CardTitle>
        <CardDescription>
          Curated datasets for business; time-bound tokens for sensitive data.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-2 pr-6">Dataset</th>
                <th className="py-2 pr-6">Owner</th>
                <th className="py-2 pr-6">Default audience</th>
                <th className="py-2 pr-6">Token</th>
                <th className="py-2 pr-6">Sensitivity</th>
                <th className="py-2 pr-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-4 pr-6 text-sm text-gray-600 font-medium">
                    {r.dataset}
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">{r.owner}</td>
                  <td className="py-4 pr-6 text-sm text-gray-600">
                    {r.audience}
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">{r.token}</td>
                  <td className="py-4 pr-6">
                    <SensitivityBadge s={r.sensitivity} />
                  </td>
                  <td className="py-4 pr-6">
                    <Button size="sm">Export</Button>
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
