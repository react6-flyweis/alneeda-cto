import { useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import { sampleChanges, riskColorMap } from "@/lib/sample-data/changes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

function getRiskLabel(score: number) {
  if (score >= 90) return "Critical";
  if (score >= 70) return "High";
  if (score >= 40) return "Medium";
  return "Low";
}

function ChangeRiskPage() {
  const { id } = useParams();
  const change = sampleChanges.find((c) => c.id === id);

  const initialAutoScore = 78;
  const [overrideScore, setOverrideScore] = useState<number>(initialAutoScore);
  const [decision, setDecision] = useState<"go" | "no-go">("go");

  const { register, handleSubmit } = useForm<{ notes: string }>();

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

  function onSubmit(values: { notes: string }) {
    const final = {
      changeId: change!.id,
      decision,
      notes: values.notes,
      overrideScore,
    };
    // For now, just log the result. Replace with API call later.
    console.log("Risk decision submitted:", final);
    alert("Decision submitted");
  }

  const riskLabel = getRiskLabel(overrideScore);
  const badgeClass = riskColorMap[riskLabel] ?? "bg-gray-100 text-gray-700";

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
        <Link to={`/change-impact-risk/${change.id}`}>
          <Button variant="outline"> Back</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Manual overrides</CardTitle>
          <CardDescription>Override the auto-generated score</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm">Override score</div>
                  <div className="text-sm">{overrideScore}%</div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={overrideScore}
                  onChange={(e) => setOverrideScore(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg accent-blue-500"
                />

                <div className="mt-2">
                  <Badge className={`${badgeClass} rounded-sm`}>
                    {riskLabel}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="rounded-md border bg-white p-3 text-sm text-gray-700">
              Auto-score is {initialAutoScore}. If you override, add a
              mitigation note.
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Decision</CardTitle>
          <CardDescription>
            Choose whether to approve or block this change
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-6">
              <RadioGroup
                value={decision}
                onValueChange={(v) => setDecision(v as "go" | "no-go")}
                className="flex items-center gap-6"
              >
                <label className="inline-flex items-center gap-3 cursor-pointer text-green-600">
                  <RadioGroupItem
                    value="go"
                    className="size-5 border-green-500"
                  />
                  <div className="text-sm font-medium inline-flex items-center gap-2">
                    <span>
                      Go{" "}
                      <span className="text-xs text-gray-400">
                        (Approve to proceed)
                      </span>
                    </span>
                  </div>
                </label>

                <label className="inline-flex items-center gap-3 cursor-pointer text-rose-600">
                  <RadioGroupItem
                    value="no-go"
                    className="size-5 border-rose-600"
                  />
                  <div className="text-sm font-medium inline-flex items-center gap-2">
                    <span>
                      No Go{" "}
                      <span className="text-xs text-gray-400">
                        (Block until mitigated)
                      </span>
                    </span>
                  </div>
                </label>
              </RadioGroup>
            </div>

            <div>
              <div className="text-sm mb-2">Decision Notes</div>
              <Textarea
                {...register("notes")}
                placeholder="Add notes or mitigations"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChangeRiskPage;
