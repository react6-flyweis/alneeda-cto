import React from "react";
import Button from "../../../components/Button";
import DashboardCardHeader from "./DashboardCardHeader";

const queue = [
  {
    id: 1,
    priority: "High",
    type: "approval",
    title: "Production deploy: v2.4.1",
    requestedBy: "Sarah Chen",
    status: "Waiting: 2 approvers",
    statusColor: "text-[#3178EC]",
  },
  {
    id: 2,
    priority: "High",
    type: "approval",
    title: "IAM role modification",
    requestedBy: "Mike Johnson",
    status: "Waiting: Security review",
    statusColor: "text-[#3178EC]",
  },
  {
    id: 3,
    priority: "Medium",
    type: "execution",
    title: "Database migration: users table",
    status: "Waiting: Scheduled window",
    statusColor: "text-[#3178EC]",
  },
];

import { useNavigate } from "react-router-dom";

const ActionQueue: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white md:p-6 p-4 rounded-[14px] border-[0.8px] border-[#0000001A] h-full">
      <DashboardCardHeader
        title="Action Queue"
        subtitle="6 pending"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate("/dashboard/action-queue")}
            className="bg-[#0a1628] text-white rounded-lg h-9 font-bold md:text-sm text-xs hover:bg-[#152945] transition-colors flex items-center justify-center"
          >
            View All
          </Button>
        }
      />

      <div className="md:space-y-6 space-y-2 md:h-[400px] h-[300px] overflow-y-auto">
        {queue.map((item) => (
          <div
            key={item.id}
            className="flex flex-col border-b border-gray-50 last:border-0 pb-4 last:pb-0"
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`text-xs font-normal px-2 py-0.5 rounded ${
                  item.priority === "High"
                    ? "bg-(--light-red) text-(--dark-red)"
                    : "bg-(--light-yellow) text-(--dark-orange)"
                }`}
              >
                {item.priority}
              </span>
              <span className="text-xs font-normal text-gray-400 uppercase">
                {item.type}
              </span>
            </div>
            <h5 className="text-sm font-normal text-(--dark-text-black) my-1">
              {item.title}
            </h5>
            {item.requestedBy && (
              <p className="text-sm text-gray-400 my-1">
                Requested by {item.requestedBy}
              </p>
            )}
            <p className={`text-sm font-medium mt-1 ${item.statusColor}`}>
              {item.status}
            </p>
          </div>
        ))}

        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-normal px-2 py-0.5 rounded bg-green-50 text-green-600">
              Low
            </span>
            <span className="text-xs font-normal text-gray-400 uppercase">
              approval
            </span>
          </div>
          <h5 className="text-sm font-normal text-gray-800">
            Weekly backup verification
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ActionQueue;
