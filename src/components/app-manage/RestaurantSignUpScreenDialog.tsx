import { Plus, Edit3, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Switch } from "@/components/ui/switch";
import AddFieldDialog from "./AddFieldDialog";
import AddProviderDialog from "./AddProviderDialog";

// single field schema (same as other dialogs)
const FieldSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Label is required"),
});

const ProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean(),
});

const SectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  fields: z.array(FieldSchema).min(0),
});

const FormSchema = z.object({
  sections: z.array(SectionSchema).min(1),
  additionalOptions: z.array(ProviderSchema),
  otpRequired: z.boolean(),
  faceIdRequired: z.boolean(),
});

type FormValues = z.infer<typeof FormSchema>;

// defaults that match the screenshot for restaurant sign-up
const DEFAULT_SECTIONS: FormValues["sections"] = [
  {
    id: `section-${Date.now()}-1`,
    title: "Complete Your Profile",
    fields: [
      { id: `f-${Date.now()}-1`, label: "Business Name" },
      { id: `f-${Date.now()}-2`, label: "Email Address" },
      { id: `f-${Date.now()}-3`, label: "Phone Number" },
    ],
  },
  {
    id: `section-${Date.now()}-2`,
    title: "Tell Us About Your Business",
    fields: [
      { id: `f-${Date.now()}-4`, label: "How Many Branches Do You Have?" },
      { id: `f-${Date.now()}-5`, label: "How Many Employees Do You Have?" },
      { id: `f-${Date.now()}-6`, label: "How Many Days Do You Open?" },
    ],
  },
  {
    id: `section-${Date.now()}-3`,
    title: "Add Your Office Address",
    fields: [
      { id: `f-${Date.now()}-7`, label: "Add address manually" },
      { id: `f-${Date.now()}-8`, label: "Address" },
      { id: `f-${Date.now()}-9`, label: "Street Number" },
      { id: `f-${Date.now()}-10`, label: "Street Name" },
      { id: `f-${Date.now()}-11`, label: "City" },
      { id: `f-${Date.now()}-12`, label: "Country" },
      { id: `f-${Date.now()}-13`, label: "State" },
      { id: `f-${Date.now()}-14`, label: "Zip Code" },
    ],
  },
  {
    id: `section-${Date.now()}-4`,
    title: "Upload Business Documents",
    fields: [
      { id: `f-${Date.now()}-15`, label: "Business Name" },
      { id: `f-${Date.now()}-16`, label: "Business Type" },
      {
        id: `f-${Date.now()}-17`,
        label: "Employer Identification Number (EIN)",
      },
      { id: `f-${Date.now()}-18`, label: "Food Service License" },
    ],
  },
  {
    id: `section-${Date.now()}-5`,
    title: "Which Services You Need",
    fields: [
      { id: `f-${Date.now()}-19`, label: "Services" },
      { id: `f-${Date.now()}-20`, label: "3rd Party" },
    ],
  },
  {
    id: `section-${Date.now()}-6`,
    title: "Order Method",
    fields: [
      { id: `f-${Date.now()}-21`, label: "Mobile App" },
      { id: `f-${Date.now()}-22`, label: "Tablet" },
    ],
  },
  {
    id: `section-${Date.now()}-7`,
    title: "Marketing Plan",
    fields: [
      { id: `f-${Date.now()}-23`, label: "10%" },
      { id: `f-${Date.now()}-24`, label: "15%" },
      { id: `f-${Date.now()}-25`, label: "20%" },
    ],
  },
  {
    id: `section-${Date.now()}-8`,
    title: "Subscription",
    fields: [
      { id: `f-${Date.now()}-26`, label: "Annual" },
      { id: `f-${Date.now()}-27`, label: "Monthly" },
    ],
  },
];

const DEFAULT_PROVIDERS: FormValues["additionalOptions"] = [
  { id: "google", name: "Google", enabled: true },
  { id: "facebook", name: "Facebook", enabled: true },
  { id: "apple", name: "Apple", enabled: true },
  { id: "twitter", name: "Twitter", enabled: true },
];

interface RestaurantSignUpScreenDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  onApply: (v: {
    fields: { id: string; label: string }[];
    additionalOptions: FormValues["additionalOptions"];
    otpRequired: boolean;
    faceIdRequired: boolean;
  }) => void;
  onCancel: () => void;
  initial?: Partial<{
    fields: { id: string; label: string }[];
    additionalOptions: FormValues["additionalOptions"];
    otpRequired: boolean;
    faceIdRequired: boolean;
  }>;
}

export default function RestaurantSignUpScreenDialog({
  open,
  setOpen,
  onApply,
  onCancel,
  initial,
}: RestaurantSignUpScreenDialogProps) {
  // map incoming flat fields -> sections default (single section) when initial provided
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

  const { register, control, handleSubmit, watch, setValue } =
    useForm<FormValues>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        // If initial flat fields are provided, prepend them as a "Profile" section
        // and keep all DEFAULT_SECTIONS so the dialog shows all sections from the screenshot.
        sections: mappedInitialSections
          ? [...mappedInitialSections, ...DEFAULT_SECTIONS]
          : DEFAULT_SECTIONS,
        additionalOptions: initial?.additionalOptions ?? DEFAULT_PROVIDERS,
        otpRequired: initial?.otpRequired ?? true,
        faceIdRequired: initial?.faceIdRequired ?? true,
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

  const providers = watch("additionalOptions");

  // section dialog state (add / edit section title)
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [editingSectionIndex, setEditingSectionIndex] = useState<number | null>(
    null,
  );
  const [sectionTitleInput, setSectionTitleInput] = useState<string>("");

  // add/edit field dialog state (re-use AddFieldDialog)
  const [fieldDialogOpen, setFieldDialogOpen] = useState(false);
  const [fieldEditingSectionIdx, setFieldEditingSectionIdx] = useState<
    number | null
  >(null);
  const [fieldEditingIndex, setFieldEditingIndex] = useState<number | null>(
    null,
  );
  const [fieldEditingInitial, setFieldEditingInitial] = useState<
    | {
        id: string;
        label: string;
      }
    | undefined
  >(undefined);

  // add/edit provider dialog
  const [providerDialogOpen, setProviderDialogOpen] = useState(false);
  const [providerEditingInitial, setProviderEditingInitial] = useState<
    FormValues["additionalOptions"][number] | undefined
  >(undefined);

  // Section actions
  const addSection = () => {
    setEditingSectionIndex(null);
    setSectionTitleInput("");
    setSectionDialogOpen(true);
  };

  const editSection = (idx: number) => {
    setEditingSectionIndex(idx);
    setSectionTitleInput(sections[idx].title || "");
    setSectionDialogOpen(true);
  };

  const applySection = () => {
    const payload = {
      id: `section-${Date.now()}`,
      title: sectionTitleInput,
      fields: [],
    };
    if (editingSectionIndex === null) {
      append(payload);
    } else {
      update(editingSectionIndex, {
        ...sections[editingSectionIndex],
        title: sectionTitleInput,
      });
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

  // Field actions inside a section
  const addFieldToSection = (sectionIdx: number) => {
    setFieldEditingSectionIdx(sectionIdx);
    setFieldEditingIndex(null);
    setFieldEditingInitial(undefined);
    setFieldDialogOpen(true);
  };

  const editFieldInSection = (sectionIdx: number, fieldIdx: number) => {
    const f = sections[sectionIdx].fields?.[fieldIdx];
    if (!f) return;
    setFieldEditingSectionIdx(sectionIdx);
    setFieldEditingIndex(fieldIdx);
    setFieldEditingInitial({ id: f.id, label: f.label });
    setFieldDialogOpen(true);
  };

  const applyFieldDialog = (f: { id: string; label: string }) => {
    const sIdx = fieldEditingSectionIdx;
    if (sIdx === null || sIdx === null || sIdx === undefined) return;
    const section = sections[sIdx];
    const copy = [...(section.fields ?? [])];
    if (fieldEditingIndex === null) {
      copy.push(f);
    } else {
      copy[fieldEditingIndex] = f;
    }
    setValue(`sections.${sIdx}.fields`, copy, { shouldDirty: true });
    setFieldDialogOpen(false);
    setFieldEditingIndex(null);
    setFieldEditingSectionIdx(null);
    setFieldEditingInitial(undefined);
  };

  const cancelFieldDialog = () => {
    setFieldDialogOpen(false);
    setFieldEditingIndex(null);
    setFieldEditingSectionIdx(null);
    setFieldEditingInitial(undefined);
  };

  const removeFieldFromSection = (sIdx: number, fIdx: number) => {
    const copy = [...(sections[sIdx].fields ?? [])];
    copy.splice(fIdx, 1);
    setValue(`sections.${sIdx}.fields`, copy, { shouldDirty: true });
  };

  // Providers
  const addProvider = () => {
    setProviderEditingInitial(undefined);
    setProviderDialogOpen(true);
  };

  const handleApplyProvider = (p: {
    id?: string;
    name: string;
    enabled?: boolean;
  }) => {
    const id = p.id ?? `provider-${Date.now()}`;
    setValue(
      "additionalOptions",
      [...providers, { id, name: p.name, enabled: p.enabled ?? true }],
      { shouldDirty: true },
    );
    setProviderDialogOpen(false);
    setProviderEditingInitial(undefined);
  };

  const handleCancelProvider = () => {
    setProviderDialogOpen(false);
    setProviderEditingInitial(undefined);
  };

  const toggleProvider = (idx: number) => {
    const current = providers[idx];
    setValue(`additionalOptions.${idx}.enabled` as const, !current.enabled, {
      shouldDirty: true,
    });
  };

  const removeProvider = (idx: number) => {
    const copy = [...providers];
    copy.splice(idx, 1);
    setValue("additionalOptions", copy, { shouldDirty: true });
  };

  const submit = (data: FormValues) => {
    // flatten sections -> fields to keep parent component compatible with existing AuthConfig
    const flatFields = data.sections.flatMap((s) => s.fields ?? []);
    onApply({
      fields: flatFields,
      additionalOptions: data.additionalOptions,
      otpRequired: data.otpRequired,
      faceIdRequired: data.faceIdRequired,
    });
  };

  // Sync section title input when editing section index changes
  useEffect(() => {
    if (editingSectionIndex !== null && editingSectionIndex !== undefined) {
      setSectionTitleInput(sections[editingSectionIndex].title ?? "");
    }
  }, [editingSectionIndex, sections]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="relative flex flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Sign Up Screen</h2>
          </div>

          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Sections</div>
              <button
                onClick={addSection}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                aria-label="Add section"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <div className="space-y-4">
              {sections.map((s, si) => (
                <div key={s.id} className="rounded-lg bg-[#f1f7ff] p-4 border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold flex items-center gap-3">
                      <div className="text-base">{s.title}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => editSection(si)}
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                        aria-label={`Edit section ${s.title}`}
                      >
                        <Edit3 className="size-4" />
                      </button>
                      <button
                        onClick={() => addFieldToSection(si)}
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                        aria-label={`Add field to ${s.title}`}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3 space-y-3">
                    {(s.fields ?? []).map((f, fi) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium">{f.label}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => editFieldInSection(si, fi)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label={`Edit ${f.label}`}
                          >
                            <Edit3 className="size-4" />
                          </button>

                          <button
                            onClick={() => removeFieldFromSection(si, fi)}
                            className="text-red-500"
                            aria-label={`Remove ${f.label}`}
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

            {/* Additional login options */}
            <div className="rounded-lg bg-[#f1f7ff] p-4 border">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold">Additional Login Options</div>
                <button
                  onClick={addProvider}
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  aria-label="Add provider"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-3">
                {providers.map((p, i) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between "
                  >
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={p.enabled}
                        onCheckedChange={() => toggleProvider(i)}
                        aria-label={`Toggle ${p.name}`}
                      />
                      <button
                        onClick={() => removeProvider(i)}
                        className="text-red-500"
                        aria-label={`Remove ${p.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">OTP Required</div>
                <Switch
                  {...register("otpRequired" as const)}
                  checked={watch("otpRequired")}
                  onCheckedChange={(v) => setValue("otpRequired", !!v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="font-medium">Face ID Required</div>
                <Switch
                  {...register("faceIdRequired" as const)}
                  checked={watch("faceIdRequired")}
                  onCheckedChange={(v) => setValue("faceIdRequired", !!v)}
                />
              </div>
            </div>
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

      {/* Section title dialog (small, inline) */}
      <Dialog open={sectionDialogOpen} onOpenChange={setSectionDialogOpen}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="relative flex flex-col">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-xl font-semibold">
                {editingSectionIndex === null ? "Add Section" : "Edit Section"}
              </h2>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Title
                </label>
                <input
                  value={sectionTitleInput}
                  onChange={(e) => setSectionTitleInput(e.target.value)}
                  placeholder="Enter section title"
                  className="w-full h-11 px-3 border rounded-md text-sm bg-white"
                />
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="flex gap-4">
                <Button
                  onClick={cancelSection}
                  variant="outline"
                  className="flex-1 h-12 rounded-full bg-[#3E4250] text-white hover:bg-[#2E3240] hover:text-white border-0"
                >
                  Cancel
                </Button>

                <Button
                  onClick={applySection}
                  className="flex-1 h-12 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
                  disabled={!sectionTitleInput.trim()}
                >
                  {editingSectionIndex === null ? "Add" : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add / Edit single field dialog */}
      <AddFieldDialog
        open={fieldDialogOpen}
        setOpen={setFieldDialogOpen}
        initial={fieldEditingInitial}
        onApply={applyFieldDialog}
        onCancel={cancelFieldDialog}
      />

      {/* Add provider dialog */}
      <AddProviderDialog
        open={providerDialogOpen}
        setOpen={setProviderDialogOpen}
        initial={providerEditingInitial}
        onApply={handleApplyProvider}
        onCancel={handleCancelProvider}
      />
    </Dialog>
  );
}
