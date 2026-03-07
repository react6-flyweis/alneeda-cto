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

interface GroceryEditTabDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: NavigationTab | null;
  onSave: (updated: NavigationTab) => void;
  onCancel?: () => void;
}

export default function GroceryEditTabDialog({
  open,
  onOpenChange,
  tab,
  onSave,
  onCancel,
}: GroceryEditTabDialogProps) {
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

  const [filters1, setFilters1] = useState<FilterItem[]>([
    { id: "f1-1", label: "Today", visible: true },
    { id: "f1-2", label: "This Week", visible: true },
    { id: "f1-3", label: "This Month", visible: true },
    { id: "f1-4", label: "All Time", visible: true },
  ]);

  const [filters2, setFilters2] = useState<FilterItem[]>([
    { id: "f2-1", label: "All Orders", visible: true },
    { id: "f2-2", label: "New Orders", visible: true },
    { id: "f2-3", label: "Accepted", visible: true },
    { id: "f2-4", label: "Processing", visible: true },
    { id: "f2-5", label: "Packed", visible: true },
    { id: "f2-6", label: "Shipped", visible: true },
    { id: "f2-7", label: "Delivered", visible: true },
    { id: "f2-8", label: "Completed", visible: true },
    { id: "f2-9", label: "Cancelled", visible: true },
    { id: "f2-10", label: "Returned", visible: true },
  ]);

  const [editingFilter, setEditingFilter] = useState<{
    item: FilterItem;
    group: 1 | 2;
  } | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editFieldDialogOpen, setEditFieldDialogOpen] = useState(false);

  function openFilterEditor(item: FilterItem, group: 1 | 2) {
    setEditingFilter({ item, group });
    // if the filter already has a non‑empty label we treat this as an edit
    if (item.label.trim().length > 0) {
      setEditFieldDialogOpen(true);
    } else {
      setAddDialogOpen(true);
    }
  }

  function applyFilterEdit(updated: FilterItem) {
    if (!editingFilter) return;
    if (editingFilter.group === 1) {
      setFilters1(filters1.map((f) => (f.id === updated.id ? updated : f)));
    } else {
      setFilters2(filters2.map((f) => (f.id === updated.id ? updated : f)));
    }
    // dialogs are closed by their own onApply handlers, just clear editing state
    setEditingFilter(null);
  }

  function removeFilter(id: string, group: 1 | 2) {
    if (group === 1) {
      setFilters1(filters1.filter((f) => f.id !== id));
    } else {
      setFilters2(filters2.filter((f) => f.id !== id));
    }
  }

  function addFilter(group: 1 | 2) {
    const newItem: FilterItem = {
      id: `f${group}-${Date.now()}`,
      label: "",
      visible: true,
    };
    if (group === 1) {
      setFilters1([...filters1, newItem]);
      openFilterEditor(newItem, 1);
    } else {
      setFilters2([...filters2, newItem]);
      openFilterEditor(newItem, 2);
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
                    <h4 className="font-medium">Filter 1</h4>
                    <Button
                      variant="ghost"
                      onClick={() => addFilter(1)}
                      aria-label="Add filter"
                    >
                      <Plus />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {filters1.map((filter) => (
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
                              setFilters1(
                                filters1.map((f) =>
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
                            onClick={() => openFilterEditor(filter, 1)}
                          >
                            <Edit3 className="size-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            aria-label="Delete filter"
                            onClick={() => removeFilter(filter.id, 1)}
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
                    <h4 className="font-medium">Filter 2</h4>
                    <Button
                      variant="ghost"
                      onClick={() => addFilter(2)}
                      aria-label="Add filter"
                    >
                      <Plus />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {filters2.map((filter) => (
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
                              setFilters2(
                                filters2.map((f) =>
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
                            onClick={() => openFilterEditor(filter, 2)}
                          >
                            <Edit3 className="size-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            aria-label="Delete filter"
                            onClick={() => removeFilter(filter.id, 2)}
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
        initial={
          editingFilter
            ? {
                id: editingFilter.item.id,
                label: editingFilter.item.label,
                dropdownItems: editingFilter.item.options,
              }
            : undefined
        }
        onApply={(f) => {
          const updated: FilterItem = {
            id: f.id,
            label: f.label,
            visible: editingFilter?.item.visible ?? true,
            options: f.dropdownItems,
          };
          applyFilterEdit(updated);
        }}
        onCancel={() => {
          if (editingFilter && editingFilter.item.label.trim() === "") {
            removeFilter(editingFilter.item.id, editingFilter.group);
          }
          setAddDialogOpen(false);
          setEditingFilter(null);
        }}
      />

      <AddFieldDialog
        open={editFieldDialogOpen}
        setOpen={setEditFieldDialogOpen}
        initial={
          editingFilter
            ? {
                id: editingFilter.item.id,
                label: editingFilter.item.label,
                dropdownItems: editingFilter.item.options,
              }
            : undefined
        }
        onApply={(f) => {
          const updated: FilterItem = {
            id: f.id,
            label: f.label,
            visible: editingFilter?.item.visible ?? true,
            options: f.dropdownItems,
          };
          applyFilterEdit(updated);
        }}
        onCancel={() => {
          setEditFieldDialogOpen(false);
          setEditingFilter(null);
        }}
      />
    </>
  );
}
