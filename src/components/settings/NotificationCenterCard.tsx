import { Bell } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export type NotificationKey = "email" | "sms" | "push" | "slack" | "discord";

interface Notifications {
  email: boolean;
  sms: boolean;
  push: boolean;
  slack: boolean;
  discord: boolean;
}

interface Props {
  notifications: Notifications;
  onToggle: (key: NotificationKey) => void;
}

export default function NotificationCenterCard({
  notifications,
  onToggle,
}: Props) {
  return (
    <Card className="">
      <CardHeader className="pb-0">
        <div>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Bell className="size-5 text-violet-500" /> Notification Center
          </CardTitle>
          <CardDescription className="mt-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {(
            [
              {
                key: "email" as NotificationKey,
                title: "Email Notifications",
                desc: "Receive email alerts for critical events",
              },
              {
                key: "sms" as NotificationKey,
                title: "SMS Alerts",
                desc: "Get SMS for security & downtime alerts",
              },
              {
                key: "push" as NotificationKey,
                title: "Push Notifications",
                desc: "Browser push notifications",
              },
              {
                key: "slack" as NotificationKey,
                title: "Slack Integration",
                desc: "Post alerts to Slack channels",
              },
              {
                key: "discord" as NotificationKey,
                title: "Discord Webhooks",
                desc: "Send notifications to Discord",
              },
            ] as Array<{ key: NotificationKey; title: string; desc: string }>
          ).map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between bg-sky-50 rounded-xl p-6 shadow-sm"
            >
              <div>
                <div className="font-semibold text-lg">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>

              <Switch
                className="h-8 w-14"
                checked={notifications[item.key]}
                onCheckedChange={() => onToggle(item.key)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
