import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PostReleaseMonitoringDialog() {
  const items = [
    {
      id: "crash-rate",
      title: "Crash rate",
      source: "metrics/alerting",
      value: "2.1%",
      change: "+0.8%",
      severity: "danger",
      icon: AlertTriangle,
    },
    {
      id: "p95-latency",
      title: "P95 latency",
      source: "metrics/alerting",
      value: "480ms",
      change: "+7%",
      severity: "warning",
      icon: AlertTriangle,
    },
    {
      id: "incident",
      title: "Incident",
      source: "incident",
      value: "INC-331 declared",
      change: "Sev-1",
      severity: "danger",
      icon: AlertCircle,
    },
  ] as const;

  const colorMap = {
    danger: {
      border: "border-red-200",
      bg: "bg-red-50",
      text: "text-red-600",
    },
    warning: {
      border: "border-amber-200",
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
  } as const;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Post-release Monitoring</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Post-release Monitoring
          </DialogTitle>
          <DialogDescription>
            Metrics/alerting + incident integration (demo signals).
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {items.map((item) => {
            const Icon = item.icon;
            const rootClasses = cn(
              "rounded-lg p-4 flex items-center justify-between border-2",
              colorMap[item.severity].border,
              colorMap[item.severity].bg,
            );

            const textClass = colorMap[item.severity].text;

            return (
              <div key={item.id} className={rootClasses}>
                <div className="flex items-center gap-4">
                  <div className={textClass}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="">{item.title}</div>
                    <div className={cn("text-sm", textClass)}>
                      Source: {item.source}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="">{item.value}</div>
                  <div className="text-sm text-gray-600">{item.change}</div>
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="w-full border-t pt-4 grid">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
