import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardCardHeader from "@/pages/dashboard/components/DashboardCardHeader";

export type FeatureFlag = {
  name: string;
  status: "Paused" | "Running" | string;
  description: string;
  rollout: string;
  changeRecord: string;
  crashRate: string;
  p95: string;
};

const featureFlags = [
  {
    name: "Onboarding_revamp",
    status: "Paused",
    description: "New onboarding with progressive profile capture",
    rollout: "10% of users",
    changeRecord: "CR-1843",
    crashRate: "+18%",
    p95: "+7%",
  },
  {
    name: "search_v3",
    status: "Running",
    description: "New ranking model rollout",
    rollout: "Austin, London, Tokyo",
    changeRecord: "CR-1842",
    crashRate: "+2%",
    p95: "+4%",
  },
];

export default function FeatureFlagRolloutCard() {
  return (
    <Card className="gap-0">
      <CardHeader>
        <DashboardCardHeader
          title="Feature flag rollout dashboard "
          subtitle="Progressive delivery"
        />
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureFlags.map((f) => (
            <div
              key={f.name}
              className="rounded-lg border border-gray-100 p-6 bg-white"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {f.name}
                    <Badge
                      className={`ml-3 text-[11px] py-0.5 ${
                        f.status === "Paused"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                      variant="ghost"
                    >
                      {f.status}
                    </Badge>
                  </h3>

                  <p className="text-sm text-[#6B7280] mt-2">{f.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-[#6B7280]">
                <div>
                  <div className="text-xs">Rollout</div>
                  <div className="text-base font-semibold text-[#1E1E1E] mt-1">
                    {f.rollout}
                  </div>

                  <div className="text-xs mt-4">Guardrail: crash rate</div>
                  <div className="text-base font-semibold mt-1">
                    {f.crashRate}
                  </div>
                </div>

                <div>
                  <div className="text-xs">Change record</div>
                  <div className="text-base font-semibold text-[#1E1E1E] mt-1">
                    {f.changeRecord}
                  </div>

                  <div className="text-xs mt-4">Guardrail: P95 latency</div>
                  <div className="text-base font-semibold mt-1">{f.p95}</div>
                </div>
              </div>

              <div className="border-b border-gray-100 mt-6"></div>

              <div className="flex gap-4 mt-6">
                <Button variant="outline" className="flex-1">
                  Pause
                </Button>
                <Button className="flex-1">Rollback</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
