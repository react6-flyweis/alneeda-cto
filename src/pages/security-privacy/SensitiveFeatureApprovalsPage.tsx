import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type FeatureRow = {
  name: string;
  description: string;
  requestedBy: string;
  requestDate: string;
  pii: string;
};

const rows: FeatureRow[] = [
  {
    name: "Social Login Integration",
    description:
      "Allow users to sign in using Google, Apple, and Microsoft accounts",
    requestedBy: "Product Team",
    requestDate: "01-20-2026",
    pii: "email, full_name",
  },
  {
    name: "Advanced Analytics Dashboard",
    description:
      "New dashboard with detailed user behavior analytics and cohort analysis",
    requestedBy: "Analytics Team",
    requestDate: "01-21-2026",
    pii: "ip_address, device_id, email",
  },
  {
    name: "Two-Factor Authentication",
    description:
      "Add SMS and authenticator app based 2FA for all user accounts",
    requestedBy: "Security Team",
    requestDate: "01-22-2026",
    pii: "phone_number",
  },
  {
    name: "Customer Data Export",
    description:
      "Enable customers to export all their data in machine-readable format",
    requestedBy: "Legal Team",
    requestDate: "01-20-2026",
    pii: "email, full_name, phone_number, billing_address",
  },
  {
    name: "AI-Powered Recommendations",
    description:
      "Machine learning based product recommendations using user behavior data",
    requestedBy: "Product Team",
    requestDate: "01-19-2026",
    pii: "device_id, ip_address",
  },
  {
    name: "Billing Address Reveal",
    description: "Show full billing address to support agents when needed",
    requestedBy: "Analytics Team",
    requestDate: "01-18-2026",
    pii: "phone_number, billing_address",
  },
  {
    name: "Customer Data Export",
    description:
      "Enable customers to export all their data in machine-readable format",
    requestedBy: "Security Team",
    requestDate: "01-17-2026",
    pii: "phone_number",
  },
  {
    name: "Social Login Integration",
    description:
      "Allow users to sign in using Google, Apple, and Microsoft accounts",
    requestedBy: "Security Team",
    requestDate: "01-16-2026",
    pii: "phone_number",
  },
];

export default function SensitiveFeatureApprovalsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return rows;
    return rows.filter((r) => {
      return (
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.requestedBy.toLowerCase().includes(q) ||
        r.pii.toLowerCase().includes(q)
      );
    });
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
            Sensitive Feature Approvals
          </h2>
          <p className="text-sm text-gray-600">
            Controlled Testing with Policy-Based Feature Rollouts
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex justify-between items-center gap-4">
          <div className="w-full max-w-md">
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder="Search"
                aria-label="Search approvals"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
            </InputGroup>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>PII Fields Accessed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.name + r.requestDate}>
                    <TableCell className="max-w-[40%]">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {r.description}
                      </div>
                    </TableCell>
                    <TableCell>{r.requestedBy}</TableCell>
                    <TableCell>{r.requestDate}</TableCell>
                    <TableCell className="max-w-[40%] text-ellipsis overflow-hidden">
                      {r.pii}
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
