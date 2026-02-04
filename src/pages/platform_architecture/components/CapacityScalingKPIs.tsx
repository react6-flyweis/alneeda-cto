import React from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";

export const kpiData = [
  {
    service: "Identity",
    traffic: "12.5K/s",
    cpu: "High",
    cpuColor: "bg-(--light-salmon) text-(--dark-orange)",
    memory: "62%",
    memoryColor: "bg-(--light-green) text-(--dark-green)",
    latency: "12ms",
    errorRate: "0.01%",
    errorColor: "bg-green-50 text-green-600",
  },
  {
    service: "Orders",
    traffic: "8.2K/s",
    cpu: "38%",
    cpuColor: "bg-green-50 text-green-600",
    memory: "78%",
    memoryColor: "bg-orange-50 text-orange-600",
    latency: "45ms",
    errorRate: "0.03%",
    errorColor: "bg-green-50 text-green-600",
  },
  {
    service: "Payments",
    traffic: "3.1K/s",
    cpu: "Critical",
    cpuColor: "bg-red-50 text-red-600",
    memory: "55%",
    memoryColor: "bg-green-50 text-green-600",
    latency: "89ms",
    errorRate: "0.01%",
    errorColor: "bg-green-50 text-green-600",
  },
  {
    service: "Ads",
    traffic: "45.8K/s",
    cpu: "Low",
    cpuColor: "bg-(--light-green) text-(--dark-green)",
    memory: "82%",
    memoryColor: "bg-(--light-salmon) text-(--dark-orange)",
    latency: "156ms",
    errorRate: "0.12%",
    errorColor: "bg-(--light-salmon) text-(--dark-orange)",
  },
];


export const CapacityScalingKPIsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-base font-medium text-black border-b-[0.8px] border-(--dark-gray)">
            <th className="py-4 pr-2">Service</th>
            <th className="py-4 pr-2">Traffic</th>
            <th className="py-4 pr-2">CPU</th>
            <th className="py-4 pr-2">Memory</th>
            <th className="py-4 pr-2">p95 Latency</th>
            <th className="py-4 pr-2">Error Rate</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--dark-gray)">
          {kpiData.map((row, index) => (
            <tr key={index} className="text-sm py-2">
              <td className="py-4 text-[#1E1E1E] font-medium">
                {row.service}
              </td>
              <td className="py-4 text-[#000000CC] text-sm">{row.traffic}</td>
              <td className="py-4">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${row.cpuColor}`}
                >
                  {row.cpu}
                </span>
              </td>
              <td className="py-4">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${row.memoryColor}`}
                >
                  {row.memory}
                </span>
              </td>
              <td className="py-4 text-[#000000CC] text-sm">{row.latency}</td>
              <td className="py-4">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${row.errorColor}`}
                >
                  {row.errorRate}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const CapacityScalingKPIs: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white md:p-6 p-4 rounded-[14px] border-[0.8px] border-[#0000001A] shadow-sm mb-6">
      <DashboardCardHeader
        title="Capacity & Scaling KPIs"
        subtitle="4 total"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate("capacity-scaling")}
            className="bg-[#0a1628] text-white rounded-lg h-9 font-bold md:text-sm text-xs hover:bg-[#152945] transition-colors flex items-center justify-center"
          >
            View All
          </Button>
        }
      />
      <CapacityScalingKPIsTable />

    </div>
  );
};

export default CapacityScalingKPIs;
