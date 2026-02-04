import DeploymentPipelineTable from "@/components/dev-ops/DeploymentPipelineTable";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function DeploymentPipelinePage() {
  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        {/* back button */}
        <Link to="/devops-infrastructure">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="size-6" />
          </Button>
        </Link>
        <span className="text-xl font-semibold">Deployment Pipeline</span>
      </div>

      <div className="mb-6">
        <DeploymentPipelineTable showFull />
      </div>
    </div>
  );
}
