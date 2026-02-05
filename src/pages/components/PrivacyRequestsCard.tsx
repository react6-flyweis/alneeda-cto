import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import PrivacyRequestApprovalDialog from "./PrivacyRequestApprovalDialog";

type PrivacyRequest = {
  id: string;
  type: string;
  subject: string;
  requested: string;
  status: "Needs Approval" | "Queued" | "Completed";
  approvals: string;
  expiry: string;
};

const rows: PrivacyRequest[] = [
  {
    id: "1",
    type: "Export",
    subject: "RTuser_8f2",
    requested: "01-20-2026, 15:14",
    status: "Needs Approval",
    approvals: "1/2",
    expiry: "01-19-2027",
  },
  {
    id: "2",
    type: "Delete",
    subject: "user_19b",
    requested: "01-20-2026, 09:14",
    status: "Queued",
    approvals: "0/2",
    expiry: "01-19-2027",
  },
  {
    id: "3",
    type: "Export",
    subject: "user_ee1",
    requested: "01-19-2026, 10:14",
    status: "Completed",
    approvals: "1/1",
    expiry: "01-18-2027",
  },
];

function StatusBadge({ status }: { status: PrivacyRequest["status"] }) {
  if (status === "Needs Approval") {
    return <Badge className="bg-amber-100 text-amber-800">{status}</Badge>;
  }

  if (status === "Queued") {
    return <Badge className="bg-sky-100 text-sky-700">{status}</Badge>;
  }

  return <Badge className="bg-emerald-100 text-emerald-700">{status}</Badge>;
}

export default function PrivacyRequestsCard() {
  const [requests, setRequests] = useState<PrivacyRequest[]>(rows);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<PrivacyRequest | null>(
    null,
  );

  const handleOpen = (r: PrivacyRequest) => {
    setSelectedRequest(r);
    setOpen(true);
  };

  const handleSubmit = (action: "approve" | "reject") => {
    if (!selectedRequest) return;

    setRequests((prev) =>
      prev.map((p) => {
        if (p.id !== selectedRequest.id) return p;

        if (action === "approve") {
          const [numStr, denomStr] = p.approvals.split("/");
          const num = parseInt(numStr, 10);
          const denom = parseInt(denomStr, 10);
          const newNum = Math.min(num + 1, denom);
          const newStatus = newNum === denom ? "Completed" : "Queued";
          return { ...p, approvals: `${newNum}/${denom}`, status: newStatus };
        }

        // simple behavior for reject: mark as queued
        return { ...p, status: "Queued" };
      }),
    );

    setOpen(false);
    setSelectedRequest(null);
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Privacy Request</CardTitle>
          <CardDescription>
            User data export/deletion with approval gates and consent logging.
          </CardDescription>
        </div>
        <CardAction>
          <Button>View All</Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approvals</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {requests.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.type}</TableCell>
                <TableCell className="text-muted-foreground">
                  {r.subject}
                </TableCell>
                <TableCell>{r.requested}</TableCell>
                <TableCell>
                  <StatusBadge status={r.status} />
                </TableCell>
                <TableCell>{r.approvals}</TableCell>
                <TableCell>{r.expiry}</TableCell>
                <TableCell>
                  <Button
                    className="bg-slate-900 text-white hover:bg-slate-800"
                    onClick={() => handleOpen(r)}
                  >
                    Approve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <PrivacyRequestApprovalDialog
          open={open}
          onOpenChange={(o) => setOpen(o)}
          request={selectedRequest}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
}
