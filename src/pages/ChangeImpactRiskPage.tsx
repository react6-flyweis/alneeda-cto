import PageHeader from "@/components/common_components/PageHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";
import { AlertTriangle, SearchIcon, ShieldAlert, Star } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Link } from "react-router-dom";

import {
  sampleChanges,
  riskColorMap,
  statusColorMap,
} from "@/lib/sample-data/changes";

export default function ChangeImpactRiskPage() {
  return (
    <div>
      <PageHeader
        title="Change Impact & Risk Control"
        subtitle="Approve risky product changes with consistent scoring and clear audit trails."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Pending approvals"
          value="4"
          change="+1 since last week"
          isPositive={false}
          statusText="Changes awaiting decision"
          icon={<AlertTriangle className="text-yellow-700" />}
          iconBg="bg-yellow-50"
        />

        <StatCard
          title="Critical items"
          value="3"
          change="-1 since last week"
          isPositive={false}
          statusText="Needs extra controls"
          icon={<ShieldAlert className="text-red-600" />}
          iconBg="bg-red-50"
        />

        <StatCard
          title="Avg Auto-risk"
          value="68"
          change="+2 avg"
          isPositive={true}
          statusText="Across current sample"
          icon={<Star className="text-amber-700" />}
          iconBg="bg-amber-50"
        />
      </div>

      <div className="mb-4">
        <InputGroup className="bg-white max-w-xs">
          <InputGroupAddon>
            <SearchIcon className="size-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search" />
        </InputGroup>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Change</CardTitle>
          <CardDescription>
            Pending changes and their risk scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3">Change</th>
                  <th className="py-3">Team</th>
                  <th className="py-3">Risk</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {sampleChanges.map((c) => (
                  <tr key={c.id} className="border-b last:border-b-0">
                    <td className="py-4">
                      <div className="font-medium">
                        <Link
                          to={`/change-impact-risk/${c.id}`}
                          className="text-sky-700 hover:underline"
                        >
                          {c.id}
                        </Link>
                      </div>
                      <div className="text-xs text-gray-500">{c.summary}</div>
                    </td>

                    <td className="py-4">
                      <div className="font-medium">{c.team}</div>
                      <div className="text-xs text-gray-500">{c.owner}</div>
                    </td>

                    <td className="py-4">
                      <Badge className={`${riskColorMap[c.risk]}`}>
                        {c.risk}
                      </Badge>
                    </td>

                    <td className="py-4">
                      <Badge className={`${statusColorMap[c.status]}`}>
                        {c.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
