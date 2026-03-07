import { useState } from "react";
import { Eye, EyeOff, Edit3, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import ShoppingEditTabDialog from "./ShoppingEditTabDialog";
import shoppingBottomNavigationMockup from "@/assets/app-manage/shopping-app/shopping-app-bottom-nav.png";
import shoppingBottomNavigationHiddenMockup from "@/assets/app-manage/shopping-app/shopping-app-bottom-nav-hidden.png";

interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
}

interface ShoppingBottomNavigationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApply: (tabs: NavigationTab[]) => void;
  onCancel: () => void;
}

// default tabs tailored for the shopping app
const defaultTabs: NavigationTab[] = [
  { id: "dashboard", label: "Dashboard", visible: true },
  { id: "products", label: "Products", visible: true },
  { id: "orders", label: "Orders", visible: true },
  { id: "delivery", label: "Delivery", visible: true },
  { id: "profile", label: "Profile", visible: true },
];

export default function ShoppingBottomNavigationDialog({
  open,
  setOpen,
  onApply,
  onCancel,
}: ShoppingBottomNavigationDialogProps) {
  const [tabs, setTabs] = useState<NavigationTab[]>(defaultTabs);

  // state for Edit Tab / Change Title dialog
  const [editingTab, setEditingTab] = useState<NavigationTab | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleToggleVisibility = (id: string) => {
    if (id === "profile") {
      setTabs(
        tabs.map((tab) =>
          tab.id === id ? { ...tab, visible: !tab.visible } : tab,
        ),
      );
    }
  };

  const handleDelete = (id: string) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  };

  const handleAddNewTab = () => {
    const newTab: NavigationTab = {
      id: `tab-${Date.now()}`,
      label: "New Tab",
      visible: true,
    };
    setTabs([...tabs, newTab]);
  };

  const handleApply = () => {
    onApply(tabs);
  };

  const handleCancel = () => {
    setTabs(defaultTabs);
    onCancel();
  };

  // open the Edit Tab dialog for a specific tab
  const openEditDialog = (tab: NavigationTab) => {
    setEditingTab(tab);
    setEditDialogOpen(true);
  };

  // apply changes from the edit dialog back to tabs
  const applyEdit = (updated: NavigationTab) => {
    setTabs(tabs.map((t) => (t.id === updated.id ? updated : t)));
    setEditDialogOpen(false);
    setEditingTab(null);
  };

  const closeEdit = () => {
    setEditDialogOpen(false);
    setEditingTab(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm p-0 gap-0">
          <div className="relative flex">
            {/* Left Panel - Navigation Editor */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-3">
                <h2 className="text-xl font-semibold">Bottom Navigation</h2>
              </div>

              <div className="p-3">
                <div className="bg-(--bg-light-blue) p-2 rounded">
                  {/* Add New Tab Button */}
                  <div className="border-b flex justify-between items-center">
                    <div className="text-sm font-medium">Add New Tab</div>

                    <Button
                      onClick={handleAddNewTab}
                      aria-label="Add tab"
                      variant="ghost"
                    >
                      <Plus className="" />
                    </Button>
                  </div>

                  {/* Navigation Tabs List */}
                  <div className="space-y-3 mt-3">
                    {tabs.map((tab) => (
                      <div
                        key={tab.id}
                        className={cn(
                          "flex items-center gap-4",
                          !tab.visible && "opacity-60",
                        )}
                      >
                        {/* Label */}
                        <div className="flex-1 text-sm font-medium">
                          {tab.label}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            onClick={() => handleToggleVisibility(tab.id)}
                            className="text-blue-700"
                            aria-label={tab.visible ? "Hide tab" : "Show tab"}
                          >
                            {tab.visible ? (
                              <Eye className="size-4" />
                            ) : (
                              <EyeOff className="size-4" />
                            )}
                          </Button>

                          <Button
                            variant="ghost"
                            aria-label="Edit tab"
                            onClick={() => openEditDialog(tab)}
                          >
                            <Edit3 className="size-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={() => handleDelete(tab.id)}
                            aria-label="Delete tab"
                            className="text-red-700"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 h-12 rounded-full bg-[#3E4250] text-white hover:bg-[#2E3240] hover:text-white border-0"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleApply}
                    className="flex-1 h-12 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Panel - Mobile Mockup */}
            <div className="absolute -right-65 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
              <img
                src={
                  tabs.find((t) => t.id === "profile" && t.visible)
                    ? shoppingBottomNavigationMockup
                    : shoppingBottomNavigationHiddenMockup
                }
                alt="Bottom Navigation Preview"
                className="w-full h-auto max-w-65"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Tab / Change Title Dialog (extracted) */}
      <ShoppingEditTabDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        tab={editingTab}
        onSave={applyEdit}
        onCancel={closeEdit}
      />
    </>
  );
}
