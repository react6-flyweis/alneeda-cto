import { useState } from "react";
import { Eye, EyeOff, Edit3, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import socialAppMockup from "@/assets/app-manage/social-app/social-app.png";
import socialAppBottomHiddenMockup from "@/assets/app-manage/social-app/social-app-bottom-hidden.png";
import AddFieldDialog from "./AddFieldDialog";

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
  { id: "inbox", label: "Inbox", visible: true },
  { id: "post", label: "Post", visible: true },
  { id: "services", label: "Services", visible: true },
  { id: "profile", label: "Profile", visible: true },
];

export default function SocialMediaBottomNavigationDialog({
  open,
  setOpen,
  onApply,
  onCancel,
}: BottomNavigationDialogProps) {
  const [tabs, setTabs] = useState<NavigationTab[]>(defaultTabs);

  // Edit Tab dialog state
  const [editingTab, setEditingTab] = useState<NavigationTab | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleToggleVisibility = (id: string) => {
    if (id === "post") {
      setTabs(
        tabs.map((tab) =>
          tab.id === id ? { ...tab, visible: !tab.visible } : tab,
        ),
      );
    }
  };

  const handleAddNewTab = () => {
    // const newTab: NavigationTab = {
    //   id: `tab-${Date.now()}`,
    //   label: "New Tab",
    //   visible: true,
    // };
    // setTabs([...tabs, newTab]);
  };

  const handleApply = () => {
    onApply(tabs);
  };

  const handleCancel = () => {
    setTabs(defaultTabs);
    onCancel();
  };

  const openEditDialog = (tab: NavigationTab) => {
    setEditingTab(tab);
    setEditDialogOpen(true);
  };

  // apply edits coming from the `AddFieldDialog` (returns { id, label })
  const applyEdit = (_updated: { id: string; label: string }) => {
    // setTabs(
    //   tabs.map((t) =>
    //     t.id === updated.id ? { ...t, label: updated.label } : t,
    //   ),
    // );
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
            <div className="flex-1">
              <div className="flex items-center justify-between border-b p-3">
                <h2 className="text-xl font-semibold">Bottom Navigation</h2>
              </div>

              <div className="p-3">
                <div className="bg-(--bg-light-blue) p-2 rounded">
                  <div className="border-b flex justify-between items-center">
                    <div className="text-sm font-medium">Add New Tab</div>

                    <Button
                      onClick={handleAddNewTab}
                      aria-label="Add tab"
                      variant="ghost"
                    >
                      <Plus />
                    </Button>
                  </div>

                  <div className="space-y-2 mt-3">
                    {tabs.map((tab) => (
                      <div
                        key={tab.id}
                        className={cn(
                          "flex items-center gap-4",
                          !tab.visible && "opacity-60",
                        )}
                      >
                        <div
                          className="flex-1 text-sm font-medium"
                          onClick={() => openEditDialog(tab)}
                        >
                          {tab.label}
                        </div>

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

                          <Button variant="ghost" aria-label="Delete tab">
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
                src={
                  tabs.find((t) => t.id === "post")?.visible
                    ? socialAppMockup
                    : socialAppBottomHiddenMockup
                }
                alt="Social App Bottom Preview"
                className="w-full h-auto max-w-65"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddFieldDialog
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        initial={
          editingTab
            ? { id: editingTab.id, label: editingTab.label }
            : undefined
        }
        onApply={(field) => applyEdit(field)}
        onCancel={closeEdit}
      />
    </>
  );
}
