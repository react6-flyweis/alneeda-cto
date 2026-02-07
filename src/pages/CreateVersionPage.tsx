import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

const createVersionSchema = z.object({
  versionNumber: z.string().min(1, "Version number is required"),
  riskLevel: z.enum(["Low", "Medium", "High"]),
  releaseNotes: z.string().optional(),
});

export type CreateVersionForm = z.infer<typeof createVersionSchema>;

export default function CreateVersionPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateVersionForm>({
    resolver: zodResolver(createVersionSchema),
    defaultValues: { versionNumber: "", riskLevel: "Medium", releaseNotes: "" },
  });

  function handleFormSubmit(data: CreateVersionForm) {
    // TODO: call API to create version
    console.log("Create version:", data);
    reset();
    navigate("/product-versioning");
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Link to="/product-versioning" className="">
            <ChevronLeft className="size-6" />
          </Link>

          <h1 className="xl:text-2xl text-lg text-[#1E1E1E] font-[poppins]">
            Create Version
          </h1>
        </div>
        <p className="xl:text-sm text-sm text-muted-foreground mt-1">
          Capture the business intent first: what changed, why it matters, and
          the risk posture before requesting approval.
        </p>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Draft Details
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Version Number *
                    </label>
                    <Input
                      placeholder="e.g. 2.4.0v-103"
                      {...register("versionNumber")}
                    />
                    {errors.versionNumber && (
                      <div className="text-sm text-destructive mt-1">
                        {errors.versionNumber.message}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Risk Level *
                    </label>
                    <Controller
                      control={control}
                      name="riskLevel"
                      render={({ field }) => (
                        <Select
                          onValueChange={(val) => field.onChange(val)}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.riskLevel && (
                      <div className="text-sm text-destructive mt-1">
                        {errors.riskLevel.message}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Release Notes
                    </label>
                    <Textarea className="h-40" {...register("releaseNotes")} />
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="px-6">
                        Save Draft
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <aside>
                <h3 className="text-lg font-semibold mb-3">
                  Governance Checklist
                </h3>

                <div className="border rounded-lg p-6 bg-gray-50 border-gray-200">
                  <div className="font-medium mb-2 text-slate-900">
                    Before requesting approval, ensure you can answer
                  </div>

                  <ul className="list-disc list-inside text-sm space-y-2 text-slate-700">
                    <li>
                      What changed (business terms, pricing, policy, messaging)?
                    </li>
                    <li>Who signs off (Legal, Finance, Security, PMO)?</li>
                    <li>What&apos;s the rollback plan and business impact?</li>
                  </ul>
                </div>
              </aside>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
