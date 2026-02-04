import { Link } from "react-router-dom";
import PageHeader from "@/components/common_components/PageHeader";
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
import { useState } from "react";

type AccessRow = {
  principal: string;
  role: string;
  resource: string;
  lastUsed: string;
  expiry: string;
};

const rows: AccessRow[] = [
  {
    principal: "cs-team@acme",
    role: "CS / Support",
    resource: "Customer Records (masked PII)",
    lastUsed: "01-20-2026, 15:14",
    expiry: "01-19-2027",
  },
  {
    principal: "security@acme",
    role: "Security Lead",
    resource: "PII Reveal (time-limited)",
    lastUsed: "01-20-2026, 09:14",
    expiry: "01-19-2027",
  },
  {
    principal: "infra@acme",
    role: "CTO",
    resource: "Secrets & Key Rotation",
    lastUsed: "01-19-2026, 10:14",
    expiry: "01-18-2027",
  },
];

export default function SecurityPrivacyPage() {
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
    <div className="w-full">
      <PageHeader
        title="Security & Privacy"
        subtitle="Keeping Your Data Safe and Private"
      />

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Access Review</CardTitle>
            <CardDescription>
              Who has access to what, last used, expiry.
            </CardDescription>
          </div>
          <CardAction>
            <Link to="/security-privacy/access-review">
              <Button>View All</Button>
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Principal</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead>Expiry</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.principal}>
                  <TableCell className="font-medium">{r.principal}</TableCell>
                  <TableCell>{r.role}</TableCell>
                  <TableCell className="max-w-[40%] text-ellipsis overflow-hidden">
                    {r.resource}
                  </TableCell>
                  <TableCell>{r.lastUsed}</TableCell>
                  <TableCell>{r.expiry}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>PII Masking Rules Editor</CardTitle>
            <CardDescription>
              Field-level controls with policy ownership.
            </CardDescription>
          </div>

          <CardAction>
            <Button className="">Save Changes</Button>
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
    </div>
  );
}
