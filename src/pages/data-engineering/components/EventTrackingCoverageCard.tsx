import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const rows = [
  {
    title: "Marketing attribution",
    missing: "ad_click, campaign_attribution",
    pct: 72,
  },
  {
    title: "Checkout",
    missing: "payment_failed",
    pct: 93,
  },
  {
    title: "Activation",
    missing: "email_verified",
    pct: 88,
  },
];

const CoverageBadge: React.FC<{ pct: number }> = ({ pct }) => {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded text-sm font-medium";
  let cls = "bg-emerald-50 text-emerald-700";
  if (pct >= 90) cls = "bg-blue-50 text-blue-700";
  if (pct < 80) cls = "bg-rose-50 text-rose-700";
  return <span className={`${base} ${cls}`}>{pct}% Coverage</span>;
};

export default function EventTrackingCoverageCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Event Tracking Coverage</CardTitle>
          <CardDescription>
            Coverage by product area; highlight missing events and delayed data.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {rows.map((r) => (
            <div key={r.title}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    {r.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Missing: {r.missing}
                  </div>
                </div>

                <div className="ml-4">
                  <CoverageBadge pct={r.pct} />
                </div>
              </div>

              <div className="mt-2">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-2 bg-emerald-500 transition-all duration-500`}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
              </div>

              <div className="border-t mt-4" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
