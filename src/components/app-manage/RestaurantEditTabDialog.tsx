import { useEffect, useState } from "react";
import { Edit3, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import AddFieldDialog from "./AddFieldDialog"; // use add/edit field dialog for editing filters

interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
}

interface FilterItem {
  id: string;
  label: string;
  visible: boolean;
  // optional dropdown options (used by fields like "Status")
  options?: string[];
}

interface RestaurantEditTabDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: NavigationTab | null;
  onSave: (updated: NavigationTab) => void;
  onCancel?: () => void;
}

export default function RestaurantEditTabDialog({
  open,
  onOpenChange,
  tab,
  onSave,
  onCancel,
}: RestaurantEditTabDialogProps) {
  const [localTab, setLocalTab] = useState<NavigationTab | null>(null);

  useEffect(() => {
    // copy incoming tab into local state when dialog opens or tab changes
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

  const [filters, setFilters] = useState<FilterItem[]>([
    { id: "f1", label: "All Branch", visible: true },
    {
      id: "f2",
      label: "Status",
      visible: true,
      options: ["All Status", "Active", "Scheduled", "Completed"],
    },
    { id: "f3", label: "Time Frame", visible: true },
    { id: "f4", label: "orders", visible: true },
  ]);

  const [editingFilter, setEditingFilter] = useState<FilterItem | null>(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  function openFilterEditor(filter: FilterItem) {
    setEditingFilter(filter);
    setFilterDialogOpen(true);
  }

  function applyFilterEdit(updated: FilterItem) {
    setFilters(filters.map((f) => (f.id === updated.id ? updated : f)));
    setFilterDialogOpen(false);
    setEditingFilter(null);
  }

  function removeFilter(id: string) {
    setFilters(filters.filter((f) => f.id !== id));
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

              <div className="bg-[#eef4ff] rounded p-3">
                <h4 className="font-medium mb-3">Filters</h4>
                <div className="space-y-2">
                  {filters.map((filter) => (
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
                        {filter.label}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          aria-label="Toggle visibility"
                          onClick={() =>
                            setFilters(
                              filters.map((f) =>
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
                          onClick={() => openFilterEditor(filter)}
                        >
                          <Edit3 className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          aria-label="Delete filter"
                          onClick={() => removeFilter(filter.id)}
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
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

      <AddFieldDialog
        open={filterDialogOpen}
        setOpen={setFilterDialogOpen}
        initial={
          editingFilter
            ? {
                id: editingFilter.id,
                label: editingFilter.label,
                dropdownItems: editingFilter.options ?? [],
              }
            : undefined
        }
        onApply={(updated) =>
          applyFilterEdit({
            id: updated.id,
            label: updated.label,
            visible: editingFilter?.visible ?? true,
            options: updated.dropdownItems ?? editingFilter?.options ?? [],
          })
        }
        onCancel={() => {
          setFilterDialogOpen(false);
          setEditingFilter(null);
        }}
      />
    </>
  );
}
