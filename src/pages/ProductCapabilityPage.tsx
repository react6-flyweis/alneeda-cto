import { useState } from "react";
import PageHeader from "@/components/common_components/PageHeader";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import RegisterCapabilityDialog from "@/components/product-registration/RegisterCapabilityDialog";
import CapabilityRegistry from "@/components/product-capability/CapabilityRegistry";
import CapabilityMapping from "@/components/product-capability/CapabilityMapping";
import CapabilityViolations from "@/components/product-capability/CapabilityViolations";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// convenience union type for state (keeps inference tidy)
type TABS = ["registry", "mapping", "violations"];

export default function ProductCapabilityPage() {
  const [activeTab, setActiveTab] = useState<TABS[number]>("registry");

  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Product Capability & Dependency Control"
        subtitle="Define the set of capabilities services can expose, who owns them, and whether they're safe to adopt."
        actions={
          <>
            <Button size="lg" onClick={() => setIsRegisterDialogOpen(true)}>
              <PlusIcon /> Register Capability
            </Button>

            <RegisterCapabilityDialog
              open={isRegisterDialogOpen}
              onOpenChange={setIsRegisterDialogOpen}
              onSubmit={(data) => {
                // In a real app you would send this to the backend and update state
                // For now we log it so developers can see the payload in the console
                console.log("Registered capability:", data);
              }}
            />
          </>
        }
      />

      <div className="mb-4">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TABS[number])}
        >
          <TabsList className="bg-transparent mb-5">
            <TabsTrigger
              value="registry"
              className="data-[state=active]:bg-primary data-[state=active]:text-white h-12 px-5 rounded-full "
            >
              Capability Registry
            </TabsTrigger>
            <TabsTrigger
              value="mapping"
              className="data-[state=active]:bg-primary data-[state=active]:text-white h-12 px-5 rounded-full "
            >
              Dependency Mapping
            </TabsTrigger>
            <TabsTrigger
              value="violations"
              className="data-[state=active]:bg-primary data-[state=active]:text-white h-12 px-5 rounded-full "
            >
              Violation Review
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registry">
            <CapabilityRegistry />
          </TabsContent>

          <TabsContent value="mapping">
            <CapabilityMapping />
          </TabsContent>

          <TabsContent value="violations">
            <CapabilityViolations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
