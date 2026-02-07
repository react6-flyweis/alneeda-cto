import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const updateOwnerSchema = z.object({
  owner: z.string().min(1, "Owner is required"),
});

export type UpdateOwnerForm = z.infer<typeof updateOwnerSchema>;

type UpdateOwnershipDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentOwner?: string;
  onUpdate?: (owner: string) => void;
};

const AVAILABLE_OWNERS = [
  "John Smith",
  "Emily Chen",
  "Michael Brown",
  "Alice Johnson",
  "David Lee",
];

export default function UpdateOwnershipDialog({
  open,
  onOpenChange,
  currentOwner,
  onUpdate,
}: UpdateOwnershipDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateOwnerForm>({
    resolver: zodResolver(updateOwnerSchema),
    defaultValues: { owner: currentOwner ?? "" },
  });

  // Keep default values in sync when dialog opens with a different owner
  const [lastOwner, setLastOwner] = useState(currentOwner);
  if (open && currentOwner !== lastOwner) {
    reset({ owner: currentOwner ?? "" });
    setLastOwner(currentOwner);
  }

  function handleClose() {
    onOpenChange(false);
    reset({ owner: currentOwner ?? "" });
  }

  function handleFormSubmit(data: UpdateOwnerForm) {
    if (onUpdate) onUpdate(data.owner);
    handleClose();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Update Ownership</DialogTitle>
          <DialogDescription>
            Current Owner: <span className="font-medium">{currentOwner}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
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
                      <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_OWNERS.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
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
          </div>

          <DialogFooter className="pt-2 mt-5 grid grid-cols-2">
            <Button
              variant="outline"
              size="lg"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg" className="ml-3">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
