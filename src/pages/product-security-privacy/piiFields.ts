export type PIIFieldRow = {
  field: string;
  retentionDays: number;
  lastReviewed: string;
  purposes: string;
  protection: string;
  risk: "High" | "Medium" | "Low";
};

export const rows: PIIFieldRow[] = [
  {
    field: "email",
    retentionDays: 365,
    lastReviewed: "01-20-2026",
    purposes: "Marketing, Analytics, Personalisation",
    protection: "Encrypted, Anonymised",
    risk: "High",
  },
  {
    field: "full_name",
    retentionDays: 365,
    lastReviewed: "01-21-2026",
    purposes: "Compliance, Support, Billing",
    protection: "Encrypted, Anonymised",
    risk: "High",
  },
  {
    field: "ip_address",
    retentionDays: 730,
    lastReviewed: "01-22-2026",
    purposes: "Marketing, Personalisation",
    protection: "Anonymised",
    risk: "Low",
  },
  {
    field: "billing_address",
    retentionDays: 90,
    lastReviewed: "01-20-2026",
    purposes: "Compliance",
    protection: "Encrypted",
    risk: "Medium",
  },
  {
    field: "device_id",
    retentionDays: 2555,
    lastReviewed: "01-19-2026",
    purposes: "Support",
    protection: "Encrypted",
    risk: "Medium",
  },
  {
    field: "date_of_birth",
    retentionDays: 365,
    lastReviewed: "01-17-2026",
    purposes: "Personalisation",
    protection: "Anonymised",
    risk: "High",
  },
  {
    field: "ssn_last_four",
    retentionDays: 2555,
    lastReviewed: "01-16-2026",
    purposes: "Analytics",
    protection: "Anonymised",
    risk: "High",
  },
];

export const riskColorMap: Record<PIIFieldRow["risk"], string> = {
  High: "bg-rose-100 text-rose-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};
