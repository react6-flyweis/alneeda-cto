import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";

const releaseItems = [
  {
    id: "FEAT-1215",
    tag: "Business Suite",
    tagColor: "bg-purple-50 text-purple-600",
    title: "Provider Signup v2",
    target: "Today",
    owner: "SK",
    progress: 100,
    checks: {
      security: true,
      qa: true,
      policy: true,
      performance: true,
      docs: true,
    }
  },
  {
    id: "FEAT-1220",
    tag: "Studio",
    tagColor: "bg-orange-50 text-orange-600",
    title: "Studio Asset Library",
    target: "Tomorrow",
    owner: "NK",
    progress: 80,
    checks: {
      security: true,
      qa: true,
      policy: true,
      performance: true,
      docs: false,
    }
  },
  {
    id: "FEAT-1221",
    tag: "Shopping",
    tagColor: "bg-green-50 text-green-600",
    title: "Multi-vendor Cart",
    target: "Jan 22",
    owner: "AM",
    progress: 60,
    checks: {
      security: true,
      qa: true,
      policy: false,
      performance: false,
      docs: false,
    }
  },
  {
    id: "FEAT-1225",
    tag: "IT",
    tagColor: "bg-blue-50 text-blue-600",
    title: "IT Ticketing Integration",
    target: "Jan 22",
    owner: "AM",
    progress: 60,
    checks: {
      security: true,
      qa: true,
      policy: false,
      performance: false,
      docs: false,
    }
  }
];

const ReleaseReadiness: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[14px] border border-[#0000001A] h-full">
      <DashboardCardHeader
        title="Release Readiness"
        subtitle="4 total"
      />

      <div className="space-y-8">
        {releaseItems.map((item, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[#717182] uppercase tracking-wider">{item.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
                <h3 className="md:text-base text-sm font-semibold text-[#1E1E1E]">{item.title}</h3>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#717182]">Target: {item.target}</p>
                <p className="text-xs text-[#717182]">Owner: {item.owner}</p>
              </div>
            </div>

            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                 <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
                        style={{ width: `${item.progress}%` }}
                    ></div>
                 </div>
                 <span className="text-xs font-semibold text-blue-600 ml-4">{item.progress}%</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <StatusCheck label="Security Review" checked={item.checks.security} />
              <StatusCheck label="QA Pass" checked={item.checks.qa} />
              <StatusCheck label="Policy Compliance" checked={item.checks.policy} />
              <StatusCheck label="Performance Test" checked={item.checks.performance} />
              <StatusCheck label="Documentation" checked={item.checks.docs} />
            </div>
            
            {index < releaseItems.length - 1 && (
                <div className="border-b border-gray-100 pt-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusCheck = ({ label, checked }: { label: string; checked: boolean }) => (
  <div className="flex items-center gap-1.5">
    {checked ? (
      <CheckCircle2 size={14} className="text-green-500" />
    ) : (
      <Circle size={14} className="text-gray-300" />
    )}
    <span className={`md:text-[11px] text-[10px] font-medium ${checked ? "text-[#1E1E1E]" : "text-[#717182]"}`}>
      {label}
    </span>
  </div>
);

export default ReleaseReadiness;
