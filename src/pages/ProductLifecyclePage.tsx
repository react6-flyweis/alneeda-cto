import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common_components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

type ProductRow = {
  product: string;
  owner: string;
  releaseDate: string;
  mau: string;

  mrr: string;
  incidents: number;
  status: "Growth" | "Mature" | "Deprecated" | "Launch";
};

const ROWS: ProductRow[] = [
  {
    product: "Atlas API",
    owner: "Platform",
    releaseDate: "01-10-2026",
    mau: "128,400",
    mrr: "$214,000",
    incidents: 3,
    status: "Growth",
  },
  {
    product: "Pulse Mobile",
    owner: "Consumer",
    releaseDate: "01-11-2026",
    mau: "310,200",
    mrr: "$142,000",
    incidents: 6,
    status: "Mature",
  },
  {
    product: "Beacon Reports",
    owner: "Analytics",
    releaseDate: "01-12-2026",
    mau: "22,900",
    mrr: "$18,000",
    incidents: 10,
    status: "Deprecated",
  },
  {
    product: "Legacy Pay",
    owner: "Billing",
    releaseDate: "01-13-2026",
    mau: "8,120",
    mrr: "$54,000",
    incidents: 4,
    status: "Launch",
  },
  // duplicates to mirror the design sample
  {
    product: "Atlas API",
    owner: "Platform",
    releaseDate: "01-14-2026",
    mau: "128,400",
    mrr: "$214,000",
    incidents: 3,
    status: "Growth",
  },
  {
    product: "Pulse Mobile",
    owner: "Consumer",
    releaseDate: "01-16-2026",
    mau: "310,200",
    mrr: "$142,000",
    incidents: 6,
    status: "Mature",
  },
  {
    product: "Beacon Reports",
    owner: "Analytics",
    releaseDate: "01-18-2026",
    mau: "22,900",
    mrr: "$18,000",
    incidents: 10,
    status: "Deprecated",
  },
  {
    product: "Legacy Pay",
    owner: "Billing",
    releaseDate: "01-20-2026",
    mau: "8,120",
    mrr: "$54,000",
    incidents: 4,
    status: "Launch",
  },
];

const statusColorMap: Record<ProductRow["status"], string> = {
  Growth: "bg-emerald-100 text-emerald-700",
  Mature: "bg-sky-100 text-sky-700",
  Deprecated: "bg-amber-100 text-amber-700",
  Launch: "bg-violet-100 text-violet-700",
};

export default function ProductLifecyclePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ROWS;
    return ROWS.filter(
      (r) =>
        r.product.toLowerCase().includes(q) ||
        r.owner.toLowerCase().includes(q) ||
        r.releaseDate.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="w-full space-y-6">
      <PageHeader
        title="Product Lifecycle Management"
        subtitle="State by product — jump into health, deprecation planning, or retirement confirmation."
      />

      <div className="mb-3 max-w-xs">
        <Input
          placeholder="Search"
          className="bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="py-3 pr-6">Product</th>
                  <th className="py-3 pr-6">Owner</th>
                  <th className="py-3 pr-6">Release Date</th>
                  <th className="py-3 pr-6">MAU</th>
                  <th className="py-3 pr-6">MRR</th>
                  <th className="py-3 pr-6">Incidents</th>
                  <th className="py-3 pr-6">Status</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((r, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-4 pr-6 text-sm text-gray-600 font-medium">
                      <Link
                        to={`/product-lifecycle/${encodeURIComponent(r.product)}`}
                        className="text-(--dark-blue) font-medium hover:underline"
                      >
                        {r.product}
                      </Link>
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600">
                      {r.owner}
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600">
                      {r.releaseDate}
                    </td>
                    <td className="py-4 pr-6 text-sm text-gray-600">{r.mau}</td>
                    <td className="py-4 pr-6 text-sm text-gray-600">{r.mrr}</td>
                    <td className="py-4 pr-6 text-sm text-gray-600">
                      {r.incidents}
                    </td>
                    <td className="py-4 pr-6">
                      <Badge className={`rounded ${statusColorMap[r.status]}`}>
                        {r.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
