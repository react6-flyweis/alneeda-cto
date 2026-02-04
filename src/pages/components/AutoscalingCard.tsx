import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

type Props = {
  name: string;
  defaultInstances?: number;
  cpuUsage?: number;
  defaultTargetCpu?: number;
  minInstances?: number;
  maxInstances?: number;
  enabled?: boolean;
};

export default function AutoscalingCard({
  name,
  defaultInstances = 8,
  cpuUsage = 65,
  defaultTargetCpu = 70,
  minInstances = 3,
  maxInstances = 20,
  enabled = true,
}: Props) {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [instances, setInstances] = useState(defaultInstances);
  const [targetCpu, setTargetCpu] = useState(defaultTargetCpu);

  return (
    <Card className="gap-3">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
          </div>

          <div>
            <Switch
              aria-label={`Toggle autoscaling for ${name}`}
              checked={isEnabled}
              onCheckedChange={(v) => setIsEnabled(Boolean(v))}
              className="data-[state=checked]:bg-blue-500"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-[#6B7280]">
          <div>
            <div className="text-xs">Instances</div>
            <div className="text-base font-medium text-(--dark-text-black)">
              {instances} / {maxInstances}
            </div>
          </div>

          <div>
            <div className="text-xs">CPU Usage</div>
            <div className="text-base font-medium text-(--dark-text-black)">
              {cpuUsage}%
            </div>
          </div>

          <div>
            <div className="text-xs">Target CPU</div>
            <div className="text-base font-medium text-(--dark-text-black)">
              {targetCpu}%
            </div>
          </div>
        </div>

        <div className="text-sm text-[#9CA3AF] mb-1">
          Instance Range: {minInstances} - {maxInstances}
        </div>
        <div className="mb-3">
          <Slider
            value={[instances]}
            onValueChange={(v) => setInstances(v[0])}
            min={minInstances}
            max={maxInstances}
            className="mb-3 w-full bg-blue-500"
            aria-label={`${name} instance range`}
          />
        </div>

        <div className="text-sm text-[#9CA3AF] mb-1">
          Target CPU: {targetCpu}%
        </div>
        <div className="mb-3">
          <Slider
            value={[targetCpu]}
            onValueChange={(v) => setTargetCpu(v[0])}
            min={10}
            max={100}
            className="mb-3 w-full bg-blue-500"
            aria-label={`${name} target cpu`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
