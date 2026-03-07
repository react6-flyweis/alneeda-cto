import { Plus, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";

import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import AddFieldDialog from "./AddFieldDialog";

// single field schema (same as other dialogs)
const FieldSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Label is required"),
});

const SectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  fields: z.array(FieldSchema).min(0),
});

const FormSchema = z.object({
  sections: z.array(SectionSchema).min(1),
});

type FormValues = z.infer<typeof FormSchema>;

// defaults that roughly match the screenshot shown for the grocery app
const DEFAULT_SECTIONS: FormValues["sections"] = [
  {
    id: "section-1",
    title: "Complete Your Profile",
    fields: [
      { id: "business-name", label: "Business Name" },
      { id: "email-address", label: "Email Address" },
      { id: "phone-number", label: "Phone Number" },
    ],
  },
  {
    id: "section-2",
    title: "Tell Us About Your Business",
    fields: [
      { id: "branches", label: "How Many Branches Do You Have?" },
      { id: "employees", label: "How Many Employees Do You Have?" },
      { id: "days-open", label: "How Many Days Do You Open?" },
    ],
  },
  {
    id: "section-3",
    title: "Add Your Office Address",
    fields: [
      { id: "address-manual", label: "Add address manually" },
      { id: "address", label: "Address" },
      { id: "street-number", label: "Street Number" },
      { id: "street-name", label: "Street Name" },
      { id: "city", label: "City" },
      { id: "country", label: "Country" },
      { id: "state", label: "State" },
      { id: "zip-code", label: "Zip Code" },
    ],
  },
  {
    id: "section-4",
    title: "Upload Business Documents",
    fields: [
      { id: "doc-business-name", label: "Business Name" },
      { id: "doc-business-type", label: "Business Type" },
      { id: "doc-ein", label: "Employer Identification Number (EIN)" },
      { id: "doc-food-license", label: "Food Service License" },
    ],
  },
  {
    id: "section-5",
    title: "Which Services You Need",
    fields: [
      { id: "services", label: "Services" },
      { id: "third-party", label: "3rd Party" },
    ],
  },
  {
    id: "section-6",
    title: "Order Method",
    fields: [
      { id: "order-mobile", label: "Mobile App" },
      { id: "order-tablet", label: "Tablet" },
    ],
  },
  {
    id: "section-7",
    title: "Marketing Plan",
    fields: [
      { id: "marketing-10", label: "10%" },
      { id: "marketing-15", label: "15%" },
      { id: "marketing-20", label: "20%" },
    ],
  },
  {
    id: "section-8",
    title: "Subscription",
    fields: [
      { id: "subscription-annual", label: "Annual" },
      { id: "subscription-monthly", label: "Monthly" },
    ],
  },
];

interface GrocerySignUpScreenDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  // parent still uses AuthConfig style, but only fields are provided
  onApply: (v: { fields: { id: string; label: string }[] }) => void;
  onCancel: () => void;
  initial?: Partial<{
    fields: { id: string; label: string }[];
  }>;
}

export default function GrocerySignUpScreenDialog({
  open,
  setOpen,
  onApply,
  onCancel,
  initial,
}: GrocerySignUpScreenDialogProps) {
  // if grocery tab passes flat initial fields we still coerce into one section
  const mappedInitialSections: FormValues["sections"] | undefined =
    initial?.fields
      ? [
          {
            id: `section-init-1`,
            title: "Profile",
            fields: initial.fields,
          },
        ]
      : undefined;

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sections: mappedInitialSections
        ? [...mappedInitialSections, ...DEFAULT_SECTIONS]
        : DEFAULT_SECTIONS,
    },
  });

  const {
    fields: sections,
    append,
    update,
  } = useFieldArray({
    control,
    name: "sections",
    keyName: "sectionId",
  });

  // section dialog state (add / edit section title)
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [editingSectionIndex, setEditingSectionIndex] = useState<number | null>(
    null,
  );
  const [sectionTitleInput, setSectionTitleInput] = useState<string>("");

  // add/edit field dialog state (re-use AddFieldDialog)
  const [fieldDialogOpen, setFieldDialogOpen] = useState(false);
  const [editingFieldIndex, setEditingFieldIndex] = useState<number | null>(
    null,
  );
  const [fieldEditingSection, setFieldEditingSection] = useState<number>(0);
  const [editingFieldInitial, setEditingFieldInitial] = useState<
    FormValues["sections"][number]["fields"][number] | undefined
  >(undefined);

  const applySection = () => {
    if (!sectionTitleInput.trim()) {
      return;
    }
    const obj = {
      id: `section-${Date.now()}`,
      title: sectionTitleInput,
      fields: [],
    };
    if (editingSectionIndex === null) {
      append(obj);
    } else {
      update(editingSectionIndex, obj);
    }
    setSectionDialogOpen(false);
    setEditingSectionIndex(null);
    setSectionTitleInput("");
  };

  const cancelSection = () => {
    setSectionDialogOpen(false);
    setEditingSectionIndex(null);
    setSectionTitleInput("");
  };

  const addField = (sectionIdx: number) => {
    setEditingFieldIndex(null);
    setEditingFieldInitial(undefined);
    setFieldEditingSection(sectionIdx);
    setFieldDialogOpen(true);
  };

  const applyField = (f: FormValues["sections"][number]["fields"][number]) => {
    if (editingFieldIndex === null) {
      const updated = [...sections];
      updated[fieldEditingSection].fields.push(f);
      setValue("sections", updated, { shouldDirty: true });
    } else {
      const updated = [...sections];
      updated[fieldEditingSection].fields[editingFieldIndex] = f;
      setValue("sections", updated, { shouldDirty: true });
    }
    setFieldDialogOpen(false);
    setEditingFieldIndex(null);
    setFieldEditingSection(0);
    setEditingFieldInitial(undefined);
  };

  const cancelField = () => {
    setFieldDialogOpen(false);
    setEditingFieldIndex(null);
    setFieldEditingSection(0);
    setEditingFieldInitial(undefined);
  };

  const removeField = (sectionIdx: number, fieldIdx: number) => {
    const updated = [...sections];
    updated[sectionIdx].fields.splice(fieldIdx, 1);
    setValue("sections", updated, { shouldDirty: true });
  };

  const submit = (data: FormValues) => {
    // flatten sections back into field array for the parent
    const flatFields = data.sections.flatMap((s) => s.fields);
    onApply({ fields: flatFields });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="relative flex flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Sign Up Screen</h2>
          </div>

          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Sections */}
            {sections.map((sec, si) => (
              <div key={sec.id} className="rounded-lg bg-[#f1f7ff] p-4 border">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold">{sec.title}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingSectionIndex(si);
                        setSectionTitleInput(sec.title);
                        setSectionDialogOpen(true);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Edit section title"
                    >
                      <Edit3 className="size-4" />
                    </button>
                    <button
                      onClick={() => addField(si)}
                      className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                      aria-label="Add field to section"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3 space-y-3">
                  {sec.fields.map((f, fi) => (
                    <div
                      key={f.id}
                      className="flex items-center justify-between"
                    >
                      <div className="text-sm font-medium">{f.label}</div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setEditingFieldIndex(fi);
                            setFieldEditingSection(si);
                            setEditingFieldInitial({
                              id: f.id,
                              label: f.label,
                            });
                            setFieldDialogOpen(true);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label={`Edit ${f.label}`}
                        >
                          <Edit3 className="size-4" />
                        </button>
                        <button
                          onClick={() => removeField(si, fi)}
                          className="text-red-500"
                          aria-label="Delete field"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="p-4 pt-0">
            <div className="flex gap-4">
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1 h-12 rounded-full bg-[#3E4250] text-white hover:bg-[#2E3240] hover:text-white border-0"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit(submit)}
                className="flex-1 h-12 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Section title dialog */}
      {sectionDialogOpen && (
        <Dialog open={sectionDialogOpen} onOpenChange={setSectionDialogOpen}>
          <DialogContent className="sm:max-w-xs">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Section title</h3>
              <input
                className="input w-full"
                value={sectionTitleInput}
                onChange={(e) => setSectionTitleInput(e.target.value)}
                placeholder="Enter section title"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={cancelSection}>
                  Cancel
                </Button>
                <Button onClick={applySection}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add / Edit single field dialog */}
      <AddFieldDialog
        open={fieldDialogOpen}
        setOpen={setFieldDialogOpen}
        initial={editingFieldInitial}
        onApply={applyField}
        onCancel={cancelField}
      />

      {/* Add provider dialog */}
    </Dialog>
  );
}
