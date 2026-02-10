export type MonetizationRule = {
  id: string;
  name: string;
  strategy: string;
  updated: string;
  amount: string;
  status: "Active" | "Draft";
};

export const sampleMonetizationRules: MonetizationRule[] = [
  {
    id: "core-saas-1",
    name: "Core SaaS Subscription",
    strategy: "Subscription",
    updated: "01-20-2026",
    amount: "$140",
    status: "Active",
  },
  {
    id: "growth-hybrid-1",
    name: "Growth Hybrid",
    strategy: "Hybrid",
    updated: "01-21-2026",
    amount: "$140",
    status: "Draft",
  },
  {
    id: "core-saas-2",
    name: "Core SaaS Subscription",
    strategy: "Hybrid",
    updated: "01-22-2026",
    amount: "$249",
    status: "Active",
  },
  {
    id: "growth-usage-1",
    name: "Growth Hybrid",
    strategy: "Usage",
    updated: "01-20-2026",
    amount: "$99",
    status: "Draft",
  },
];

export const statusColorMap: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Draft: "bg-amber-50 text-amber-700",
};
