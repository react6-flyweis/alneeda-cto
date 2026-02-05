import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function MonitoringDriftCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoring + drift</CardTitle>
        <CardDescription>
          Gated data access, audited, with safe-mode fallback recommendations.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">Drift score</div>
            <div className="text-sm font-semibold">0.34</div>
          </div>

          <div className="mb-4">
            <Progress value={90} />
          </div>

          <div className="text-sm text-[#717182] mb-4">
            Gated data access, audited, with safe-mode fallback recommendations.
          </div>

          <div className="text-right">
            <Button
              variant="ghost"
              size="sm"
              className="text-green-500 font-semibold inline-flex items-center gap-2"
            >
              <Clock size={14} /> Watch
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
