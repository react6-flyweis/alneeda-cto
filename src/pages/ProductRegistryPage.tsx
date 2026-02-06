import { useMemo, useState } from "react";
import PageHeader from "@/components/common_components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Button from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import CreateProductDialog from "@/components/product-registration/CreateProductDialog";

type Product = {
  id: string;
  name: string;
  owner: string;
  createdDate: string;
  status: "Active" | "Draft" | "Blocked";
};

const PRODUCTS: Product[] = [
  {
    id: "PRD-001",
    name: "Digital Banking Platform",
    owner: "John Smith",
    createdDate: "01-15-2025",
    status: "Active",
  },
  {
    id: "PRD-002",
    name: "Mobile Payment Gateway",
    owner: "Sarah Johnson",
    createdDate: "02-15-2025",
    status: "Draft",
  },
  {
    id: "PRD-003",
    name: "Legacy CRM System",
    owner: "Mike Davis",
    createdDate: "03-15-2025",
    status: "Blocked",
  },
  {
    id: "PRD-004",
    name: "Digital Banking Platform",
    owner: "Sarah Johnson",
    createdDate: "01-15-2025",
    status: "Active",
  },
  {
    id: "PRD-005",
    name: "Digital Banking Platform",
    owner: "Sarah Johnson",
    createdDate: "01-15-2025",
    status: "Active",
  },
  {
    id: "PRD-006",
    name: "Mobile Payment Gateway",
    owner: "John Smith",
    createdDate: "01-15-2025",
    status: "Draft",
  },
  {
    id: "PRD-007",
    name: "Mobile Payment Gateway",
    owner: "Esther Howard",
    createdDate: "02-15-2025",
    status: "Blocked",
  },
  {
    id: "PRD-008",
    name: "Mobile Payment Gateway",
    owner: "Ralph Edwards",
    createdDate: "02-15-2025",
    status: "Active",
  },
];

const statusColorMap: Record<Product["status"], string> = {
  Active: "bg-green-100 text-green-700",
  Draft: "bg-yellow-100 text-yellow-700",
  Blocked: "bg-red-100 text-red-700",
};

export default function ProductRegistryPage() {
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.id.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="w-full space-y-6">
      <PageHeader
        title="Product Registry"
        subtitle="Manage and track all product life cycles"
        actions={
          <Button className="flex gap-1" onClick={() => setCreateOpen(true)}>
            <Plus /> Create Product
          </Button>
        }
      />

      <div className="mb-3 max-w-sm">
        <Input
          placeholder="Search"
          className="bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <tr>
                <TableHead>Product ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </tr>
            </TableHeader>

            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.owner}</TableCell>
                  <TableCell>{p.createdDate}</TableCell>
                  <TableCell>
                    <Badge className={`rounded ${statusColorMap[p.status]}`}>
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {/* <Button variant="ghost" size="icon" asChild> */}
                    <Link
                      to={`/product-registration/${p.id}`}
                      aria-label={`View ${p.id}`}
                    >
                      <Eye />
                    </Link>
                    {/* </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateProductDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
