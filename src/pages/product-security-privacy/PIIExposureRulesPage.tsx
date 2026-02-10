import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Search, Edit2 } from "lucide-react";
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

import { rows, riskColorMap } from "./piiFields";

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
      <div className="flex  gap-2 mb-6">
        <Link
          to="/product-security-governance"
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
        <InputGroup className="bg-white">
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
                  <TableHead className="text-right">Actions</TableHead>
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
                        className={`inline-flex items-center px-3 py-1 text-xs rounded-md font-medium ${riskColorMap[r.risk]}`}
                      >
                        {r.risk}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        to={`/product-security-governance/pii-rules/${r.field}/edit`}
                        className="p-2 rounded-md hover:bg-gray-50 inline-flex items-center"
                        aria-label={`Edit ${r.field}`}
                      >
                        <Edit2 className="size-4" />
                      </Link>
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
