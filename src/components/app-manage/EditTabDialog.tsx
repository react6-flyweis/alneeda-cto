import { useEffect, useState } from "react";
import { Edit3, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import editPageMockup from "@/assets/app-manage/edit-page.png";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import EditCategoryDialog from "./EditCategoryDialog";
import EditBodyDialog from "./EditBodyDialog";

interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
}

interface EditTabDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: NavigationTab | null;
  onSave: (updated: NavigationTab) => void;
  onCancel?: () => void;
}

export default function EditTabDialog({
  open,
  onOpenChange,
  tab,
  onSave,
  onCancel,
}: EditTabDialogProps) {
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

  // categories & body items kept in state so they can be edited by the "Edit category" dialog
  const [categories, setCategories] = useState<
    {
      id: string;
      label: string;
      visible: boolean;
      icon?: string;
    }[]
  >([
    { id: "c1", label: "Order Food", visible: true, icon: undefined },
    { id: "c2", label: "Grocery Essentials", visible: true },
    { id: "c3", label: "Shopping Deals", visible: true },
    { id: "c4", label: "IT Services", visible: false },
    { id: "c5", label: "Home Services", visible: true },
    { id: "c6", label: "Jobs", visible: true },
  ]);

  const [bodyItems, setBodyItems] = useState<
    {
      id: string;
      label: string;
      visible: boolean;
      subHeadline?: string;
    }[]
  >([
    {
      id: "b1",
      label: "Food you may like",
      visible: true,
      subHeadline: "Recommended for you",
    },
    {
      id: "b2",
      label: "Grab your deal",
      visible: true,
      subHeadline: "Shop by Type / Collection:",
    },
    {
      id: "b3",
      label: "Featured products for you",
      visible: true,
      subHeadline: "",
    },
    { id: "b4", label: "IT Services", visible: true, subHeadline: "" },
    { id: "b5", label: "Home Services", visible: true, subHeadline: "" },
  ]);

  const [editingCategory, setEditingCategory] = useState<null | {
    id: string;
    label: string;
    visible: boolean;
    icon?: string;
  }>(null);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  function openCategoryEditor(cat: {
    id: string;
    label: string;
    visible: boolean;
    icon?: string;
  }) {
    setEditingCategory(cat);
    setCategoryDialogOpen(true);
  }

  function applyCategoryEdit(updated: {
    id: string;
    label: string;
    visible?: boolean;
    icon?: string;
  }) {
    setCategories(
      categories.map((c) =>
        c.id === updated.id
          ? { ...updated, visible: updated.visible ?? c.visible ?? true }
          : c,
      ),
    );
    setCategoryDialogOpen(false);
    setEditingCategory(null);
  }

  function removeCategory(id: string) {
    setCategories(categories.filter((c) => c.id !== id));
  }

  // --- body item editing state & helpers ---
  const [editingBodyItem, setEditingBodyItem] = useState<null | {
    id: string;
    label: string;
    visible: boolean;
    subHeadline?: string;
  }>(null);
  const [bodyDialogOpen, setBodyDialogOpen] = useState(false);

  function openBodyEditor(item: {
    id: string;
    label: string;
    visible: boolean;
    subHeadline?: string;
  }) {
    setEditingBodyItem(item);
    setBodyDialogOpen(true);
  }

  function applyBodyEdit(updated: {
    id: string;
    label: string;
    visible: boolean;
    subHeadline?: string;
  }) {
    setBodyItems(bodyItems.map((b) => (b.id === updated.id ? updated : b)));
    setBodyDialogOpen(false);
    setEditingBodyItem(null);
  }

  function removeBodyItem(id: string) {
    setBodyItems(bodyItems.filter((b) => b.id !== id));
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-sm p-0 gap-0">
          <div className="relative flex">
            {/* left side */}
            <div className="w-full p-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Change Title</h3>
              </div>

              <div className="mb-4">
                <Label className="mb-1">Tab name</Label>
                <Input
                  className="rounded"
                  value={localTab?.label ?? ""}
                  onChange={handleChangeLabel}
                />
              </div>

              <div className="bg-[#eef4ff] rounded p-3">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between"
                    >
                      <div
                        className={cn("text-sm", !cat.visible && "opacity-60")}
                      >
                        {cat.label}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          aria-label="Toggle visibility"
                          onClick={() =>
                            setCategories(
                              categories.map((ct) =>
                                ct.id === cat.id
                                  ? { ...ct, visible: !ct.visible }
                                  : ct,
                              ),
                            )
                          }
                        >
                          {cat.visible ? (
                            <Eye className="size-4 text-violet-600" />
                          ) : (
                            <EyeOff className="size-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          aria-label="Edit category"
                          onClick={() => openCategoryEditor(cat)}
                        >
                          <Edit3 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          aria-label="Delete category"
                          onClick={() => removeCategory(cat.id)}
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#eef4ff] rounded p-3 mt-4">
                <h4 className="font-medium mb-3">Body</h4>
                <div className="space-y-2">
                  {bodyItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div
                        className={cn("text-sm", !item.visible && "opacity-60")}
                      >
                        {item.label}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          aria-label="Toggle visibility"
                          onClick={() =>
                            setBodyItems(
                              bodyItems.map((b) =>
                                b.id === item.id
                                  ? { ...b, visible: !b.visible }
                                  : b,
                              ),
                            )
                          }
                        >
                          {item.visible ? (
                            <Eye className="size-4 text-violet-600" />
                          ) : (
                            <EyeOff className="size-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          aria-label="Edit body item"
                          onClick={() => openBodyEditor(item)}
                        >
                          <Edit3 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          aria-label="Delete body item"
                          onClick={() => removeBodyItem(item.id)}
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
              <img
                src={editPageMockup}
                alt="Preview"
                className="w-full h-auto max-w-65"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EditCategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        category={editingCategory}
        onSave={applyCategoryEdit}
        onCancel={() => {
          setCategoryDialogOpen(false);
          setEditingCategory(null);
        }}
      />

      <EditBodyDialog
        open={bodyDialogOpen}
        onOpenChange={setBodyDialogOpen}
        bodyItem={editingBodyItem}
        onSave={applyBodyEdit}
        onCancel={() => {
          setBodyDialogOpen(false);
          setEditingBodyItem(null);
        }}
      />
    </>
  );
}
