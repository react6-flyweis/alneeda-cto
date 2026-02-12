import { useState } from "react";
import { Eye, EyeOff, Edit3, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import bottomNavigationMockup from "@/assets/app-manage/bottom-navigation.png";
import EditTabDialog from "./EditTabDialog";

interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
}

interface BottomNavigationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApply: (tabs: NavigationTab[]) => void;
  onCancel: () => void;
}

const defaultTabs: NavigationTab[] = [
  { id: "home", label: "Home", visible: true },
  { id: "messages", label: "Messages", visible: true },
  { id: "probiz", label: "Pro Biz", visible: false },
  { id: "order", label: "Order", visible: true },
  { id: "promotion", label: "Promotion", visible: true },
];

export default function BottomNavigationDialog({
  open,
  setOpen,
  onApply,
  onCancel,
}: BottomNavigationDialogProps) {
  const [tabs, setTabs] = useState<NavigationTab[]>(defaultTabs);

  // state for Edit Tab / Change Title dialog
  const [editingTab, setEditingTab] = useState<NavigationTab | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleToggleVisibility = (id: string) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === id ? { ...tab, visible: !tab.visible } : tab,
      ),
    );
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
                src={bottomNavigationMockup}
                alt="Bottom Navigation Preview"
                className="w-full h-auto max-w-65"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Tab / Change Title Dialog (extracted) */}
      <EditTabDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        tab={editingTab}
        onSave={applyEdit}
        onCancel={closeEdit}
      />
    </>
  );
}
