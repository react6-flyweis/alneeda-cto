import React from "react";
import PageHeader from "../../components/common_components/PageHeader";
import PerformanceSnapshotCard from "./components/PerformanceSnapshotCard";
import MonitoringDriftCard from "./components/MonitoringDriftCard";
import ModelCatalogCard from "./components/ModelCatalogCard";
import ExperimentResultsCard from "./components/ExperimentResultsCard";
import ModelDeploymentDialog from "./components/ModelDeploymentDialog";
import SafetyPanelDialog from "./components/SafetyPanelDialog";

const AIEngineeringPage: React.FC = () => {
  return (
    <div className="w-full">
      <PageHeader
        title="AI/ML Engineering"
        subtitle="Assistive-only deployments for ranking, recommendations, fraud detection, and assistants"
        actions={
          <>
            <ModelDeploymentDialog />
            <SafetyPanelDialog />
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <PerformanceSnapshotCard />
        <MonitoringDriftCard />
      </div>

      <ModelCatalogCard />

      <ExperimentResultsCard />
    </div>
  );
};

export default AIEngineeringPage;
