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

type RiskRow = {
  name: string;
  findings: string;
  resolution: string;
};

const rows: RiskRow[] = [
  {
    name: "Third-Party Analytics SDK Update",
    findings:
      "New SDK version collects additional device telemetry. Reviewed data collection scope.",
    resolution: "Approved with custom configuration to limit data collection",
  },
  {
    name: "CCPA Compliance Audit",
    findings: "Minor gaps in data deletion workflows for California users",
    resolution: "--",
  },
  {
    name: "New Payment Processor Integration",
    findings:
      "Requires PCI DSS compliance verification and security assessment",
    resolution: "--",
  },
  {
    name: "User Profile API Changes",
    findings: "Added new optional fields for user preferences",
    resolution: "No PII impact, approved for deployment",
  },
  {
    name: "Mobile App Location Access",
    findings: "Feature requires continuous background location access",
    resolution:
      "Rejected due to privacy concerns. Suggested using foreground-only access",
  },
  {
    name: "Marketing Email Template Update",
    findings: "New template uses first name personalisation",
    resolution: "Approved - existing consent covers this use case",
  },
  {
    name: "Database Encryption Upgrade",
    findings: "Migration to AES-256-GCM from AES-256-CBC",
    resolution: "--",
  },
  {
    name: "Database Encryption Upgrade",
    findings: "Migration to AES-256-GCM from AES-256-CBC",
    resolution: "--",
  },
];

export default function SecurityRiskReviewHistoryPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.findings.toLowerCase().includes(q) ||
        r.resolution.toLowerCase().includes(q),
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
            Security Risk Review History
          </h2>
          <p className="text-sm text-gray-600">
            Complete history of security risk assessments and decisions
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
            aria-label="Search risks"
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
                  <TableHead>Name</TableHead>
                  <TableHead>Findings</TableHead>
                  <TableHead>Resolution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r, idx) => (
                  <TableRow key={`${r.name}-${idx}`}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="max-w-[50%] text-ellipsis overflow-hidden">
                      {r.findings}
                    </TableCell>
                    <TableCell className="max-w-[40%] text-ellipsis overflow-hidden">
                      {r.resolution}
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
