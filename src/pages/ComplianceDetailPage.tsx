import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChevronLeft,
  Clipboard,
  CheckCircle,
  Users,
  Calendar,
} from "lucide-react";
import ChecklistTab from "@/pages/components/ChecklistTab";
import ActivityTab from "@/pages/components/ActivityTab";
import DocumentsTab from "@/pages/components/DocumentsTab";

const stats = [
  {
    title: "Total Items",
    value: "5",
    icon: <Clipboard size={18} className="text-sky-600" />,
  },
  {
    title: "Completed",
    value: "1",
    icon: <CheckCircle size={18} className="text-green-600" />,
  },
  {
    title: "Assignees",
    value: "5",
    icon: <Users size={18} className="text-violet-600" />,
  },
  {
    title: "Final Deadline",
    value: "Feb 15",
    icon: <Calendar size={18} className="text-amber-600" />,
  },
];

const items = [
  {
    title: "FDA Pre-Market Notification (510(k)) Review",
    subtitle:
      "Complete review of FDA 510(k) submission requirements and documentation",
    assignee: "Sarah Chen",
    due: "01-15-2026",
    status: "Completed",
    checked: true,
  },
  {
    title: "EU MDR Compliance Assessment",
    subtitle:
      "Ensure compliance with European Medical Device Regulation (EU 2017/745)",
    assignee: "Michael Roberts",
    due: "02-15-2026",
    status: "In Progress",
    checked: false,
  },
  {
    title: "Clinical Evaluation Report",
    subtitle: "Prepare clinical evaluation report for regulatory submission",
    assignee: "Michael Roberts",
    due: "02-15-2026",
    status: "In Progress",
    checked: false,
  },
  {
    title: "Quality Management System Audit",
    subtitle: "Internal audit of QMS procedures per ISO 13485 standards",
    assignee: "Michael Roberts",
    due: "02-15-2026",
    status: "Pending",
    checked: false,
  },
  {
    title: "Risk Management File Review",
    subtitle: "Complete risk management file per ISO 14971 requirements",
    assignee: "Lisa Thompson",
    due: "01-20-2026",
    status: "Pending",
    checked: false,
  },
];

const statusColors: Record<string, string> = {
  Completed: "bg-green-50 text-green-600",
  "In Progress": "bg-blue-50 text-blue-600",
  Pending: "bg-amber-50 text-amber-600",
  Blocked: "bg-red-50 text-red-600",
};

export default function ComplianceDetailPage() {
  const { slug } = useParams();
  const title = slug
    ? String(slug).replace(/-/g, " ")
    : "Regulatory Compliance";

  const completedCount = items.filter((i) => i.status === "Completed").length;
  const total = items.length;
  const progress = Math.round((completedCount / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-1">
          <Link to="/compliance" className="">
            <ChevronLeft className="size-6" />
          </Link>

          <h1 className="xl:text-2xl text-lg text-[#1E1E1E] font-[poppins]">
            {title}
          </h1>
        </div>
        <p className="xl:text-sm text-sm text-muted-foreground mt-1">
          FDA, EU MDR, and international regulatory requirements for product
          launch
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <Card key={s.title} className="p-4">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">{s.title}</div>
                  <div className="text-lg font-medium">{s.value}</div>
                </div>

                <div className="bg-[#f1f7ff] rounded p-2">{s.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-50 text-blue-600 rounded">
                  In Progress
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {completedCount} of {total} items completed
                </div>
              </div>

              <div className="mt-3">
                <Progress value={progress} />
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="text-lg font-medium">{progress}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="checklist" className="mb-6">
        <TabsList className="bg-transparent mb-5">
          <TabsTrigger
            className="data-[state=active]:bg-primary data-[state=active]:text-white h-12 px-5 rounded-full "
            value="checklist"
          >
            Check List
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-primary data-[state=active]:text-white h-12 px-5 rounded-full "
            value="activity"
          >
            Activity Timeline
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-primary data-[state=active]:text-white h-12 px-5 rounded-full "
            value="documents"
          >
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="checklist">
          <ChecklistTab items={items} statusColors={statusColors} />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityTab />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
