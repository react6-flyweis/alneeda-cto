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
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft } from "lucide-react";

const requestLaunchSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  version: z.string().optional(),
  targetLaunchDate: z.string().optional(),
  launchType: z.string().optional(),
  targetMarkets: z.string().optional(),
  riskLevel: z.enum(["Low", "Medium", "High"]).optional(),
  primaryContact: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  justification: z.string().optional(),
  regulatoryRequirements: z.boolean(),
  dataPrivacyCompliance: z.boolean(),
  securityAssessment: z.boolean(),
});

export type RequestLaunchForm = z.infer<typeof requestLaunchSchema>;

export default function RequestLaunchClearancePage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RequestLaunchForm>({
    resolver: zodResolver(requestLaunchSchema),
    defaultValues: {
      productName: "",
      version: "",
      targetLaunchDate: "",
      launchType: "",
      targetMarkets: "",
      riskLevel: "Medium",
      primaryContact: "",
      email: "",
      justification: "",
      regulatoryRequirements: false,
      dataPrivacyCompliance: false,
      securityAssessment: false,
    },
  });

  function onSubmit(data: RequestLaunchForm) {
    // TODO: replace with real API call
    console.log("Request Launch Clearance:", data);
    reset();
    navigate("/compliance");
  }

  // function handleCancel() {
  //   navigate(-1);
  // }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Link to="/compliance" className="text-muted-foreground -ml-1">
            <ChevronLeft className="h-5 w-5" />
          </Link>

          <h1 className="xl:text-2xl text-lg text-[#1E1E1E] font-[poppins]">
            Request Launch Clearance
          </h1>
        </div>
        <p className="xl:text-sm text-sm text-muted-foreground mt-1">
          Submit a request for product launch approval from the compliance team
        </p>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold mb-1">
                    Product Information
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Basic details about the product being launched
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      Version
                    </label>
                    <Input placeholder="" {...register("version")} />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Target Launch Date
                    </label>
                    <Input type="date" {...register("targetLaunchDate")} />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Launch Type
                    </label>
                    <Controller
                      control={control}
                      name="launchType"
                      render={({ field }) => (
                        <Select
                          onValueChange={(val) => field.onChange(val)}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New Product">
                              New Product
                            </SelectItem>
                            <SelectItem value="Major Update">
                              Major Update
                            </SelectItem>
                            <SelectItem value="Minor Update">
                              Minor Update
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Target Markets
                    </label>
                    <Input
                      placeholder="e.g. US, EU"
                      {...register("targetMarkets")}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Risk Level
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
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Primary Contact
                    </label>
                    <Input placeholder="Name" {...register("primaryContact")} />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email Address
                    </label>
                    <Input
                      placeholder="name@company.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className="text-sm text-destructive mt-1">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-3">
                    <label className="text-sm font-medium mb-2 block">
                      Justification & Objectives
                    </label>
                    <Textarea className="h-32" {...register("justification")} />
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h4 className="font-medium mb-1">Compliance Confirmations</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please confirm the following requirements have been met
                  </p>

                  <div>
                    <div className="flex items-start gap-3 py-4 border-b last:border-b-0">
                      <Checkbox
                        className="mt-1"
                        {...register("regulatoryRequirements")}
                      />
                      <div className="flex-1">
                        <div className="font-medium">
                          Regulatory Requirements
                        </div>
                        <div className="text-sm text-muted-foreground">
                          I confirm that all applicable regulatory requirements
                          have been reviewed and addressed
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 py-4 border-b last:border-b-0">
                      <Checkbox
                        className="mt-1"
                        {...register("dataPrivacyCompliance")}
                      />
                      <div className="flex-1">
                        <div className="font-medium">
                          Data Privacy Compliance
                        </div>
                        <div className="text-sm text-muted-foreground">
                          I confirm that data privacy requirements (GDPR, CCPA,
                          etc.) have been fully implemented
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 py-4">
                      <Checkbox
                        className="mt-1"
                        {...register("securityAssessment")}
                      />
                      <div className="flex-1">
                        <div className="font-medium">Security Assessment</div>
                        <div className="text-sm text-muted-foreground">
                          I confirm that a security assessment has been
                          conducted and any findings addressed
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    {/* <Button
                      variant="outline"
                      onClick={handleCancel}
                      type="button"
                    >
                      Cancel
                    </Button> */}
                    <Button type="submit">Submit Clearance Request</Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
