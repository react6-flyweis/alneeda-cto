import React from "react";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";

const flags = [
  {
    title: "Provider Signup v2",
    id: "ff-provider-signup-v2",
    tags: [
      { label: "High Risk", color: "bg-red-50 text-red-600" },
      { label: "Approval Required", color: "bg-purple-50 text-purple-600" }
    ],
    owner: "SK",
    time: "2h ago",
    progress: "50% → 100%",
    progressValue: 75,
    regions: "Regions: NYC, LA, CHI"
  },
  {
    title: "Multi-vendor Cart",
    id: "ff-multi-vendor-cart",
    tags: [
      { label: "High Risk", color: "bg-red-50 text-red-600" },
      { label: "Approval Required", color: "bg-purple-50 text-purple-600" }
    ],
    owner: "SK",
    time: "2h ago",
    progress: "10% → 100%",
    progressValue: 10,
    regions: "Regions: NYC"
  },
  {
    title: "Studio Video Templates",
    id: "ff-studio-templates",
    tags: [],
    owner: "SK",
    time: "2h ago",
    progress: "100% → 100%",
    progressValue: 100,
    regions: "Regions: Global"
  },
  {
    title: "Push Notification v2",
    id: "ff-push-notifications",
    tags: [],
    owner: "SK",
    time: "2h ago",
    progress: "25% → 100%",
    progressValue: 25,
    regions: "Regions: NYC, MIA"
  }
];

const FeatureFlags: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[14px] border border-[#0000001A] h-full shadow-sm">
      <DashboardCardHeader
        title="Feature Flags"
        subtitle="6 total"
      />

      <div className="space-y-8">
        {flags.map((flag, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="md:text-base text-sm font-semibold text-[#1E1E1E]">{flag.title}</h3>
                  <div className="flex gap-2">
                    {flag.tags.map((tag, i) => (
                      <span key={i} className={`text-[10px] px-2 py-0.5 rounded font-medium ${tag.color}`}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#717182]">{flag.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#1E1E1E]">Owner: {flag.owner}</p>
                <p className="text-xs text-[#717182]">{flag.time}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-medium">
                <span className="text-[#717182]">Rollout Progress</span>
                <span className="text-[#1E1E1E]">{flag.progress}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                 <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${flag.progressValue}%` }}
                 ></div>
              </div>
            </div>

            <p className="text-xs text-[#717182]">{flag.regions}</p>
            
            {index < flags.length - 1 && (
                <div className="border-b border-gray-100 pt-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureFlags;
