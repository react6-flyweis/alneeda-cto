import React from "react";
import {
  Terminal,
  Database,
  Shield,
  Server,
  Share2,
} from "lucide-react";
import KeySafeIcon from "../../../assets/KeySafeIcon.svg";
import DashboardCardHeader from "./DashboardCardHeader";
import AnalyticIcon from "../../../assets/analyticIcon.svg";

const tools = [
  { icon: Terminal, label: "Console", sub: "Shell access" },
  { icon: Database, label: "Database", sub: "Query explorer" },
  { icon: Shield, label: "Security Hub", sub: "Threat dashboard" },
  { icon: Share2, label: "CI/CD", sub: "Pipeline manager" },
  { icon: Server, label: "Servers", sub: "Fleet management" },
  { icon: AnalyticIcon, label: "Analytics", sub: "System metrics",iconType:"img" },
  { icon: AnalyticIcon, label: "Cloud Console", sub: "AWS/GCP/Azure",iconType:"img" },
  { icon: KeySafeIcon, label: "Secrets", sub: "Vault access",disabled:true,iconType:"img"},
];

const ToolsGrid: React.FC = () => {
  return (
    <div className="bg-white md:p-6 p-4 rounded-[14px] border-[0.8px] border-[#0000001A] h-full">
      <DashboardCardHeader title="Tools" subtitle="7/8 enabled" className="mb-0" />

      <div className="grid grid-cols-2 lg:gap-4 gap-2 mt-0 max-h-[400px] overflow-y-auto">
        {tools.map((tool, index) => (
          <button
            key={index}
            className="group flex items-center px-2 py-3 rounded-xl border border-(--dark-text-gray) hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer"
            disabled={tool.disabled}
          >
            <div className="mr-3 text-[#1E1E1E] transition-colors shrink-0">
             {tool?.iconType === "img" ? <img src={tool.icon} alt="" /> : <tool.icon size={22} className="stroke-1.5" />}
            </div>
            <div className="min-w-0">
              <h6 className="md:text-base text-sm font-semibold text-[#1E1E1E] text-left truncate">
                {tool.label}
              </h6>
              <p className="md:text-sm text-xs text-[#717182] font-normal truncate text-left">
                {tool.sub}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolsGrid;
