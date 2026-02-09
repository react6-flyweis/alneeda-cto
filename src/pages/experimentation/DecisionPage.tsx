import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

export default function DecisionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState<string>("scale");
  const [rationale, setRationale] = useState<string>("");

  function handleSubmit() {
    // TODO: wire up API call to record decision
    console.log("record decision", { id, decision, rationale });
    // Navigate back to the experiment list / performance page
    navigate("/experimentation-governance");
  }

  return (
    <div className="w-full">
      <div className=" relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-1">
            <Link
              to="/experimentation-governance"
              aria-label="Back to experiments"
            >
              <Button variant="ghost" size="icon">
                <ChevronLeft className="size-6" />
              </Button>
            </Link>

            <div>
              <h1 className="text-xl font-medium">Scale / Kill Decision</h1>
              <p className="text-sm text-gray-500 mt-1">
                Formalize the go/no-go with a written rationale.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl border border-[#0000000F] p-6 relative">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Simplify navigation labels
              </h2>
              <p className="text-sm text-gray-500">
                Primary KPI: Conversion rate
              </p>
            </div>

            <div className="ml-4">
              <Badge className="rounded px-3 py-1 text-xs bg-blue-50 text-blue-700">
                Running
              </Badge>
            </div>
          </div>

          <div className="mt-6">
            <RadioGroup
              value={decision}
              onValueChange={(v) => setDecision(v)}
              className="flex flex-col gap-4"
            >
              <div className="flex items-start gap-4 p-3 border-b border-[#0000000A]">
                <RadioGroupItem value="scale" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Scale</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Roll out broadly and monitor guardrails
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 border-b border-[#0000000A]">
                <RadioGroupItem value="hold" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Hold</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Collect more data or fix instrumentation
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3">
                <RadioGroupItem value="kill" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Kill</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Stop exposure and revert / iterate
                  </div>
                </div>
              </div>
            </RadioGroup>

            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">Rationale</p>
              <Textarea
                className="h-28"
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <Button
                className="w-full bg-[#0F172A] text-white px-4 py-2 rounded-[10px] shadow-sm"
                onClick={handleSubmit}
              >
                Record Decision
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
