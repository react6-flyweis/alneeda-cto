import { useEffect, useState } from "react";
import { Edit3, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddFieldDialog from "./AddFieldDialog";
import { cn } from "@/lib/utils";

interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
}

interface EditSideTabDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: NavigationTab | null;
  onSave: (updated: NavigationTab) => void;
  onCancel?: () => void;
}

export default function EditSideTabDialog({
  open,
  onOpenChange,
  tab,
  onSave,
  onCancel,
}: EditSideTabDialogProps) {
  const [localTab, setLocalTab] = useState<NavigationTab | null>(null);

  useEffect(() => {
    if (tab && open) setLocalTab({ ...tab });
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

  // --- UI-only screens & filters (local-only per requirement) ---
  const [screens, setScreens] = useState([
    { id: "s1", label: "Ongoing", visible: true },
    { id: "s2", label: "Completed", visible: true },
  ]);
  const [filters, setFilters] = useState([
    { id: "f1", label: "All", visible: true },
    { id: "f2", label: "Food Orders", visible: true },
    { id: "f3", label: "Grocery Orders", visible: true },
  ]);

  const [fieldDialogOpen, setFieldDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<null | {
    id: string;
    label: string;
  }>(null);
  const [fieldTarget, setFieldTarget] = useState<"screens" | "filters" | null>(
    null,
  );

  function toggleVisibility(listName: "screens" | "filters", id: string) {
    const setter = listName === "screens" ? setScreens : setFilters;
    setter((prev: any[]) =>
      prev.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p)),
    );
  }

  function openAddField(listName: "screens" | "filters") {
    setEditingField(null);
    setFieldTarget(listName);
    setFieldDialogOpen(true);
  }

  function openEditField(
    listName: "screens" | "filters",
    item: { id: string; label: string },
  ) {
    setEditingField({ id: item.id, label: item.label });
    setFieldTarget(listName);
    setFieldDialogOpen(true);
  }

  function applyField(field: { id: string; label: string }) {
    if (fieldTarget === "screens") {
      setScreens((prev) => {
        const exists = prev.some((p) => p.id === field.id);
        if (exists)
          return prev.map((p) =>
            p.id === field.id ? { ...p, label: field.label } : p,
          );
        return [...prev, { id: field.id, label: field.label, visible: true }];
      });
    } else if (fieldTarget === "filters") {
      setFilters((prev) => {
        const exists = prev.some((p) => p.id === field.id);
        if (exists)
          return prev.map((p) =>
            p.id === field.id ? { ...p, label: field.label } : p,
          );
        return [...prev, { id: field.id, label: field.label, visible: true }];
      });
    }

    setFieldDialogOpen(false);
    setEditingField(null);
    setFieldTarget(null);
  }

  function removeScreen(id: string) {
    setScreens((prev) => prev.filter((s) => s.id !== id));
  }

  function removeFilter(id: string) {
    setFilters((prev) => prev.filter((f) => f.id !== id));
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
                  value={localTab?.label ?? ""}
                  onChange={handleChangeLabel}
                />
              </div>

              <div className="bg-[#eef4ff] rounded p-3 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Screens</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openAddField("screens")}
                  >
                    Add
                  </Button>
                </div>

                <div className="space-y-2">
                  {screens.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between"
                    >
                      <div
                        className={cn("text-sm", !s.visible && "opacity-60")}
                      >
                        {s.label}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          aria-label="Toggle visibility"
                          onClick={() => toggleVisibility("screens", s.id)}
                        >
                          {s.visible ? (
                            <Eye className="size-4 text-violet-600" />
                          ) : (
                            <EyeOff className="size-4" />
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          aria-label="Edit screen"
                          onClick={() => openEditField("screens", s)}
                        >
                          <Edit3 className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          aria-label="Delete screen"
                          onClick={() => removeScreen(s.id)}
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#eef4ff] rounded p-3">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Filters Name</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openAddField("filters")}
                  >
                    Add
                  </Button>
                </div>

                <div className="space-y-2">
                  {filters.map((f) => (
                    <div
                      key={f.id}
                      className="flex items-center justify-between"
                    >
                      <div
                        className={cn("text-sm", !f.visible && "opacity-60")}
                      >
                        {f.label}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          aria-label="Toggle visibility"
                          onClick={() => toggleVisibility("filters", f.id)}
                        >
                          {f.visible ? (
                            <Eye className="size-4 text-violet-600" />
                          ) : (
                            <EyeOff className="size-4" />
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          aria-label="Edit filter"
                          onClick={() => openEditField("filters", f)}
                        >
                          <Edit3 className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          aria-label="Delete filter"
                          onClick={() => removeFilter(f.id)}
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
                  variant="secondary"
                  className="flex-1 h-12 rounded-full"
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

            <div className="absolute -right-65 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
              {/* intentionally empty — Side-nav preview image not required for local-only dialog */}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddFieldDialog
        open={fieldDialogOpen}
        setOpen={setFieldDialogOpen}
        onApply={applyField}
        onCancel={() => {
          setFieldDialogOpen(false);
          setEditingField(null);
          setFieldTarget(null);
        }}
        initial={editingField ?? undefined}
      />
    </>
  );
}
