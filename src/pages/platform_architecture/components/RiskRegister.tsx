import React from "react";
import { User, Calendar, TriangleAlert } from "lucide-react";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

export const risks:any = [
  {
    id: "RISK-001",
    title: "Single point of failure in Redis cluster",
    author: "SRE Lead",
    date: "01-15-2026",
    category: "Availability",
    status: "Mitigating",
    categoryColor: "bg-blue-50 text-blue-600",
    statusColor: "bg-green-50 text-green-600",
    iconColor: "text-red-500",
    iconBg: "bg-(--light-red)",
  },
  {
    id: "RISK-002",
    title: "Outdated TLS certificates in staging",
    author: "Security Lead",
    date: "01-15-2026",
    category: "Security",
    categoryColor: "bg-red-50 text-red-600",
    iconColor: "text-orange-500",
    iconBg: "bg-(--light-salmon)",
  },
  {
    id: "RISK-003",
    title: "Ads service approaching capacity limits",
    author: "Platform Team",
    date: "01-15-2026",
    category: "Performance",
    status: "Mitigating",
    categoryColor: "bg-orange-50 text-orange-600",
    statusColor: "bg-green-50 text-green-600",
    iconColor: "text-orange-500",
    iconBg: "bg-(--light-salmon)",
  },
  {
    id: "RISK-004",
    title: "GDPR data retention policy gaps",
    author: "Legal/Compliance",
    date: "01-15-2026",
    category: "Compliance",
    categoryColor: "bg-green-50 text-green-600",
    iconColor: "text-blue-500",
    iconBg: "bg-(--light-blue)",
  },
  {
    id: "RISK-005",
    title: "GDPR data retention policy gaps",
    author: "Legal/Compliance",
    date: "01-15-2026",
    category: "Compliance",
    categoryColor: "bg-green-50 text-green-600",
    iconColor: "text-blue-500",
    iconBg: "bg-(--light-blue)",
  },
];

export const RiskRegisterItem = ({ risk, index }: any) => {
  return (
    <div
      key={index}
      className="flex gap-4 items-center pb-2 border-bottom-soft last:border-0 last:pb-0"
    >
      <div
        className={`w-10 h-10 rounded-lg ${risk.iconBg} flex items-center justify-center shrink-0`}
      >
        <TriangleAlert size={20} className={risk.iconColor} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-2 mb-1">
          <span className="text-xs text-[#717182] uppercase tracking-wider flex items-center">
            {risk.id}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded font-medium ${risk.categoryColor}`}
          >
            {risk.category}
          </span>
          {risk.status && (
            <span
              className={`text-xs px-2 py-0.5 rounded font-medium ${risk.statusColor}`}
            >
              {risk.status}
            </span>
          )}
        </div>

        <h3 className="text-base font-normal text-[#1E1E1E] mb-2 truncate">
          {risk.title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-[#717182]">
          <span className="flex items-center gap-1">
            <User size={12} /> {risk.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} /> Due: {risk.date}
          </span>
        </div>
      </div>
    </div>
  );
};

const RiskRegister: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-[14px] border border-[#0000001A] h-full">
      <DashboardCardHeader
        title="Risk Register"
        subtitle="Top 10"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate("risk-register")}
            className="bg-[#0a1628] text-white rounded-lg h-9 font-bold md:text-sm text-xs hover:bg-[#152945] transition-colors flex items-center justify-center"
          >
            View All
          </Button>
        }
      />

      <div className="md:space-y-6 space-y-2 md:h-[400px] h-[300px] overflow-y-auto">
        {risks.map((risk:any, index:any) => (
          <RiskRegisterItem risk={risk} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RiskRegister;
