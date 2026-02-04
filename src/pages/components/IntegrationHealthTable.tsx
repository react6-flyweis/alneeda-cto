import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

export type Status = "healthy" | "degraded" | "down";

export interface Integration {
  name: string;
  category: string;
  status: Status;
  latency?: string;
  errorRate?: string;
  uptime?: string;
  lastIncident?: string;
}

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const base =
    "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium";
  if (status === "healthy")
    return <span className={`${base} bg-teal-100 text-teal-700`}>Healthy</span>;
  if (status === "degraded")
    return (
      <span className={`${base} bg-amber-100 text-amber-500`}>Degraded</span>
    );
  return <span className={`${base} bg-red-100 text-red-600`}>Down</span>;
};

export default function IntegrationHealthTable({
  data,
  showSearch = false,
}: {
  data: Integration[];
  showSearch?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex justify-between rounded-lg">
        {showSearch ? (
          <div className="w-1/3">
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder="Search"
                aria-label="Search integrations"
              />
            </InputGroup>
          </div>
        ) : (
          <>
            <CardTitle className="text-lg">Integration Health</CardTitle>
            <Link to="/integration-health">
              <Button>View all</Button>
            </Link>
          </>
        )}
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-3 pr-6">Integration</th>
                <th className="py-3 pr-6">Category</th>
                <th className="py-3 pr-6">Status</th>
                <th className="py-3 pr-6">Latency (p95)</th>
                <th className="py-3 pr-6">Error Rate</th>
                <th className="py-3 pr-6">Uptime</th>
                <th className="py-3 pr-6">Last Incident</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.name}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-4 pr-6">
                    <div>
                      <div className="font-medium">{row.name}</div>
                    </div>
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">
                    {row.category}
                  </td>
                  <td className="py-4 pr-6">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">
                    {row.latency ?? "--"}
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">
                    {row.errorRate ?? "--"}
                  </td>
                  <td className="py-4 pr-6 text-sm text-gray-600">
                    {row.uptime ?? "--"}
                  </td>
                  <td className="py-4 pr-6 text-sm">
                    {row.lastIncident === "Active Incident" ? (
                      <span className="text-red-600 font-medium">
                        Active Incident
                      </span>
                    ) : (
                      <span className="text-gray-600">{row.lastIncident}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
