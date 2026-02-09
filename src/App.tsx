import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import ActionQueuePage from "./pages/dashboard/ActionQueuePage";
import RecentChangesPage from "./pages/dashboard/RecentChangesPage";
import CapacityAndScalingKPIsPage from "./pages/platform_architecture/CapacityAndScalingKPIsPage";
import PlatformArchitecturePage from "./pages/PlatformArchitecturePage";
import RiskRegisterPage from "./pages/platform_architecture/RiskRegisterPage";
import ProductEngineeringPage from "./pages/product_engineering/ProductEngineeringPage";
import ProductRegistryPage from "./pages/ProductRegistryPage";
import ProductLifecyclePage from "./pages/ProductLifecyclePage";
import ProductLifecycleDetailPage from "./pages/ProductLifecycleDetailPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ApiIntegrationsPage from "./pages/ApiIntegrationsPage";
import IntegrationHealthPage from "./pages/IntegrationHealthPage";
import ExperimentationPage from "./pages/experimentation/ExperimentationPage";
import CreateExperimentPage from "./pages/experimentation/CreateExperimentPage";
import ExperimentPerformancePage from "./pages/experimentation/ExperimentPerformancePage";
import DecisionPage from "./pages/experimentation/DecisionPage";
import DevOpsInfrastructurePage from "./pages/DevOpsInfrastructurePage";
import DeploymentPipelinePage from "./pages/dev-ops/DeploymentPipelinePage";
import DataEngineeringPage from "./pages/data-engineering/DataEngineeringPage";
import AIEngineeringPage from "./pages/ai-ml/AIEngineeringPage";
import EngineeringQA from "./pages/EngineeringQAPage";
import ReleaseChangeManagementPage from "./pages/ReleaseChangeManagementPage";
import ProductVersioningPage from "./pages/ProductVersioningPage";
import ProductCapabilityPage from "./pages/ProductCapabilityPage";
import ChangeImpactRiskPage from "./pages/ChangeImpactRiskPage";
import ChangeDetailPage from "./pages/ChangeDetailPage";
import ChangeRiskPage from "./pages/ChangeRiskPage";
import CreateVersionPage from "./pages/CreateVersionPage";
import VersionDetailsPage from "./pages/VersionDetailsPage";
import TechnicalIncidentResponsePage from "./pages/TechnicalIncidentResponsePage";
import IncidentDetailsPage from "./pages/IncidentDetailsPage";

import SecurityPrivacyPage from "./pages/SecurityPrivacyPage";
import ProductSecurityPrivacyPage from "./pages/ProductSecurityPrivacyPage";
import AccessReviewPage from "./pages/security-privacy/AccessReviewPage";
import SensitiveFeatureApprovalsPage from "./pages/security-privacy/SensitiveFeatureApprovalsPage";
import PIIExposureRulesPage from "./pages/security-privacy/PIIExposureRulesPage";
import SecurityRiskReviewHistoryPage from "./pages/security-privacy/SecurityRiskReviewHistoryPage";

import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/action-queue" element={<ActionQueuePage />} />
          <Route
            path="/dashboard/recent-changes"
            element={<RecentChangesPage />}
          />
          <Route
            path="/platform-architecture"
            element={<PlatformArchitecturePage />}
          />
          <Route
            path="/platform-architecture/capacity-scaling"
            element={<CapacityAndScalingKPIsPage />}
          />
          <Route
            path="/platform-architecture/risk-register"
            element={<RiskRegisterPage />}
          />
          <Route
            path="/product-engineering"
            element={<ProductEngineeringPage />}
          />
          <Route
            path="/product-registration"
            element={<ProductRegistryPage />}
          />
          <Route
            path="/product-registration/:id"
            element={<ProductDetailsPage />}
          />
          <Route path="/product-lifecycle" element={<ProductLifecyclePage />} />
          <Route
            path="/product-lifecycle/:id"
            element={<ProductLifecycleDetailPage />}
          />
          <Route path="/api-integrations" element={<ApiIntegrationsPage />} />
          <Route
            path="/integration-health"
            element={<IntegrationHealthPage />}
          />
          <Route
            path="/experimentation-governance"
            element={<ExperimentationPage />}
          />
          <Route
            path="/experimentation/create"
            element={<CreateExperimentPage />}
          />
          <Route
            path="/experimentation/:id/kpis"
            element={<ExperimentPerformancePage />}
          />
          <Route
            path="/experimentation/:id/decision"
            element={<DecisionPage />}
          />
          <Route
            path="/devops-infrastructure"
            element={<DevOpsInfrastructurePage />}
          />
          <Route
            path="/devops/pipelines"
            element={<DeploymentPipelinePage />}
          />
          <Route path="/security-privacy" element={<SecurityPrivacyPage />} />
          <Route
            path="/product-security-governance"
            element={<ProductSecurityPrivacyPage />}
          />
          <Route
            path="/security-privacy/access-review"
            element={<AccessReviewPage />}
          />
          <Route
            path="/security-privacy/approvals"
            element={<SensitiveFeatureApprovalsPage />}
          />
          <Route
            path="/security-privacy/pii-rules"
            element={<PIIExposureRulesPage />}
          />
          <Route
            path="/security-privacy/risk-history"
            element={<SecurityRiskReviewHistoryPage />}
          />
          <Route path="/data-engineering" element={<DataEngineeringPage />} />
          <Route path="/ai-ml" element={<AIEngineeringPage />} />
          <Route path="/engineering-qa" element={<EngineeringQA />} />
          <Route
            path="/release-management"
            element={<ReleaseChangeManagementPage />}
          />
          <Route
            path="/product-versioning"
            element={<ProductVersioningPage />}
          />
          <Route
            path="/product-capability-dependency"
            element={<ProductCapabilityPage />}
          />
          <Route
            path="/change-impact-risk"
            element={<ChangeImpactRiskPage />}
          />
          <Route
            path="/change-impact-risk/:id/risk"
            element={<ChangeRiskPage />}
          />
          <Route
            path="/change-impact-risk/:id"
            element={<ChangeDetailPage />}
          />
          <Route
            path="/product-versioning/create"
            element={<CreateVersionPage />}
          />
          <Route
            path="/product-versioning/:version"
            element={<VersionDetailsPage />}
          />
          <Route
            path="/technical-incident-response"
            element={<TechnicalIncidentResponsePage />}
          />
          <Route
            path="/technical-incident-response/:id"
            element={<IncidentDetailsPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
