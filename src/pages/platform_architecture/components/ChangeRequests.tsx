import React from "react";
import { User, Calendar, Clock } from "lucide-react";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";

export const changeRequests = [
  {
    id: "CR-2024-001",
    title: "Deploy new microservice boundary for Provider Onboarding",
    author: "J. Smith",
    date: "01-15-2026",
    expires: "1d 14",
    risk: "High Risk",
    type: "Architecture",
    riskColor: "bg-red-50 text-red-600",
    typeColor: "bg-green-50 text-green-600",
  },
  {
    id: "CR-2024-001",
    title: "Upgrade Kubernetes cluster to v1.29",
    author: "J. Smith",
    date: "01-15-2026",
    expires: "2d 14",
    risk: "Medium Risk",
    type: "Infrastructure",
    riskColor: "bg-orange-50 text-orange-600",
    typeColor: "bg-blue-50 text-blue-600",
  },
  {
    id: "CR-2024-004",
    title: "Migrate session storage from Redis to DynamoDB",
    author: "K. Wong",
    date: "01-15-2026",
    expires: "3d 14",
    risk: "Low Risk",
    type: "Architecture",
    riskColor: "bg-green-50 text-green-600",
    typeColor: "bg-green-50 text-green-600",
  },
];

const ChangeRequests: React.FC = () => {
  return (
    <div className="lg:col-span-6 bg-white p-6 rounded-[14px] border border-[#0000001A] shadow-sm">
      <DashboardCardHeader
        title="Change Requests"
        subtitle="3 Pending"
        subtitleColor="text-(--dark-red)"
      />
      <div className="md:space-y-6 space-y-2 md:h-[400px] h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {changeRequests.map((cr, index) => (
          <div
            key={index}
            className="pb-6 border-b border-(--dark-text-gray) last:border-0 last:pb-0"
          >
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-sm items-center flex text-[#717182] uppercase tracking-wider">
                {cr.id}
              </span>
              <span
                className={`text-sm px-2 py-0.5 rounded font-medium ${cr.riskColor}`}
              >
                {cr.risk}
              </span>
              <span
                className={`text-sm px-2 py-0.5 rounded font-medium ${cr.typeColor}`}
              >
                {cr.type}
              </span>
            </div>
            <h3 className="text-base font-normal text-(--dark-text-black) mb-2">
              {cr.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#717182] mb-2">
              <span className="flex items-center gap-1 text-sm">
                <User size={12} /> {cr.author}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Calendar size={12} /> {cr.date}
              </span>
              <span className="flex items-center gap-1 text-(--dark-red) font-normal text-sm">
                <Clock size={14} /> Expires: {cr.expires}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="text-sm font-semibold text-(--dark-green) hover:underline">
                Approve
              </button>
              <span className="text-gray-300">|</span>
              <button className="text-sm font-semibold text-(--dark-red) hover:underline">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeRequests;
