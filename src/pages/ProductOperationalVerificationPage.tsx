import PageHeader from "@/components/common_components/PageHeader";
import { CheckCircle2, AlertTriangle, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

function ProductOperationalVerificationPage() {
  const navigate = useNavigate();

  const onCall = [
    {
      name: "Sarah Chen",
      role: "Senior SRE",
      phone: "+1 (555) 123-4567",
      email: "sarah.chen@company.com",
      status: "verified",
      avatar: "/assets/auth/images/user1.jpg",
    },
    {
      name: "Marcus Johnson",
      role: "Platform Engineer",
      phone: "+1 (555) 123-4567",
      email: "marcus.johnson@company.com",
      status: "verified",
      avatar: "",
    },
    {
      name: "Elena Rodriguez",
      role: "DevOps Lead",
      phone: "+1 (555) 123-4567",
      email: "elena.rodriguez@company.com",
      status: "pending",
      avatar: "",
    },
  ];

  const runbooks = [
    {
      title: "Service Degradation Response",
      subtitle: "Incident Response",
      updated: "Updated 3 days ago by Sarah Chen",
      status: "verified",
    },
    {
      title: "Database Failover Procedure",
      subtitle: "Disaster Recovery",
      updated: "Updated 1 week ago by Marcus Johnson",
      status: "verified",
    },
    {
      title: "Scaling Playbook",
      subtitle: "Capacity Management",
      updated: "Updated 2 week ago by Elena Rodriguez",
      status: "outdated",
    },
    {
      title: "Rollback Procedures",
      subtitle: "Deployment",
      updated: "Updated 2 week ago by Marcus Johnson",
      status: "review",
    },
  ];

  const verification = [
    {
      title: "On-call schedule confirmed for next 30 days",
      subtitle: "All shifts have primary and backup coverage",
      status: "complete",
    },
    {
      title: "Contact information verified",
      subtitle: "All phone numbers and emails tested",
      status: "complete",
    },
    {
      title: "Escalation paths documented",
      subtitle: "L1 → L2 → L3 escalation defined",
      status: "complete",
    },
    {
      title: "All critical runbooks reviewed",
      subtitle: "2 runbooks pending review",
      status: "attention",
    },
    {
      title: "Runbook dry-run completed",
      subtitle: "Team walkthrough scheduled",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="On-call & Runbook Verification"
        subtitle="Verify team readiness and documentation before going live"
        actions={
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-500" />
              <span className="text-sm font-medium">Dashboard</span>
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
              <CheckCircle2 className="size-5 text-green-500" />
              On-call & Runbook
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-500">
              <CheckCircle2 className="size-5 text-gray-500" />
              Sign-off
            </div>
          </div>
        }
      />

      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-medium mb-4">On Call Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {onCall.map((p) => (
              <Card key={p.name} className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-18">
                      <AvatarImage src={p.avatar} />

                      <AvatarFallback>{p.name.split(" ")[0][0]}</AvatarFallback>
                    </Avatar>

                    <div className="">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {p.role}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Call: {p.phone} Mail: {p.email}
                      </div>
                    </div>

                    <div className="justify-self-end">
                      <Badge
                        className={cn("rounded", {
                          "bg-green-50 text-green-500": p.status === "verified",
                          "bg-blue-50 text-blue-500": p.status === "pending",
                        })}
                      >
                        {p.status === "verified" ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Runbooks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {runbooks.map((r) => (
              <Card key={r.title} className="p-4">
                <CardContent className="p-0">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="font-medium">{r.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {r.subtitle}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {r.updated}
                      </div>
                    </div>

                    <div className="justify-self-end">
                      <Badge
                        className={cn("rounded", {
                          "bg-green-50 text-green-500": r.status === "verified",
                          "bg-blue-50 text-blue-500": r.status === "review",
                          "bg-yellow-50 text-yellow-500":
                            r.status === "outdated",
                        })}
                      >
                        {r.status === "verified"
                          ? "Verified"
                          : r.status === "outdated"
                            ? "Outdated"
                            : "Review Needed"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="">
          <h3 className="text-lg font-semibold mb-4">Verification</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {verification.map((v) => (
              <Card key={v.title} className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4">
                    <div
                      className={`shrink-0 rounded-md p-2 ${
                        v.status === "complete"
                          ? "bg-green-50 text-green-500"
                          : v.status === "attention"
                            ? "bg-amber-50 text-amber-500"
                            : "bg-blue-50 text-blue-500"
                      }`}
                    >
                      {v.status === "complete" ? (
                        <CheckCircle2 />
                      ) : v.status === "attention" ? (
                        <AlertTriangle />
                      ) : (
                        <Circle />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="font-medium">{v.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {v.subtitle}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 justify-between border-t pt-4 gap-3">
        <Button
          variant="outline"
          onClick={() => navigate("/product-operational-readiness")}
        >
          Back
        </Button>
        <Button
          onClick={() => navigate("/product-operational-readiness/signoff")}
        >
          Continue to Sign-off
        </Button>
      </div>
    </div>
  );
}

export default ProductOperationalVerificationPage;
