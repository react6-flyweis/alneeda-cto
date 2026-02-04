import React from "react";
import { User, Calendar } from "lucide-react";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";

export const adrs = [
  {
    id: "ADR-001",
    title: "Migrate to Event-Driven Architecture for Order Processing",
    author: "J. Smith",
    date: "01-15-2026",
    risk: "High Risk",
    status: "Approved",
    riskColor: "bg-red-50 text-red-600",
    statusColor: "bg-green-50 text-green-600",
  },
  {
    id: "ADR-001",
    title: "Adopt GraphQL Federation for API Gateway",
    author: "J. Smith",
    date: "01-15-2026",
    risk: "Medium Risk",
    status: "Implemented",
    riskColor: "bg-orange-50 text-orange-600",
    statusColor: "bg-green-50 text-green-600",
  },
  {
    id: "ADR-001",
    title: "Split Provider Onboarding into Microservices",
    author: "J. Smith",
    date: "01-15-2026",
    risk: "Low Risk",
    status: "Proposed",
    riskColor: "bg-green-50 text-green-600",
    statusColor: "bg-blue-50 text-blue-600",
  },
  {
    id: "ADR-001",
    title: "Implement Circuit Breaker Pattern for Payment Gateway",
    author: "J. Smith",
    date: "01-15-2026",
    risk: "Low Risk",
    status: "Draft",
    riskColor: "bg-green-50 text-green-600",
    statusColor: "bg-gray-50 text-gray-400",
  },
  {
    id: "ADR-001",
    title: "Replace Redis with DynamoDB for Session Storage",
    author: "J. Smith",
    date: "01-15-2026",
    risk: "High Risk",
    status: "Approved",
    riskColor: "bg-red-50 text-red-600",
    statusColor: "bg-green-50 text-green-600",
  },
];

const ArchitectureDecisionRecords: React.FC = () => {
  return (
    <div className="lg:col-span-6 bg-white p-6 rounded-[14px] border border-[#0000001A] shadow-sm">
      <DashboardCardHeader
        title="Architecture Decision Records"
        subtitle="6 total"
      />
      <div className="md:space-y-6 space-y-2 md:h-[400px] h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {adrs.map((adr, index) => (
          <div
            key={index}
            className="pb-4 border-b border-(--dark-text-gray) last:border-0"
          >
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-[10px] items-center flex text-[#717182] uppercase tracking-wider">
                {adr.id}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-medium ${adr.riskColor}`}
              >
                {adr.risk}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-medium ${adr.statusColor}`}
              >
                {adr.status}
              </span>
            </div>
            <h3 className="text-base font-normal text-(--dark-text-black) mb-2">
              {adr.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-[#717182]">
              <span className="flex items-center gap-1">
                <User size={12} /> {adr.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {adr.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureDecisionRecords;
