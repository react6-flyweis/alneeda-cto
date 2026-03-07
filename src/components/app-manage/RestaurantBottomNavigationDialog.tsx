import { useState } from "react";
import { Eye, EyeOff, Edit3, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import restaurantBottomNav from "@/assets/app-manage/restaurant-app/restaurant-app-bottom-nav.png";
import restaurantBottomNavHidden from "@/assets/app-manage/restaurant-app/restaurant-app-bottom-nav-hidden.png";

import RestaurantEditTabDialog from "./RestaurantEditTabDialog";

export interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
}

interface RestaurantBottomNavigationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApply: (tabs: NavigationTab[]) => void;
  onCancel: () => void;
}

const defaultTabs: NavigationTab[] = [
  { id: "allneedaeats", label: "AllneedaEats", visible: true },
  { id: "orders", label: "Orders", visible: true },
  { id: "third-party", label: "3rd Party", visible: true },
  { id: "website", label: "Website", visible: true },
];

export default function RestaurantBottomNavigationDialog({
  open,
  setOpen,
  onApply,
  onCancel,
}: RestaurantBottomNavigationDialogProps) {
  const [tabs, setTabs] = useState<NavigationTab[]>(defaultTabs);

  const [editingTab, setEditingTab] = useState<NavigationTab | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [showSideNav, setShowSideNav] = useState(false);

  const sideNavOptions: { id: string; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "orders", label: "Orders" },
    { id: "printer", label: "Printer" },
    { id: "customers", label: "Customers" },
  ];

  function handleAddFromSideNav(option: { id: string; label: string }) {
    if (tabs.some((t) => t.id === option.id)) return;
    // use functional update to avoid stale state and close the side-nav selector after adding
    setTabs((prev) => [
      ...prev,
      { id: option.id, label: option.label, visible: true },
    ]);
    setShowSideNav(false);
  }

  function handleToggleVisibility(id: string) {
    if (id === "third-party") {
      setTabs(
        tabs.map((tab) =>
          tab.id === id ? { ...tab, visible: !tab.visible } : tab,
        ),
      );
    }
  }

  function handleDelete(id: string) {
    setTabs(tabs.filter((t) => t.id !== id));
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
    setTabs(tabs.map((t) => (t.id === updated.id ? updated : t)));
    setEditDialogOpen(false);
    setEditingTab(null);
  }

  function closeEdit() {
    setEditDialogOpen(false);
    setEditingTab(null);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm p-0 gap-0 ">
          <div className="relative flex">
            <div className="flex-1 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b p-3">
                <h2 className="text-xl font-semibold">Bottom Navigation</h2>
              </div>

              <div className="p-3">
                <div className="bg-(--bg-light-blue) p-2 rounded">
                  <div className="border-b flex justify-between items-center">
                    <div className="text-sm font-medium">Add New Tab</div>
                    {!showSideNav && (
                      <Button
                        aria-label="Add tab"
                        variant="ghost"
                        onClick={() => setShowSideNav(true)}
                      >
                        <Plus />
                      </Button>
                    )}
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
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {showSideNav && (
                  <div className="bg-(--bg-light-blue) p-2 rounded mt-4">
                    <div className="border-b p-2">
                      <div className="text-sm font-medium">
                        Select From Side Navigation Bar
                      </div>
                    </div>

                    <div className="space-y-3 mt-3">
                      {sideNavOptions
                        .filter((opt) => !tabs.some((t) => t.id === opt.id))
                        .map((opt) => (
                          <div
                            key={opt.id}
                            className="flex items-center justify-between"
                          >
                            <div className="text-sm font-medium">
                              {opt.label}
                            </div>
                            <Button
                              variant="outline"
                              onClick={() => handleAddFromSideNav(opt)}
                              className="px-3 bg-transparent"
                            >
                              Add
                            </Button>
                          </div>
                        ))}

                      {sideNavOptions.every((opt) =>
                        tabs.some((t) => t.id === opt.id),
                      ) && (
                        <div className="text-sm text-muted-foreground">
                          All side navigation items are already added.
                        </div>
                      )}
                    </div>
                  </div>
                )}

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

            <div className="absolute -right-65 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
              <img
                src={
                  tabs.find((t) => t.id === "third-party")?.visible
                    ? restaurantBottomNav
                    : restaurantBottomNavHidden
                }
                alt="Restaurant Bottom Preview"
                className="w-full h-auto max-w-65"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <RestaurantEditTabDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        tab={editingTab}
        onSave={applyEdit}
        onCancel={closeEdit}
      />
    </>
  );
}
