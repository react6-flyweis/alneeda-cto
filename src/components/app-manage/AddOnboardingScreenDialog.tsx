import { Camera } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

const ScreenSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Heading is required"),
  description: z.string().optional(),
  image: z.string().optional(),
});

type ScreenForm = z.infer<typeof ScreenSchema>;

const defaultScreen = (idx = 1): ScreenForm => ({
  id: `screen-${Date.now()}-${idx}`,
  title: "",
  description: "",
  image: undefined,
});

interface AddOnboardingScreenDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApply: (screen: ScreenForm) => void;
  onCancel: () => void;
}

export default function AddOnboardingScreenDialog({
  open,
  setOpen,
  onApply,
  onCancel,
}: AddOnboardingScreenDialogProps) {
  const { register, handleSubmit, setValue, watch, formState } =
    useForm<ScreenForm>({
      resolver: zodResolver(ScreenSchema),
      defaultValues: defaultScreen(1),
    });

  const image = watch("image");

  const onFileChange = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setValue("image", url, { shouldDirty: true });
  };

  const submit = (data: ScreenForm) => {
    onApply(data);
    setOpen(false);
  };

  const cancel = () => {
    onCancel();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="relative flex flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Add New Onboarding Screen</h2>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
            <div className="bg-(--bg-light-blue) p-3 rounded-lg border  shadow-sm">
              <div className="relative w-full h-40 bg-slate-300 flex items-center justify-center rounded-md overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="onboarding"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center">
                    <div className="bg-white rounded-full p-3 shadow-md">
                      <Camera className="size-5 text-gray-700" />
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) =>
                    onFileChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">
                  Heading
                </label>
                <input
                  {...register("title")}
                  placeholder="enter heading text"
                  className="w-full h-11 px-3 border rounded-md text-sm bg-white"
                />
              </div>

              <div className="mt-3">
                <label className="block text-sm font-semibold mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  placeholder="enter description text"
                  className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                />
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
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
                Add
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
