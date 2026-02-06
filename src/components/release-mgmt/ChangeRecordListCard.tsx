import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Calendar } from "lucide-react";
import DashboardCardHeader from "@/pages/dashboard/components/DashboardCardHeader";

type ChangeRecord = {
  id: string;
  risk: string;
  status: string;
  title: string;
  ticket?: string;
  adr?: string;
  date: string;
  service: string;
  description?: string;
  approvalProgress?: number;
  approvalRoles?: string[];
};

const records: ChangeRecord[] = [
  {
    id: "CR-1842",
    risk: "High Risk",
    status: "Scheduled",
    title: "Payments API v2 deploy",
    ticket: "Ticket PAY-2911",
    adr: "ADR ADR-77",
    date: "01-24-2026",
    service: "payments",
    description: "Payments API v2 deploy",
    approvalProgress: 67,
    approvalRoles: ["Release Manager", "SRE", "CTO"],
  },
  {
    id: "CR-1843",
    risk: "Medium Risk",
    status: "Approved",
    title: "Feature flag: New onboarding flow",
    ticket: "Ticket PAY-2911",
    adr: "ADR ADR-79",
    date: "01-22-2026",
    service: "web",
  },
  {
    id: "CR-1844",
    risk: "Low Risk",
    status: "Completed",
    title: "Database connection pool tuning",
    ticket: "Ticket SRE-488",
    adr: "No ADR",
    date: "01-22-2026",
    service: "platform",
  },
];

export default function ChangeRecordListCard() {
  const [active, setActive] = useState<string | null>(records[0].id);

  return (
    <Card>
      <CardHeader>
        <DashboardCardHeader
          title="Change Record List"
          subtitle="Linked ADR/tickets and approvals. Select a record to view actions on
            the right."
        />
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {records.map((r) => (
            <div key={r.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className=" font-semibold text-[#111827] uppercase tracking-wider">
                      {r.id}
                    </span>

                    <Badge
                      className={`rounded ${
                        r.risk === "High Risk"
                          ? "bg-red-100 text-red-700"
                          : r.risk === "Medium Risk"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {r.risk}
                    </Badge>

                    <Badge className="rounded bg-blue-100 text-blue-700">
                      {r.status}
                    </Badge>
                  </div>

                  <h3 className="text-sm">{r.title}</h3>

                  <p className="text-xs text-[#717182] mt-1">
                    {r.ticket} {r.adr ? `| ${r.adr}` : ""}
                  </p>
                </div>

                <div className="text-right text-sm text-muted-foreground self-start flex items-center gap-3">
                  <div className="text-xs">
                    Service:
                    <span className="font-medium text-[#111827]">
                      {" "}
                      {r.service}
                    </span>
                  </div>
                  <div className="text-xs">|</div>
                  <div className="flex items-center gap-1 text-xs">
                    <Calendar size={14} />
                    <span>{r.date}</span>
                  </div>

                  <button
                    aria-expanded={active === r.id}
                    onClick={() => setActive(active === r.id ? null : r.id)}
                    className="ml-3 text-gray-400 hover:text-gray-600"
                  >
                    {active === r.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </div>
              </div>

              {active === r.id && (
                <div className="rounded-xl border border-gray-300 p-6 mt-4 bg-white shadow-sm">
                  <div className="text-sm font-medium text-muted-foreground mb-3">
                    Active change
                  </div>

                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="w-full max-w-xl">
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                              Approval routing
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {r.approvalProgress}%
                            </div>
                          </div>

                          <div className="w-full h-3 bg-gray-100 rounded-full mt-2 overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${r.approvalProgress ?? 0}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        {(r.approvalRoles ?? []).map((role) => {
                          const roleColor =
                            role === "Release Manager"
                              ? "bg-green-100 text-green-700"
                              : role === "SRE"
                                ? "bg-green-50 text-green-700"
                                : "bg-yellow-100 text-yellow-800";

                          return (
                            <Badge
                              key={role}
                              className={`rounded ${roleColor}`}
                            >
                              {role}
                            </Badge>
                          );
                        })}
                      </div>

                      <div className="text-sm text-muted-foreground mt-4">
                        Your approval is pending
                      </div>
                    </div>

                    <div className="w-72">
                      <div className="mb-3">
                        <Button
                          variant="outline"
                          className="w-full border-2 border-green-400 text-green-600 rounded-md"
                        >
                          Mark Granted
                        </Button>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-200 text-gray-400 bg-white"
                            disabled
                          >
                            Promote to Prod
                          </Button>

                          <Button className="flex-1 bg-[#0F1724] text-white">
                            Rollback
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-b border-gray-100 mt-4" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
