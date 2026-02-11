import React, { useMemo, useState } from "react";
import PageHeader from "../components/common_components/PageHeader";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import TrainingMaterialDialog from "@/components/training/TrainingMaterialDialog";
import { Pencil } from "lucide-react";

type Material = {
  title: string;
  subtitle?: string;
  audience: string;
  owner: string;
  due: string;
  status: string;
};

const materials: Material[] = [
  {
    title: "Support Playbook (Launch Week)",
    subtitle: "Include escalation paths + known issues.",
    audience: "Support",
    owner: "Support Lead",
    due: "01-20-2026",
    status: "In Progress",
  },
  {
    title: "Sales Pitch Deck (v1)",
    subtitle: undefined,
    audience: "Sales",
    owner: "Sales Ops",
    due: "01-21-2026",
    status: "Not Started",
  },
  {
    title: "Internal Product Onboarding",
    subtitle: "Record a 12–15 min walkthrough + FAQ.",
    audience: "All",
    owner: "Product",
    due: "01-22-2026",
    status: "Ready",
  },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const base = "inline-flex items-center px-3 py-1 rounded text-xs font-medium";
  const map: Record<string, string> = {
    "In Progress": "bg-amber-50 text-amber-700",
    "Not Started": "bg-sky-50 text-sky-700",
    Ready: "bg-emerald-50 text-emerald-700",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-700";
  return <span className={`${base} ${cls}`}>{status}</span>;
};

function TrainingTrackerPage() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState<Material[]>(materials);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [initialData, setInitialData] = useState<Partial<Material> | undefined>(
    undefined,
  );

  const filtered = useMemo(() => {
    return list.filter((m) =>
      `${m.title} ${m.subtitle ?? ""} ${m.audience} ${m.owner} ${m.status}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [query, list]);

  function handleSave(data: any) {
    const displayDue = data.due
      ? new Date(data.due).toLocaleDateString("en-GB")
      : "";
    const newItem: Material = {
      title: data.title,
      subtitle: undefined,
      audience: data.audience,
      owner: data.owner ?? "",
      due: displayDue,
      status: data.status,
    };

    if (editingIndex !== null && editingIndex >= 0) {
      setList((s) =>
        s.map((it, i) =>
          i === editingIndex ? { ...it, ...newItem, notes: data.notes } : it,
        ),
      );
    } else {
      setList((s) => [newItem, ...s]);
    }

    setIsDialogOpen(false);
    setEditingIndex(null);
    setInitialData(undefined);
  }

  return (
    <div className="w-full">
      <PageHeader
        title="Training Tracker"
        subtitle="Track launch enablement across teams: owners, due dates, and readiness status."
        actions={
          <>
            <TrainingMaterialDialog
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              initialData={initialData}
              onSave={handleSave}
            />
          </>
        }
      />

      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="w-1/3">
            <Input
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </CardHeader>

        <CardContent className="">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <tr>
                  <TableHead className="text-sm text-gray-500">
                    Material
                  </TableHead>
                  <TableHead className="text-sm text-gray-500">
                    Audience
                  </TableHead>
                  <TableHead className="text-sm text-gray-500">Owner</TableHead>
                  <TableHead className="text-sm text-gray-500">Due</TableHead>
                  <TableHead className="text-sm text-gray-500">
                    Status
                  </TableHead>
                  <TableHead className="text-sm text-gray-500 text-right">
                    Actions
                  </TableHead>
                </tr>
              </TableHeader>

              <TableBody>
                {filtered.map((m, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="py-4 pr-6 text-sm">
                      <div className="font-medium text-gray-800">{m.title}</div>
                      {m.subtitle && (
                        <div className="text-xs text-gray-500 mt-1">
                          {m.subtitle}
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="py-4 pr-6 text-sm text-gray-600">
                      {m.audience}
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-sm text-gray-600">
                      {m.owner}
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-sm text-gray-600">
                      {m.due}
                    </TableCell>
                    <TableCell className="py-4 pr-6">
                      <StatusBadge status={m.status} />
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-sm text-gray-600 text-right">
                      <button
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        onClick={() => {
                          setEditingIndex(idx);
                          setInitialData({
                            title: m.title,
                            subtitle: m.subtitle,
                            audience: m.audience,
                            owner: m.owner,
                            due: m.due
                              ? new Date(m.due).toISOString().slice(0, 10)
                              : "",
                            status: m.status,
                            notes: (m as any).notes,
                          });
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil size={16} />
                        <span className="sr-only">Edit</span>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TrainingTrackerPage;
