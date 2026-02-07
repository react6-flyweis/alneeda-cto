import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Pencil } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HistorySheet from "@/components/product-registration/HistorySheet";
import ActivationRequestDialog from "@/components/product-registration/ActivationRequestDialog";
import UpdateOwnershipDialog from "@/components/product-registration/UpdateOwnershipDialog";

type Product = {
  id: string;
  name: string;
  owner: string;
  businessVertical: string;
  createdDate: string;
  techOwner?: string;
  complianceOwner?: string;
  scopeTitle?: string;
  scopeDescription?: string;
  scopeList?: string[];
};

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "PRD-001",
    name: "Digital Banking Platform",
    owner: "John Smith",
    businessVertical: "Banking",
    createdDate: "01-15-2025",
    techOwner: "Emily Chen",
    complianceOwner: "Michael Brown",
    scopeTitle: "Product Scope",
    scopeDescription:
      "A comprehensive digital banking platform that enables customers to manage their accounts, transfer funds, pay bills, and access financial services through web and mobile interfaces.",
    scopeList: [
      "Account management and balance tracking",
      "Domestic and international fund transfers",
      "Bill payment and scheduling",
      "Transaction history and statements",
      "Security features including 2FA",
    ],
  },
];

const LINKED_VERSIONS = [
  { version: "v2.5.0", note: "Current production version", status: "Live" },
  { version: "v2.6.0", note: "Current production version", status: "Testing" },
];

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const initialProduct =
    SAMPLE_PRODUCTS.find((p) => p.id === id) ?? SAMPLE_PRODUCTS[0];
  const [product, setProduct] = useState<Product>(initialProduct);
  const [isOwnerDialogOpen, setIsOwnerDialogOpen] = useState(false);

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center mb-4 sm:gap-0 gap-2 flex-wrap">
        <div className="flex  gap-3">
          <Link to="/product-registration" aria-label="Back to products">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="size-6" />
            </Button>
          </Link>

          <div>
            <h2 className="xl:text-2xl text-xl font-semibold text-[#1E1E1E] font-[poppins]">
              Product Details
            </h2>
            <div className="text-sm text-muted-foreground">{product.id}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <HistorySheet productId={product.id} />
          <ActivationRequestDialog productId={product.id} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Product Owner</div>
              <div className="font-medium">{product.owner}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">
                Business Vertical
              </div>
              <div className="font-medium">{product.businessVertical}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Created Date</div>
              <div className="font-medium">{product.createdDate}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ownership</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Product Owner</div>
              <div className="flex items-center gap-2">
                <div className="font-medium">{product.owner}</div>
                <button
                  aria-label="Edit product owner"
                  className="opacity-70 hover:opacity-100"
                  onClick={() => setIsOwnerDialogOpen(true)}
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Tech Owner</div>
              <div className="flex items-center gap-2">
                <div className="font-medium">{product.techOwner}</div>
                <button
                  aria-label="Edit tech owner"
                  className="opacity-70 hover:opacity-100"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">
                Compliance Owner
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium">{product.complianceOwner}</div>
                <button
                  aria-label="Edit compliance owner"
                  className="opacity-70 hover:opacity-100"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <UpdateOwnershipDialog
        open={isOwnerDialogOpen}
        onOpenChange={setIsOwnerDialogOpen}
        currentOwner={product.owner}
        onUpdate={(owner) => setProduct({ ...product, owner })}
      />

      <Card>
        <CardHeader>
          <CardTitle>{product.scopeTitle ?? "Product Scope"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            {product.scopeDescription}
          </p>

          <ul className="list-disc pl-5">
            {product.scopeList?.map((item) => (
              <li key={item} className="text-sm text-muted-foreground mb-1">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Linked Versions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {LINKED_VERSIONS.map((v) => (
              <>
                <div
                  key={v.version}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">{v.version}</div>
                    <div className="text-sm text-muted-foreground">
                      {v.note}
                    </div>
                  </div>
                  <Badge
                    className={`rounded ${
                      v.status === "Live"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {v.status}
                  </Badge>
                </div>
                <div className="border-b" />
              </>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
