import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

type Capability = { name: string; owner: string; status: string };

const STATUS_COLOR_MAP: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-800",
  Deprecated: "bg-sky-100 text-sky-800",
  Draft: "bg-amber-100 text-amber-800",
};

const MOCK_CAPABILITIES: Capability[] = [
  { name: "Audit Trail", owner: "Security", status: "Active" },
  { name: "Data Export", owner: "Platform", status: "Deprecated" },
  { name: "AI Summaries", owner: "Applied AI", status: "Draft" },
  { name: "Billing Hooks", owner: "Finance Ops", status: "Active" },
  { name: "Enterprise SSO", owner: "Identity", status: "Active" },
  { name: "Audit Trail", owner: "Security", status: "Active" },
  { name: "Data Export", owner: "Platform", status: "Active" },
  { name: "AI Summaries", owner: "Applied AI", status: "Draft" },
];

export default function CapabilityRegistry() {
  const capabilities = MOCK_CAPABILITIES;
  const statusColorMap = STATUS_COLOR_MAP;

  return (
    <div>
      <div className="flex items-center mb-4 gap-4">
        <div className="flex items-center gap-2 w-full max-w-2xs">
          <InputGroup className="bg-white">
            <InputGroupAddon>
              <SearchIcon className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search" />
          </InputGroup>
        </div>

        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-44 bg-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="deprecated">Deprecated</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="py-4">
        <CardHeader className="sr-only">
          <CardTitle>Capabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b border-border">
                    <th className="py-3 px-6 w-2/5 font-medium">
                      Capability Name
                    </th>
                    <th className="py-3 px-6 w-1/5 font-medium">Owner</th>
                    <th className="py-3 px-6 w-1/5 font-medium">Status</th>
                    <th className="py-3 px-6 text-right w-1/5 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {capabilities.map((c, idx) => (
                    <tr key={`${c.name}-${idx}`}>
                      <td className="py-6 px-6">{c.name}</td>
                      <td className="py-6 px-6 text-sm text-muted-foreground">
                        {c.owner}
                      </td>
                      <td className="py-6 px-6">
                        <Badge
                          className={`rounded-full px-3 py-1 text-sm font-medium ${statusColorMap[c.status]}`}
                        >
                          {c.status}
                        </Badge>
                      </td>
                      <td className="py-6 px-6 text-right">
                        {c.status === "Active" ? (
                          <Button
                            size="lg"
                            className="w-40  bg-slate-900 text-white hover:bg-slate-800"
                          >
                            Mark Deprecated
                          </Button>
                        ) : (
                          <Button
                            size="lg"
                            className="w-40  bg-slate-900 text-white hover:bg-slate-800"
                          >
                            Mark Active
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
