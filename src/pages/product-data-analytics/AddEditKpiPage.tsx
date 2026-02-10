import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft } from "lucide-react";

const kpiSchema = z.object({
  name: z.string().min(1, "Name is required"),
  canonicalId: z.string().min(1, "Canonical ID is required"),
  owner: z.string().optional(),
  cadence: z.enum(["Daily", "Weekly", "Monthly"]),
  definitionName: z.string().optional(),
  formula: z.string().optional(),
  primaryDataSource: z.string().optional(),
});

export type KpiForm = z.infer<typeof kpiSchema>;

export default function AddEditKpiPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<KpiForm>({
    resolver: zodResolver(kpiSchema),
    defaultValues: {
      name: "",
      canonicalId: "",
      owner: "",
      cadence: "Daily",
      definitionName: "",
      formula: "",
      primaryDataSource: "",
    },
  });

  function handleFormSubmit(values: KpiForm) {
    // TODO: call API to create/update KPI
    if (id) {
      console.log("Update KPI", id, values);
    } else {
      console.log("Create KPI", values);
    }

    // after save, navigate back to list
    navigate("/product-data-analytics");
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Link to="/product-data-analytics" className="">
            <ChevronLeft className="size-6" />
          </Link>

          <h1 className="xl:text-2xl text-lg text-[#1E1E1E] font-[poppins]">
            {id ? "Edit KPI Definition" : "Add KPI Definition"}
          </h1>
        </div>
        <p className="xl:text-sm text-sm text-muted-foreground mt-1">
          Capture a consistent definition so stakeholders can trust the metric.
        </p>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-1 gap-6">
              <section className="">
                <h3 className="text-lg font-semibold mb-4">Identity</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Name
                    </label>
                    <Input {...register("name")} />
                    {errors.name && (
                      <div className="text-sm text-destructive mt-1">
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Canonical ID
                    </label>
                    <Input {...register("canonicalId")} />
                    {errors.canonicalId && (
                      <div className="text-sm text-destructive mt-1">
                        {errors.canonicalId.message}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Owner
                    </label>
                    <Input {...register("owner")} />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-medium mb-2">Review cadence</div>

                  <Controller
                    control={control}
                    name="cadence"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={(v) => field.onChange(v)}
                        className="flex items-center gap-6"
                      >
                        <label className="inline-flex items-center gap-3 cursor-pointer">
                          <RadioGroupItem value="Daily" />
                          <div className="text-sm">Daily</div>
                        </label>

                        <label className="inline-flex items-center gap-3 cursor-pointer">
                          <RadioGroupItem value="Weekly" />
                          <div className="text-sm">Weekly</div>
                        </label>

                        <label className="inline-flex items-center gap-3 cursor-pointer">
                          <RadioGroupItem value="Monthly" />
                          <div className="text-sm">Monthly</div>
                        </label>
                      </RadioGroup>
                    )}
                  />
                </div>
              </section>

              <section className="">
                <h3 className="text-lg font-semibold mb-4">Definition</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Name
                    </label>
                    <Textarea
                      className="h-36"
                      {...register("definitionName")}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Formula
                    </label>
                    <Textarea className="h-36" {...register("formula")} />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">
                    Primary Data Source
                  </label>
                  <Input {...register("primaryDataSource")} />
                </div>

                <div className="mt-6 border-t pt-6">
                  <div className="flex justify-end gap-3">
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
              </section>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
