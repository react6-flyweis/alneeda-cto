import PageHeader from "../components/common_components/PageHeader";
import DashboardCardHeader from "./dashboard/components/DashboardCardHeader";
import StatCard from "@/components/StatCard";
import DeploymentPipelineTable from "@/components/dev-ops/DeploymentPipelineTable";
import BudgetUtilisationCard from "./components/BudgetUtilisationCard";
import AutoscalingCard from "./components/AutoscalingCard";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const statItems = [
  {
    title: "Mean Time to Deploy",
    value: "14.2 min",
    change: "-8% vs last week",
    isPositive: false,
  },
  {
    title: "Deploy Frequency",
    value: "4.2/day",
    change: "+12% vs last week",
    isPositive: true,
  },
  {
    title: "Change Failure Rate",
    value: "2.8%",
    change: "-5% vs last week",
    isPositive: false,
  },
  {
    title: "MTTR",
    value: "45 min",
    change: "-22% vs last week",
    isPositive: true,
  },
];

const environments = [
  {
    name: "Production",
    dotColor: "bg-green-500",
    uptime: "99.99%",
    latency: "12ms",
    errorRate: "0.01%",
    saturation: "68%",
  },
  {
    name: "Staging",
    dotColor: "bg-amber-500",
    uptime: "99.85%",
    latency: "78ms",
    errorRate: "0.15%",
    saturation: "45%",
  },
  {
    name: "Development",
    dotColor: "bg-green-500",
    uptime: "98.5%",
    latency: "120ms",
    errorRate: "0.45%",
    saturation: "32%",
  },
];

const sloItems = [
  {
    title: "API Availability",
    remaining: "86% remaining",
    consumed: 14,
    target: "99.95",
    current: "99.97",
    budget: 21.6,
  },
  {
    title: "P99 Latency",
    remaining: "72% remaining",
    consumed: 28,
    target: "200",
    current: "142",
    budget: 432,
  },
  {
    title: "Error Rate",
    remaining: "92% remaining",
    consumed: 8,
    target: "0.1",
    current: "0.02",
    budget: 4320,
  },
  {
    title: "Throughput",
    remaining: "100% remaining",
    consumed: 0,
    target: "10000",
    current: "12500",
    budget: 100,
  },
];

export default function DevOpsInfrastructurePage() {
  return (
    <div className="w-full">
      <PageHeader
        title="DevOps & Infrastructure"
        subtitle="Infrastructure & Reliability"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statItems.map((s, i) => (
          <StatCard
            key={i}
            title={s.title}
            value={s.value}
            change={s.change}
            isPositive={s.isPositive}
          />
        ))}
      </div>

      <div className="mb-6">
        <DashboardCardHeader
          title="Environment Health"
          subtitle="Overview of production, staging and development environments"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {environments.map((env, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-[14px] border-[0.8px] border-[#0000001A]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${env.dotColor}`} />
                  <h4 className="font-semibold text-(--dark-text-black)">
                    {env.name}
                  </h4>
                </div>
                <div className="text-sm text-[#6B7280]">&nbsp;</div>
              </div>

              <div className="grid grid-cols-4 gap-3 text-sm text-[#6B7280]">
                <div>
                  <div className="text-xs text-[#9CA3AF]">Uptime</div>
                  <div className="text-base text-(--dark-text-black) font-medium">
                    {env.uptime}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#9CA3AF]">Latency</div>
                  <div className="text-base text-(--dark-text-black) font-medium">
                    {env.latency}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-[#9CA3AF]">Error Rate</div>
                  <div className="text-base text-(--dark-text-black) font-medium">
                    {env.errorRate}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#9CA3AF]">Saturation</div>
                  <div className="text-base text-(--dark-text-black) font-medium">
                    {env.saturation}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <DeploymentPipelineTable />
      </div>

      <div className="mb-6">
        <DashboardCardHeader
          title="Autoscaling"
          subtitle="Manage autoscaling settings for core services"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
          <div>
            <AutoscalingCard name="API-gateway" />
          </div>

          <div>
            <AutoscalingCard name="Auth-service" />
          </div>

          <div>
            <AutoscalingCard name="Payment-processor" />
          </div>
        </div>

        <div className="mt-6">
          <BudgetUtilisationCard />
        </div>

        <div className="mt-6">
          <DashboardCardHeader
            title="Service Level Objectives"
            subtitle="Overview of key SLOs and error budget consumption"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            {sloItems.map((s, idx) => (
              <Card key={idx} className="gap-2">
                <CardHeader className="">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-semibold">{s.title}</h4>
                    <Badge className="bg-green-50 text-green-600">
                      {s.remaining}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="">
                  <div className="flex items-center justify-between text-sm text-[#9CA3AF] mb-2">
                    <div>Error Budget Consumed</div>
                    <div className="text-[#111827] font-medium">
                      {s.consumed}%
                    </div>
                  </div>

                  <div className="mb-3">
                    <Progress value={s.consumed} />
                  </div>

                  <div className="flex justify-between text-xs text-[#6B7280] mb-4">
                    <div>0%</div>
                    <div>50% (warning)</div>
                    <div>80% (critical)</div>
                    <div>100%</div>
                  </div>

                  <hr className="border-t border-[#E5E7EB] mb-4" />

                  <div className="grid grid-cols-3 gap-4 text-sm text-[#6B7280]">
                    <div>
                      <div className="text-xs">Target</div>
                      <div className="text-base text-(--dark-text-black) font-medium">
                        {s.target}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs">Current</div>
                      <div className="text-base text-(--dark-text-black) font-medium">
                        {s.current}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs">Budget (min)</div>
                      <div className="text-base text-(--dark-text-black) font-medium">
                        {s.budget}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
