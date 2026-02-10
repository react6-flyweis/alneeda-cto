import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FeatureApprovalDialog from "./FeatureApprovalDialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type FeatureRow = {
  name: string;
  description: string;
  requestedBy: string;
  requestDate: string;
  pii: string;
  securityNotes: string;
  assignedReviewers: string;
  risk: "Low" | "Medium" | "High";
  status: "Pending" | "In Review" | "Approved";
};

function RiskBadge({ risk }: { risk: FeatureRow["risk"] }) {
  const base = "inline-flex items-center px-2 py-1 rounded text-xs font-medium";
  const map: Record<FeatureRow["risk"], string> = {
    Low: "bg-emerald-50 text-emerald-700",
    Medium: "bg-amber-50 text-amber-700",
    High: "bg-rose-50 text-rose-700",
  };
  const cls = map[risk] ?? "bg-gray-100 text-gray-700";
  return <span className={`${base} ${cls}`}>{risk}</span>;
}

function StatusBadge({ status }: { status: FeatureRow["status"] }) {
  const base = "inline-flex items-center px-2 py-1 rounded text-xs font-medium";
  const map: Record<FeatureRow["status"], string> = {
    Pending: "bg-amber-50 text-amber-700",
    "In Review": "bg-sky-50 text-sky-700",
    Approved: "bg-emerald-50 text-emerald-700",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-700";
  return <span className={`${base} ${cls}`}>{status}</span>;
}

export default function SensitiveFeatureApprovalsCard() {
  const initialRows: FeatureRow[] = [
    {
      name: "Social Login Integration",
      description:
        "Allow users to sign in using Google, Apple, and Microsoft accounts",
      requestedBy: "Product Team",
      requestDate: "01-20-2026",
      pii: "email, full_name",
      securityNotes:
        "Requires OAuth 2.0 implementation with proper token handling",
      assignedReviewers: "Security Team, Privacy Team",
      risk: "Medium",
      status: "Pending",
    },
    {
      name: "Advanced Analytics Dashboard",
      description:
        "New dashboard with detailed user behavior analytics and cohort analysis",
      requestedBy: "Analytics Team",
      requestDate: "01-21-2026",
      pii: "ip_address, device_id, email",
      securityNotes: "Must ensure all data is anonymized before visualization",
      assignedReviewers: "Privacy Team, Legal Team",
      risk: "High",
      status: "In Review",
    },
    {
      name: "Two-Factor Authentication",
      description:
        "Add SMS and authenticator app based 2FA for all user accounts",
      requestedBy: "Security Team",
      requestDate: "01-22-2026",
      pii: "phone_number",
      securityNotes: "Improves overall account security posture",
      assignedReviewers: "Engineering, Product Team",
      risk: "Low",
      status: "Approved",
    },
    {
      name: "Customer Data Export",
      description:
        "Enable customers to export all their data in machine-readable format",
      requestedBy: "Legal Team",
      requestDate: "01-20-2026",
      pii: "email, full_name, phone_number, billing_address",
      securityNotes: "Ensure exports respect user privacy settings and consent",
      assignedReviewers: "Engineering, Product Team",
      risk: "Medium",
      status: "Approved",
    },
  ];

  const [rows, setRows] = useState<FeatureRow[]>(initialRows);
  const [open, setOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureRow | null>(
    null,
  );

  function openDialogFor(f: FeatureRow) {
    setSelectedFeature(f);
    setOpen(true);
  }

  function handleConfirm({
    decision,
    comment,
  }: {
    decision: string;
    comment: string;
  }) {
    console.log("Feature review recorded", {
      feature: selectedFeature?.name,
      decision,
      comment,
    });

    setRows((prev) =>
      prev.map((r) =>
        r.name === selectedFeature?.name
          ? { ...r, status: decision === "approve" ? "Approved" : "In Review" }
          : r,
      ),
    );
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Sensitive Feature Approvals</CardTitle>
          <CardDescription>Recent Feature Approvals</CardDescription>
        </div>
        <CardAction>
          <Link to="/product-security-governance/approvals">
            <Button>View All</Button>
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature Name</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>PII Fields Accessed</TableHead>
                <TableHead>Security Notes</TableHead>
                <TableHead>Assigned Reviewers</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((r) => (
                <TableRow
                  key={r.name}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <TableCell className="max-w-[20rem]">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {r.description}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-gray-600">
                    {r.requestedBy}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {r.requestDate}
                  </TableCell>

                  <TableCell className="max-w-[16rem] text-sm text-gray-600 overflow-hidden text-ellipsis">
                    {r.pii}
                  </TableCell>

                  <TableCell className="max-w-[20rem] text-sm text-gray-600 overflow-hidden text-ellipsis">
                    {r.securityNotes}
                  </TableCell>

                  <TableCell className="text-sm text-gray-600">
                    {r.assignedReviewers}
                  </TableCell>

                  <TableCell>
                    <RiskBadge risk={r.risk} />
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>

                  <TableCell className="text-right">
                    {r.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" onClick={() => openDialogFor(r)}>
                          Approve/Reject
                        </Button>
                      </div>
                    ) : (
                      <Link to="/product-security-governance/approvals/1">
                        <Button size="sm">View Details</Button>
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <FeatureApprovalDialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o);
            if (!o) setSelectedFeature(null);
          }}
          feature={selectedFeature}
          onConfirm={handleConfirm}
        />
      </CardContent>
    </Card>
  );
}
