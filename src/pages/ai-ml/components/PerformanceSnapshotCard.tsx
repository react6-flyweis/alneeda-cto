import React from "react";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";
import { Card, CardContent } from "@/components/ui/card";

const PerformanceSnapshotCard: React.FC = () => {
  return (
    <Card className="rounded-[14px] border border-[#0000001A] p-0">
      <CardContent className="p-6">
        <DashboardCardHeader
          title="Performance Snapshot"
          subtitle="Precision/recall, latency, and drift in one place."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-md bg-[#F8FAFC]">
            <p className="text-xs text-[#717182]">Precision</p>
            <p className="text-xl font-semibold mt-2">94.2%</p>
          </div>
          <div className="p-4 rounded-md bg-[#F8FAFC]">
            <p className="text-xs text-[#717182]">Recall</p>
            <p className="text-xl font-semibold mt-2">88.1%</p>
          </div>
          <div className="p-4 rounded-md bg-[#F8FAFC]">
            <p className="text-xs text-[#717182]">p95 latency (last 24h)</p>
            <p className="text-xl font-semibold mt-2">83ms</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceSnapshotCard;
