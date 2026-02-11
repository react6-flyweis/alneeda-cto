import PageHeader from "@/components/common_components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircleIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductOperationalSignoffPage() {
  const readiness = 67;

  const requirements = [
    {
      title: "Monitoring & Alerting",
      subtitle: "12 alerts configured, 4 dashboards created",
      status: "Completed",
      variant: "default",
    },
    {
      title: "On-call Coverage",
      subtitle: "3 engineers, 30-day schedule confirmed",
      status: "Completed",
      variant: "default",
    },
    {
      title: "Runbook Documentation",
      subtitle: "8 of 10 runbooks verified, 2 pending review",
      status: "Needs Attention",
      variant: "secondary",
    },
    {
      title: "Incident Response Plan",
      subtitle: "Escalation paths and communication plan ready",
      status: "Completed",
      variant: "default",
    },
    {
      title: "Capacity Planning",
      subtitle: "Load testing scheduled for next week",
      status: "Needs Attention",
      variant: "secondary",
    },
    {
      title: "Security Review",
      subtitle: "Security team sign-off obtained",
      status: "Completed",
      variant: "default",
    },
  ];

  return (
    <div className="space-y-8 pb-28">
      <PageHeader
        title="Operational Sign-off Summary"
        subtitle="Review all requirements and provide final sign-off"
        actions={
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
              <CheckCircleIcon className="size-5 text-green-500" />
              Dashboard
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
              <CheckCircleIcon className="size-5 text-green-500" />
              On-call & Runbook
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
              <CheckCircleIcon className="size-5 text-green-500" />
              Sign-off
            </div>
          </div>
        }
      />

      <div className="space-y-5">
        <Card className="lg:col-span-1 p-6 rounded-lg">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">
                  Readiness Score
                </div>
                <div className="text-xs text-muted-foreground">
                  Based on 6 criteria
                </div>
              </div>

              <div className="text-3xl font-semibold text-blue-600">
                {readiness}%
              </div>
            </div>

            <div className="mt-4">
              <Progress value={readiness} />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 p-6 rounded-lg">
          <CardContent className="p-0">
            <h3 className="text-lg font-semibold mb-4">Requirements Summary</h3>

            <div className="divide-y border rounded-lg border-slate-100">
              {requirements.map((r) => (
                <div
                  key={r.title}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {r.subtitle}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Badge
                      className={`rounded ${
                        r.variant === "default"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {r.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sign-off Card */}
        <Card className="mt-6 p-6 rounded-lg">
          <CardContent className="p-0">
            <h3 className="text-lg font-semibold mb-2">Sign-off</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please confirm the following to complete the operational readiness
              sign-off.
            </p>

            <div className="divide-y border rounded-lg border-slate-100">
              {[
                "I confirm all monitoring and alerting is properly configured",
                "I confirm on-call schedule and escalation paths are in place",
                "I acknowledge pending runbook reviews and accept associated risks",
                "I take responsibility for operational readiness of this product",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-start gap-3 py-4 border-b last:border-b-0"
                >
                  <Checkbox className="mt-1" defaultChecked />
                  <div className="flex-1">
                    <div className="text-sm">{t}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Signer info */}
            <div className="mt-4">
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-18">
                    <AvatarImage src="/assets/auth/images/user1.jpg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="font-medium">John Smith</div>
                    <div className="text-sm text-muted-foreground">
                      Engineering Manager
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  <div>01-20-2026</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom action bar */}
      <div className="">
        <div className="max-w-7xl mx-auto flex gap-4">
          <Button variant="outline" className="flex-1 bg-white text-black">
            Back
          </Button>
          <Button className="flex-1 bg-[#07182A] text-white">
            Complete Sign-off
          </Button>
        </div>
      </div>
    </div>
  );
}
