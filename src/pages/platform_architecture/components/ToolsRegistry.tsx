import React from "react";
import { Search, FileText, Shield, Eye } from "lucide-react";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";
import greenNetworkLine from "../../../assets/icons/greenNetworkLine.svg";
import blueNetworkIcon from "../../../assets/icons/blueNetworkIcon.svg";
import blueLinkIcon from "../../../assets/icons/blueLinkIcon.svg";
const tools = [
  {
    category: "Discovery",
    items: [
      {
        name: "Service Catalog",
        description: "Discover and manage all registered services",
        icon: Search,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
      }
    ]
  },
  {
    category: "Design",
    items: [
      {
        name: "System Diagramming",
        description: "Create and edit architecture diagrams",
        // icon: Network,
        imgIcon:blueNetworkIcon,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
      },
      {
        name: "ADR Generator",
        description: "Generate ADR templates with AI assistance",
        icon: FileText,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
      }
    ]
  },
  {
    category: "Monitoring",
    items: [
      {
        name: "APM Dashboard",
        description: "Application performance metrics",
        imgIcon:greenNetworkLine,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
      },
      {
        name: "Tracing Viewer",
        description: "Distributed tracing and span analysis",
        icon: Eye,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
      }
    ]
  },
  {
    category: "Security",
    items: [
      {
        name: "Dependency Scanner",
        description: "Scan for vulnerabilities in dependencies", // Inferred description
        icon: Shield,
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
      }
    ]
  }
];

const ToolsRegistry: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[14px] border border-[#0000001A] h-full">
      <DashboardCardHeader
        title="Tools Registry"
        subtitle="7 Available"
      />
      
 <div className="md:space-y-6 space-y-2 md:h-[400px] h-[300px] overflow-y-auto">
        {tools.map((section, index) => (
          <div key={index} className="w-full border-bottom-soft pb-2">
            <h4 className="text-sm font-medium text-(--dark-text-black) mb-3">{section.category}</h4>
            <div className="space-y-4">
              {section.items.map((tool, toolIndex) => (
                <div key={toolIndex} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${tool.iconBg} flex items-center justify-center shrink-0`}>
                      {tool.icon ? (
                        <tool.icon size={20} className={tool.iconColor} />
                      ) : (
                        <img src={tool?.imgIcon} alt={tool.name} className="w-5 h-5 object-contain" />
                      )}
                    </div>
                    <div>
                      <h3 className="md:text-base text-sm font-normal text-[#1E1E1E]">
                        {tool.name}
                      </h3>
                      {tool.description && (
                         <p className="md:text-sm text-xs  text-[#717182] mt-0.5">
                           {tool.description}
                         </p>
                      )}
                    </div>
                  </div>
                  <img src={blueLinkIcon} alt="blueLinkIcon" className="cursor-pointer shrink-0"/>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsRegistry;
