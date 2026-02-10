import PageHeader from "@/components/common_components/PageHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit2 } from "lucide-react";
import { Link } from "react-router-dom";

import {
  sampleMonetizationRules,
  statusColorMap,
} from "@/lib/sample-data/monetization";

export default function MonetizationPage() {
  return (
    <div>
      <PageHeader
        title="Monetization & Revenue Logic"
        subtitle="Define how the product makes money, what's paywalled, and what's usage-limited."
        actions={
          <>
            <Link to="/monetization-revenue/create">
              <Button size="lg">
                <Plus /> Add Rule
              </Button>
            </Link>
          </>
        }
      />

      <div className="mb-4">
        <InputGroup className="bg-white max-w-xs">
          <InputGroupAddon>
            <Search className="size-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search" />
        </InputGroup>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rules</CardTitle>
          <CardDescription>
            Define monetization rules and pricing logic for the product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3">Rule Name</th>
                  <th className="py-3">Strategy</th>
                  <th className="py-3">Updated Date</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {sampleMonetizationRules.map((r) => (
                  <tr key={r.id} className="border-b last:border-b-0">
                    <td className="py-4">
                      <div className="font-medium">{r.name}</div>
                    </td>

                    <td className="py-4">
                      <div className="font-medium">{r.strategy}</div>
                    </td>

                    <td className="py-4">{r.updated}</td>

                    <td className="py-4">{r.amount}</td>

                    <td className="py-4">
                      <Badge className={`${statusColorMap[r.status]}`}>
                        {r.status}
                      </Badge>
                    </td>

                    <td className="py-4">
                      <Link
                        to={`/monetization-revenue/${r.id}/edit`}
                        aria-label={`Edit ${r.name}`}
                        className="inline-flex items-center p-2 rounded-md hover:bg-muted"
                      >
                        <Edit2 className="size-4" />
                      </Link>
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
