import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import UserAppTab from "@/components/app-manage/UserAppTab";

const apps = [
  "User App",
  "Social Media App",
  "Restaurant App",
  "Grocery App",
  "Shopping App",
];
export default function AppManagePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold">App Manage</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Manage app themes, navigation, onboarding and auth screens for your
            product variants.
          </p>
        </div>
      </div>

      <Tabs defaultValue="user" className="w-full">
        <TabsList className="w-full group-data-[orientation=horizontal]/tabs:h-12 bg-white p-0 rounded-full mb-5">
          {apps.map((a) => (
            <TabsTrigger
              key={a}
              value={a.toLowerCase().split(" ")[0]}
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white h-12"
            >
              {a}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="user" className="space-y-4">
          <UserAppTab />
        </TabsContent>

        {/* other tabs reuse same content for now */}
        {apps.slice(1).map((a) => (
          <TabsContent
            key={a}
            value={a.toLowerCase().split(" ")[0]}
            className="space-y-4"
          ></TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
