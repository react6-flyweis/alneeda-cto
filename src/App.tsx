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
import CompliancePage from "./pages/CompliancePage";
import RequestLaunchClearancePage from "./pages/RequestLaunchClearancePage";
import ComplianceDetailPage from "./pages/ComplianceDetailPage";
import DataEngineeringPage from "./pages/data-engineering/DataEngineeringPage";
import AIEngineeringPage from "./pages/ai-ml/AIEngineeringPage";
import EngineeringQA from "./pages/EngineeringQAPage";
import ReleaseChangeManagementPage from "./pages/ReleaseChangeManagementPage";
import ProductVersioningPage from "./pages/ProductVersioningPage";
import ProductCapabilityPage from "./pages/ProductCapabilityPage";
import MonetizationPage from "./pages/product-capability/MonetizationPage";
import MonetizationEditorPage from "./pages/product-capability/MonetizationEditorPage";
import ProductDataAnalyticsPage from "./pages/product-data-analytics/ProductDataAnalyticsPage";
import AddEditKpiPage from "./pages/product-data-analytics/AddEditKpiPage";
import ChangeImpactRiskPage from "./pages/ChangeImpactRiskPage";
import ChangeDetailPage from "./pages/ChangeDetailPage";
import ChangeRiskPage from "./pages/ChangeRiskPage";
import CreateVersionPage from "./pages/CreateVersionPage";
import VersionDetailsPage from "./pages/VersionDetailsPage";
import TechnicalIncidentResponsePage from "./pages/TechnicalIncidentResponsePage";
import IncidentDetailsPage from "./pages/IncidentDetailsPage";
import ProductOperationalReadinessPage from "./pages/ProductOperationalReadinessPage";
import ProductOperationalVerificationPage from "./pages/ProductOperationalVerificationPage";
import ProductOperationalSignoffPage from "./pages/ProductOperationalSignoffPage";
import SecurityPrivacyPage from "./pages/SecurityPrivacyPage";
import ProductSecurityPrivacyPage from "@/pages/product-security-privacy/ProductSecurityPrivacyPage";
import AccessReviewPage from "./pages/security-privacy/AccessReviewPage";
import SensitiveFeatureApprovalsPage from "./pages/product-security-privacy/SensitiveFeatureApprovalsPage";
import PIIExposureRulesPage from "./pages/product-security-privacy/PIIExposureRulesPage";
import SecurityRiskReviewHistoryPage from "./pages/product-security-privacy/SecurityRiskReviewHistoryPage";
import PIIFieldEditPage from "./pages/product-security-privacy/PIIFieldEditPage";
import DocumentationPage from "./pages/DocumentationPage";
import TrainingTrackerPage from "./pages/TrainingTrackerPage";
import DocumentationDetailPage from "./pages/DocumentationDetailPage";
import ProductLevelGovernancePage from "./pages/ProductLevelGovernancePage";
import SettingsPage from "./pages/SettingsPage";
import AppManagePage from "./pages/AppManagePage";

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
          <Route path="/compliance" element={<CompliancePage />} />
          <Route
            path="/compliance/request-launch-clearance"
            element={<RequestLaunchClearancePage />}
          />
          <Route path="/compliance/:slug" element={<ComplianceDetailPage />} />
          <Route
            path="/product-operational-readiness"
            element={<ProductOperationalReadinessPage />}
          />
          <Route
            path="/product-operational-readiness/verification"
            element={<ProductOperationalVerificationPage />}
          />
          <Route
            path="/product-operational-readiness/signoff"
            element={<ProductOperationalSignoffPage />}
          />
          <Route
            path="/devops/pipelines"
            element={<DeploymentPipelinePage />}
          />
          <Route path="/security-privacy" element={<SecurityPrivacyPage />} />
          <Route
            path="/security-privacy/access-review"
            element={<AccessReviewPage />}
          />
          <Route
            path="/product-security-governance"
            element={<ProductSecurityPrivacyPage />}
          />
          <Route
            path="/product-security-governance/approvals"
            element={<SensitiveFeatureApprovalsPage />}
          />
          <Route
            path="/product-security-governance/pii-rules"
            element={<PIIExposureRulesPage />}
          />
          <Route
            path="/product-security-governance/pii-rules/:field/edit"
            element={<PIIFieldEditPage />}
          />
          <Route
            path="/product-security-governance/risk-history"
            element={<SecurityRiskReviewHistoryPage />}
          />
          <Route
            path="/product-level-governance"
            element={<ProductLevelGovernancePage />}
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/app-manage" element={<AppManagePage />} />
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
          <Route path="/monetization-revenue" element={<MonetizationPage />} />
          <Route
            path="/monetization-revenue/create"
            element={<MonetizationEditorPage />}
          />
          <Route
            path="/monetization-revenue/:id/edit"
            element={<MonetizationEditorPage />}
          />
          <Route
            path="/product-data-analytics"
            element={<ProductDataAnalyticsPage />}
          />
          <Route
            path="/product-data-analytics/kpi/create"
            element={<AddEditKpiPage />}
          />
          <Route
            path="/product-data-analytics/kpi/:id/edit"
            element={<AddEditKpiPage />}
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
          <Route path="/training-tracker" element={<TrainingTrackerPage />} />
          <Route
            path="/documentation-knowledge"
            element={<DocumentationPage />}
          />
          <Route
            path="/documentation-knowledge/:slug"
            element={<DocumentationDetailPage />}
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
