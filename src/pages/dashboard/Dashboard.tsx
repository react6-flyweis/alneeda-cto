import React from "react";
import StatCard from "@/components/StatCard";
import GreenLaptopIcon from "../../assets/icons/greenLaptopIcon.svg";
import latencyIcon from "../../assets/icons/blueLatencyIcon.svg";
import purpleAlertIcon from "../../assets/icons/purpleAlertIcon.svg";
import orangeClockIcon from "../../assets/icons/orangeClockIcon.svg";
import greenDollerIcon from "../../assets/icons/greenDollerIcon.svg";
import brownStackIcon from "../../assets/icons/brownStackIcon.svg";
import Button from "../../components/Button";
import PageHeader from "../../components/common_components/PageHeader";
import ToolsGrid from "./components/ToolsGrid";
import RecentChanges from "./components/RecentChanges";
import ActiveAlerts from "./components/ActiveAlerts";
import ActionQueue from "./components/ActionQueue";
import QuickActionsModal from "../../components/common_components/QuickActionsModal";

const Dashboard: React.FC = () => {
  const [isQuickActionModalOpen, setIsQuickActionModalOpen] =
    React.useState(false);

  return (
    <div className="w-full">
      <PageHeader
        title="Dashboard"
        subtitle="Infrastructure & Platform"
        actions={
          <Button
            variant="primary"
            onClick={() => setIsQuickActionModalOpen(true)}
            className="bg-[#0a1628] text-white md:px-4 p-1 md:py-2.5 md:h-13 h-auto rounded-lg font-bold md:text-lg text-xs hover:bg-[#152945] transition-colors shadow-lg shadow-blue-900/10"
          >
            Quick Actions
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-2 md:mb-8 mb-4 justify-between">
        <StatCard
          title="Availability"
          value="99.97%"
          change="+0.02%"
          icon={GreenLaptopIcon}
          iconBg="bg-[#D0FAE5]"
        />
        <StatCard
          title="Latency (P95)"
          value="142ms"
          change="-8ms"
          isPositive={false}
          icon={latencyIcon}
          iconBg="bg-[#CEDFFF]"
        />
        <StatCard
          title="Error Rate"
          value="0.12%"
          change="+0.03%"
          icon={purpleAlertIcon}
          iconBg="bg-[#F3E8FF]"
        />
        <StatCard
          title="Backlog"
          value="47"
          change="+12"
          statusText="items"
          icon={brownStackIcon}
          iconBg="bg-[#FEF9C2]"
        />
        <StatCard
          title="Monthly Cost"
          value="$48.2K"
          change="On budget"
          icon={greenDollerIcon}
          iconBg="bg-[#D0FAE5]"
        />
        <StatCard
          title="SLA Breaches"
          value="2"
          change="-3"
          isPositive={false}
          statusText="this week"
          icon={orangeClockIcon}
          iconBg="bg-[#FFEDD4]"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 lg:gap-4 gap-2 md:mb-8 mb-4">
        <div className="lg:col-span-6">
          <ActiveAlerts />
        </div>
        <div className="lg:col-span-6">
          <ActionQueue />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 lg:gap-4 gap-2 mb-8">
        <div className="lg:col-span-6">
          <ToolsGrid />
        </div>
        <div className="lg:col-span-6">
          <RecentChanges />
        </div>
      </div>

      <QuickActionsModal
        isOpen={isQuickActionModalOpen}
        onClose={() => setIsQuickActionModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
