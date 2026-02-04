import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const items = [
  {
    name: "Stripe Payments",
    usage: "2,340/10,000 per minute",
    percent: 23,
    level: "normal",
  },
  {
    name: "Twilio SMS",
    usage: "850/1,000 per minute",
    percent: 85,
    level: "warning",
  },
  {
    name: "SendGrid Email",
    usage: "9,200/10,000 per minute",
    percent: 92,
    level: "critical",
  },
  {
    name: "Google Maps",
    usage: "2,340/10,000 per minute",
    percent: 23,
    level: "normal",
  },
  {
    name: "Firebase FCM",
    usage: "750/1,000 per minute",
    percent: 75,
    level: "warning",
  },
];

const approachingCount = items.filter((it) => it.level === "warning").length;

export default function RateLimitsCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">
              Rate Limits & Quotas
            </CardTitle>
            <CardDescription className="mt-1">
              <span className="text-amber-600 font-medium">
                {approachingCount} approaching limits
              </span>
            </CardDescription>
          </div>
          <CardAction />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-normal text-slate-700">
                  {it.name}
                </div>
                <div className="text-xs text-muted-foreground font-normal">
                  {it.usage}
                </div>
              </div>

              <div className="flex items-center justify-between gap-5">
                <Badge
                  className={cn("rounded", {
                    "bg-red-100 text-red-600": it.level === "critical",
                    "bg-amber-100 text-amber-500": it.level === "warning",
                    "bg-teal-100 text-teal-700": it.level === "normal",
                  })}
                >
                  Normal
                </Badge>
                <div className="ml-4 text-sm text-blue-600 font-semibold">
                  {it.percent}%
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Progress
                  value={it.percent}
                  className="h-2 rounded-none flex-1"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
