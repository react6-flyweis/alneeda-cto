import PageHeader from "@/components/common_components/PageHeader";
import {
  CheckCircle2,
  AlertTriangle,
  Circle,
  FileTextIcon,
  CheckCircleIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import { useNavigate } from "react-router-dom";

function ProductOperationalReadinessPage() {
  const navigate = useNavigate();
  const stats = [
    {
      title: "Requirements Complete",
      value: "3/6",
      subtitle: "Items verified",
      icon: <CheckCircle2 className="text-green-500" />,
    },
    {
      title: "On-call Engineers",
      value: "3",
      subtitle: "Primary + 2 backups",
      icon: <Circle className="text-purple-500" />,
    },
    {
      title: "Runbooks Ready",
      value: "8/10",
      subtitle: "2 need review",
      icon: <FileTextIcon />,
    },
    {
      title: "Open Issues",
      value: "2",
      subtitle: "Blocking launch",
      icon: <AlertTriangle className="text-red-500" />,
    },
  ];

  const checklist = [
    {
      title: "Monitoring & Alerting",
      subtitle: "All critical metrics have alerts configured",
      status: "complete",
    },
    {
      title: "Incident Response Plan",
      subtitle: "Documented escalation procedures",
      status: "complete",
    },
    {
      title: "On-call Schedule",
      subtitle: "Primary and backup on-call assigned",
      status: "complete",
    },
    {
      title: "Runbook Documentation",
      subtitle: "2 runbooks require review",
      status: "attention",
    },
    {
      title: "Capacity Planning",
      subtitle: "Load testing pending",
      status: "pending",
    },
    {
      title: "Security Review",
      subtitle: "Pending final security sign-off",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Product Operational Readiness"
        subtitle="Track and verify all operational requirements before launch"
        actions={
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <CheckCircleIcon className="size-5 text-green-500" />
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-500">
              <CheckCircleIcon className="size-5 text-gray-500" />
              On-call & Runbook
            </div>
            <div className="inline-flex items-center gap-2   text-sm font-medium text-gray-500">
              <CheckCircleIcon className="size-5 text-gray-500" />
              Sign-off
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            change={""}
            statusText={s.subtitle}
            icon={s.icon}
            iconBg="bg-gray-50"
          />
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Readiness Checklist</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {checklist.map((c) => (
            <Card key={c.title} className="p-3">
              <CardContent className="p-0">
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    {c.status === "complete" && (
                      <CheckCircle2 size={26} className="text-green-500" />
                    )}
                    {c.status === "attention" && (
                      <AlertTriangle size={26} className="text-amber-500" />
                    )}
                    {c.status === "pending" && (
                      <Circle size={26} className="text-blue-500" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="font-medium">{c.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {c.subtitle}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end border-t pt-4">
        <Button
          onClick={() =>
            navigate("/product-operational-readiness/verification")
          }
        >
          Continue to Verification
        </Button>
      </div>
    </div>
  );
}

export default ProductOperationalReadinessPage;
