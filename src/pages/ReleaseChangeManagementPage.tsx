import PageHeader from "@/components/common_components/PageHeader";
import PostReleaseMonitoringDialog from "@/components/release-mgmt/PostReleaseMonitoringDialog";

import FeatureFlagRolloutCard from "@/components/release-mgmt/FeatureFlagRolloutCard";
import ChangeRecordListCard from "@/components/release-mgmt/ChangeRecordListCard";
import ReleaseCalendarCard from "@/components/release-mgmt/ReleaseCalendarCard";
import BlackoutWindowsCard from "@/components/release-mgmt/BlackoutWindowsCard";

export default function ReleaseChangeManagementPage() {
  return (
    <div className="">
      <PageHeader
        title="Release & Change Management"
        subtitle="Planned Deployments and Controlled Changes"
        actions={<PostReleaseMonitoringDialog />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReleaseCalendarCard />
        <BlackoutWindowsCard />
      </div>

      <div className="mt-6 space-y-6">
        <FeatureFlagRolloutCard />
        <ChangeRecordListCard />
      </div>
    </div>
  );
}
