import { Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import AddOnboardingScreenDialog from "./AddOnboardingScreenDialog";

const ScreenSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Heading is required"),
  description: z.string().optional(),
  image: z.string().optional(),
});

const FormSchema = z.object({
  screens: z.array(ScreenSchema).min(1),
});

type FormValues = z.infer<typeof FormSchema>;

const DEFAULT_SCREENS: FormValues["screens"] = [
  {
    id: `screen-1`,
    title: "SOCIAL PLATFORM FOR CONNECT",
    description:
      "A social platform to connect, share, and grow together — discover communities and make meaningful connections.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: `screen-2`,
    title: "RESTAURANT, GROCERY, SHOPPING IN ONE PLACE",
    description:
      "Craving something tasty? Browse restaurants, order groceries, and shop essentials — all from one app.",
    image:
      "https://images.unsplash.com/photo-1541544181096-6a4a6bca2b93?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: `screen-3`,
    title: "CREATE SHORT VIDEO REVIEWS",
    description:
      "Record your thoughts and help others make better choices — share short, authentic video reviews.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
  },
];

interface OnboardingScreensDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApply: (screens: FormValues["screens"]) => void;
  onCancel: () => void;
  /** optional initial screens to show in the dialog (overrides DEFAULT_SCREENS) */
  initialScreens?: FormValues["screens"];
}

export default function OnboardingScreensDialog({
  open,
  setOpen,
  onApply,
  onCancel,
  initialScreens,
}: OnboardingScreensDialogProps) {
  const { register, control, handleSubmit, setValue, watch } =
    useForm<FormValues>({
      resolver: zodResolver(FormSchema),
      defaultValues: { screens: initialScreens ?? DEFAULT_SCREENS },
    });

  const { fields, append } = useFieldArray({
    control,
    name: "screens",
    keyName: "fieldId",
  });

  const screens = watch("screens");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const addNew = () => {
    // open the separate "Add New" dialog (user will fill details there)
    setAddDialogOpen(true);
  };

  const onFileChange = (file: File | null, index: number) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setValue(`screens.${index}.image`, url, { shouldDirty: true });
  };

  const apply = (data: FormValues) => {
    onApply(data.screens);
  };

  const cancel = () => {
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="relative flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Onboarding Screens</h2>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">
                Add New Onboarding Screen
              </div>
              <button
                onClick={addNew}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                aria-label="Add screen"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="bg-(--bg-light-blue) p-3 rounded-lg border  shadow-sm"
                >
                  <div>Onboarding Screen {idx + 1}</div>
                  <div className="flex justify-between items-start gap-4">
                    <div className="w-full">
                      {/* Image preview + upload */}
                      <div className="mb-3 rounded-lg overflow-hidden ">
                        <div className="relative w-full h-40 bg-slate-300 flex items-center justify-center">
                          {screens?.[idx]?.image ? (
                            <img
                              src={screens[idx].image}
                              alt={screens[idx].title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-sm text-gray-400">
                              Image preview
                            </div>
                          )}

                          <input
                            id={`file-${field.id}`}
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) =>
                              onFileChange(
                                e.target.files ? e.target.files[0] : null,
                                idx,
                              )
                            }
                          />
                        </div>
                      </div>

                      {/* Heading */}
                      <label className="block text-sm font-semibold mb-1">
                        Heading
                      </label>
                      <input
                        {...register(`screens.${idx}.title` as const)}
                        placeholder="enter heading text"
                        className="w-full h-11 px-3 border rounded-md text-sm bg-white"
                      />

                      {/* Description */}
                      <label className="block text-sm font-semibold mt-3 mb-1">
                        Description
                      </label>
                      <textarea
                        {...register(`screens.${idx}.description` as const)}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
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
                onClick={handleSubmit(apply)}
                className="flex-1 h-12 rounded-full bg-[#CF2027] hover:bg-[#B01C22] text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Add-onboarding-screen modal (opened by the + button) */}
        <AddOnboardingScreenDialog
          open={addDialogOpen}
          setOpen={setAddDialogOpen}
          onApply={(screen) => {
            append(screen);
          }}
          onCancel={() => setAddDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
