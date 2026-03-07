import { useState } from "react";
import { Eye, EyeOff, Edit3, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import restaurantSideNav from "@/assets/app-manage/restaurant-app/restaurant-app-side-nav.png";
import restaurantSideNavHidden from "@/assets/app-manage/restaurant-app/restaurant-app-side-nav-hidden.png";
import RestaurantEditTabDialog from "./RestaurantEditTabDialog";

export interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApply: (tabs: NavigationTab[]) => void;
  onCancel: () => void;
}

const defaultTabs: NavigationTab[] = [
  { id: "dashboard", label: "Dashboard", visible: true },
  { id: "orders", label: "Orders", visible: true },
  { id: "printer", label: "Printer", visible: true },
  { id: "customers", label: "Customers", visible: true },
  { id: "menu", label: "Menu", visible: true },
  { id: "branches", label: "Branches", visible: true },
  { id: "mobile-payment", label: "Mobile Payment", visible: true },
  { id: "chargeback", label: "Chargeback", visible: true },
  { id: "restaurant-timing", label: "Restaurant Timing", visible: true },
  { id: "delivery-management", label: "Delivery Management", visible: true },
  { id: "transactions", label: "Transactions", visible: true },
  { id: "workforce-management", label: "Workforce Management", visible: true },
  { id: "local-listings", label: "Local Listings", visible: true },
];

export default function RestaurantSideNavigationDialog({
  open,
  setOpen,
  onApply,
  onCancel,
}: Props) {
  const [tabs, setTabs] = useState<NavigationTab[]>(defaultTabs);

  const [editingTab, setEditingTab] = useState<NavigationTab | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  function handleToggleVisibility(id: string) {
    if (id === "printer") {
      setTabs((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: !t.visible } : t)),
      );
    }
  }

  function handleDelete(id: string) {
    setTabs((prev) => prev.filter((t) => t.id !== id));
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

  const anyHidden = tabs.some((t) => !t.visible);

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
                  <div className="border-b flex justify-between items-center">
                    <div className="text-sm font-medium">Add New Tab</div>
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
                src={anyHidden ? restaurantSideNavHidden : restaurantSideNav}
                alt="Restaurant Side Navigation Preview"
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
