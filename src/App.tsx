import ApiIntegrationsPage from "./pages/ApiIntegrationsPage";
import IntegrationHealthPage from "./pages/IntegrationHealthPage";

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
          <Route path="/api-integrations" element={<ApiIntegrationsPage />} />
          <Route
            path="/integration-health"
            element={<IntegrationHealthPage />}
          />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

