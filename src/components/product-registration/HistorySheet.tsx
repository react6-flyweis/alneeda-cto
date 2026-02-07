import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type HistoryItem = {
  id: string;
  title: string;
  tag: string;
  tagStyle?: string;
  description?: string;
  actor?: string;
  date?: string;
};

export default function HistorySheet({ productId }: { productId?: string }) {
  const items: HistoryItem[] = [
    {
      id: "h1",
      title: "Status Changed to Active",
      tag: "Status",
      tagStyle: "bg-sky-100 text-sky-800",
      description: "Product activated after successful approval process",
      actor: "System Admin",
      date: "01-15-2025",
    },
    {
      id: "h2",
      title: "Activation Request Approved",
      tag: "Activation",
      tagStyle: "bg-emerald-100 text-emerald-800",
      description: "Product activated after successful approval process",
      actor: "Michael Brown",
      date: "01-15-2025",
    },
    {
      id: "h3",
      title: "Tech Owner Assigned",
      tag: "Ownership",
      tagStyle: "bg-emerald-100 text-emerald-800",
      description: "Emily Chen assigned as Technical Owner",
      actor: "John Smith",
      date: "01-15-2025",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="lg" variant="outline">
          History
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="gap-0" showCloseButton>
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle>History</SheetTitle>
              {productId && (
                <SheetDescription className="text-sm">
                  {productId}
                </SheetDescription>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className=" overflow-auto px-4">
          <div className="py-2" />
          {items.map((it) => (
            <div key={it.id} className="py-4 border-b">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-sm">{it.title}</div>
                    <Badge
                      className={`rounded ${it.tagStyle ?? "bg-muted text-muted-foreground"}`}
                    >
                      {it.tag}
                    </Badge>
                  </div>

                  {it.description && (
                    <div className="text-xs text-muted-foreground mt-2">
                      {it.description}
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground mt-3">
                    {it.actor} • {it.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
