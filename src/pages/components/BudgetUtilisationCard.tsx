import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

export default function BudgetUtilisationCard() {
  const spent = 29850;
  const forecast = 42500;
  const total = 45000;
  const usedPercent = Math.round((spent / total) * 100); // 66

  return (
    <Card className="rounded-[14px] border-[0.8px] border-[#0000001A]">
      <CardHeader>
        <div className="flex items-start justify-between w-full">
          <div>
            <CardTitle className="text-2xl">Budget Utilisation</CardTitle>
          </div>

          <Select defaultValue="today">
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This week</SelectItem>
              <SelectItem value="this-month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm ">Budget Utilization</div>
          <div className="text-green-600 font-medium">{usedPercent}% Used</div>
        </div>

        <div className="mb-3">
          <Progress value={usedPercent} />
        </div>

        <div className="flex items-center justify-between text-sm text-[#6B7280] mt-3">
          <div>$0</div>
          <div className="text-green-600 font-medium">
            ${spent.toLocaleString()} spent
          </div>
          <div className="text-amber-600 font-medium">
            ${forecast.toLocaleString()} forecast
          </div>
          <div className="text-[#9CA3AF]">${total.toLocaleString()}</div>
        </div>

        <div className="mt-4 rounded-lg bg-[#FFF9E5] border border-[#F7E9B9] p-5 flex gap-2 items-start">
          <div className="mt-0.5">
            <AlertTriangle className="size-4 text-amber-700" />
          </div>

          <div>
            <div className="text-amber-700 text-sm font-semibold">
              Monthly compute spending at 78% of budget
            </div>
            <div className="text-amber text-xs mt-2">
              $28,500 / $35,000 · about 1 year ago
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
