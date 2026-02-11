import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

export type Material = {
  title: string;
  subtitle?: string;
  audience: string;
  owner: string;
  due?: string; // yyyy-mm-dd
  status: string;
  notes?: string;
};

const trainingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  audience: z.string().min(1, "Audience is required"),
  status: z.string().min(1, "Status is required"),
  owner: z.string().optional(),
  due: z.string().optional(),
  notes: z.string().optional(),
});

export type TrainingForm = z.infer<typeof trainingSchema>;

export default function TrainingMaterialDialog({
  onSave,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: {
  onSave?: (data: TrainingForm) => void;
  initialData?: Partial<Material>;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TrainingForm>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      title: "",
      audience: "",
      status: "",
      owner: "",
      due: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title ?? "");
      setValue("audience", initialData.audience ?? "");
      setValue("status", initialData.status ?? "");
      setValue("owner", initialData.owner ?? "");
      setValue("due", initialData.due ?? "");
      setValue("notes", initialData.notes ?? "");
    }
  }, [initialData, setValue]);

  function onSubmit(data: TrainingForm) {
    console.log("Saved training material", data);
    onSave?.(data);
    // if uncontrolled, close by clearing form via event on DialogClose automatic
    // reset form after save
    reset();
    // if controlled, notify
    setControlledOpen?.(false);
  }

  const triggerButton = (
    <Button className="bg-[#0f1724] text-white rounded-lg px-4 py-2 flex items-center gap-2">
      <span>Add Material</span>
    </Button>
  );

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>

      <DialogContent className="sm:max-w-xl overflow-y-auto max-h-[90vh]">
        <DialogHeader className="text-left">
          <DialogTitle>Add/Edit Training Material</DialogTitle>
          <DialogDescription>
            Add or edit training material details including owners, due dates,
            and status.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input placeholder="" {...register("title")} />
              {errors.title && (
                <div className="text-sm text-destructive mt-1">
                  {errors.title.message}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Audience
                </label>
                <Controller
                  control={control}
                  name="audience"
                  render={({ field }) => (
                    <Select
                      onValueChange={(v) => field.onChange(v)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Engineer">Engineer</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.audience && (
                  <div className="text-sm text-destructive mt-1">
                    {errors.audience.message}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      onValueChange={(v) => field.onChange(v)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Ready">Ready</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <div className="text-sm text-destructive mt-1">
                    {errors.status.message}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Owner</label>
                <Input placeholder="" {...register("owner")} />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Due date
                </label>
                <div className="relative">
                  <Input type="date" className="pr-10" {...register("due")} />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Notes{" "}
                <span className="text-sm text-muted-foreground">
                  (optional)
                </span>
              </label>
              <Textarea className="h-28" {...register("notes")} />
            </div>
          </div>

          <DialogFooter className="grid grid-cols-2 pt-4 border-t">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" className="ml-2 bg-[#0f1724] text-white px-6">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
