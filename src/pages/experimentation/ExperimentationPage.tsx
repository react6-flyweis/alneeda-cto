import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import ExperimentationTable from "@/components/experimentation/ExperimentationTable";
import { Button } from "@/components/ui/button";

export default function ExperimentationPage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Experimentation & Feature Governance
          </h1>
          <p className="text-sm text-gray-500">
            Controlled Testing with Policy-Based Feature Rollouts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/experimentation/create">
            <Button className="px-4 py-2">
              <Plus className="mr-2" size={14} /> Create Experiment
            </Button>
          </Link>
        </div>
      </div>

      <ExperimentationTable showSearch />
    </div>
  );
}
