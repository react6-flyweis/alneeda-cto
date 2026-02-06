import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatusUpdatesSheet from "@/pages/components/StatusUpdatesSheet";
import PostmortemBuilder from "@/pages/components/PostmortemBuilder";

type Incident = {
  id: string;
  severity: "SEV1" | "SEV2" | "SEV3";
  title: string;
  owner: string;
  elapsed: string;
  description?: string;
};

const severityColorMap: Record<Incident["severity"], string> = {
  SEV1: "bg-red-100 text-red-800",
  SEV2: "bg-yellow-100 text-yellow-800",
  SEV3: "bg-blue-100 text-blue-800",
};

const sampleIncidents: Incident[] = [
  {
    id: "1",
    severity: "SEV1",
    title: "Authentication outage",
    owner: "Sam",
    elapsed: "26m 15s",
    description:
      "Users are unable to authenticate via the primary auth service. Errors are 500s from the auth API and retries are increasing latency.",
  },
];

export default function IncidentDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const incident =
    sampleIncidents.find((i) => i.id === id) ?? sampleIncidents[0];

  const mitigationActions = [
    {
      id: "toggle-flag",
      title: "Toggle feature flag",
      subtitle: "Standard action. • Approved",
    },
    {
      id: "rollback",
      title: "Rollback last deploy",
      subtitle: "Standard action. • No approval",
    },
    {
      id: "throttle",
      title: "Throttle expensive endpoints",
      subtitle: "Standard action. • No approval",
    },
    {
      id: "scale",
      title: "Scale service",
      subtitle: "Standard action. • No approval",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 sm:gap-0 gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Link
            to="/technical-incident-response"
            aria-label="Back to incidents"
          >
            <Button variant="ghost" size="icon">
              <ChevronLeft className="size-6" />
            </Button>
          </Link>

          <h2 className="xl:text-2xl text-xl font-semibold text-[#1E1E1E] font-[poppins]">
            {incident.title}
          </h2>
        </div>
        <StatusUpdatesSheet />
      </div>

      <Card className="mb-4">
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Badge
                className={`rounded ${severityColorMap[incident.severity]} `}
              >
                {incident.severity}
              </Badge>

              <div className="font-semibold text-lg">{incident.title}</div>

              <div className="text-sm">
                <span className="text-muted-foreground">Owners:</span>
                <span className="font-medium ml-1">{incident.owner}</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Elapsed {incident.elapsed}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Mitigation actions</CardTitle>
          <CardDescription>
            Toggle, rollback, throttle, scale — with approvals & audit.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y">
            {mitigationActions.map((action) => (
              <div
                key={action.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {action.subtitle}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="lg">
                    Execute
                  </Button>
                  <Button variant="default" size="lg">
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Postmortem builder */}
      <PostmortemBuilder />
    </div>
  );
}
