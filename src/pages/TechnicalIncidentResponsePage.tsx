import { Link } from "react-router-dom";
import { ChevronRight, SearchIcon } from "lucide-react";
import PageHeader from "@/components/common_components/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type Incident = {
  id: string;
  severity: "SEV1" | "SEV2" | "SEV3";
  title: string;
  owner: string;
  elapsed: string;
};

const incidents: Incident[] = [
  {
    id: "1",
    severity: "SEV1",
    title: "Authentication outage",
    owner: "Sam",
    elapsed: "26m 15s",
  },
  {
    id: "2",
    severity: "SEV2",
    title: "Payment latency regression",
    owner: "Lee",
    elapsed: "26m 15s",
  },
  {
    id: "3",
    severity: "SEV1",
    title: "Authentication outage",
    owner: "Sam",
    elapsed: "26m 15s",
  },
  {
    id: "4",
    severity: "SEV3",
    title: "CDN cache inconsistency",
    owner: "Mina",
    elapsed: "26m 15s",
  },
  {
    id: "5",
    severity: "SEV1",
    title: "Authentication outage",
    owner: "Sam",
    elapsed: "26m 15s",
  },
  {
    id: "6",
    severity: "SEV2",
    title: "Payment latency regression",
    owner: "Lee",
    elapsed: "26m 15s",
  },
  {
    id: "7",
    severity: "SEV3",
    title: "CDN cache inconsistency",
    owner: "Mina",
    elapsed: "26m 15s",
  },
  {
    id: "8",
    severity: "SEV2",
    title: "Payment latency regression",
    owner: "Lee",
    elapsed: "26m 15s",
  },
  {
    id: "9",
    severity: "SEV3",
    title: "CDN cache inconsistency",
    owner: "Mina",
    elapsed: "26m 15s",
  },
];

const severityColorMap: Record<Incident["severity"], string> = {
  SEV1: "bg-red-100 text-red-800",
  SEV2: "bg-yellow-100 text-yellow-800",
  SEV3: "bg-blue-100 text-blue-800",
};

export default function TechnicalIncidentResponsePage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Technical Incident Response"
        subtitle="End-to-End Incident Lifecycle Management"
      />

      <Card className="overflow-hidden">
        <CardHeader className="flex justify-between items-center">
          <div className="">
            <CardTitle>Active incidents</CardTitle>
            <CardDescription>Sev1/2/3 with owners and timers.</CardDescription>
          </div>
          <InputGroup className="max-w-xs">
            <InputGroupAddon>
              <SearchIcon className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search incidents..." />
          </InputGroup>
        </CardHeader>

        <CardContent className="p-0 my-0">
          {incidents.map((inc) => (
            <Link
              to={`/technical-incident-response/${inc.id}`}
              key={inc.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-accent/50 border-b last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <Badge className={`rounded ${severityColorMap[inc.severity]} `}>
                  {inc.severity}
                </Badge>

                <div className="font-medium">{inc.title}</div>
                <div className="text-sm">
                  <span className="text-muted-foreground"> Owners:</span>
                  <span className="font-medium ml-2">{inc.owner}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div>Elapsed {inc.elapsed}</div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
