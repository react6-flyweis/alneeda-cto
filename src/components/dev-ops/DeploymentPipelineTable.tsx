import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeploymentApprovalDialog from "./DeploymentApprovalDialog";
import { Link } from "react-router-dom";
import searchIcon from "@/assets/icons/SearchIcon.svg";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const pipelines = [
  {
    id: "#4582",
    service: "Payments API",
    environment: "Production",
    branch: "hotfix/pay-err",
    commit: "alc9f3",
    status: "Success",
    statusColor: "bg-green-50 text-green-600",
    stage: "Canary 5%",
    duration: "6m 32s",
    triggeredBy: "CI Auto",
    deployedAt: "20 Jan, 16:40",
    deployedAt2: "20 Jan, 16:40",
  },
  {
    id: "#4581",
    service: "Orders API",
    environment: "Production",
    branch: "release/v2.4",
    commit: "b7d21e",
    status: "Running",
    statusColor: "bg-amber-50 text-amber-600",
    stage: "Full Deploy",
    duration: "--",
    triggeredBy: "Release Mgr",
    deployedAt: "--",
    deployedAt2: "--",
  },
  {
    id: "#4579",
    service: "Auth Service",
    environment: "Stage",
    branch: "develop",
    commit: "d3f88a",
    status: "Failed",
    statusColor: "bg-rose-50 text-rose-600",
    stage: "Integration Tests",
    duration: "4m 12s",
    triggeredBy: "CI Auto",
    deployedAt: "--",
    deployedAt2: "--",
  },
  {
    id: "#4578",
    service: "Search API",
    environment: "Development",
    branch: "feature/ranking",
    commit: "f9aa01",
    status: "Success",
    statusColor: "bg-green-50 text-green-600",
    stage: "Build",
    duration: "2m 05s",
    triggeredBy: "Developer",
    deployedAt: "20 Jan, 15:20",
    deployedAt2: "20 Jan, 15:20",
  },
  {
    id: "#4576",
    service: "Ads Engine",
    environment: "Production",
    branch: "release/v2.3",
    commit: "cle7bb",
    status: "Rolled Back",
    statusColor: "bg-orange-50 text-orange-600",
    stage: "Post-Deploy Check",
    duration: "9m 10s",
    triggeredBy: "Release Mgr",
    deployedAt: "19 Jan, 22:10",
    deployedAt2: "19 Jan, 22:10",
  },
];

const StatusBadge: React.FC<{ status: string; colorClass?: string }> = ({
  status,
  colorClass,
}) => {
  const base =
    "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium";

  const statusColorMap: Record<string, string> = {
    Success: "bg-green-50 text-green-600",
    Running: "bg-amber-50 text-amber-600",
    Failed: "bg-rose-50 text-rose-600",
    "Rolled Back": "bg-orange-50 text-orange-600",
  };

  const classes =
    colorClass ?? statusColorMap[status] ?? "bg-gray-100 text-gray-700";

  return <span className={`${base} ${classes}`}>{status}</span>;
};

export default function DeploymentPipelineTable({
  showFull,
}: {
  showFull?: boolean;
}) {
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState<
    (typeof pipelines)[0] | null
  >(null);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredPipelines = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pipelines.filter((p) => {
      const matchesQuery =
        !q ||
        [
          p.id,
          p.service,
          p.environment,
          p.branch,
          p.commit,
          p.triggeredBy,
        ].some((field) => field.toLowerCase().includes(q));

      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <Card>
      <CardHeader className="flex flex-col">
        {!showFull ? (
          <div className="w-full flex items-center justify-between">
            <CardTitle className="text-lg">Deployment Pipeline</CardTitle>
            <Link to="/devops/pipelines">
              <Button>View all</Button>
            </Link>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <div className="relative">
              <img
                src={searchIcon}
                alt=""
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="h-9 pl-9 pr-3 rounded-md border border-gray-200 text-sm"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Running">Running</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Rolled Back">Rolled Back</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-3 pr-6">Build ID</th>
                <th className="py-3 pr-6">Service</th>
                <th className="py-3 pr-6">Environment</th>
                <th className="py-3 pr-6">Branch</th>
                <th className="py-3 pr-6">Commit</th>
                <th className="py-3 pr-6">Status</th>
                <th className="py-3 pr-6">Stage</th>
                <th className="py-3 pr-6">Duration</th>
                <th className="py-3 pr-6">Triggered By</th>
                <th className="py-3 pr-6">Deployed At</th>
                <th className="py-3 pr-6">Deployed At</th>
                <th className="py-3 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPipelines.length === 0 ? (
                <tr>
                  <td className="py-4 pr-6 text-sm text-gray-600" colSpan={12}>
                    No pipelines found.
                  </td>
                </tr>
              ) : (
                filteredPipelines.map((p, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-4 pr-6 text-sm text-gray-600">{p.id}</td>
                    <td className="py-4 pr-6">
                      <div>
                        <div className="font-medium">{p.service}</div>
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600">
                      {p.environment}
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600">
                      {p.branch}
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600">
                      {p.commit}
                    </td>
                    <td className="py-4 pr-6">
                      <StatusBadge
                        status={p.status}
                        colorClass={p.statusColor}
                      />
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600">
                      {p.stage}
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600">
                      {p.duration}
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600">
                      {p.triggeredBy}
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600">
                      {p.deployedAt}
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600">
                      {p.deployedAt2}
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600 text-right">
                      <Button
                        onClick={() => {
                          setSelectedPipeline(p);
                          setApprovalOpen(true);
                        }}
                      >
                        Approve
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>

      <DeploymentApprovalDialog
        open={approvalOpen}
        onOpenChange={(v: boolean) => {
          setApprovalOpen(v);
          if (!v) setSelectedPipeline(null);
        }}
        pipeline={selectedPipeline}
        onSubmit={(action: "approve" | "reject") => {
          // TODO: call API for approval/reject
          console.log("Submitted", action, selectedPipeline?.id);
          setApprovalOpen(false);
          setSelectedPipeline(null);
        }}
      />
    </Card>
  );
}
