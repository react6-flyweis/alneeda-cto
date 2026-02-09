import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function ExperimentPerformancePage() {
  const data = [
    { name: "D1", variant: 6.5, baseline: 5.5 },
    { name: "D2", variant: 9, baseline: 6 },
    { name: "D3", variant: 11, baseline: 8 },
    { name: "D4", variant: 12, baseline: 9.5 },
    { name: "D5", variant: 13.5, baseline: 10 },
    { name: "D6", variant: 15, baseline: 11 },
  ];

  return (
    <div className="w-full">
      {/* Top banner with header and action */}
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <Link
              to="/experimentation-governance"
              aria-label="Back to experiments"
            >
              <Button variant="ghost" size="icon">
                <ChevronLeft className="size-6" />
              </Button>
            </Link>

            <div>
              <h1 className="text-2xl font-medium text-[#1E1E1E]">
                Experiment Performance
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Business KPIs only — use this view for executive
                decision-making.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="default">Pause</Button>
          </div>
        </div>

        {/* Experiment summary card */}
        <div className="mt-6 bg-white rounded-xl border border-[#0000000F] p-6 relative">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Simplify navigation labels
              </h2>
              <p className="text-sm text-gray-500">
                Owner: Maya · Segment: New users (web)
              </p>
            </div>

            <div className="ml-4">
              <span className="inline-block text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                Running
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-[#0000001A] p-4">
              <p className="text-xs text-gray-500">
                Primary KPI: Conversion rate
              </p>
              <h3 className="text-2xl font-semibold">+5.58% lift</h3>
              <p className="text-xs text-gray-400">
                Latest variant vs baseline (recommendation: Scale)
              </p>
            </div>

            <div className="bg-white rounded-lg border border-[#0000001A] p-4">
              <p className="text-xs text-gray-500">Traffic allocation</p>
              <h3 className="text-2xl font-semibold">50%</h3>
              <p className="text-xs text-gray-400">Start date: 01-27-2026</p>
            </div>
          </div>

          {/* Chart area inside card */}
          <div className="mt-6 bg-white rounded-lg border border-[#0000001A] p-4">
            <div style={{ width: "100%", height: 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient
                      id="colorVariant"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#34D399"
                        stopOpacity={0.95}
                      />
                      <stop
                        offset="95%"
                        stopColor="#34D399"
                        stopOpacity={0.12}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorBaseline"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#60A5FA"
                        stopOpacity={0.14}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 12"
                    stroke="#E6EEF6"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#9CA3AF"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    tickFormatter={(v) => `${v}%`}
                    domain={[0, 20]}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip formatter={(value) => `${value}%`} />

                  <Area
                    type="monotone"
                    dataKey="baseline"
                    stroke="#60A5FA"
                    fillOpacity={1}
                    fill="url(#colorBaseline)"
                  />
                  <Area
                    type="monotone"
                    dataKey="variant"
                    stroke="#059669"
                    fillOpacity={1}
                    fill="url(#colorVariant)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperimentPerformancePage;
