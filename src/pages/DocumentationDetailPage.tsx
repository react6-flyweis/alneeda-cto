import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

export default function DocumentationDetailPage() {
  const doc = {
    title: "Documentation Portal v1",
    subtitle:
      "Single place for launch-critical documentation, product specs, and training readiness.",
    owner: "Product",
    updated: "01-29-2026",
    status: "In Review",
    overview:
      "This spec defines the launch-ready documentation experience: a portal for product specs + a tracker for training materials. The goal is fast discoverability, clear ownership, and a single source of truth.",
    requirements: [
      "Portal view with search, status filters, and clear ownership",
      "Spec detail with structured sections, decision log, and risk list",
      "Training tracker with due dates and status",
      "Light-mode only UI, high contrast, keyboard-friendly navigation",
    ],
    decisions: [
      "Use simple status taxonomy (Draft / In Review / Approved)",
      "Keep data client-only for now; swap to Cloud tables later",
    ],
    risks: [
      "Without enforcement, ownership can drift",
      "Too much content in one spec can reduce scanability",
      "Launch pressure may create incomplete training materials",
    ],
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex gap-1">
          <Link to="/documentation-knowledge" className="">
            <ChevronLeft className="size-6" />
          </Link>

          <h1 className="xl:text-2xl text-lg text-[#1E1E1E] font-[poppins]">
            {doc.title}
          </h1>
        </div>
        <p className="xl:text-sm text-sm text-muted-foreground mt-1">
          {doc.subtitle}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-md font-semibold mb-2">Overview</CardTitle>
          <CardDescription className="text-sm text-[#374151]">
            {doc.overview}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="text-md font-semibold mb-3">Requirements</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#374151]">
              {doc.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-md font-semibold mb-3">Decisions</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#374151]">
              {doc.decisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-md font-semibold mb-3">Risks</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#374151]">
              {doc.risks.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
