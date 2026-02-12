import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

const ProviderSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "App name is required"),
});

type ProviderForm = z.infer<typeof ProviderSchema>;

const defaultProvider = (): ProviderForm => ({
  id: `provider-${Date.now()}`,
  name: "",
});

interface AddProviderDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  onApply: (p: ProviderForm) => void;
  onCancel: () => void;
  initial?: Partial<ProviderForm>;
}

export default function AddProviderDialog({
  open,
  setOpen,
  onApply,
  onCancel,
  initial,
}: AddProviderDialogProps) {
  const { register, handleSubmit, formState, reset } = useForm<ProviderForm>({
    mode: "onChange",
    resolver: zodResolver(ProviderSchema),
    defaultValues: {
      ...defaultProvider(),
      ...(initial ?? {}),
    },
  });

  const isEditing = Boolean(initial && initial?.id);

  useEffect(() => {
    reset({ ...defaultProvider(), ...(initial ?? {}) });
  }, [initial, open, reset]);

  const submit = (data: ProviderForm) => {
    onApply({ ...data, id: data.id ?? `provider-${Date.now()}` });
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
              Add Additional Login Option
            </h2>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                App Name
              </label>
              <input
                {...register("name")}
                placeholder="Add app"
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
                {isEditing ? "Save" : "Link"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
