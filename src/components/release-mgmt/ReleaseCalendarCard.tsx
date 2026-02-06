import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const riskColorMap: Record<string, string> = {
  "High Risk": "bg-red-100 text-red-700",
  "Medium Risk": "bg-amber-100 text-amber-700",
  "Low Risk": "bg-emerald-100 text-emerald-700",
};

const statusColorMap: Record<string, string> = {
  Completed: "bg-emerald-100 text-emerald-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Scheduled: "bg-sky-100 text-sky-700",
};

const releaseItems = [
  {
    id: "CR-1844",
    risk: "Low Risk",
    status: "Completed",
    title: "Database connection pool tuning",
    date: "Thu 22 Jan, 07:30",
    area: "Platform",
  },
  {
    id: "CR-1843",
    risk: "Medium Risk",
    status: "Approved",
    title: "Feature flag: New onboarding flow",
    date: "Thu 22 Jan, 23:30",
    area: "Web",
  },
  {
    id: "CR-1842",
    risk: "High Risk",
    status: "Scheduled",
    title: "Payments API v2 deploy",
    date: "Sat 24 Jan, 00:30 • depends on CR-1843",
    area: "Payments",
  },
];

export default function ReleaseCalendarCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Release Calendar</CardTitle>
          <CardDescription>
            Schedules, blackout windows, and release dependencies.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {releaseItems.map((r, idx) => (
            <div key={r.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-900 mr-2">
                      {r.id}
                    </span>

                    <Badge className={`rounded ${riskColorMap[r.risk]}`}>
                      {r.risk}
                    </Badge>

                    <Badge className={`rounded ${statusColorMap[r.status]}`}>
                      {r.status}
                    </Badge>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900">
                    {r.title}
                  </h3>

                  <p className="text-sm text-[#9CA3AF] mt-1">{r.date}</p>
                </div>

                <div className="text-right text-sm text-[#6B7280] self-start">
                  {r.area}
                </div>
              </div>

              {idx < releaseItems.length - 1 && (
                <div className="border-b border-gray-200 mt-6" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
