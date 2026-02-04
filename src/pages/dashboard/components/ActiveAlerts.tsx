import React from "react";
import DashboardCardHeader from "./DashboardCardHeader";

const alerts = [
  {
    id: 1,
    severity: "SEV1",
    time: "2m ago",
    title: "Database replica lag > 30s",
    source: "prod-db-cluster",
  },
  {
    id: 2,
    severity: "SEV1",
    time: "5m ago",
    title: "Unauthorized API access detected",
    source: "api-gateway",
  },
  {
    id: 3,
    severity: "SEV2",
    time: "12m ago",
    title: "Deploy pipeline failed",
    source: "main → prod",
  },
  {
    id: 4,
    severity: "SEV2",
    time: "2h ago",
    title: "Approval timeout: IAM policy change",
    source: "terraform-plan",
  },
];

const ActiveAlerts: React.FC = () => {
  return (
    <div className="bg-white md:p-6 p-4 rounded-[14px] border-[0.8px] border-[#0000001A]">
      <DashboardCardHeader title="Active Alerts" subtitle="6 total" />

      <div className="md:space-y-6 space-y-2 md:h-[400px] h-[300px] overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex flex-col border-b border-(--dark-text-gray) last:border-0 pb-4 last:pb-0"
          >
            <div className="flex items-center gap-3 mb-1">
              <span
                className={`text-xs font-normal px-2 py-1 rounded ${
                  alert.severity === "SEV1"
                    ? "bg-(--light-red) text-(--dark-red)"
                    : "bg-(--light-yellow) text-(--dark-orange)"
                }`}
              >
                {alert.severity}
              </span>
              <span className="text-xs text-(--dark-text-gray)">
                {alert.time}
              </span>
            </div>
            <h5 className="text-base font-semibold text-(--dark-text-black) ">
              {alert.title}
            </h5>
            <p className="text-xs text-(--dark-text-gray) mt-1">
              {alert.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveAlerts;
