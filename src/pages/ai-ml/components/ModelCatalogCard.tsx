import React from "react";
import DashboardCardHeader from "../../dashboard/components/DashboardCardHeader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { RiskBadge } from "./Badges";

const models = [
  {
    model: "Ranking — Home Feed",
    version: "v2.8.1",
    owner: "ML Lead",
    last_trained: "2025-08 → 2025-12",
    last_used: "01-20-2026, 15:14",
    risk: "High",
    stage: "Canary",
  },
  {
    model: "Fraud Detection",
    version: "v1.14.0",
    owner: "Data Science",
    last_trained: "2025-09 → 2025-12",
    last_used: "01-20-2026, 09:14",
    risk: "High",
    stage: "Promoted",
  },
  {
    model: "Refund Assist — Eligibility",
    version: "v0.9.3",
    owner: "ML Lead",
    last_trained: "2025-10 → 2025-12",
    last_used: "01-19-2026, 10:14",
    risk: "Medium",
    stage: "Shadow",
  },
  {
    model: "Search Suggestion",
    version: "v3.2.0",
    owner: "MLOps/SRE",
    last_trained: "2025-07 → 2025-12",
    last_used: "01-20-2026, 15:14",
    risk: "Low",
    stage: "Promoted",
  },
];

const ModelCatalogCard: React.FC = () => {
  return (
    <Card className="rounded-[14px] border border-[#0000001A] p-0">
      <CardContent className="p-6">
        <DashboardCardHeader
          title="Model catalog"
          subtitle="Versioning, owners, training data lineage, and last deploy"
        />

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="text-[#717182] text-xs border-b">
                <TableHead className="py-3 pr-6">Model</TableHead>
                <TableHead className="py-3 pr-6">Version</TableHead>
                <TableHead className="py-3 pr-6">Owner</TableHead>
                <TableHead className="py-3 pr-6">Last trained</TableHead>
                <TableHead className="py-3 pr-6">Last used</TableHead>
                <TableHead className="py-3 pr-6">Risk</TableHead>
                <TableHead className="py-3 pr-6">Stage</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {models.map((m, idx) => (
                <TableRow key={idx} className="border-b last:border-0">
                  <TableCell className="py-4 pr-6 text-(--dark-text-black) font-medium">
                    {m.model}
                  </TableCell>
                  <TableCell className="py-4 pr-6">{m.version}</TableCell>
                  <TableCell className="py-4 pr-6">{m.owner}</TableCell>
                  <TableCell className="py-4 pr-6 text-[#717182]">
                    {m.last_trained}
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-[#717182]">
                    {m.last_used}
                  </TableCell>
                  <TableCell className="py-4 pr-6">
                    <RiskBadge risk={m.risk} />
                  </TableCell>
                  <TableCell className="py-4 pr-6">{m.stage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelCatalogCard;
