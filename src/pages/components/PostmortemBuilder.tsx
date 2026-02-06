import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const postmortemSchema = z.object({
  summary: z.string().optional(),
  customerImpact: z.string().optional(),
  rootCause: z.string().optional(),
  actionItems: z
    .array(
      z.object({
        description: z.string().optional(),
        dueDate: z.string().optional(),
        owner: z.string().optional(),
        done: z.boolean().optional(),
      }),
    )
    .optional(),
  mitigationDocumented: z.boolean().refine((v) => v === true, {
    message: "Mitigation steps must be documented",
  }),
  ownerAssigned: z
    .boolean()
    .refine((v) => v === true, { message: "Owner must be assigned" }),
});

type PostmortemFormType = z.infer<typeof postmortemSchema>;

export default function PostmortemBuilder() {
  return (
    <Card className="mt-6">
      <CardHeader className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="md:text-xl text-lg font-medium">
            Postmortem builder
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Mandatory for Sev1. Prevention tasks required before close.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <PostmortemForm />
      </CardContent>
    </Card>
  );
}

function PostmortemForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostmortemFormType>({
    resolver: zodResolver(postmortemSchema),
    defaultValues: {
      summary: "",
      customerImpact: "",
      rootCause: "",
      actionItems: [
        { description: "", dueDate: "", owner: "", done: false },
        { description: "", dueDate: "", owner: "", done: false },
        { description: "", dueDate: "", owner: "", done: false },
      ],
      mitigationDocumented: false,
      ownerAssigned: false,
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "actionItems",
  });

  function onAddItem() {
    append({ description: "", dueDate: "", owner: "", done: false });
  }

  function onSubmit(data: PostmortemFormType) {
    console.log("Postmortem saved:", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Summary</label>
          <Textarea className="h-24" {...register("summary")} />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            Customer Impact
          </label>
          <Textarea className="h-24" {...register("customerImpact")} />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Root Cause</label>
          <Textarea className="h-24" {...register("rootCause")} />
        </div>
      </div>

      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-medium">Action items</div>
          <div className="text-sm text-muted-foreground">
            Linked tasks for prevention and follow-up.
          </div>
        </div>

        <Button size="sm" variant="outline" onClick={onAddItem} type="button">
          Add Item
        </Button>
      </div>

      <div className="rounded border">
        {fields.length > 0 && (
          <div className="grid grid-cols-12 gap-4 p-4 items-center border-b">
            <div className="col-span-6 text-sm text-muted-foreground font-medium">
              Action Items Description
            </div>
            <div className="col-span-3 text-sm text-muted-foreground font-medium">
              Due Date
            </div>
            <div className="col-span-2 text-sm text-muted-foreground font-medium">
              Owner
            </div>
            <div className="col-span-1 text-sm text-muted-foreground font-medium text-center">
              Done
            </div>
          </div>
        )}

        <div className="divide-y">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-12 gap-4 p-4 items-center"
            >
              <div className="col-span-6">
                <Input
                  placeholder="Description"
                  {...register(`actionItems.${index}.description` as const)}
                />
              </div>

              <div className="col-span-3">
                <Input
                  type="date"
                  {...register(`actionItems.${index}.dueDate` as const)}
                />
              </div>

              <div className="col-span-2">
                <Input
                  placeholder="Owner"
                  {...register(`actionItems.${index}.owner` as const)}
                />
              </div>

              <div className="col-span-1 flex items-center justify-center">
                <Controller
                  control={control}
                  name={`actionItems.${index}.done` as const}
                  render={({ field: controllerField }) => (
                    <Checkbox
                      checked={!!controllerField.value}
                      onCheckedChange={(val) =>
                        controllerField.onChange(Boolean(val))
                      }
                    />
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="font-medium mb-3 pb-3 border-b">
          Prevention checklist
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b">
            <Controller
              control={control}
              name="mitigationDocumented"
              render={({ field }) => (
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={(v) => field.onChange(Boolean(v))}
                />
              )}
            />
            <div>
              <div className="font-medium">Mitigation steps documented *</div>
              <div className="text-sm text-muted-foreground">
                Prevention enforcement policy
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 pb-4 border-b">
            <Controller
              control={control}
              name="ownerAssigned"
              render={({ field }) => (
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={(v) => field.onChange(Boolean(v))}
                />
              )}
            />
            <div>
              <div className="font-medium">Owner assigned for fix *</div>
              <div className="text-sm text-muted-foreground">
                Prevention enforcement policy
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with actions */}
      <div className="">
        <div className="mb-2">
          {errors.mitigationDocumented && (
            <p className="text-sm text-destructive">
              {errors.mitigationDocumented.message}
            </p>
          )}
          {errors.ownerAssigned && (
            <p className="text-sm text-destructive">
              {errors.ownerAssigned.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
