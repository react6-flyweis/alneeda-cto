import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type MaskingRule = {
  dataset: string;
  field: string;
  masking: string;
  owner: string;
  revealRequired: boolean;
};

const initialMaskingRules: MaskingRule[] = [
  {
    dataset: "Payments",
    field: "bank_account_number",
    masking: "Partial",
    owner: "Security Lead",
    revealRequired: true,
  },
  {
    dataset: "Customers",
    field: "ssn",
    masking: "Hash",
    owner: "Privacy Owner",
    revealRequired: false,
  },
  {
    dataset: "Customers",
    field: "email",
    masking: "Full",
    owner: "CTO",
    revealRequired: true,
  },
  {
    dataset: "#4578",
    field: "Search API",
    masking: "Full",
    owner: "CS/Support",
    revealRequired: true,
  },
  {
    dataset: "#4576",
    field: "Ads Engine",
    masking: "Full",
    owner: "Onboarding",
    revealRequired: true,
  },
  {
    dataset: "California",
    field: "California",
    masking: "Full",
    owner: "Engineer",
    revealRequired: true,
  },
];

export default function PIIMaskingRulesCard() {
  const [rules, setRules] = useState<MaskingRule[]>(initialMaskingRules);

  function updateMasking(idx: number, value: string) {
    setRules((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], masking: value };
      return copy;
    });
  }

  function updateOwner(idx: number, value: string) {
    setRules((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], owner: value };
      return copy;
    });
  }

  function toggleReveal(idx: number) {
    setRules((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], revealRequired: !copy[idx].revealRequired };
      return copy;
    });
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>PII Masking Rules Editor</CardTitle>
          <CardDescription>
            Field-level controls with policy ownership.
          </CardDescription>
        </div>

        <CardAction>
          <Button>Save Changes</Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dataset</TableHead>
              <TableHead>Field</TableHead>
              <TableHead>Masking</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Reveal requires approval</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rules.map((rule, i) => (
              <TableRow key={`${rule.dataset}-${rule.field}`}>
                <TableCell className="font-medium">{rule.dataset}</TableCell>
                <TableCell className="text-muted-foreground">
                  {rule.field}
                </TableCell>

                <TableCell>
                  <Select
                    value={rule.masking}
                    onValueChange={(v) => updateMasking(i, v)}
                  >
                    <SelectTrigger className="w-44">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Partial">Partial</SelectItem>
                      <SelectItem value="Hash">Hash</SelectItem>
                      <SelectItem value="Full">Full</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>
                  <Select
                    value={rule.owner}
                    onValueChange={(v) => updateOwner(i, v)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Security Lead">
                        Security Lead
                      </SelectItem>
                      <SelectItem value="Privacy Owner">
                        Privacy Owner
                      </SelectItem>
                      <SelectItem value="CTO">CTO</SelectItem>
                      <SelectItem value="CS/Support">CS/Support</SelectItem>
                      <SelectItem value="Onboarding">Onboarding</SelectItem>
                      <SelectItem value="Engineer">Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Switch
                      className="data-[state=checked]:bg-blue-500"
                      checked={rule.revealRequired}
                      onCheckedChange={() => toggleReveal(i)}
                      aria-label={`Toggle reveal for ${rule.field}`}
                    />

                    <div className="text-sm text-gray-400">
                      {rule.revealRequired ? "Required" : "Not required"}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
