import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import HealthTab from "@/components/product-lifecycle/HealthTab";
import DeprecationTab from "@/components/product-lifecycle/DeprecationTab";
import RetirementTab from "@/components/product-lifecycle/RetirementTab";
import { ChevronLeft, ChevronRight } from "lucide-react";

const revenue = [
  380000, 390000, 385000, 370000, 360000, 375000, 390000, 405000,
];
const usage = [85000, 90000, 86000, 78000, 72000, 73000, 82000, 92000];
const weeks = ["W-10", "W-9", "W-8", "W-7", "W-6", "W-5", "W-4", "W-1"];

export default function ProductLifecycleDetailPage() {
  const { product } = useParams();
  const title = product ? decodeURIComponent(product) : "Atlas API";

  const data = weeks.map((w, i) => ({
    week: w,
    revenue: revenue[i],
    usage: usage[i],
  }));
  const chartH = 260; // px

  const incidents = [
    {
      id: "INC-1842",
      title: "Elevated 5xx rate",
      status: "Mitigated",
      age: "3d",
      severity: "High",
    },
    {
      id: "INC-1811",
      title: "Latency regression",
      status: "Monitoring",
      age: "8d",
      severity: "Medium",
    },
    {
      id: "INC-1790",
      title: "Webhook retries spike",
      status: "Resolved",
      age: "13d",
      severity: "Low",
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="mb-3">
        <div className="flex items-center gap-3">
          <Link to="/product-lifecycle">
            <ChevronLeft className="size-6" />
          </Link>

          <div>
            <h1 className="xl:text-2xl text-lg text-[#1E1E1E] font-[poppins]">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Owner: Platform
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="flex items-start justify-between gap-6">
            <div className="w-full">
              <h3 className="text-sm text-muted-foreground">Health Details</h3>

              <div className="mt-3 w-full grid grid-cols-4 items-center gap-6">
                <div>
                  <div className="">84</div>
                  <div className="text-sm text-muted-foreground">
                    Health score
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <div className="font-medium">MAU</div>
                  <div className="text-gray-700">128,400</div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <div className="font-medium">MRR</div>
                  <div className="text-gray-700">$214,000</div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <div className="font-medium">Incidents</div>
                  <div className="text-gray-700">3/30d</div>
                </div>
              </div>
            </div>

            <div className="ml-auto">
              <Badge className="rounded-full px-3 py-2 bg-emerald-100 text-emerald-700">
                Healthy
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="health" className="w-full">
        <TabsList className="mb-4 gap-6 bg-transparent">
          <TabsTrigger
            value="health"
            className="rounded-full px-6 py-2 h-12 gap-2 flex items-center flex-initial bg-white text-gray-700 data-[state=active]:bg-[#08223a] data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <span>Health</span>
            <ChevronRight className="size-4" />
          </TabsTrigger>

          <TabsTrigger
            value="deprecation"
            className="rounded-full px-6 py-2 h-12 gap-2 flex items-center flex-initial bg-white text-gray-700 data-[state=active]:bg-[#08223a] data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <span>Deprecation</span>
            <ChevronRight className="size-4" />
          </TabsTrigger>

          <TabsTrigger
            value="retirement"
            className="rounded-full px-6 py-2 h-12 gap-2 flex items-center flex-initial bg-white text-gray-700 data-[state=active]:bg-[#08223a] data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <span>Retirement</span>
            <ChevronRight className="size-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-5">
          <HealthTab data={data} chartH={chartH} incidents={incidents} />
        </TabsContent>

        <TabsContent value="deprecation" className="space-y-5">
          <DeprecationTab />
        </TabsContent>

        <TabsContent value="retirement">
          <RetirementTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
