import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

const FieldSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Label is required"),
});

type FieldForm = z.infer<typeof FieldSchema>;

const defaultField = (): FieldForm => ({
  id: `field-${Date.now()}`,
  label: "",
});

interface AddFieldDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  onApply: (f: FieldForm) => void;
  onCancel: () => void;
  initial?: Partial<FieldForm>;
}

export default function AddFieldDialog({
  open,
  setOpen,
  onApply,
  onCancel,
  initial,
}: AddFieldDialogProps) {
  const { register, handleSubmit, formState, reset } = useForm<FieldForm>({
    mode: "onChange",
    resolver: zodResolver(FieldSchema),
    defaultValues: {
      ...defaultField(),
      ...(initial ?? {}),
    },
  });

  const isEditing = Boolean(initial && initial.id);

  useEffect(() => {
    // Reset form whenever dialog opens or initial changes so edit mode shows correct values
    reset({ ...defaultField(), ...(initial ?? {}) });
  }, [initial, open, reset]);

  const submit = (data: FieldForm) => {
    onApply(data);
    setOpen(false);
    reset();
  };

  const cancel = () => {
    onCancel();
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="relative flex flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">
              {isEditing ? "Edit Field" : "Add Field"}
            </h2>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
            <div className="">
              <label className="block text-sm font-semibold mb-2">Field</label>
              <input
                {...register("label")}
                placeholder="Enter field name"
                className="w-full h-11 px-3 border rounded-md text-sm bg-white"
              />
            </div>
          </div>

          <div className="p-4 pt-0">
            <div className="flex gap-4">
              <Button
                onClick={cancel}
                variant="outline"
                className="flex-1 h-12 rounded-full bg-[#3E4250] text-white hover:bg-[#2E3240] hover:text-white border-0"
              >
                Cancel
              </Button>

              <Button
                onClick={handleSubmit(submit)}
                className="flex-1 h-12 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
                disabled={!formState.isValid}
              >
                {isEditing ? "Save" : "Add"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
