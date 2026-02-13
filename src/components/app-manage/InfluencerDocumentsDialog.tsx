import { useEffect, useState } from "react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditDocumentSectionDialog from "./EditDocumentSectionDialog";
import AddDocumentDialog from "./AddDocumentDialog";
import ChangeDocumentDialog from "./ChangeDocumentDialog";

interface Section {
  title: string;
  items: string[];
  requiresPhotos?: boolean;
}

interface InfluencerDocumentsDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  initialSections?: Section[];
  onApply: (sections: Section[]) => void;
  onCancel: () => void;
}

export default function InfluencerDocumentsDialog({
  open,
  setOpen,
  initialSections,
  onApply,
  onCancel,
}: InfluencerDocumentsDialogProps) {
  const defaultSections: Section[] = initialSections ?? [
    {
      title: "Identity Verification",
      items: ["Passport", "Driver's License", "National ID Card"],
      requiresPhotos: true,
    },
    {
      title: "Tax Information",
      items: [
        "Tax Identification Number (TIN)",
        "Social Security Number (SSN)",
      ],
      requiresPhotos: false,
    },
    {
      title: "Add Your Bank Account Details",
      items: [
        "Bank name",
        "Account number",
        "Account type (e.g., savings, current...)",
        "Account holder's name",
        "Routing number",
      ],
      requiresPhotos: false,
    },
    {
      title: "Business Documents",
      items: [
        "Business registration certificate",
        "Tax registration certificate",
        "Proof of business address",
      ],
      requiresPhotos: false,
    },
  ];

  const [sections, setSections] = useState<Section[]>(defaultSections);
  const [editingSectionIdx, setEditingSectionIdx] = useState<number | null>(
    null,
  );
  const [isSectionEditorOpen, setIsSectionEditorOpen] = useState(false);

  // Add-Document dialog state
  const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false);
  const [addSectionIdx, setAddSectionIdx] = useState<number | null>(null);

  // Change-Document dialog state (replaces prompt-based edit)
  const [isChangeDocumentOpen, setIsChangeDocumentOpen] = useState(false);
  const [changeSectionIdx, setChangeSectionIdx] = useState<number | null>(null);
  const [changeItemIdx, setChangeItemIdx] = useState<number | null>(null);

  useEffect(() => {
    // ensure any incoming initialSections have `requiresPhotos` defined
    const normalized = (initialSections ?? defaultSections).map((s) => ({
      ...s,
      requiresPhotos: s.requiresPhotos ?? false,
    }));
    setSections(normalized);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSections, open]);

  function openSectionEditor(sectionIdx: number) {
    setEditingSectionIdx(sectionIdx);
    setIsSectionEditorOpen(true);
  }

  function handleSectionApply(payload: {
    title: string;
    requiresPhotos: boolean;
  }) {
    if (editingSectionIdx === null) return;
    setSections((s) => {
      const copy = JSON.parse(JSON.stringify(s)) as Section[];
      copy[editingSectionIdx].title = payload.title;
      copy[editingSectionIdx].requiresPhotos = payload.requiresPhotos;
      return copy;
    });
    setIsSectionEditorOpen(false);
    setEditingSectionIdx(null);
  }

  function handleSectionCancel() {
    setIsSectionEditorOpen(false);
    setEditingSectionIdx(null);
  }

  function handleEditSection(sectionIdx: number) {
    // open the full editor instead of using prompt
    openSectionEditor(sectionIdx);
  }

  function handleAddItem(sectionIdx: number) {
    // open the 'Add Document' dialog instead of using a prompt
    setAddSectionIdx(sectionIdx);
    setIsAddDocumentOpen(true);
  }

  function handleAddDocumentApply(name: string) {
    if (addSectionIdx === null) return;
    setSections((s) => {
      const copy = JSON.parse(JSON.stringify(s)) as Section[];
      copy[addSectionIdx].items.push(name);
      return copy;
    });
    setIsAddDocumentOpen(false);
    setAddSectionIdx(null);
  }

  function handleAddDocumentCancel() {
    setIsAddDocumentOpen(false);
    setAddSectionIdx(null);
  }

  function handleEditItem(sectionIdx: number, itemIdx: number) {
    // open the Change Document dialog instead of using prompt
    setChangeSectionIdx(sectionIdx);
    setChangeItemIdx(itemIdx);
    setIsChangeDocumentOpen(true);
  }

  function handleChangeDocumentApply(name: string) {
    if (changeSectionIdx === null || changeItemIdx === null) return;
    setSections((s) => {
      const copy = JSON.parse(JSON.stringify(s)) as Section[];
      copy[changeSectionIdx].items[changeItemIdx] = name;
      return copy;
    });
    setIsChangeDocumentOpen(false);
    setChangeSectionIdx(null);
    setChangeItemIdx(null);
  }

  function handleChangeDocumentCancel() {
    setIsChangeDocumentOpen(false);
    setChangeSectionIdx(null);
    setChangeItemIdx(null);
  }

  function handleDeleteItem(sectionIdx: number, itemIdx: number) {
    if (!window.confirm("Delete this document?")) return;
    setSections((s) => {
      const copy = JSON.parse(JSON.stringify(s)) as Section[];
      copy[sectionIdx].items.splice(itemIdx, 1);
      return copy;
    });
  }

  function handleSave() {
    onApply(sections);
  }

  function handleCancel() {
    setSections(initialSections ?? defaultSections);
    onCancel();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md overflow-y-auto max-h-[90vh]">
        <DialogHeader className="border-b">
          <DialogTitle className="text-lg font-semibold">
            Influencer's Documents
          </DialogTitle>
        </DialogHeader>

        <ScrollArea>
          <div className="py-4 space-y-4">
            {sections.map((section, sIdx) => (
              <div
                key={section.title}
                className="bg-[#EEF6FF] rounded-lg p-4 space-y-3 border border-[#E6F0FF]"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-base">{section.title}</div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEditSection(sIdx)}
                      className="text-muted-foreground"
                      title="Edit section"
                    >
                      <Edit3 className="size-4" />
                    </button>
                    <button
                      onClick={() => handleAddItem(sIdx)}
                      className="text-muted-foreground"
                      title="Add document"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="border-t pt-3 space-y-2">
                  {section.items.length === 0 ? (
                    <div className="text-sm text-gray-500">
                      No documents added
                    </div>
                  ) : (
                    section.items.map((it, iIdx) => (
                      <div
                        key={it + iIdx}
                        className="flex items-center justify-between"
                      >
                        <div className="font-medium">{it}</div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEditItem(sIdx, iIdx)}
                            className="text-muted-foreground"
                            title="Edit"
                          >
                            <Edit3 className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(sIdx, iIdx)}
                            className="text-red-500"
                            title="Delete"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <EditDocumentSectionDialog
          open={isSectionEditorOpen}
          setOpen={setIsSectionEditorOpen}
          initialTitle={
            editingSectionIdx !== null ? sections[editingSectionIdx].title : ""
          }
          initialRequiresPhotos={
            editingSectionIdx !== null
              ? !!sections[editingSectionIdx].requiresPhotos
              : false
          }
          onApply={handleSectionApply}
          onCancel={handleSectionCancel}
        />

        <AddDocumentDialog
          open={isAddDocumentOpen}
          setOpen={setIsAddDocumentOpen}
          onApply={handleAddDocumentApply}
          onCancel={handleAddDocumentCancel}
        />

        <ChangeDocumentDialog
          open={isChangeDocumentOpen}
          setOpen={setIsChangeDocumentOpen}
          initialName={
            changeSectionIdx !== null && changeItemIdx !== null
              ? sections[changeSectionIdx].items[changeItemIdx]
              : ""
          }
          onApply={handleChangeDocumentApply}
          onCancel={handleChangeDocumentCancel}
        />

        <div className="flex gap-4 mt-4 border-t pt-4">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 h-11 rounded-full bg-[#3E4250] text-white hover:bg-[#2E3240] border-0"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 h-11 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
