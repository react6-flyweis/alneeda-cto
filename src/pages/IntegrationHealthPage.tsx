import { ChevronLeft } from "lucide-react";
import IntegrationHealthTable, {
  type Integration,
} from "./components/IntegrationHealthTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const data: Integration[] = [
  {
    name: "Stripe Payments",
    category: "Payments",
    status: "healthy",
    latency: "45ms",
    errorRate: "0.02%",
    uptime: "99.99%",
    lastIncident: "32 days ago",
  },
  {
    name: "Twilio SMS",
    category: "Communications",
    status: "healthy",
    latency: "120ms",
    errorRate: "0.15%",
    uptime: "99.95%",
    lastIncident: "7 days ago",
  },
  {
    name: "SendGrid Email",
    category: "Communications",
    status: "degraded",
    latency: "890ms",
    errorRate: "2.3%",
    uptime: "98.5%",
    lastIncident: "2 hours ago",
  },
  {
    name: "Google Maps",
    category: "Location",
    status: "healthy",
    latency: "78ms",
    errorRate: "0.08%",
    uptime: "99.98%",
    lastIncident: "45 days ago",
  },
  {
    name: "AWS S3",
    category: "Storage",
    status: "healthy",
    latency: "35ms",
    errorRate: "0.01%",
    uptime: "99.999%",
    lastIncident: "90 days ago",
  },
  {
    name: "Firebase FCM",
    category: "Push Notifications",
    status: "healthy",
    latency: "95ms",
    errorRate: "0.5%",
    uptime: "99.9%",
    lastIncident: "14 days ago",
  },
  {
    name: "Elasticsearch",
    category: "Search",
    status: "degraded",
    latency: "450ms",
    errorRate: "1.8%",
    uptime: "99.2%",
    lastIncident: "4 hours ago",
  },
  {
    name: "Partner Order API",
    category: "Orders",
    status: "down",
    latency: "--",
    errorRate: "100%",
    uptime: "85.5%",
    lastIncident: "Active Incident",
  },
];

export default function IntegrationHealthPage() {
  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        {/* back button */}
        <Link to="/api-integrations">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="size-6" />
          </Button>
        </Link>
        <span className="text-xl font-semibold">Integration Health</span>
      </div>

      <IntegrationHealthTable data={data} showSearch />
    </div>
  );
}
