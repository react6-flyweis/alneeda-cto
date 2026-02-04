import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function KillSwitchesCard() {
  const items = [
    {
      name: "Partner Order API",
      status: "down",
      details: "Third-party ordering integration",
      roles: "CTO + CEO",
      lastIncident: "2 hours ago by SRE Team",
    },
    {
      name: "Stripe Payments",
      status: "up",
      details: "Payment processing",
      roles: "CTO",
      lastIncident: "45 days ago by Release Manager",
    },
    {
      name: "Twilio SMS",
      status: "up",
      details: "SMS notifications",
      lastIncident: "2 hours ago by SRE Team",
    },
    {
      name: "SendGrid Email",
      status: "up",
      details: "Email delivery",
      lastIncident: "2 hours ago by SRE Team",
    },
    {
      name: "Firebase FCM",
      status: "up",
      details: "Push notifications",
      lastIncident: "30 days ago by Mobile Team",
    },
  ];

  const activeKills = items.filter((it) => it.status === "down").length;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Kill Switches</CardTitle>
            <CardDescription className="mt-1">
              <span className="text-red-600 font-medium">
                {activeKills} Active Kill{activeKills !== 1 ? "s" : ""}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col divide-y divide-gray-100">
          {items.map((it) => (
            <div key={it.name} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-slate-800">
                    {it.name}
                  </div>

                  <Badge
                    variant="destructive"
                    className={cn("rounded", {
                      "bg-red-100 text-red-700 hover:bg-red-200":
                        it.status === "down",
                      "bg-emerald-100 text-emerald-700 hover:bg-emerald-200":
                        it.status !== "down",
                    })}
                  >
                    {it.status === "down" ? "Killed" : "Active"}
                  </Badge>
                </div>

                <div className="flex items-center gap-4">
                  {it.status === "down" && (
                    <div className="text-xs text-green-600 font-medium cursor-pointer">
                      Request Enable
                    </div>
                  )}

                  <Switch
                    className="data-[state=checked]:bg-blue-500"
                    defaultChecked={it.status !== "down"}
                    disabled={it.status === "down"}
                    aria-label={`Toggle ${it.name}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400 font-light">
                  {it.details}
                  {it.roles && (
                    <span className="ml-2 font-medium text-slate-700">
                      | {it.roles}
                    </span>
                  )}
                </div>

                <div className="text-xs text-gray-400 font-light">
                  Last: {it.lastIncident ?? "—"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
