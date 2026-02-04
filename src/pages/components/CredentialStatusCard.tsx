import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw } from "lucide-react";

interface CredentialItem {
  name: string;
  status: "Healthy" | "Expiring Soon" | "Auth Failures" | "Expired";
  age: string;
  rotation: string;
  lastUsed: string;
  progress: number;
  failures?: number;
  progressColor?: string; // class name for color
}

const credentials: CredentialItem[] = [
  {
    name: "Stripe API Key",
    status: "Healthy",
    age: "45 days",
    rotation: "45 days",
    lastUsed: "2 min ago",
    progress: 50,
    progressColor: "bg-green-500",
  },
  {
    name: "Twilio Auth Token",
    status: "Expiring Soon",
    age: "82 days",
    rotation: "8 days",
    lastUsed: "5 min ago",
    progress: 90,
    progressColor: "bg-red-500",
  },
  {
    name: "SendGrid API Key",
    status: "Auth Failures",
    age: "30 days",
    rotation: "60 days",
    lastUsed: "1 hour ago",
    progress: 33,
    failures: 3,
    progressColor: "bg-green-500",
  },
  {
    name: "Partner OAuth Token",
    status: "Expired",
    age: "0 days",
    rotation: "60 days",
    lastUsed: "2 hours ago",
    progress: 0,
    failures: 10,
    progressColor: "bg-gray-200",
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Healthy":
      return "bg-green-100 text-green-700 hover:bg-green-100";
    case "Expiring Soon":
      return "bg-orange-100 text-orange-700 hover:bg-orange-100";
    case "Auth Failures":
      return "bg-orange-100 text-orange-700 hover:bg-orange-100";
    case "Expired":
      return "bg-red-100 text-red-700 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function CredentialStatusCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Credential Status</CardTitle>
        <CardDescription>
          Current State of All System Credentials
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {credentials.map((cred, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                {cred.name}
              </span>
              <Badge
                variant="outline"
                className={`border-0 font-normal ${getStatusBadgeVariant(
                  cred.status,
                )}`}
              >
                {cred.status}
              </Badge>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Age: {cred.age}</span>
              <span>Rotation: {cred.rotation}</span>
            </div>

            <div className="h-2 w-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full ${cred.progressColor}`}
                style={{ width: `${cred.progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Last used: {cred.lastUsed}</span>
              {cred.failures ? (
                <span className="text-red-600 font-medium">
                  {cred.failures} failures
                </span>
              ) : null}
            </div>

            {(cred.status === "Expiring Soon" || cred.status === "Expired") && (
              <div className="flex justify-center pt-1">
                <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
                  <RefreshCcw className="h-4 w-4" />
                  Request Rotation
                </button>
              </div>
            )}
            {/* Add separator if not last */}
            {idx < credentials.length - 1 && (
              <div className="border-t border-gray-100 pt-2 mt-4" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
