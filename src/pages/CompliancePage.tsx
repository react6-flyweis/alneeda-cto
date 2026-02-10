import PageHeader from "../components/common_components/PageHeader";
import StatCard from "@/components/StatCard";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/Button";
import { CheckCircle, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const statItems = [
  {
    title: "Completed",
    value: "29",
    icon: <CheckCircle size={18} />,
    iconBg: "bg-green-50 text-green-600",
  },
  {
    title: "In Progress",
    value: "12",
    icon: <Clock size={18} />,
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    title: "Pending",
    value: "7",
    icon: <AlertTriangle size={18} />,
    iconBg: "bg-amber-50 text-amber-600",
  },
];

const categories = [
  {
    title: "Regulatory Compliance",
    subtitle: "Legal frameworks and industry regulations",
    status: "In Progress",
    percent: 20,
    badgeClass: "bg-blue-50 text-blue-600",
    slug: "regulatory-compliance",
  },
  {
    title: "Data Privacy & GDPR",
    subtitle: "Data protection and privacy requirements",
    status: "Completed",
    percent: 100,
    badgeClass: "bg-green-50 text-green-600",
    slug: "data-privacy-gdpr",
  },
  {
    title: "Security Audit",
    subtitle: "Security certifications and assessments",
    status: "In Progress",
    percent: 60,
    badgeClass: "bg-blue-50 text-blue-600",
    slug: "security-audit",
  },
  {
    title: "Third-Party Agreements",
    subtitle: "Vendor contracts and partnerships",
    status: "Pending",
    percent: 25,
    badgeClass: "bg-amber-50 text-amber-600",
    slug: "third-party-agreements",
  },
  {
    title: "International Compliance",
    subtitle: "Cross-border legal requirements",
    status: "Blocked",
    percent: 40,
    badgeClass: "bg-red-50 text-red-600",
    slug: "international-compliance",
  },
  {
    title: "Privacy Impact Assessments",
    subtitle: "PIAs and data handling reviews",
    status: "In Progress",
    percent: 10,
    badgeClass: "bg-blue-50 text-blue-600",
    slug: "privacy-impact-assessments",
  },
];

export default function CompliancePage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Compliance & Legal Readiness"
        subtitle="Track and manage all compliance requirements for product launch clearance"
        actions={
          <Link to="/compliance/request-launch-clearance">
            <Button variant="primary">Request Launch Clearance</Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {statItems.map((s, idx) => (
          <StatCard
            key={idx}
            title={s.title}
            value={s.value}
            change={""}
            icon={s.icon}
            iconBg={s.iconBg}
          />
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-4">Compliance Categories</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => {
          return (
            <Link
              to={`/compliance/${c.slug}`}
              key={c.slug}
              className="no-underline"
            >
              <Card className="p-4 gap-0 cursor-pointer">
                <CardHeader className="p-0 flex justify-between items-center">
                  <CardTitle className="text-base font-semibold">
                    {c.title}
                  </CardTitle>

                  <ChevronRight size={18} className="" />
                </CardHeader>

                <CardContent className="p-0">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-[#6B7280] mt-1">
                        {c.subtitle}
                      </p>

                      <div className="mt-3 flex justify-between items-center gap-3">
                        <Badge className={`${c.badgeClass} rounded`}>
                          {c.status}
                        </Badge>

                        <div className="text-sm text-[#6B7280]">
                          {c.percent}% Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
