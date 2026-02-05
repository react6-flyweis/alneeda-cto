import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
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
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type AccessRow = {
  principal: string;
  role: string;
  resource: string;
  lastUsed: string;
  expiry: string;
};

const rows: AccessRow[] = [
  {
    principal: "cs-team@acme",
    role: "CS / Support",
    resource: "Customer Records (masked PII)",
    lastUsed: "01-20-2026, 15:14",
    expiry: "01-19-2027",
  },
  {
    principal: "security@acme",
    role: "Security Lead",
    resource: "PII Reveal (time-limited)",
    lastUsed: "01-20-2026, 09:14",
    expiry: "01-19-2027",
  },
  {
    principal: "infra@acme",
    role: "CTO",
    resource: "Secrets & Key Rotation",
    lastUsed: "01-19-2026, 10:14",
    expiry: "01-18-2027",
  },
  {
    principal: "infra@acme",
    role: "CTO",
    resource: "Secrets & Key Rotation",
    lastUsed: "01-19-2026, 10:14",
    expiry: "01-18-2027",
  },
  {
    principal: "security@acme",
    role: "Security Lead",
    resource: "Secrets & Key Rotation",
    lastUsed: "01-19-2026, 10:14",
    expiry: "01-18-2027",
  },
  {
    principal: "security@acme",
    role: "Security Lead",
    resource: "Secrets & Key Rotation",
    lastUsed: "01-19-2026, 10:14",
    expiry: "01-18-2027",
  },
];

export default function AccessReviewPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesRole = role === "all" ? true : r.role === role;
      const matchesQuery =
        query.trim() === "" ||
        r.principal.toLowerCase().includes(query.toLowerCase()) ||
        r.resource.toLowerCase().includes(query.toLowerCase());
      return matchesRole && matchesQuery;
    });
  }, [query, role]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <Link
          to="/security-privacy"
          className="inline-flex items-center text-gray-600"
        >
          <ChevronLeft className="size-6" />
        </Link>
        <div>
          <h2 className="md:text-2xl text-xl font-semibold text-[#1E1E1E] font-[poppins]">
            Access Review
          </h2>
        </div>
      </div>

      <Card>
        <CardHeader className="flex justify-between items-center gap-4">
          <div className="">
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder="Search"
                aria-label="Search access"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
            </InputGroup>
          </div>

          <div className="">
            <Select
              onValueChange={(v: string) => setRole(v)}
              defaultValue="all"
            >
              <SelectTrigger size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Role</SelectItem>
                <SelectItem value="CS / Support">CS / Support</SelectItem>
                <SelectItem value="Security Lead">Security Lead</SelectItem>
                <SelectItem value="CTO">CTO</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Principal</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Last used</TableHead>
                  <TableHead>Expiry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r, idx) => (
                  <TableRow key={`${r.principal}-${idx}`}>
                    <TableCell className="font-medium">{r.principal}</TableCell>
                    <TableCell>{r.role}</TableCell>
                    <TableCell className="max-w-[40%] text-ellipsis overflow-hidden">
                      {r.resource}
                    </TableCell>
                    <TableCell>{r.lastUsed}</TableCell>
                    <TableCell>{r.expiry}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
