import PageHeader from "../components/common_components/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/Button";
import { Link } from "react-router-dom";

const docs = [
  {
    slug: "documentation-portal-v1",
    title: "Documentation Portal v1",
    subtitle:
      "Single place for launch-critical documentation, product specs, and training readiness.",
    owner: "Product",
    updated: "01-29-2026",
    status: "In Review",
  },
  {
    slug: "release-readiness-checklist",
    title: "Release Readiness Checklist",
    subtitle:
      "A pragmatic checklist for docs, support training, and go-live milestones.",
    owner: "PMO",
    updated: "01-27-2026",
    status: "Approved",
  },
  {
    slug: "api-authentication-key-rotation",
    title: "API Authentication & Key Rotation",
    subtitle: "Authentication model, key lifecycle, and operational playbooks.",
    owner: "Security",
    updated: "01-27-2026",
    status: "Draft",
  },
];

function DocumentationPage() {
  const statusBadgeClass: Record<string, string> = {
    "In Review": "bg-blue-50 text-blue-700",
    Approved: "bg-emerald-100 text-emerald-700",
    Draft: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="w-full">
      <PageHeader
        title="Documentation Portal"
        subtitle="Docs required for launch—track product specs, ownership, and readiness in one place."
        actions={
          <Link to="/training-tracker">
            <Button className="bg-[#0f1724] text-white rounded-lg px-4 py-2">
              Training Tracker
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {docs.map((d) => (
          <Link to={`/documentation-knowledge/${d.slug}`} key={d.slug} className="no-underline">
            <Card className="p-4 cursor-pointer">
              <CardHeader className="flex items-start justify-between p-0 gap-3">
                <div>
                  <CardTitle className="text-lg font-semibold">{d.title}</CardTitle>
                  <p className="text-sm text-[#6B7280] mt-1">{d.subtitle}</p>
                </div>

                <div className="shrink-0">
                  <Badge className={`${statusBadgeClass[d.status]} rounded`}>{d.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-0 mt-4 flex items-center justify-between text-sm text-[#6B7280]">
                <div>
                  Owner: <span className="text-[#111827]">{d.owner}</span>
                </div>
                <div>Updated {d.updated}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DocumentationPage;
