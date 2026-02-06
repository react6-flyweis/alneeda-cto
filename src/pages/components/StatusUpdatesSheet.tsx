import { useState } from "react";
import { Bell, Clock, MessageCircle, Monitor } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Note = {
  id: string;
  type: "alert" | "auto" | "deploy" | "banner" | "note";
  title: string;
  meta?: string;
  time: string;
};

function IconForType({ type }: { type: Note["type"] }) {
  switch (type) {
    case "alert":
      return <Bell className="size-4" />;
    case "auto":
      return <Monitor className="size-4" />;
    case "deploy":
      return <Clock className="size-4" />;
    case "banner":
      return <MessageCircle className="size-4" />;
    default:
      return <MessageCircle className="size-4" />;
  }
}

export default function StatusUpdatesSheet() {
  const [active, setActive] = useState<"internal" | "customer">("internal");

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "n1",
      type: "alert",
      title: "Alert: p95 latency elevated",
      meta: "p95 > 2.5s for 10m",
      time: "17:05:17",
    },
    {
      id: "n2",
      type: "auto",
      title: "Auto-incident created + assigned",
      meta: "On-call + Incident Commander paged",
      time: "17:05:17",
    },
    {
      id: "n3",
      type: "deploy",
      title: "Deploy detected",
      meta: "auth-api v2.8.14 → v2.8.15",
      time: "17:05:17",
    },
    {
      id: "n4",
      type: "banner",
      title: "Customer banner published",
      meta: "Banner updated",
      time: "20:05:17",
    },
  ]);

  const [draft, setDraft] = useState("");

  function addNote() {
    if (!draft.trim()) return;
    const newNote: Note = {
      id: String(Math.random()).slice(2),
      type: "note",
      title: draft.slice(0, 80),
      meta: undefined,
      time: new Date().toLocaleTimeString(),
    };
    setNotes((s) => [newNote, ...s]);
    setDraft("");
  }

  function markResolved() {
    // For now just close the sheet by relying on uncontrolled sheet close via the button in footer.
    // In a real implementation we'd call an API and show confirmation.
    // eslint-disable-next-line no-alert
    alert("Marked resolved (stub)");
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="lg">Status Updates</Button>
      </SheetTrigger>

      <SheetContent side="right" className="gap-0" showCloseButton>
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle>Status Updates</SheetTitle>
              <SheetDescription className="text-xs">
                Internal notes + optional customer-facing banner.
              </SheetDescription>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2  overflow-hidden rounded bg-muted p-1">
            <button
              className={cn(
                "py-1 text-sm font-medium",
                active === "internal"
                  ? "bg-background text-foreground"
                  : "text-muted-foreground",
              )}
              onClick={() => setActive("internal")}
            >
              Internal
            </button>
            <button
              className={cn(
                "py-1 text-sm font-medium",
                active === "customer"
                  ? "bg-background text-foreground"
                  : "text-muted-foreground",
              )}
              onClick={() => setActive("customer")}
            >
              Customer
            </button>
          </div>
        </SheetHeader>

        <div className="divide-y overflow-auto">
          {notes.map((n) => (
            <div key={n.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-muted-foreground mt-1">
                  <IconForType type={n.type} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{n.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {n.time}
                    </div>
                  </div>
                  {n.meta && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {n.meta}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="p-4">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a note..."
              rows={4}
            />

            <div className="mt-3 flex justify-end">
              <Button variant="outline" onClick={addNote}>
                Add Note
              </Button>
            </div>
          </div>
        </div>

        <SheetFooter>
          <div className="pt-2">
            <Button onClick={markResolved} className="w-full">
              Mark Resolved
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
