import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RevenueApprovalDialog from "@/components/product-capability/RevenueApprovalDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleMonetizationRules } from "@/lib/sample-data/monetization";

const monetizationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  strategy: z.enum(["Subscription", "Hybrid", "Usage", "Free"]),
  monthly: z.string().optional(),
  annual: z.string().optional(),
  trialDays: z.number().min(0).optional(),
  gates: z.array(
    z.object({
      key: z.string(),
      title: z.string(),
      type: z.enum(["Paywall", "Limit", "Included"]),
      limit: z.number().min(0).optional(),
    }),
  ),
});

export type MonetizationForm = z.infer<typeof monetizationSchema>;

export default function MonetizationEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MonetizationForm>({
    resolver: zodResolver(monetizationSchema),
    defaultValues: {
      name: "",
      strategy: "Hybrid",
      monthly: "",
      annual: "",
      trialDays: 14,
      gates: [
        {
          key: "api_access",
          title: "API access",
          type: "Paywall",
          limit: undefined,
        },
        { key: "export_csv", title: "Export CSV", type: "Limit", limit: 10 },
      ],
    },
  });

  const { fields } = useFieldArray({ control, name: "gates" });

  useEffect(() => {
    if (id) {
      const r = sampleMonetizationRules.find((s) => s.id === id);
      if (r) {
        setValue("name", r.name);
        // populate strategy if it matches one of our enums else keep default
        if (["Subscription", "Hybrid", "Usage", "Free"].includes(r.strategy)) {
          setValue(
            "strategy",
            r.strategy as "Subscription" | "Hybrid" | "Usage" | "Free",
          );
        }
        // try extract numeric amount for monthly
        setValue("monthly", r.amount?.replace("$", "") ?? "");
        setValue("annual", "");
      }
    }
  }, [id, setValue]);

  const values = watch();

  function onSubmit(values: MonetizationForm) {
    if (id) {
      console.log("Update Monetization rule", id, values);
    } else {
      console.log("Create Monetization rule", values);
    }

    navigate("/monetization-revenue");
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Link to="/monetization-revenue" className="">
            <ChevronLeft className="size-6" />
          </Link>

          <h1 className="xl:text-2xl text-lg text-[#1E1E1E] font-[poppins]">
            Paywall / feature gating editor
          </h1>
        </div>
        <p className="xl:text-sm text-sm text-muted-foreground mt-1">
          Capture a consistent definition so stakeholders can trust the metric.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <section className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Rule Configuration
                  </h3>
                  <div className="text-sm text-muted-foreground mb-4">
                    Make changes, save draft, then send to approval summary.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Rule name
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
                        Strategy
                      </label>
                      <Controller
                        control={control}
                        name="strategy"
                        render={({ field }) => (
                          <Select onValueChange={(v) => field.onChange(v)}>
                            <SelectTrigger className="w-full bg-white">
                              <SelectValue placeholder="Select strategy" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Subscription">
                                Subscription
                              </SelectItem>
                              <SelectItem value="Hybrid">Hybrid</SelectItem>
                              <SelectItem value="Usage">Usage</SelectItem>
                              <SelectItem value="Free">Free</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <div className="text-sm font-medium mb-2">Pricing</div>
                    <div className="text-xs text-muted-foreground mb-4">
                      Used by paywalls and eligibility checks.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Monthly ($)
                        </label>
                        <Input {...register("monthly")} placeholder="140" />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Annual ($)
                        </label>
                        <Input {...register("annual")} placeholder="1680" />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Trial (Days)
                        </label>
                        <Input
                          type="number"
                          {...register("trialDays", { valueAsNumber: true })}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Feature gates</h3>
                  <div className="text-sm text-muted-foreground mb-4">
                    Control which features are allowed, paywalled, or
                    usage-limited.
                  </div>

                  <div className="grid gap-4">
                    {fields.map((f, i) => (
                      <div className="flex items-center gap-4" key={f.id}>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{f.title}</div>
                          <div className="text-xs text-muted-foreground">
                            Key: {f.key}
                          </div>
                        </div>

                        <div className="w-36">
                          <Controller
                            control={control}
                            name={`gates.${i}.type`}
                            render={({ field }) => (
                              <Select onValueChange={(v) => field.onChange(v)}>
                                <SelectTrigger className="w-full bg-white">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Paywall">
                                    Paywall
                                  </SelectItem>
                                  <SelectItem value="Limit">Limit</SelectItem>
                                  <SelectItem value="Included">
                                    Included
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>

                        <div className="w-40">
                          <Input
                            type="number"
                            {...register(`gates.${i}.limit` as const, {
                              valueAsNumber: true,
                            })}
                            placeholder="Limit/mo"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t pt-6 flex justify-end gap-3">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 bg-slate-900 hover:bg-slate-800 text-white"
                    >
                      Save Draft
                    </Button>
                  </div>
                </section>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Paywall Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <div className="text-sm text-muted-foreground mb-4">
              How this would appear to end users (static preview).
            </div>

            <div className="border rounded-lg p-4 bg-white mb-6">
              <div className="text-xs text-muted-foreground mb-2">
                Upgrade to unlock
              </div>
              <div className="text-sm font-medium">
                {values.name || "New rule"}
              </div>
              <div className="text-xs text-muted-foreground mb-4">
                Includes gates for: API access, Export CSV
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Monthly</div>
                <div className="text-sm font-semibold">
                  ${values.monthly || "140"}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-muted-foreground">Annual</div>
                <div className="text-sm font-semibold">
                  ${values.annual || "1680"}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-muted-foreground">Trial</div>
                <div className="text-sm font-semibold">
                  {values.trialDays || 14} days
                </div>
              </div>
            </div>

            <div className="mb-4">
              <Button
                variant="outline"
                className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Upgrade Now
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <RevenueApprovalDialog />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
