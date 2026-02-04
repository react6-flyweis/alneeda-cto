import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Play, Trash2 } from "lucide-react";

interface QueueItem {
  source: string;
  event: string;
  timeInfo: string;
  attempts: string;
  status: string;
  statusColor?: string; // variant or class
  details?: string; // For Dead Letter description
}

const replayItems: QueueItem[] = [
  {
    source: "Stripe",
    event: "payment.succeeded",
    timeInfo: "5 min ago",
    attempts: "3 attempts",
    status: "Timeout",
    statusColor: "bg-red-100 text-red-700",
  },
  {
    source: "Partner API",
    event: "order.created",
    timeInfo: "5 min ago",
    attempts: "3 attempts",
    status: "Connection Refused",
    statusColor: "bg-red-100 text-red-700",
  },
  {
    source: "Twilio",
    event: "message.delivered",
    timeInfo: "5 min ago",
    attempts: "3 attempts",
    status: "Rate limited",
    statusColor: "bg-red-100 text-red-700",
  },
];

const deadLetterItems: QueueItem[] = [
  {
    source: "Partner API",
    event: "order.updated",
    timeInfo: "2 hours ago",
    attempts: "10 attempts",
    status: "Max Retries Exceeded",
    statusColor: "bg-red-100 text-red-700",
    details: "Integration down",
  },
  {
    source: "SendGrid",
    event: "email.bounced",
    timeInfo: "2 hours ago",
    attempts: "10 attempts",
    status: "Invalid payload",
    statusColor: "bg-red-100 text-red-700",
    details: "Schema mismatch",
  },
];

const QueueRow: React.FC<{ item: QueueItem; type: "replay" | "dead" }> = ({
  item,
  type,
}) => (
  <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 bg-gray-50">
          {item.source}
        </span>
        <span className="font-medium text-sm text-slate-800">{item.event}</span>
      </div>
      <div className="text-xs text-gray-500">
        {item.timeInfo} • {item.attempts}
      </div>
      {item.details && (
        <div className="text-sm text-gray-500 mt-1">{item.details}</div>
      )}
    </div>
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-3">
        <button className="">
          <Eye className="h-4 w-4" />
        </button>
        {type === "replay" && (
          <button className="">
            <Play className="h-4 w-4" />
          </button>
        )}
        <button className="">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <Badge
        variant="outline"
        className={`border-0 font-normal ${item.statusColor} whitespace-nowrap`}
      >
        {item.status}
      </Badge>
    </div>
  </div>
);

const WebhookQueuesCard: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Webhook Queues</CardTitle>
        <CardDescription className="text-red-500 font-medium">
          3 Pending, 2 Dead
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-2">
              Replay Queue
            </h3>
            <div className="space-y-1">
              {replayItems.map((item, idx) => (
                <QueueRow key={idx} item={item} type="replay" />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-2">
              Dead Letter
            </h3>
            <div className="space-y-1">
              {deadLetterItems.map((item, idx) => (
                <QueueRow key={idx} item={item} type="dead" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookQueuesCard;
