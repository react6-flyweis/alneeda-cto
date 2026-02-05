import PageHeader from "@/components/common_components/PageHeader";
import DataQualityCard from "./components/DataQualityCard";
import PipelineHealthTable from "./components/PipelineHealthTable";
import WarehouseTablesCatalog from "./components/WarehouseTablesCatalog";
import EventTrackingCoverageCard from "./components/EventTrackingCoverageCard";
import AccessControlsCard from "./components/AccessControlsCard";

export default function DataEngineeringPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Data Engineering"
        subtitle="Data Pipelines & Processing"
      />

      <div className="space-y-6">
        <PipelineHealthTable />
        <DataQualityCard />
        <WarehouseTablesCatalog />
        <EventTrackingCoverageCard />
        <AccessControlsCard />
      </div>
    </div>
  );
}
