import PageHeader from "@/components/common_components/PageHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { sampleChanges, riskColorMap } from "@/lib/sample-data/changes";

function ChangeDetailPage() {
  const { id } = useParams();
  const change = sampleChanges.find((c) => c.id === id);

  if (!change) {
    return (
      <div>
        <PageHeader
          title="Change not found"
          subtitle="No change matches the requested id."
        />
      </div>
    );
  }

  const exampleProducts = [
    { title: "Card Processing", meta: "PAY-CORE · EU · API" },
    { title: "Card Processing", meta: "PAY-CORE · US · API" },
    { title: "Recurring Billing", meta: "PAY-REC · EU · Dashboard" },
  ];

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div className="flex gap-1">
          <ChevronLeft className="size-6" />
          <div className="">
            <h1 className="xl:text-xl text-lg text-[#1E1E1E] font-[poppins]">
              {change.id} — Change detail
            </h1>
            <div className="text-sm text-[#6B7280]">{change.summary}</div>
          </div>
        </div>
        <Link to={`/change-impact-risk/${change.id}/risk`}>
          <Button>Score Risk</Button>
        </Link>
      </div>

      <div className="mb-4 rounded-md border p-4 bg-slate-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="text-sm">Current Risk:</div>
            <Badge className={`${riskColorMap[change.risk]} rounded-sm`}>
              {change.risk}
            </Badge>
          </div>
          <div />
        </div>

        <div className="rounded-md border bg-white p-3 text-sm text-gray-700">
          Auto-score is 78. If you override, add a mitigation note.
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>What is changing</CardTitle>
          <CardDescription>Short summary and details</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-3">
            {change.summary}. Adjusts failover rules for provider selection
            under degraded latency; introduces new guardrails and monitoring.
          </p>

          <ul className="list-disc ml-5 text-sm text-gray-700">
            <li>
              New routing rule for EU cards when Provider A latency &gt; 450ms
            </li>
            <li>Adds circuit-breaker thresholds and alerting</li>
            <li>Updates retry budget and idempotency handling</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Affected products</CardTitle>
          <CardDescription>Products impacted by this change</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            {exampleProducts.map((p, i) => (
              <div
                key={i}
                className={`p-4 ${i < exampleProducts.length - 1 ? "border-b" : ""} bg-white`}
              >
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-400">{p.meta}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChangeDetailPage;
