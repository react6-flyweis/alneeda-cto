import PageHeader from "@/components/common_components/PageHeader";
import AccessReviewCard from "@/pages/components/AccessReviewCard";
import PIIMaskingRulesCard from "@/pages/components/PIIMaskingRulesCard";
import PrivacyRequestsCard from "@/pages/components/PrivacyRequestsCard";
import KeyRotationCard from "@/pages/components/KeyRotationCard";
import SecurityAlertsCard from "@/components/security/SecurityAlertsCard";

export default function SecurityPrivacyPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Security & Privacy"
        subtitle="Keeping Your Data Safe and Private"
      />
      <div className="space-y-6">
        <AccessReviewCard />
        <PIIMaskingRulesCard />
        <SecurityAlertsCard />
        <KeyRotationCard />
        <PrivacyRequestsCard />
      </div>
    </div>
  );
}
