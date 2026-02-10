import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { rows } from "./piiFields";
import { ChevronLeftIcon } from "lucide-react";

const purposesOptions = [
  "Marketing",
  "Analytics",
  "Personalisation",
  "Compliance",
  "Billing",
  "Support",
];

const dataTypes = ["String", "Number", "Boolean", "Date"];
const sensitivityLevels = ["High", "Medium", "Low"];

const schema = z.object({
  fieldName: z.string().min(1, "Field name is required"),
  dataType: z.enum(["String", "Number", "Boolean", "Date"]),
  sensitivity: z.enum(["High", "Medium", "Low"]),
  retentionDays: z.number().int().nonnegative(),
  purposes: z.array(z.string()),
  encryption: z.boolean(),
  anonymisation: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export default function PIIFieldEditPage() {
  const { field } = useParams<{ field: string }>();
  const navigate = useNavigate();

  const initial = rows.find((r) => r.field === field);

  useEffect(() => {
    if (!initial) {
      // if not found go back
      navigate("/product-security-governance/pii-rules", { replace: true });
    }
  }, [initial, navigate]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fieldName: initial?.field ?? "",
      dataType: "String",
      sensitivity: "High",
      retentionDays: initial?.retentionDays ?? 365,
      purposes: initial?.purposes ? initial.purposes.split(", ") : [],
      encryption: initial?.protection.includes("Encrypted") ?? false,
      anonymisation: initial?.protection.includes("Anonymised") ?? false,
    },
  });

  const onSubmit = (data: FormValues) => {
    // For now just log and navigate back to rules list
    // In a real app we'd persist these changes
    console.log("Saving PII Field: ", data);
    navigate("/product-security-governance/pii-rules");
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-6">
        <Link
          to="/product-security-governance/pii-rules"
          className="inline-flex items-center text-gray-600"
        >
          <ChevronLeftIcon />
        </Link>
        <div>
          <h2 className="md:text-2xl text-xl font-semibold text-[#1E1E1E] font-[poppins]">
            Edit PII Field: {initial?.field}
          </h2>
          <p className="text-sm text-gray-600">
            Configure allowed purposes, retention, and protection settings
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Field Name
                </label>
                <Input {...register("fieldName")} placeholder="email" />
                {errors.fieldName && (
                  <p className="text-xs text-rose-600 mt-1">
                    {errors.fieldName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Data Type
                </label>
                <Controller
                  control={control}
                  name="dataType"
                  render={({ field }) => (
                    <Select onValueChange={(v) => field.onChange(v)}>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataTypes.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Sensitivity Level
                </label>
                <Controller
                  control={control}
                  name="sensitivity"
                  render={({ field }) => (
                    <Select onValueChange={(v) => field.onChange(v)}>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select sensitivity" />
                      </SelectTrigger>
                      <SelectContent>
                        {sensitivityLevels.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Retention Period (days)
                </label>
                <Input
                  type="number"
                  {...register("retentionDays", { valueAsNumber: true })}
                />
                {errors.retentionDays && (
                  <p className="text-xs text-rose-600 mt-1">
                    {String(errors.retentionDays.message)}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">
                  Allowed Purposes
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {purposesOptions.map((p) => {
                    const purposes = watch("purposes") || [];
                    const checked = purposes.includes(p);
                    return (
                      <label key={p} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const arr = watch("purposes") || [];
                            if (e.currentTarget.checked) {
                              setValue("purposes", [...arr, p]);
                            } else {
                              setValue(
                                "purposes",
                                arr.filter((x: string) => x !== p),
                              );
                            }
                          }}
                        />
                        <span className="text-sm">{p}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-2 border-t pt-4 flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium block">
                    Encryption at Rest
                  </label>
                  <p className="text-xs text-gray-500">
                    Encrypt this field when stored in database
                  </p>
                </div>
                <Controller
                  control={control}
                  name="encryption"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(Boolean(v))}
                    />
                  )}
                />
              </div>

              <div className="md:col-span-2 border-t pt-4 flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium block">
                    Anonymisation
                  </label>
                  <p className="text-xs text-gray-500">
                    Apply anonymisation for analytics use
                  </p>
                </div>
                <Controller
                  control={control}
                  name="anonymisation"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(Boolean(v))}
                    />
                  )}
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
