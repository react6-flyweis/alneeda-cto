import React from "react";
import PageHeader from "../components/common_components/PageHeader";
import IntegrationHealthTable, {
  type Integration,
} from "./components/IntegrationHealthTable";

import CredentialStatusCard from "./components/CredentialStatusCard";
import WebhookQueuesCard from "./components/WebhookQueuesCard";
import RateLimitsCard from "./components/RateLimitsCard";
import KillSwitchesCard from "./components/KillSwitchesCard";

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

const SummaryCard: React.FC<{
  title: string;
  value: string;
}> = ({ title, value }) => (
  <div className="flex items-center justify-between p-4 rounded-lg shadow-sm bg-white">
    <div>
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  </div>
);

const ApiIntegrationsPage: React.FC = () => {
  const activeCount = data.filter((d) => d.status === "healthy").length;
  const degradedCount = data.filter((d) => d.status === "degraded").length;
  const downCount = data.filter((d) => d.status === "down").length;

  return (
    <div className="w-full">
      <PageHeader
        title="API & Integrations"
        subtitle="All System Connections in One Place"
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Active" value={`${activeCount}`} />
        <SummaryCard title="Degraded" value={`${degradedCount}`} />
        <SummaryCard title="Down" value={`${downCount}`} />
      </div>

      <IntegrationHealthTable data={data} />

      <div className="grid grid-cols-2 gap-4 mt-6">
        <RateLimitsCard />
        <KillSwitchesCard />
        <CredentialStatusCard />
        <WebhookQueuesCard />
      </div>
    </div>
  );
};

export default ApiIntegrationsPage;
