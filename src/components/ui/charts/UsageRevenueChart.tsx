import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

export interface UsageRevenuePoint {
  week: string;
  revenue: number;
  usage: number;
}

interface Props {
  data: UsageRevenuePoint[];
  height?: number;
  className?: string;
}

export default function UsageRevenueChart({
  data,
  height = 260,
  className,
}: Props) {
  return (
    <div className={cn("w-full", className)}>
      {/* Keep the visual wrapper consistent with other cards */}
      <div className="w-full h-auto p-2">
        <div className="w-full bg-white border border-muted rounded p-3">
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid stroke="#E6E9EF" strokeDasharray="4 8" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                formatter={(value) => {
                  if (typeof value === "number") return value.toLocaleString();
                  return value ?? "";
                }}
              />
              <Legend verticalAlign="top" align="right" />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#F59E0B"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Small legend row to match previous layout for smaller screens */}
          <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              {data.map((d) => (
                <div key={d.week} className="text-xs text-muted-foreground">
                  {d.week}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-1 rounded bg-emerald-400 inline-block" />
                <span className="text-xs text-muted-foreground">Revenue</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-1 rounded bg-amber-400 inline-block" />
                <span className="text-xs text-muted-foreground">Usage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
