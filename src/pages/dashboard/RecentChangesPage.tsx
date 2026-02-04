import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import placeholderUserImg from "../../assets/placeholderUserImg.svg";
import SearchBar from "./components/SearchBar";

const RecentChangesPage: React.FC = () => {
  const navigate = useNavigate();

  const changes = [
    {
      user: "Sarah Chen",
      action: "deployed",
      target: "api-service v2.4.1",
      time: "2 min ago",
      id: "AUD-001234",
      actionColor: "text-green-600",
    },
    {
      user: "Mike Johnson",
      action: "modified",
      target: "IAM policy: prod-access",
      time: "5 min ago",
      id: "AUD-002222",
      actionColor: "text-(--dark-orange)",
    },
    {
      user: "Alex Kim",
      action: "created",
      target: "alert rule: cpu-threshold",
      time: "10 min ago",
      id: "AUD-002226",
      actionColor: "text-blue-600",
    },
    {
      user: "Emily Davis",
      action: "deleted",
      target: "stale-feature-branch",
      time: "20 min ago",
      id: "AUD-002227",
      actionColor: "text-red-500",
    },
    {
      user: "James Wilson",
      action: "approved",
      target: "security patch #847",
      time: "22 min ago",
      id: "AUD-002228",
      actionColor: "text-green-600",
    },
    {
      user: "Sarah Chen",
      action: "scaled",
      target: "worker-pool: 5 → 8 nodes",
      time: "44 min ago",
      id: "AUD-002229",
      actionColor: "text-orange-500",
    },
  ];

  return (
    <div className="w-full max-w-[2512px] mx-auto">
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer group w-fit"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft
          size={32}
          className="text-[#1E1E1E] group-hover:-translate-x-1 transition-transform"
        />
        <h1 className="md:text-[32px] sm:text-2xl text-lg font-semibold text-(--dark-text-black)">Recent Changes</h1>
      </div>

      <div className="bg-white rounded-[14px] p-6 shadow-sm border border-[#0000001A]">
        <SearchBar />

        <div className="space-y-0">
          {changes.map((item, index) => (
            <div
              key={index}
              className="py-4 border-b border-[#F1F1F1] last:border-0 flex items-start justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={placeholderUserImg}
                  alt={item.user}
                  className="w-10 h-10 rounded-full bg-gray-100"
                />
                <div>
                  <div className="text-base text-(--dark-text-black)">
                    <span className="font-normal">{item.user}</span>{" "}
                    <span className={`font-normal ${item.actionColor}`}>
                      {item.action}
                    </span>{" "}
                    <span className="font-normal">{item.target}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{item.time}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-[#3178EC]">
                {item.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentChangesPage;
