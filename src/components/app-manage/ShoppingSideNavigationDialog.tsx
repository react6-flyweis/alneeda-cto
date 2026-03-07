import { useState } from "react";
import { Eye, EyeOff, Edit3, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ShoppingEditTabDialog from "./ShoppingEditTabDialog";
import shoppingSideNavigationMockup from "@/assets/app-manage/shopping-app/shopping-app-side-nav.png";
import shoppingSideNavigationHiddenMockup from "@/assets/app-manage/shopping-app/shopping-app-side-nav-button.png";

interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
}

interface ShoppingSideNavigationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApply: (tabs: NavigationTab[]) => void;
  onCancel: () => void;
}

const defaultTabs: NavigationTab[] = [
  { id: "reports-analytics", label: "Reports & Analytics", visible: true },
  { id: "payment-finance", label: "Payment & Finance", visible: true },
  { id: "branch-management", label: "Branch Management", visible: true },
  { id: "roles-permission", label: "Roles & Permission", visible: true },
  {
    id: "marketing-promotions",
    label: "Marketing & Promotions",
    visible: true,
  },
  { id: "supplier", label: "Supplier", visible: true },
  { id: "language", label: "Language", visible: true },
  { id: "help-support", label: "Help & Support", visible: true },
  { id: "download-showtok", label: "Download ShowTok", visible: true },
  { id: "log-out", label: "Log Out", visible: true },
];

export default function ShoppingSideNavigationDialog({
  open,
  setOpen,
  onApply,
  onCancel,
}: ShoppingSideNavigationDialogProps) {
  const [tabs, setTabs] = useState<NavigationTab[]>(defaultTabs);
  const [editingTab, setEditingTab] = useState<NavigationTab | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  function handleToggleVisibility(id: string) {
    if (id === "payment-finance") {
      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === id ? { ...tab, visible: !tab.visible } : tab,
        ),
      );
    }
  }

  function handleDelete(id: string) {
    setTabs((prev) => prev.filter((tab) => tab.id !== id));
  }

  function handleApply() {
    onApply(tabs);
  }

  function handleCancel() {
    setTabs(defaultTabs);
    onCancel();
  }

  function openEditDialog(tab: NavigationTab) {
    setEditingTab(tab);
    setEditDialogOpen(true);
  }

  function applyEdit(updated: NavigationTab) {
    setTabs((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setEditDialogOpen(false);
    setEditingTab(null);
  }

  function closeEdit() {
    setEditDialogOpen(false);
    setEditingTab(null);
  }

  const anyHidden = tabs.some((tab) => !tab.visible);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm p-0 gap-0">
          <div className="relative flex">
            <div className="flex-1 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b p-3">
                <h2 className="text-xl font-semibold">Side Navigation</h2>
              </div>

              <div className="p-3">
                <div className="bg-(--bg-light-blue) p-2 rounded">
                  <div className="border-b pb-2">
                    <div className="text-sm font-medium">All Tabs</div>
                  </div>

                  <div className="space-y-3 mt-3">
                    {tabs.map((tab) => (
                      <div
                        key={tab.id}
                        className={cn(
                          "flex items-center gap-4",
                          !tab.visible && "opacity-60",
                        )}
                      >
                        <div className="flex-1 text-sm font-medium">
                          {tab.label}
                        </div>

                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            onClick={() => handleToggleVisibility(tab.id)}
                            aria-label={tab.visible ? "Hide tab" : "Show tab"}
                          >
                            {tab.visible ? (
                              <Eye className="size-4 text-violet-600" />
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
                            <Trash2 className="size-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="absolute -right-65 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
              <img
                src={
                  anyHidden
                    ? shoppingSideNavigationHiddenMockup
                    : shoppingSideNavigationMockup
                }
                alt="Shopping Side Navigation Preview"
                className="w-full h-auto max-w-65"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
