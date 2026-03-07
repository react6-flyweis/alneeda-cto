import { useEffect, useState } from "react";
import { Edit3, Eye, EyeOff, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import AddFilterDialog from "./AddFilterDialog";
import AddFieldDialog from "./AddFieldDialog";

interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
}

interface FilterItem {
  id: string;
  label: string;
  visible: boolean;
  options?: string[];
}

interface ShoppingEditTabDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: NavigationTab | null;
  onSave: (updated: NavigationTab) => void;
  onCancel?: () => void;
}

export default function ShoppingEditTabDialog({
  open,
  onOpenChange,
  tab,
  onSave,
  onCancel,
}: ShoppingEditTabDialogProps) {
  const [localTab, setLocalTab] = useState<NavigationTab | null>(null);

  useEffect(() => {
    if (tab && open) {
      setLocalTab({ ...tab });
    }
    if (!open) setLocalTab(null);
  }, [tab, open]);

  function handleChangeLabel(e: React.ChangeEvent<HTMLInputElement>) {
    if (!localTab) return;
    setLocalTab({ ...localTab, label: e.target.value });
  }

  function handleSave() {
    if (!localTab) return;
    onSave(localTab);
    onOpenChange(false);
  }

  function handleClose() {
    onOpenChange(false);
    onCancel?.();
  }

  // quick reports defaults from screenshot
  const [quickReports, setQuickReports] = useState<FilterItem[]>([
    { id: "qr-1", label: "Sales", visible: true },
    { id: "qr-2", label: "Orders", visible: true },
    { id: "qr-3", label: "Earning", visible: true },
    { id: "qr-4", label: "Returns", visible: true },
    { id: "qr-5", label: "Fulfillment Rate", visible: true },
    { id: "qr-6", label: "Products", visible: true },
  ]);

  const [graphics, setGraphics] = useState<FilterItem[]>([
    { id: "g-1", label: "Customer Count", visible: true },
    { id: "g-2", label: "Monthly Earning", visible: true },
    { id: "g-3", label: "Orders by Region", visible: true },
    { id: "g-4", label: "Earnings by Product", visible: true },
    { id: "g-5", label: "Returns by Reason", visible: true },
    { id: "g-6", label: "Best Selling Products", visible: true },
    { id: "g-7", label: "Customer Buying Trends", visible: true },
    { id: "g-8", label: "Profit & loss", visible: true },
    { id: "g-9", label: "Seasonal demand", visible: true },
  ]);

  const [editingFilter, setEditingFilter] = useState<{
    item: FilterItem;
    group: "quick" | "graphics";
  } | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editFieldDialogOpen, setEditFieldDialogOpen] = useState(false);

  function openFilterEditor(item: FilterItem, group: "quick" | "graphics") {
    setEditingFilter({ item, group });
    if (item.label.trim().length > 0) {
      setEditFieldDialogOpen(true);
    } else {
      setAddDialogOpen(true);
    }
  }

  function applyFilterEdit(updated: FilterItem) {
    if (!editingFilter) return;
    if (editingFilter.group === "quick") {
      setQuickReports(
        quickReports.map((f) => (f.id === updated.id ? updated : f)),
      );
    } else {
      setGraphics(graphics.map((f) => (f.id === updated.id ? updated : f)));
    }
    setEditingFilter(null);
  }

  function removeFilter(id: string, group: "quick" | "graphics") {
    if (group === "quick") {
      setQuickReports(quickReports.filter((f) => f.id !== id));
    } else {
      setGraphics(graphics.filter((f) => f.id !== id));
    }
  }

  function addFilter(group: "quick" | "graphics") {
    const newItem: FilterItem = {
      id: `${group}-${Date.now()}`,
      label: "",
      visible: true,
    };
    if (group === "quick") {
      setQuickReports([...quickReports, newItem]);
      openFilterEditor(newItem, "quick");
    } else {
      setGraphics([...graphics, newItem]);
      openFilterEditor(newItem, "graphics");
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-sm p-0 gap-0">
          <div className="relative flex">
            <div className="w-full p-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Change Title</h3>
              </div>

              <div className="mb-4">
                <Label className="mb-1">Tab Name</Label>
                <Input
                  className="rounded"
                  value={localTab?.label ?? ""}
                  onChange={handleChangeLabel}
                />
              </div>

              <div className="space-y-4">
                <div className="bg-[#eef4ff] rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Quick Reports</h4>
                    <Button
                      variant="ghost"
                      onClick={() => addFilter("quick")}
                      aria-label="Add filter"
                    >
                      <Plus />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {quickReports.map((filter) => (
                      <div
                        key={filter.id}
                        className="flex items-center justify-between"
                      >
                        <div
                          className={cn(
                            "text-sm",
                            !filter.visible && "opacity-60",
                          )}
                        >
                          {filter.label || "(untitled)"}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            aria-label="Toggle visibility"
                            onClick={() =>
                              setQuickReports(
                                quickReports.map((f) =>
                                  f.id === filter.id
                                    ? { ...f, visible: !f.visible }
                                    : f,
                                ),
                              )
                            }
                          >
                            {filter.visible ? (
                              <Eye className="size-4 text-violet-600" />
                            ) : (
                              <EyeOff className="size-4" />
                            )}
                          </Button>

                          <Button
                            variant="ghost"
                            aria-label="Edit filter"
                            onClick={() => openFilterEditor(filter, "quick")}
                          >
                            <Edit3 className="size-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            aria-label="Delete filter"
                            onClick={() => removeFilter(filter.id, "quick")}
                          >
                            <Trash2 className="size-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#eef4ff] rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Graphics</h4>
                    <Button
                      variant="ghost"
                      onClick={() => addFilter("graphics")}
                      aria-label="Add filter"
                    >
                      <Plus />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {graphics.map((filter) => (
                      <div
                        key={filter.id}
                        className="flex items-center justify-between"
                      >
                        <div
                          className={cn(
                            "text-sm",
                            !filter.visible && "opacity-60",
                          )}
                        >
                          {filter.label || "(untitled)"}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            aria-label="Toggle visibility"
                            onClick={() =>
                              setGraphics(
                                graphics.map((f) =>
                                  f.id === filter.id
                                    ? { ...f, visible: !f.visible }
                                    : f,
                                ),
                              )
                            }
                          >
                            {filter.visible ? (
                              <Eye className="size-4 text-violet-600" />
                            ) : (
                              <EyeOff className="size-4" />
                            )}
                          </Button>

                          <Button
                            variant="ghost"
                            aria-label="Edit filter"
                            onClick={() => openFilterEditor(filter, "graphics")}
                          >
                            <Edit3 className="size-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            aria-label="Delete filter"
                            onClick={() => removeFilter(filter.id, "graphics")}
                          >
                            <Trash2 className="size-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 h-12 rounded-full bg-[#3E4250] text-white hover:bg-[#2E3240] hover:text-white border-0"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 h-12 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddFilterDialog
        open={addDialogOpen}
        setOpen={setAddDialogOpen}
        onApply={(f) => {
          // convert form result into our internal FilterItem shape
          const converted: FilterItem = {
            id: f.id,
            label: f.label,
            // keep existing visibility if we were editing an item,
            // otherwise default to true for newly added filters
            visible: editingFilter?.item.visible ?? true,
            options: f.dropdownItems?.length ? f.dropdownItems : undefined,
          };
          applyFilterEdit(converted);
        }}
        onCancel={() => setAddDialogOpen(false)}
      />

      <AddFieldDialog
        open={editFieldDialogOpen}
        setOpen={setEditFieldDialogOpen}
        onApply={(f) => {
          const converted: FilterItem = {
            id: f.id,
            label: f.label,
            visible: editingFilter?.item.visible ?? true,
            options: f.dropdownItems?.length ? f.dropdownItems : undefined,
          };
          applyFilterEdit(converted);
        }}
        onCancel={() => setEditFieldDialogOpen(false)}
        initial={editingFilter?.item}
      />
    </>
  );
}
