export interface ChangeItem {
  id: string;
  summary: string;
  team: string;
  owner: string;
  risk: string;
  status: string;
}

export const riskColorMap: Record<string, string> = {
  High: "bg-amber-100 text-amber-700",
  Medium: "bg-amber-100 text-amber-700",
  Critical: "bg-red-100 text-red-700",
};

export const statusColorMap: Record<string, string> = {
  "In Review": "bg-sky-100 text-sky-700",
  Pending: "bg-amber-100 text-amber-700",
};

export const sampleChanges: ChangeItem[] = [
  {
    id: "CHG-1042",
    summary: "Swap payment provider fallback routing",
    team: "Payments Platform",
    owner: "A. Chen",
    risk: "High",
    status: "In Review",
  },
  {
    id: "CHG-1043",
    summary: "Increase max cart item limit",
    team: "Commerce",
    owner: "M. Singh",
    risk: "Medium",
    status: "Pending",
  },
  {
    id: "CHG-1045",
    summary: "Update allergen labelling rules engine",
    team: "Compliance",
    owner: "L. Navarro",
    risk: "Critical",
    status: "In Review",
  },
  {
    id: "CHG-1048",
    summary: "Swap payment provider fallback routing",
    team: "Payments Platform",
    owner: "A. Chen",
    risk: "High",
    status: "Pending",
  },
  {
    id: "CHG-1056",
    summary: "Increase max cart item limit",
    team: "Commerce",
    owner: "M. Singh",
    risk: "Medium",
    status: "In Review",
  },
  {
    id: "CHG-1066",
    summary: "Update allergen labelling rules engine",
    team: "Compliance",
    owner: "L. Navarro",
    risk: "Critical",
    status: "Pending",
  },
  {
    id: "CHG-1070",
    summary: "Swap payment provider fallback routing",
    team: "Payments Platform",
    owner: "A. Chen",
    risk: "Medium",
    status: "Pending",
  },
  {
    id: "CHG-1080",
    summary: "TXN-2024-increase max cart item limit",
    team: "Commerce",
    owner: "M. Singh",
    risk: "Critical",
    status: "In Review",
  },
];
