import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export type Experiment = {
  id: string;
  name: string;
  owner: string;
  startDate?: string;
  primaryKpi: string;
  segment: string;
  status: "Running" | "Paused" | "Draft" | "Stopped";
};

const statusColorMap: Record<Experiment["status"], string> = {
  Running: "bg-blue-100 text-blue-800",
  Paused: "bg-yellow-100 text-yellow-800",
  Draft: "bg-gray-100 text-gray-800",
  Stopped: "bg-red-100 text-red-800",
};

type Props = {
  showSearch?: boolean;
};

const data: Experiment[] = [
  {
    id: "exp-1",
    name: "Simplify navigation labels",
    owner: "Maya",
    startDate: "01-27-2026",
    primaryKpi: "Conversion rate",
    segment: "New users (web)",
    status: "Running",
  },
  {
    id: "exp-2",
    name: "Introduce pricing anchor",
    owner: "Jon",
    startDate: "01-27-2026",
    primaryKpi: "Revenue per user",
    segment: "US, returning users",
    status: "Running",
  },
  {
    id: "exp-3",
    name: "Trial reminder cadence",
    owner: "Kane",
    startDate: "01-27-2026",
    primaryKpi: "Churn rate",
    segment: "Trials (all)",
    status: "Paused",
  },
];

export default function ExperimentationTable({ showSearch }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.owner.toLowerCase().includes(q) ||
        e.primaryKpi.toLowerCase().includes(q) ||
        e.segment.toLowerCase().includes(q),
    );
  }, [data, query]);

  return (
    <div className="w-full">
      {showSearch && (
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center bg-white rounded-md border px-3 py-2 w-80">
            <Search className="mr-2 text-gray-400" />
            <input
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>
      )}

      <div className="rounded-lg bg-white border">
        <Table>
          <TableHeader>
            <tr className="text-sm text-gray-600">
              <TableHead className="w-3/12">Name</TableHead>
              <TableHead className="w-1/12">Owner</TableHead>
              <TableHead className="w-2/12">Primary KPI</TableHead>
              <TableHead className="w-2/12">Segment</TableHead>
              <TableHead className="w-2/12">Status</TableHead>
              <TableHead className="w-2/12">Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow
                key={r.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <TableCell className="px-6 py-4 align-top">
                  <div className="font-medium">{r.name}</div>
                  {r.startDate && (
                    <div className="text-xs text-gray-400">
                      Start: {r.startDate}
                    </div>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 align-top">{r.owner}</TableCell>
                <TableCell className="px-6 py-4 align-top">
                  {r.primaryKpi}
                </TableCell>
                <TableCell className="px-6 py-4 align-top">
                  {r.segment}
                </TableCell>
                <TableCell className="px-6 py-4 align-top">
                  <Badge className={`rounded ${statusColorMap[r.status]}`}>
                    {r.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 align-top">
                  <div className="flex gap-2">
                    <Link to={`/experimentation/${r.id}/kpis`}>
                      <Button variant="outline" className="px-3 py-1.5">
                        KPIs
                      </Button>
                    </Link>
                    <Link to={`/experimentation/${r.id}/decision`}>
                      <Button className="px-3 py-1.5">Decision</Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No experiments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
