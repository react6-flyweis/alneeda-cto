import PageHeader from "../../components/common_components/PageHeader";
import ProductDeliveryBoard from "./components/ProductDeliveryBoard";
import ReleaseReadiness from "./components/ReleaseReadiness";
import DeploymentMetrics from "./components/DeploymentMetrics";
import RecentDeploys from "./components/RecentDeploys";
import FeatureFlags from "./components/FeatureFlags";

const ProductEngineeringPage = () => {
  return (
    <div className="w-full space-y-8">
      <PageHeader
        title="Product Engineering"
        subtitle="From Backlog to Production"
      />
      
      <ProductDeliveryBoard />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <ReleaseReadiness />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-8">
          <DeploymentMetrics />
          <RecentDeploys />
        </div>
      </div>

      <FeatureFlags />
    </div>
  );
};

export default ProductEngineeringPage;
