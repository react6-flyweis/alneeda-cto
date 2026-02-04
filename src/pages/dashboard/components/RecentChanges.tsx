import React from "react";
import Button from "../../../components/Button";
import DashboardCardHeader from "./DashboardCardHeader";
import placeholderUserImg from "../../../assets/placeholderUserImg.svg";

const changes = [
  {
    id: 1,
    user: "Sarah Chen",
    action: "deployed",
    target: "api-service v2.4.1",
    time: "2 min ago",
    idNum: "AUD-001234",
    userImg: placeholderUserImg,
  },
  {
    id: 2,
    user: "Mike Johnson",
    action: "modified",
    target: "IAM policy: prod-access",
    time: "5 min ago",
    idNum: "AUD-002222",
    userImg: placeholderUserImg,
  },
  {
    id: 3,
    user: "Alex Kim",
    action: "created",
    target: "alert rule: cpu-threshold",
    time: "10 min ago",
    idNum: "AUD-002226",
    userImg: placeholderUserImg,
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "deleted",
    target: "stale-feature-branch",
    time: "20 min ago",
    idNum: "AUD-002227",
    userImg: placeholderUserImg,
  },
];

import { useNavigate } from "react-router-dom";

const RecentChanges: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white md:p-6 p-4 rounded-[14px] border-[0.8px] border-[#0000001A] h-full">
      <DashboardCardHeader
        title="Recent Changes"
        subtitle="Last 50 actions"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate("/dashboard/recent-changes")}
            className="bg-[#0a1628] text-white rounded-lg h-9 font-bold md:text-sm text-xs hover:bg-[#152945] transition-colors flex items-center justify-center"
          >
            View All
          </Button>
        }
      />

      <div className="space-y-6 mt-4 md:h-[400px] h-[300px] overflow-y-auto pr-2">
        {changes.map((change) => (
          <div key={change.id} className="flex items-center gap-4 pb-4 border-b border-(--dark-text-gray)">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center border border-gray-100">
              <img src={change.userImg} alt="User" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base text-(--dark-text-black) font-normal">
                    <span className="font-normal text-(--dark-text-black)">{change.user}</span>{" "}
                    <span
                      className={`${
                        change.action === "deployed"
                          ? "text-(--dark-green)"
                          : change.action === "modified"
                          ? "text-(--dark-orange)"
                          : change.action === "created"
                          ? "text-[#3178EC]"
                          : "text-(--dark-red)"
                      } font-normal`}
                    >
                      {change.action}
                    </span>{" "}
                    {change.target}
                  </p>
                  <p className="text-sm text-[#717182] font-normal mt-0.5">
                    {change.time}
                  </p>
                </div>
                <span className="text-sm font-bold text-[#3178EC] ml-2">
                  {change.idNum}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentChanges;
