import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const MOCK_VERSIONS = [
  {
    version: "2.4.0v-102",
    compliance: "At risk",
    lastUpdated: "01-15-2025",
    status: "Draft",
    risk: "High",
    notes:
      "Introduce subscription plan labels in-product and update enterprise contract copy for renewal alignment.",
    readinessPercent: 70,
    checksPassed: "7/10",
    linkedFeatures: [
      { title: "Plan Labels", owner: "Product Ops", id: "feat-31" },
      { title: "Contract Copy Sync", owner: "Legal", id: "feat-12" },
    ],
  },
  // Additional mock entries can go here
];

export default function VersionDetailsPage() {
  const { version } = useParams();

  const v =
    MOCK_VERSIONS.find((m) => m.version === version) || MOCK_VERSIONS[0];

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Link to="/product-versioning" className="">
            <ChevronLeft className="size-6" />
          </Link>

          <h1 className="xl:text-2xl text-lg text-[#1E1E1E] font-[poppins]">
            Version {v.version.split("v-")[0]}
          </h1>
        </div>
        <p className="xl:text-sm text-sm text-muted-foreground mt-1">
          Version detail view: linked features, compliance posture, and release
          readiness.
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Business Release Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center flex-wrap gap-3">
                <Badge className="rounded bg-amber-100 text-amber-800">
                  Draft
                </Badge>
                <Badge className="rounded bg-slate-100 text-slate-800">
                  Medium
                </Badge>
                <div className="text-sm text-muted-foreground ml-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Updated on {v.lastUpdated}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white border border-muted rounded text-sm">
              {v.notes}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Linked Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {v.linkedFeatures.map((f) => (
                <div key={f.id} className="relative py-4">
                  <div>
                    <div className="font-medium">{f.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Owner: {f.owner}
                    </div>
                  </div>
                  <div className="absolute right-4 top-4 text-sm text-muted-foreground">
                    {f.id}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance &amp; Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Compliance status
                </div>
                <Badge className="rounded-full px-2 py-1 text-xs bg-blue-100 text-blue-800">
                  {v.compliance}
                </Badge>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Release readiness
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {v.readinessPercent}%
                  </div>
                </div>
                <div className="mt-2">
                  <Progress value={v.readinessPercent} />
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {v.checksPassed} checks passed
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
