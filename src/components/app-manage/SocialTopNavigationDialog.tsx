import { useState } from "react";
import { Eye, EyeOff, Edit3, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import topNavigationMockup from "@/assets/app-manage/social-app/social-app.png";
import topNavigationHiddenMockup from "@/assets/app-manage/social-app/social-app-top-hidden.png";
import AddFieldDialog from "./AddFieldDialog";
import ChangeIconDialog from "./ChangeIconDialog";

interface NavigationTab {
  id: string;
  label: string;
  visible: boolean;
  icon?: string; // optional — stores image URL or object URL for preview
}

interface SocialTopNavigationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApply: (tabs: NavigationTab[]) => void;
  onCancel: () => void;
}

// default tabs inspired by the social app screenshot
const defaultTabs: NavigationTab[] = [
  { id: "stories", label: "Stories", visible: true },
  { id: "for-me", label: "For Me", visible: true },
  { id: "search", label: "Search", visible: true },
  { id: "live", label: "Live", visible: true },
  { id: "explore", label: "Explore", visible: true },
  { id: "buddies", label: "Buddies", visible: true },
  { id: "notifications", label: "Notifications", visible: true },
  { id: "locations", label: "Locations", visible: true },
  { id: "local", label: "Local", visible: true },
  { id: "global", label: "Global", visible: true },
];

export default function SocialTopNavigationDialog({
  open,
  setOpen,
  onApply,
  onCancel,
}: SocialTopNavigationDialogProps) {
  const [tabs, setTabs] = useState<NavigationTab[]>(defaultTabs);

  // secondary "Body" card (e.g. Repost / Like / Comments ...)
  const defaultBodyItems: NavigationTab[] = [
    { id: "repost", label: "Repost", visible: true },
    { id: "like", label: "Like", visible: true },
    { id: "comments", label: "Comments", visible: true },
    { id: "gift", label: "Gift", visible: true },
    { id: "share", label: "Share", visible: true },
    { id: "more", label: "More", visible: true },
    { id: "music", label: "Music", visible: true },
    { id: "profile", label: "Profile", visible: true },
  ];

  const [bodyItems, setBodyItems] = useState<NavigationTab[]>(defaultBodyItems);

  // state for Edit Tab / Change Title dialog (shared for both lists)
  const [editingTab, setEditingTab] = useState<NavigationTab | null>(null);
  const [editingTarget, setEditingTarget] = useState<"tabs" | "body" | null>(
    null,
  );
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Change Icon dialog state (for `body` items)
  const [changeIconOpen, setChangeIconOpen] = useState(false);

  const handleToggleVisibility = (id: string) => {
    if (id === "stories") {
      setTabs(
        tabs.map((tab) =>
          tab.id === id ? { ...tab, visible: !tab.visible } : tab,
        ),
      );
    }
  };

  const handleToggleVisibilityBody = (id: string) => {
    setBodyItems(
      bodyItems.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  };

  const handleDeleteBody = (id: string) => {
    setBodyItems(bodyItems.filter((it) => it.id !== id));
  };

  const handleApply = () => {
    // existing API applies top tabs only — keep behaviour unchanged
    onApply(tabs);
  };

  const handleCancel = () => {
    setTabs(defaultTabs);
    setBodyItems(defaultBodyItems);
    onCancel();
  };

  const openEditDialog = (
    tab: NavigationTab,
    target: "tabs" | "body" = "tabs",
  ) => {
    setEditingTab(tab);
    setEditingTarget(target);
    setEditDialogOpen(true);
  };

  const applyEdit = (updated: NavigationTab) => {
    if (editingTarget === "body") {
      setBodyItems(bodyItems.map((t) => (t.id === updated.id ? updated : t)));
    } else {
      setTabs(tabs.map((t) => (t.id === updated.id ? updated : t)));
    }

    setEditDialogOpen(false);
    setEditingTab(null);
    setEditingTarget(null);
  };

  const applyIconChange = (updated: NavigationTab) => {
    // update body item with new icon
    setBodyItems(bodyItems.map((t) => (t.id === updated.id ? updated : t)));
    setChangeIconOpen(false);
    setEditingTab(null);
    setEditingTarget(null);
  };

  const closeEdit = () => {
    setEditDialogOpen(false);
    setEditingTab(null);
    setEditingTarget(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm p-0 gap-0">
          <div className="relative flex">
            {/* Left Panel - Navigation Editor */}
            <div className="flex-1 max-h-[80vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-3">
                <h2 className="text-xl font-semibold">Home Top Navigation</h2>
              </div>

              <div className="p-3">
                <div className="bg-(--bg-light-blue) p-2 rounded">
                  {/* Add New Tab Button (kept intentionally commented for parity) */}
                  <div className="border-b flex justify-between items-center">
                    <div className="text-sm font-medium">Add New Tab</div>
                  </div>

                  {/* Navigation Tabs List */}
                  <div className="space-y-2 mt-3">
                    {tabs.map((tab) => (
                      <div
                        key={tab.id}
                        className={cn(
                          "flex items-center gap-4",
                          !tab.visible && "opacity-60",
                        )}
                      >
                        {/* Label */}
                        <div className="flex-1 text-sm font-medium">
                          {tab.label}
                        </div>

                        {/* Actions */}
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

                {/* Body Card */}
                <div className="mt-4 bg-(--bg-light-blue) p-2 rounded">
                  <div className="border-b flex justify-between items-center">
                    <div className="text-sm font-medium">Body</div>
                  </div>

                  <div className="space-y-2 mt-3">
                    {bodyItems.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "flex items-center gap-4",
                          !item.visible && "opacity-60",
                        )}
                      >
                        {/* Label */}
                        <div className="flex-1 text-sm font-medium">
                          {item.label}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            onClick={() => handleToggleVisibilityBody(item.id)}
                            aria-label={
                              item.visible ? "Hide item" : "Show item"
                            }
                          >
                            {item.visible ? (
                              <Eye className="size-4" />
                            ) : (
                              <EyeOff className="size-4" />
                            )}
                          </Button>

                          <Button
                            variant="ghost"
                            aria-label="Edit item"
                            onClick={() => {
                              // open change-icon flow for body items
                              setEditingTab(item);
                              setEditingTarget("body");
                              setChangeIconOpen(true);
                            }}
                          >
                            <Edit3 className="size-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={() => handleDeleteBody(item.id)}
                            aria-label="Delete item"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
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

            {/* Right Panel - Mobile Mockup */}
            <div className="absolute -right-65 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
              <img
                src={
                  tabs.find((t) => t.id === "stories")?.visible
                    ? topNavigationMockup
                    : topNavigationHiddenMockup
                }
                alt="Home Top Navigation Preview"
                className="w-full h-auto max-w-65"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Icon dialog (opened when editing a body item) */}
      <ChangeIconDialog
        key={editingTab?.id ?? "change-icon"}
        open={changeIconOpen}
        onOpenChange={setChangeIconOpen}
        tab={editingTab}
        onSave={applyIconChange}
        onCancel={() => {
          setChangeIconOpen(false);
          setEditingTab(null);
          setEditingTarget(null);
        }}
      />

      {/* Use AddFieldDialog for editing tab labels */}
      <AddFieldDialog
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        initial={
          editingTab
            ? { id: editingTab.id, label: editingTab.label }
            : undefined
        }
        onApply={(field) => {
          const sourceList = editingTarget === "body" ? bodyItems : tabs;
          const existing = sourceList.find((t) => t.id === field.id);
          const updated: NavigationTab = {
            id: field.id,
            label: field.label,
            visible: existing?.visible ?? true,
            icon: (existing as NavigationTab | undefined)?.icon,
          };
          applyEdit(updated);
        }}
        onCancel={closeEdit}
      />
    </>
  );
}
