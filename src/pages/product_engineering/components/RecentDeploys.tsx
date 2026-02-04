import React from "react";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";

const deploys = [
  {
    service: "provider-api",
    version: "v2.4.1",
    author: "SK",
    time: "10 min ago",
    status: "success",
    color: "bg-green-50 text-green-600"
  },
  {
    service: "order-service",
    version: "v3.1.0",
    author: "VL",
    time: "30 min ago",
    status: "success",
    color: "bg-green-50 text-green-600"
  },
  {
    service: "payment-gateway",
    version: "v1.8.2",
    author: "VL",
    time: "1 hr ago",
    status: "rollback",
    color: "bg-orange-50 text-orange-600"
  }
];

const RecentDeploys: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[14px] border border-[#0000001A] h-full shadow-sm">
      <DashboardCardHeader
        title="Recent Deployments"
      />

      <div className="space-y-6">
        {deploys.map((deploy, index) => (
          <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="md:text-sm text-xs font-semibold text-[#1E1E1E]">{deploy.service}</h4>
              <span className="md:text-[10px] text-[9px] text-[#717182]">{deploy.version} | {deploy.author} | {deploy.time}</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${deploy.color} uppercase`}>
              {deploy.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDeploys;
