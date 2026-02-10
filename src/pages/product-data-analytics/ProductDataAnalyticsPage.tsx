import { useState } from "react";
import PageHeader from "@/components/common_components/PageHeader";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Edit2, Plus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DataQualityCard from "@/components/product-data-analytics/DataQualityCard";
import ReviewSchemaDialog from "@/components/product-data-analytics/ReviewSchemaDialog";
type Kpi = {
  name: string;
  key: string;
  owner: string;
  cadence: string;
  updatedDate: string;
  status: string;
};

const kpis: Kpi[] = [
  {
    name: "Activation Rate",
    key: "kpi_activation_rate",
    owner: "Growth Analytics",
    cadence: "Daily",
    updatedDate: "2026-01-20",
    status: "Active",
  },
  {
    name: "Weekly Active Teams",
    key: "kpi_weekly_active_teams",
    owner: "Product Analytics",
    cadence: "Weekly",
    updatedDate: "2026-01-21",
    status: "Active",
  },
  {
    name: "Pipeline Health Score",
    key: "kpi_pipeline_health",
    owner: "Data Platform",
    cadence: "Daily",
    updatedDate: "2026-01-22",
    status: "Draft",
  },
  {
    name: "Legacy MQL Count",
    key: "kpi_old_mql",
    owner: "RevOps",
    cadence: "Monthly",
    updatedDate: "2026-01-20",
    status: "Deprecated",
  },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-800",
  Deprecated: "bg-indigo-100 text-indigo-800",
  Draft: "bg-amber-100 text-amber-800",
  Pending: "bg-amber-100 text-amber-800",
  default: "bg-slate-100 text-slate-800",
};

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return `${m}-${d}-${y}`;
}

type EventSchema = {
  name: string;
  key: string;
  owner: string;
  version: string;
  submittedDate: string;
  status: string;
  schema?: string;
};

const events: EventSchema[] = [
  {
    name: "checkout_started",
    key: "evt_checkout_started_v3",
    owner: "Payments Team",
    version: "v3",
    submittedDate: "2026-01-20",
    status: "Pending",
    schema: `{
  "type": "object",
  "required": ["event_id", "occurred_at", "user_id", "cart_id"],
  "properties": {
    "event_id": { "type": "string" },
    "occurred_at": { "type": "string", "format": "date-time" },
    "user_id": { "type": "string" },
    "cart_id": { "type": "string" },
    "payment_method": { "type": "string", "enum": ["card", "bank", "wallet"] },
    "discounts": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["code", "amount"],
        "properties": {
          "code": { "type": "string" },
          "amount": { "type": "number" }
        }
      }
    }
  }
}`,
  },
  {
    name: "dashboard_viewed",
    key: "evt_dashboard_viewed_v2",
    owner: "Core UX",
    version: "v2",
    submittedDate: "2026-01-21",
    status: "Pending",
    schema: `{
  "type": "object",
  "properties": {
    "dashboard_id": { "type": "string" },
    "viewed_at": { "type": "string", "format": "date-time" }
  }
}`,
  },
  {
    name: "checkout_started",
    key: "evt_checkout_started_v3",
    owner: "Payments Team",
    version: "v3",
    submittedDate: "2026-01-22",
    status: "Pending",
    schema: `{
  "type": "object",
  "properties": { "example": { "type": "string" } }
}`,
  },
  {
    name: "dashboard_viewed",
    key: "evt_dashboard_viewed_v2",
    owner: "Core UX",
    version: "v2",
    submittedDate: "2026-01-20",
    status: "Pending",
    schema: `{
  "type": "object",
  "properties": { "example": { "type": "string" } }
}`,
  },
];

export default function ProductDataAnalyticsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventSchema | null>(null);

  return (
    <div>
      <PageHeader
        title="Product Data & Analytics Governance"
        subtitle="Controlled Testing with Policy-Based Feature Rollouts"
        actions={null}
      />
      <div>
        <Card className="py-4">
          <CardHeader className="flex flex-col">
            <div className="w-full flex items-center justify-between">
              <CardTitle className="text-lg">KPI Registry</CardTitle>

              <div>
                <Link
                  to="/product-data-analytics/kpi/create"
                  className="inline-block"
                >
                  <Button
                    size="sm"
                    variant="default"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add KPI
                  </Button>
                </Link>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-2">
              Control KPI definitions: ownership, cadence, formulas, and
              lifecycle status.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b border-border">
                    <th className="py-3 px-6 w-3/12 font-medium">KPI</th>
                    <th className="py-3 px-6 w-2/12 font-medium">Owner</th>
                    <th className="py-3 px-6 w-2/12 font-medium">Cadence</th>
                    <th className="py-3 px-6 w-2/12 font-medium">
                      Updated Date
                    </th>
                    <th className="py-3 px-6 w-1/12 font-medium">Status</th>
                    <th className="py-3 px-6 text-right w-1/12 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {kpis.map((k, idx) => (
                    <tr key={`${k.key}-${idx}`}>
                      <td className="py-6 px-6">
                        <div className="font-medium">{k.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {k.key}
                        </div>
                      </td>

                      <td className="py-6 px-6 text-sm text-muted-foreground">
                        {k.owner}
                      </td>

                      <td className="py-6 px-6">{k.cadence}</td>

                      <td className="py-6 px-6 text-sm text-muted-foreground">
                        {formatDate(k.updatedDate)}
                      </td>

                      <td className="py-6 px-6">
                        <Badge
                          className={`rounded-md px-2 py-1 text-sm font-medium ${STATUS_STYLES[k.status] ?? STATUS_STYLES.default}`}
                        >
                          {k.status}
                        </Badge>
                      </td>

                      <td className="py-6 px-6 text-right">
                        <Link to={`/product-data-analytics/kpi/${k.key}/edit`}>
                          <Button variant="ghost" className="p-2">
                            <Edit2 />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="py-4">
            <CardHeader className="flex flex-col">
              <div className="w-full flex items-center justify-between">
                <CardTitle className="text-lg">Event Schema Approval</CardTitle>
              </div>

              <p className="text-sm text-muted-foreground mt-2">
                Control registration of event schemas: ownership, versions, and
                approval status.
              </p>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground border-b border-border">
                      <th className="py-3 px-6 w-3/12 font-medium">Event</th>
                      <th className="py-3 px-6 w-2/12 font-medium">Owner</th>
                      <th className="py-3 px-6 w-1/12 font-medium">Version</th>
                      <th className="py-3 px-6 w-2/12 font-medium">
                        Submitted
                      </th>
                      <th className="py-3 px-6 w-1/12 font-medium">Status</th>
                      <th className="py-3 px-6 text-right w-1/12 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {events.map((e, idx) => (
                      <tr key={`${e.key}-${idx}`}>
                        <td className="py-6 px-6">
                          <div className="font-medium">{e.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {e.key}
                          </div>
                        </td>

                        <td className="py-6 px-6 text-sm text-muted-foreground">
                          {e.owner}
                        </td>

                        <td className="py-6 px-6">{e.version}</td>

                        <td className="py-6 px-6 text-sm text-muted-foreground">
                          {formatDate(e.submittedDate)}
                        </td>

                        <td className="py-6 px-6">
                          <Badge
                            className={`rounded-md px-2 py-1 text-sm font-medium ${STATUS_STYLES[e.status] ?? STATUS_STYLES.default}`}
                          >
                            {e.status}
                          </Badge>
                        </td>

                        <td className="py-6 px-6 text-right">
                          <Button
                            variant="ghost"
                            className="p-2"
                            onClick={() => {
                              setSelectedEvent(e);
                              setDialogOpen(true);
                            }}
                          >
                            <Eye className="h-5 w-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <DataQualityCard />
        </div>

        <ReviewSchemaDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          event={selectedEvent ?? undefined}
          onSubmit={(action) => {
            console.log("Schema action:", action, selectedEvent);
            // TODO: integrate approval API here
          }}
        />
      </div>
    </div>
  );
}
