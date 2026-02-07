import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";

type MappingItem = {
  name: string;
  owner: string;
  use: boolean;
  requires: string[];
};

const PRODUCTS = ["Ledger", "Risk Studio", "Gateway"];

const MOCK_MAPPING: MappingItem[] = [
  { name: "Audit Trail", owner: "Security", use: true, requires: [] },
  {
    name: "Data Export",
    owner: "Platform",
    use: true,
    requires: ["Audit Trail"],
  },
  {
    name: "AI Summaries",
    owner: "Applied AI",
    use: false,
    requires: ["Audit Trail"],
  },
  { name: "Billing Hooks", owner: "Finance Ops", use: false, requires: [] },
  { name: "Enterprise SSO", owner: "Identity", use: false, requires: [] },
];

export default function CapabilityMapping() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  return (
    <div className="flex gap-4">
      <aside className="w-60">
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="text-sm">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              {PRODUCTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedProduct(p)}
                  className={`text-left px-3 py-2 rounded-md ${selectedProduct === p ? "bg-slate-900 text-white" : "hover:bg-slate-50"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </aside>

      <div className="flex-1">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle>Product → Capability links</CardTitle>
              <div className="text-sm text-muted-foreground">
                Editing {selectedProduct}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b border-border">
                    <th className="py-3 px-6 w-1/6">Use</th>
                    <th className="py-3 px-6 w-2/6">Capability</th>
                    <th className="py-3 px-6 w-2/6">Owner</th>
                    <th className="py-3 px-6 w-1/6">Requires</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MOCK_MAPPING.map((m) => (
                    <tr key={m.name}>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center">
                          <Checkbox
                            defaultChecked={m.use}
                            aria-label={`Use ${m.name}`}
                            className="h-5 w-5 data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900 data-[state=checked]:text-white data-[state=checked]:shadow-sm"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium">{m.name}</td>
                      <td className="py-4 px-6 text-sm text-muted-foreground">
                        {m.owner}
                      </td>
                      <td className="py-4 px-6">
                        {m.requires.length > 0 ? (
                          <div className="flex gap-2">
                            {m.requires.map((r) => (
                              <Link
                                key={r}
                                to="#"
                                className="text-xs font-medium text-nowrap rounded px-2 py-1 bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                              >
                                {r}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">--</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
