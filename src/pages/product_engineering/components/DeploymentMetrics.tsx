import React from "react";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";

const metrics = [
  {
    label: "Deployment Frequency",
    value: "8.2",
    unit: "deploys/day",
    change: "+12%",
    changeColor: "text-green-600"
  },
  {
    label: "Lead Time",
    value: "4.2",
    unit: "days",
    change: "-18%",
    changeColor: "text-green-600" // Lower lead time is good
  },
  {
    label: "Change Failure Rate",
    value: "2.2%",
    unit: "",
    change: "-0.4%",
    changeColor: "text-green-600" // Lower failure rate is good
  },
  {
    label: "MTTR",
    value: "42",
    unit: "minutes",
    change: "-0%",
    changeColor: "text-[#717182]"
  }
];

const DeploymentMetrics: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[14px] border border-[#0000001A] h-full shadow-sm">
      <DashboardCardHeader
        title="Deployment Metrics"
        subtitle="Last 7 days"
      />

      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <h4 className="md:text-sm text-xs font-medium text-[#1E1E1E] mb-1">{metric.label}</h4>
            <div className="flex items-baseline gap-2">
              <span className="md:text-xl text-lg font-bold text-[#1E1E1E]">{metric.value}</span>
              {metric.unit && <span className="text-xs text-[#717182]">{metric.unit}</span>}
              <span className={`text-xs font-medium ml-auto ${metric.changeColor}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeploymentMetrics;
