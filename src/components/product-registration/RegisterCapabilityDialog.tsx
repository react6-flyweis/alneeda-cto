import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const registerCapabilitySchema = z.object({
  capabilityName: z.string().min(1, "Capability name is required"),
  owner: z.string().min(1, "Owner is required"),
  status: z.enum(["Active", "Deprecated", "Draft"]),
});

export type RegisterCapabilityForm = z.infer<typeof registerCapabilitySchema>;

type RegisterCapabilityDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: RegisterCapabilityForm) => void;
};

export default function RegisterCapabilityDialog({
  open,
  onOpenChange,
  onSubmit,
}: RegisterCapabilityDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterCapabilityForm>({
    resolver: zodResolver(registerCapabilitySchema),
    defaultValues: {
      capabilityName: "",
      owner: "",
      status: "Active",
    },
  });

  function handleClose() {
    onOpenChange(false);
    reset();
  }

  function handleFormSubmit(data: RegisterCapabilityForm) {
    if (onSubmit) onSubmit(data);
    handleClose();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Register Capability</DialogTitle>
          <DialogDescription>
            Keep capabilities small and composable. Add dependencies later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Capability Name
              </label>
              <Input placeholder="" {...register("capabilityName")} />
              {errors.capabilityName && (
                <div className="text-sm text-destructive mt-1">
                  {errors.capabilityName.message}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Owner</label>
              <Controller
                control={control}
                name="owner"
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(val)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Platform">Platform</SelectItem>
                      <SelectItem value="Applied AI">Applied AI</SelectItem>
                      <SelectItem value="Finance Ops">Finance Ops</SelectItem>
                      <SelectItem value="Identity">Identity</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.owner && (
                <div className="text-sm text-destructive mt-1">
                  {errors.owner.message}
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
                    onValueChange={(val) => field.onChange(val)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Deprecated">Deprecated</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <DialogFooter className="pt-2 border-t grid grid-cols-2">
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="ml-3">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
