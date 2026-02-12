import { Plus, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";

import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Switch } from "@/components/ui/switch";
import AddFieldDialog from "./AddFieldDialog";
import AddProviderDialog from "./AddProviderDialog";

const FieldSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Label is required"),
});

const ProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean(),
});

const FormSchema = z.object({
  fields: z.array(FieldSchema).min(1),
  additionalOptions: z.array(ProviderSchema),
  otpRequired: z.boolean(),
  faceIdRequired: z.boolean(),
});

type FormValues = z.infer<typeof FormSchema>;

const DEFAULT_FIELDS: FormValues["fields"] = [
  { id: "field-1", label: "Phone Number" },
];

const DEFAULT_PROVIDERS: FormValues["additionalOptions"] = [
  { id: "google", name: "Google", enabled: true },
  { id: "facebook", name: "Facebook", enabled: true },
  { id: "apple", name: "Apple", enabled: true },
  { id: "twitter", name: "Twitter", enabled: true },
];

interface LoginScreenDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  onApply: (v: FormValues) => void;
  onCancel: () => void;
  initial?: Partial<FormValues>;
}

export default function LoginScreenDialog({
  open,
  setOpen,
  onApply,
  onCancel,
  initial,
}: LoginScreenDialogProps) {
  const { register, control, handleSubmit, watch, setValue } =
    useForm<FormValues>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        fields: initial?.fields ?? DEFAULT_FIELDS,
        additionalOptions: initial?.additionalOptions ?? DEFAULT_PROVIDERS,
        otpRequired: initial?.otpRequired ?? true,
        faceIdRequired: initial?.faceIdRequired ?? true,
      },
    });

  const { fields, append, update } = useFieldArray({
    control,
    name: "fields",
    keyName: "fieldId",
  });

  const providers = watch("additionalOptions");

  // add/edit field dialog state
  const [fieldDialogOpen, setFieldDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingInitial, setEditingInitial] = useState<
    FormValues["fields"][number] | undefined
  >(undefined);

  // add/edit provider dialog state
  const [providerDialogOpen, setProviderDialogOpen] = useState(false);
  const [providerEditingInitial, setProviderEditingInitial] = useState<
    FormValues["additionalOptions"][number] | undefined
  >(undefined);

  const addField = () => {
    // open the AddFieldDialog for creating a new field
    setEditingIndex(null);
    setEditingInitial(undefined);
    setFieldDialogOpen(true);
  };

  const handleApplyField = (f: FormValues["fields"][number]) => {
    if (editingIndex === null) {
      append(f);
    } else {
      update(editingIndex, f);
    }
    setFieldDialogOpen(false);
    setEditingIndex(null);
    setEditingInitial(undefined);
  };

  const handleCancelField = () => {
    setFieldDialogOpen(false);
    setEditingIndex(null);
    setEditingInitial(undefined);
  };

  const addProvider = () => {
    // open dialog to add a new provider
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
    onApply(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="relative flex flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Login Screen</h2>
          </div>

          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Fields section */}
            <div className="rounded-lg bg-[#f1f7ff] p-4 border">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold">Fields</div>
                <button
                  onClick={addField}
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  aria-label="Add field"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-3">
                {fields.map((f, i) => (
                  <div key={f.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium">{f.label}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setEditingIndex(i);
                          setEditingInitial({ id: f.id, label: f.label });
                          setFieldDialogOpen(true);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label={`Edit ${f.label}`}
                      >
                        <Edit3 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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

      {/* Add / Edit single field dialog */}
      <AddFieldDialog
        open={fieldDialogOpen}
        setOpen={setFieldDialogOpen}
        initial={editingInitial}
        onApply={handleApplyField}
        onCancel={handleCancelField}
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
