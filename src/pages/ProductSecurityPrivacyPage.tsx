import PageHeader from "@/components/common_components/PageHeader";
import StatCard from "@/components/StatCard";
import SensitiveFeatureApprovalsCard from "@/pages/components/SensitiveFeatureApprovalsCard";
import PIIExposureRulesCard from "@/pages/components/PIIExposureRulesCard";
import SecurityRiskReviewHistoryCard from "@/pages/components/SecurityRiskReviewHistoryCard";
import { Shield, Database, Clock, AlertTriangle } from "lucide-react";

export default function ProductSecurityPrivacyPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Product Security & Privacy Governance"
        subtitle="Ensuring Data Protection, Compliance, and Risk Control"
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Active Security Rules"
          value="4"
          change="+12% from last month"
          isPositive
          icon={<Shield className="text-(--dark-font-color)" />}
          iconBg="bg-green-100"
        />

        <StatCard
          title="PII Fields Managed"
          value="8"
          change={""}
          icon={<Database className="text-(--dark-font-color)" />}
          iconBg="bg-blue-100"
        />

        <StatCard
          title="Pending Approvals"
          value="2"
          change={""}
          icon={<Clock className="text-(--dark-font-color)" />}
          iconBg="bg-yellow-100"
        />

        <StatCard
          title="Active Risk Reviews"
          value="3"
          change={""}
          icon={<AlertTriangle className="text-(--dark-font-color)" />}
          iconBg="bg-red-100"
        />
      </div>

      <div className="mt-6">
        <SensitiveFeatureApprovalsCard />
      </div>

      <div className="mt-6">
        <PIIExposureRulesCard />
      </div>

      <div className="mt-6">
        <SecurityRiskReviewHistoryCard />
      </div>
    </div>
  );
}
