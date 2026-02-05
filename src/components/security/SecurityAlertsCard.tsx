import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function SecurityAlertsCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Security alerts</CardTitle>
          <CardDescription>
            Auth anomalies, failed logins, suspicious API usage.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Alert 1 */}
        <div className="border border-amber-300 rounded-lg p-6 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-md bg-red-50 text-red-700 px-2 py-1 text-xs font-semibold">
                High
              </span>
              <span className="inline-flex items-center rounded-md bg-violet-100 text-violet-700 px-2 py-1 text-xs">
                Investigating
              </span>
            </div>

            <h4 className="font-semibold text-amber-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Password
              spray detected
            </h4>

            <p className="text-sm text-muted-foreground mt-2">
              102 failed logins across 17 accounts from 3 ASNs (10m window).
            </p>

            <div className="text-xs text-gray-400 mt-3">
              Created 2026-01-20 16:02
            </div>
          </div>

          <div className="shrink-0">
            <Button className="bg-slate-900 text-white">Acknowledge</Button>
          </div>
        </div>

        {/* Alert 2 */}
        <div className="border border-amber-300 rounded-lg p-6 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-md bg-amber-50 text-amber-700 px-2 py-1 text-xs font-semibold">
                Medium
              </span>
              <span className="inline-flex items-center rounded-md bg-violet-100 text-violet-700 px-2 py-1 text-xs">
                Investigating
              </span>
            </div>

            <h4 className="font-semibold text-amber-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Unusual API
              usage spike
            </h4>

            <p className="text-sm text-muted-foreground mt-2">
              Payments export endpoint +340% above baseline (30m window).
            </p>

            <div className="text-xs text-gray-400 mt-3">
              Created 2026-01-20 11:46
            </div>
          </div>

          <div className="shrink-0">
            <Button className="bg-slate-900 text-white">Acknowledge</Button>
          </div>
        </div>

        {/* Alert 3 */}
        <div className="border border-amber-300 rounded-lg p-6 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-md bg-emerald-50 text-emerald-700 px-2 py-1 text-xs font-semibold">
                Low
              </span>
              <span className="inline-flex items-center rounded-md bg-green-100 text-green-700 px-2 py-1 text-xs">
                Resolved
              </span>
            </div>

            <h4 className="font-semibold text-amber-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> New admin
              session from new device
            </h4>

            <p className="text-sm text-muted-foreground mt-2">
              Admin token minted with MFA from an unrecognised device
              fingerprint.
            </p>

            <div className="text-xs text-gray-400 mt-3">
              Created 2026-01-19 21:03
            </div>
          </div>

          <div className="shrink-0">
            <Button className="bg-slate-900 text-white">Acknowledge</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
