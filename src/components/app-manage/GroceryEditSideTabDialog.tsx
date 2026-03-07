import { useRef, useState } from "react";
import { Edit3, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import AddFieldDialog from "./AddFieldDialog";

interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
}

interface SectionItem {
  id: string;
  label: string;
  visible: boolean;
}

type SectionKey = "quick-reports" | "graphics";

interface EditingItemState {
  group: SectionKey;
  item: SectionItem;
  isNew: boolean;
}

interface GroceryEditSideTabDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: NavigationTab | null;
  onSave: (updated: NavigationTab) => void;
  onCancel?: () => void;
}

const DEFAULT_QUICK_REPORTS: SectionItem[] = [
  { id: "quick-sales", label: "Sales", visible: true },
  { id: "quick-orders", label: "Orders", visible: true },
  { id: "quick-earning", label: "Earning", visible: true },
  { id: "quick-returns", label: "Returns", visible: true },
  { id: "quick-fulfillment-rate", label: "Fulfillment Rate", visible: true },
  { id: "quick-products", label: "Products", visible: true },
];

const DEFAULT_GRAPHICS: SectionItem[] = [
  { id: "graphics-customer-count", label: "Customer Count", visible: true },
  { id: "graphics-monthly-earning", label: "Monthly Earning", visible: true },
  { id: "graphics-orders-region", label: "Orders by Region", visible: true },
  {
    id: "graphics-earning-product",
    label: "Earnings by Product",
    visible: true,
  },
  { id: "graphics-returns-reason", label: "Returns by Reason", visible: true },
  {
    id: "graphics-best-selling-products",
    label: "Best Selling Products",
    visible: true,
  },
  {
    id: "graphics-customer-buying-trends",
    label: "Customer Buying Trends",
    visible: true,
  },
  { id: "graphics-profit-loss", label: "Profit & loss", visible: true },
  { id: "graphics-seasonal-demand", label: "Seasonal demand", visible: true },
];

export default function GroceryEditSideTabDialog({
  open,
  onOpenChange,
  tab,
  onSave,
  onCancel,
}: GroceryEditSideTabDialogProps) {
  const [draftTabLabels, setDraftTabLabels] = useState<Record<string, string>>(
    {},
  );
  const [quickReports, setQuickReports] = useState<SectionItem[]>(
    DEFAULT_QUICK_REPORTS,
  );
  const [graphics, setGraphics] = useState<SectionItem[]>(DEFAULT_GRAPHICS);
  const nextItemIdRef = useRef<number>(1);

  const [editingItem, setEditingItem] = useState<EditingItemState | null>(null);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);

  function updateSectionItems(
    group: SectionKey,
    updater: (items: SectionItem[]) => SectionItem[],
  ) {
    if (group === "quick-reports") {
      setQuickReports((prev) => updater(prev));
      return;
    }

    setGraphics((prev) => updater(prev));
  }

  function handleChangeLabel(e: React.ChangeEvent<HTMLInputElement>) {
    if (!tab) return;
    const value = e.target.value;
    setDraftTabLabels((prev) => ({ ...prev, [tab.id]: value }));
  }

  function handleSave() {
    if (!tab) return;
    const resolvedLabel = draftTabLabels[tab.id] ?? tab.label;
    onSave({ ...tab, label: resolvedLabel });
    setDraftTabLabels((prev) => {
      const next = { ...prev };
      delete next[tab.id];
      return next;
    });
    onOpenChange(false);
  }

  function handleClose() {
    if (tab) {
      setDraftTabLabels((prev) => {
        const next = { ...prev };
        delete next[tab.id];
        return next;
      });
    }
    onOpenChange(false);
    onCancel?.();
  }

  const resolvedTabLabel = tab ? (draftTabLabels[tab.id] ?? tab.label) : "";

  function handleToggleVisibility(group: SectionKey, id: string) {
    updateSectionItems(group, (items) =>
      items.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item,
      ),
    );
  }

  function handleDelete(group: SectionKey, id: string) {
    updateSectionItems(group, (items) =>
      items.filter((item) => item.id !== id),
    );
  }

  function openItemEditor(group: SectionKey, item: SectionItem) {
    setEditingItem({ group, item, isNew: false });
    setItemDialogOpen(true);
  }

  function handleAddItem(group: SectionKey) {
    const newItem: SectionItem = {
      id: `${group}-${nextItemIdRef.current}`,
      label: "",
      visible: true,
    };
    nextItemIdRef.current += 1;

    updateSectionItems(group, (items) => [...items, newItem]);
    setEditingItem({ group, item: newItem, isNew: true });
    setItemDialogOpen(true);
  }

  function applyItem(updated: { id: string; label: string }) {
    if (!editingItem) return;

    updateSectionItems(editingItem.group, (items) =>
      items.map((item) =>
        item.id === updated.id ? { ...item, label: updated.label } : item,
      ),
    );

    setItemDialogOpen(false);
    setEditingItem(null);
  }

  function cancelItemEdit() {
    if (editingItem?.isNew) {
      handleDelete(editingItem.group, editingItem.item.id);
    }

    setItemDialogOpen(false);
    setEditingItem(null);
  }

  function renderSection(
    title: string,
    group: SectionKey,
    items: SectionItem[],
  ): React.ReactNode {
    return (
      <div className="bg-(--bg-light-blue) rounded-xl p-3">
        <div className="flex items-center justify-between pb-3 border-b border-black/10">
          <h4 className=" font-semibold">{title}</h4>
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleAddItem(group)}
            aria-label={`Add ${title} item`}
          >
            <Plus className="" />
          </Button>
        </div>

        <div className="space-y-3 pt-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center justify-between",
                !item.visible && "opacity-60",
              )}
            >
              <div className="text-base font-semibold">
                {item.label || "(untitled)"}
              </div>

              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => handleToggleVisibility(group, item.id)}
                  aria-label={item.visible ? "Hide item" : "Show item"}
                >
                  {item.visible ? (
                    <Eye className=" text-violet-600" />
                  ) : (
                    <EyeOff className="" />
                  )}
                </Button>

                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => openItemEditor(group, item)}
                  aria-label="Edit item"
                >
                  <Edit3 className="" />
                </Button>

                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => handleDelete(group, item.id)}
                  aria-label="Delete item"
                >
                  <Trash2 className=" text-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 gap-0 sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader className="border-b p-4">
            <h3 className="text-lg font-semibold">Edit Title</h3>
          </DialogHeader>

          <div className="p-4 space-y-4">
            <div>
              <Label className="mb-2 text-lg font-semibold">Tab Name</Label>
              <Input
                className="h-11 text-base rounded-lg"
                value={resolvedTabLabel}
                onChange={handleChangeLabel}
              />
            </div>

            {renderSection("Quick Reports", "quick-reports", quickReports)}
            {renderSection("Graphics", "graphics", graphics)}

            <div className="flex gap-4 pt-2">
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="flex-1 h-12 rounded-full bg-[#3E4250] text-white hover:bg-[#2E3240] hover:text-white border-0"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="flex-1 h-12 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddFieldDialog
        open={itemDialogOpen}
        setOpen={setItemDialogOpen}
        initial={
          editingItem
            ? {
                id: editingItem.item.id,
                label: editingItem.item.label,
              }
            : undefined
        }
        onApply={applyItem}
        onCancel={cancelItemEdit}
      />
    </>
  );
}
