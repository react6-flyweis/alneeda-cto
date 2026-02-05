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
import { StatusBadge } from "./Badges";

const experiments = [
  {
    experiment: "Ranking v2.8.1 vs v2.7.9",
    owner: "Data Science",
    uplift: "+1.9%",
    violations: 0,
    status: "Running",
  },
  {
    experiment: "Refund Assist prompt tuning",
    owner: "ML Lead",
    uplift: "+0.7%",
    violations: 1,
    status: "Completed",
  },
  {
    experiment: "Refund Assist prompt tuning",
    owner: "Data Science",
    uplift: "+1.9%",
    violations: 0,
    status: "Running",
  },
  {
    experiment: "Ranking v2.8.1 vs v2.7.9",
    owner: "ML Lead",
    uplift: "+0.7%",
    violations: 1,
    status: "Completed",
  },
];

const ExperimentResultsCard: React.FC = () => {
  return (
    <Card className="rounded-[14px] border border-[#0000001A] p-0 mt-6">
      <CardContent className="p-6">
        <DashboardCardHeader
          title="Experiment / A-B results"
          subtitle="Guardrails first: violations block promotion and require review"
        />

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="text-[#717182] text-xs border-b">
                <TableHead className="py-3 pr-6">Experiment</TableHead>
                <TableHead className="py-3 pr-6">Owner</TableHead>
                <TableHead className="py-3 pr-6">Uplift</TableHead>
                <TableHead className="py-3 pr-6">Violations</TableHead>
                <TableHead className="py-3 pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {experiments.map((e, idx) => (
                <TableRow key={idx} className="border-b last:border-0">
                  <TableCell className="py-4 pr-6 text-(--dark-text-black) font-medium">
                    {e.experiment}
                  </TableCell>
                  <TableCell className="py-4 pr-6">{e.owner}</TableCell>
                  <TableCell className="py-4 pr-6">{e.uplift}</TableCell>
                  <TableCell className="py-4 pr-6">{e.violations}</TableCell>
                  <TableCell className="py-4 pr-6">
                    <StatusBadge status={e.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperimentResultsCard;
