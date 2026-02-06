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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const createProductSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  businessVertical: z.string().min(1, "Business vertical is required"),
  initialScope: z.string().min(1, "Initial scope is required"),
});

export type CreateProductForm = z.infer<typeof createProductSchema>;

type CreateProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreateProductForm) => void;
};

export default function CreateProductDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateProductDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      productName: "",
      businessVertical: "",
      initialScope: "",
    },
  });

  function handleClose() {
    onOpenChange(false);
    reset();
  }

  function handleFormSubmit(data: CreateProductForm) {
    if (onSubmit) onSubmit(data);
    handleClose();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Product</DialogTitle>
          <DialogDescription>
            Fill in the details to register a new product
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Product Name *
              </label>
              <Input placeholder="" {...register("productName")} />
              {errors.productName && (
                <div className="text-sm text-destructive mt-1">
                  {errors.productName.message}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Business Vertical *
              </label>
              <Controller
                control={control}
                name="businessVertical"
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(val)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banking">Banking</SelectItem>
                      <SelectItem value="payments">Payments</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.businessVertical && (
                <div className="text-sm text-destructive mt-1">
                  {errors.businessVertical.message}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Initial Scope *
              </label>
              <Textarea className="h-36" {...register("initialScope")} />
              {errors.initialScope && (
                <div className="text-sm text-destructive mt-1">
                  {errors.initialScope.message}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="pt-2 border-t grid grid-cols-2">
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="ml-3">
              Submit for Approval
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
