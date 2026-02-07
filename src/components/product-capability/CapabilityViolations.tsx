import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";

type Violation = { product: string; capability: string; missing: string[] };
type Exception = {
  created: string;
  product: string;
  capability: string;
  reason: string;
};

const MOCK_VIOLATIONS: Violation[] = [
  { product: "Risk Studio", capability: "Security", missing: ["Audit Trail"] },
];

const MOCK_EXCEPTIONS: Exception[] = [
  {
    created: "01–27–2026, 14:46:48",
    product: "Ledger",
    capability: "Data Export",
    reason:
      "Temporary export access needed for a data exception for a limited window.",
  },
  {
    created: "01–27–2026, 14:46:48",
    product: "Gateway",
    capability: "Enterprise SSO",
    reason: "Enterprise customer contract requires SSO for onboarding.",
  },
];

export default function CapabilityViolations() {
  const [violationSection, setViolationSection] = useState<
    "blocked" | "exceptions"
  >("blocked");

  return (
    <div className="flex gap-4">
      <aside className="w-60">
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="text-sm">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button
                variant={violationSection === "blocked" ? undefined : "ghost"}
                size="lg"
                className="rounded-full"
                onClick={() => setViolationSection("blocked")}
              >
                Blocked Dependencies
              </Button>
              <Button
                onClick={() => setViolationSection("exceptions")}
                variant={
                  violationSection === "exceptions" ? undefined : "ghost"
                }
                className="rounded-full"
              >
                Exception Requests
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>

      <div className="flex-1 space-y-5">
        {violationSection === "blocked" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Violation Review</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-sm text-muted-foreground">
                Violations occur when a product enables a capability but does
                not enable its required capabilities.
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground border-b border-border">
                      <th className="py-3 px-6 w-1/3 font-medium">Product</th>
                      <th className="py-3 px-6 w-1/3 font-medium">
                        Capability
                      </th>
                      <th className="py-3 px-6 font-medium">
                        Missing Prerequisites
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MOCK_VIOLATIONS.map((v) => (
                      <tr key={v.product}>
                        <td className="py-6 px-6">{v.product}</td>
                        <td className="py-6 px-6 font-medium">
                          {v.capability}
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex gap-2">
                            {v.missing.map((m) => (
                              <Link
                                key={m}
                                to="#"
                                className="text-xs font-medium rounded px-2 py-1 bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                              >
                                {m}
                              </Link>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {violationSection === "exceptions" && (
          <Card>
            <CardHeader>
              <CardTitle>Exception Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-sm text-muted-foreground">
                Approvals should be time-boxed and include an owner +
                mitigation.
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground border-b border-border">
                      <th className="py-3 px-6 w-1/6 font-medium">Created</th>
                      <th className="py-3 px-6 w-1/6 font-medium">Product</th>
                      <th className="py-3 px-6 w-1/6 font-medium">
                        Capability
                      </th>
                      <th className="py-3 px-6 font-medium">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MOCK_EXCEPTIONS.map((e, idx) => (
                      <tr key={`${e.product}-${idx}`}>
                        <td className="py-6 px-6">{e.created}</td>
                        <td className="py-6 px-6">{e.product}</td>
                        <td className="py-6 px-6 font-medium">
                          {e.capability}
                        </td>
                        <td className="py-6 px-6">{e.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
