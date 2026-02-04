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
import ApiIntegrationsPage from "./pages/ApiIntegrationsPage";
import IntegrationHealthPage from "./pages/IntegrationHealthPage";
import SecurityPrivacyPage from "./pages/SecurityPrivacyPage";
import DevOpsInfrastructurePage from "./pages/DevOpsInfrastructurePage";
import DeploymentPipelinePage from "./pages/dev-ops/DeploymentPipelinePage";

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
          <Route path="/api-integrations" element={<ApiIntegrationsPage />} />
          <Route
            path="/integration-health"
            element={<IntegrationHealthPage />}
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
            path="/data-engineering"
            element={
              <div className="p-8">
                <h1>Data Engineering</h1>
                <p>Placeholder Page</p>
              </div>
            }
          />
          <Route
            path="/ai-ml"
            element={
              <div className="p-8">
                <h1>AI/ML Engineering</h1>
                <p>Placeholder Page</p>
              </div>
            }
          />
          <Route
            path="/engineering-qa"
            element={
              <div className="p-8">
                <h1>Engineering QA</h1>
                <p>Placeholder Page</p>
              </div>
            }
          />
          <Route
            path="/release-management"
            element={
              <div className="p-8">
                <h1>Release & Management</h1>
                <p>Placeholder Page</p>
              </div>
            }
          />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
