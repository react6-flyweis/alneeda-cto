import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ApprovalTab from "@/components/product-governance/ApprovalTab";
import AuditTab from "@/components/product-governance/AuditTab";
import BlockedActionsTab from "@/components/product-governance/BlockedActionsTab";

export default function ProductLevelGovernancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Product-Level Global Governance
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Review approvals, explore audit history, and resolve blocked
            actions—fast, traceable, and consistent.
          </p>
        </div>
      </div>

      <Tabs defaultValue="approval" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className="mb-4 gap-3 bg-transparent">
            <TabsTrigger value="approval" className="px-4 py-2 rounded-full">
              Approval Queue
            </TabsTrigger>
            <TabsTrigger value="audit" className="px-4 py-2 rounded-full">
              Audit History
            </TabsTrigger>
            <TabsTrigger value="blocked" className="px-4 py-2 rounded-full">
              Blocked Actions
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="approval" className="space-y-4">
          <ApprovalTab />
        </TabsContent>

        <TabsContent value="audit">
          <AuditTab />
        </TabsContent>

        <TabsContent value="blocked">
          <BlockedActionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
