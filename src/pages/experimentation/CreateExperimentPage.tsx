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
import { ChevronLeft } from "lucide-react";

const createExperimentSchema = z.object({
  name: z.string().min(1, "Experiment name is required"),
  owner: z.string().optional(),
  primaryKpi: z.string().optional(),
  trafficAllocation: z.number().min(0).max(100),
  segment: z.string().optional(),
  hypothesis: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type CreateExperimentForm = z.infer<typeof createExperimentSchema>;

export default function CreateExperimentPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateExperimentForm>({
    resolver: zodResolver(createExperimentSchema),
    defaultValues: {
      name: "",
      owner: "",
      primaryKpi: "",
      trafficAllocation: 50,
      segment: "",
      hypothesis: "",
      startDate: "",
      endDate: "",
    },
  });

  function handleFormSubmit(data: CreateExperimentForm) {
    // TODO: call API to create experiment
    console.log("Create experiment:", data);
    reset();
    navigate("/experimentation-governance");
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div className="w-full">
      <div className=" relative">
        <div className="flex items-center gap-2">
          <Link to="/experimentation-governance" className="">
            <ChevronLeft className="size-6" />
          </Link>

          <h1 className="text-2xl font-semibold text-[#1E1E1E]">
            Create Experiment
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Define the hypothesis, segment, and success metrics.
        </p>

        <div className="mt-6 bg-white rounded-xl border border-[#0000000F] p-6 relative">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold tracking-tight">Form</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Experiment Name *
                    </label>
                    <Input
                      placeholder="Experiment name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <div className="text-sm text-destructive mt-1">
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Owner
                    </label>
                    <Input placeholder="Owner" {...register("owner")} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Primary KPI
                    </label>
                    <Controller
                      control={control}
                      name="primaryKpi"
                      render={({ field }) => (
                        <Select
                          onValueChange={(val) => field.onChange(val)}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conversion">
                              Conversion
                            </SelectItem>
                            <SelectItem value="engagement">
                              Engagement
                            </SelectItem>
                            <SelectItem value="revenue">Revenue</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Traffic allocation (%)
                    </label>
                    <Input
                      type="number"
                      {...register("trafficAllocation", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.trafficAllocation && (
                      <div className="text-sm text-destructive mt-1">
                        {errors.trafficAllocation?.message}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Segment
                  </label>
                  <Input
                    placeholder="e.g. 10% new users"
                    {...register("segment")}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Hypothesis
                  </label>
                  <Textarea className="h-40" {...register("hypothesis")} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Start Date
                    </label>
                    <Input type="date" {...register("startDate")} />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      End Date{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <Input type="date" {...register("endDate")} />
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleCancel}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 w-full bg-[#0F172A] text-white"
                    >
                      Save Draft
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
