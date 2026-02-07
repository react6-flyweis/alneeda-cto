import PageHeader from "@/components/common_components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  PlusIcon,
  SearchIcon,
  Edit,
  CheckCircle,
  Rocket,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const STATUS_COLOR_MAP: Record<string, string> = {
  Draft: "bg-amber-100 text-amber-800",
  Approved: "bg-emerald-100 text-emerald-800",
  Released: "bg-emerald-100 text-emerald-800",
  "Rolled back": "bg-rose-100 text-rose-800",
};

const STATUS_COUNTS = [
  {
    label: "Draft",
    count: 1,
    note: "In preparation",
    color: STATUS_COLOR_MAP.Draft,
    icon: Edit,
  },
  {
    label: "Approved",
    count: 1,
    note: "Ready for release window",
    color: STATUS_COLOR_MAP.Approved,
    icon: CheckCircle,
  },
  {
    label: "Released",
    count: 1,
    note: "Live & governed",
    color: STATUS_COLOR_MAP.Released,
    icon: Rocket,
  },
  {
    label: "Rolled back",
    count: 1,
    note: "Requires review",
    color: STATUS_COLOR_MAP["Rolled back"],
    icon: RefreshCw,
  },
];

const MOCK_VERSIONS = [
  {
    version: "2.4.0v-102",
    compliance: "At risk",
    lastUpdated: "01-15-2025",
    status: "Draft",
    risk: "High",
  },
  {
    version: "2.3.2v-101",
    compliance: "Compliant",
    lastUpdated: "02-15-2025",
    status: "Approved",
    risk: "Medium",
  },
  {
    version: "2.3.0v-100",
    compliance: "Compliant",
    lastUpdated: "03-15-2025",
    status: "Released",
    risk: "Low",
  },
  {
    version: "2.2.0v-099",
    compliance: "Non-compliant",
    lastUpdated: "01-15-2025",
    status: "Rolled Back",
    risk: "Low",
  },
  {
    version: "2.2.0v-098",
    compliance: "Compliant",
    lastUpdated: "01-15-2025",
    status: "Approved",
    risk: "High",
  },
  {
    version: "2.2.0v-097",
    compliance: "At risk",
    lastUpdated: "01-15-2025",
    status: "Draft",
    risk: "Medium",
  },
  {
    version: "2.2.0v-096",
    compliance: "At risk",
    lastUpdated: "02-15-2025",
    status: "Rolled Back",
    risk: "High",
  },
  {
    version: "2.2.0v-095",
    compliance: "Compliant",
    lastUpdated: "02-15-2025",
    status: "Approved",
    risk: "Low",
  },
];

export default function ProductVersioningPage() {
  return (
    <div className="">
      <PageHeader
        title="Product Versioning & Release Control"
        subtitle="A governance-first view of product versions: status, risk, readiness, approvals, and rollback traceability."
        actions={
          <Link to="/product-versioning/create">
            <Button size="lg">
              <PlusIcon /> Create Version
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATUS_COUNTS.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-muted-foreground">
                      {s.label}
                    </div>
                    <div className="text-2xl font-semibold mt-2">{s.count}</div>
                  </div>
                  <div
                    className={`rounded-xl p-3 flex items-center justify-center shrink-0 ${s.color}`}
                    aria-hidden
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {s.note}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2 w-full max-w-xs">
          <InputGroup className="bg-white">
            <InputGroupAddon>
              <SearchIcon className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search versions..." />
          </InputGroup>
        </div>

        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-44 bg-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="released">Released</SelectItem>
              <SelectItem value="rolledback">Rolled Back</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="sr-only">Versions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="py-3">Version</th>
                  <th className="py-3">Compliance</th>
                  <th className="py-3">Last updated</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Risk</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_VERSIONS.map((v) => (
                  <tr key={v.version} className="border-b">
                    <td className="py-4">{v.version}</td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {v.compliance}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {v.lastUpdated}
                    </td>
                    <td className="py-4">
                      <Badge
                        className={`rounded ${
                          v.status === "Draft"
                            ? "bg-amber-100 text-amber-800"
                            : v.status === "Approved"
                              ? "bg-emerald-100 text-emerald-800"
                              : v.status === "Released"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {v.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                          v.risk === "High"
                            ? "bg-rose-100 text-rose-800"
                            : v.risk === "Medium"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {v.risk}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Link
                        to={`/product-versioning/${v.version}`}
                        className="p-2 rounded hover:bg-accent"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
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
