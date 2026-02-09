import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type PIIFieldRow = {
  field: string;
  retentionDays: number;
  lastReviewed: string;
  purposes: string;
  protection: string;
  risk: "High" | "Medium" | "Low";
};

const rows: PIIFieldRow[] = [
  {
    field: "email",
    retentionDays: 365,
    lastReviewed: "01-20-2026",
    purposes: "Marketing, Analytics, Personalisation",
    protection: "Encrypted, Anonymised",
    risk: "High",
  },
  {
    field: "full_name",
    retentionDays: 365,
    lastReviewed: "01-21-2026",
    purposes: "Compliance, Support, Billing",
    protection: "Encrypted, Anonymised",
    risk: "High",
  },
  {
    field: "ip_address",
    retentionDays: 730,
    lastReviewed: "01-22-2026",
    purposes: "Marketing, Personalisation",
    protection: "Anonymised",
    risk: "Low",
  },
  {
    field: "billing_address",
    retentionDays: 90,
    lastReviewed: "01-20-2026",
    purposes: "Compliance",
    protection: "Encrypted",
    risk: "Medium",
  },
  {
    field: "device_id",
    retentionDays: 2555,
    lastReviewed: "01-19-2026",
    purposes: "Support",
    protection: "Encrypted",
    risk: "Medium",
  },
  {
    field: "date_of_birth",
    retentionDays: 365,
    lastReviewed: "01-17-2026",
    purposes: "Personalisation",
    protection: "Anonymised",
    risk: "High",
  },
  {
    field: "ssn_last_four",
    retentionDays: 2555,
    lastReviewed: "01-16-2026",
    purposes: "Analytics",
    protection: "Anonymised",
    risk: "High",
  },
];

const riskColorMap: Record<PIIFieldRow["risk"], string> = {
  High: "bg-rose-100 text-rose-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

export default function PIIExposureRulesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.field.toLowerCase().includes(q) ||
        r.purposes.toLowerCase().includes(q) ||
        r.protection.toLowerCase().includes(q),
    );
  }, [query]);

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
            PII Exposure Rules
          </h2>
          <p className="text-sm text-gray-600">
            Manage allowed fields, purpose tags, and data retention policies
          </p>
        </div>
      </div>

      <div className="mb-3 max-w-xs">
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Search className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            type="text"
            placeholder="Search"
            aria-label="Search PII fields"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </InputGroup>
      </div>

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PII Field</TableHead>
                  <TableHead>Retention Period (days)</TableHead>
                  <TableHead>Last Reviewed</TableHead>
                  <TableHead>Allowed Purposes</TableHead>
                  <TableHead>Protection Settings</TableHead>
                  <TableHead>Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.field}>
                    <TableCell>
                      <div className="font-medium">{r.field}</div>
                      <div className="text-xs text-gray-500">String</div>
                    </TableCell>
                    <TableCell>{r.retentionDays}</TableCell>
                    <TableCell>{r.lastReviewed}</TableCell>
                    <TableCell className="max-w-[40%] text-ellipsis overflow-hidden">
                      {r.purposes}
                    </TableCell>
                    <TableCell>{r.protection}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs rounded ${riskColorMap[r.risk]}`}
                      >
                        {r.risk}
                      </span>
                    </TableCell>
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
