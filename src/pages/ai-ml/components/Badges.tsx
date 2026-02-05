import React from "react";
import { Badge } from "@/components/ui/badge";

export const RiskBadge: React.FC<{ risk: string }> = ({ risk }) => {
  const cls =
    risk === "High"
      ? "bg-red-50 text-red-600"
      : risk === "Medium"
        ? "bg-orange-50 text-orange-600"
        : "bg-green-50 text-green-600";

  return (
    <Badge className={`text-xs px-2 py-1 rounded font-medium ${cls}`}>
      {risk}
    </Badge>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const cls =
    status === "Running"
      ? "bg-blue-50 text-blue-600"
      : status === "Completed"
        ? "bg-green-50 text-green-600"
        : "bg-gray-50 text-gray-600";

  return (
    <Badge className={`text-xs px-2 py-1 rounded font-medium ${cls}`}>
      {status}
    </Badge>
  );
};
