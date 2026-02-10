import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

const documents = [
  { id: 1, name: "dco1.pdf", size: "2.4 MB", date: "01-15-2026" },
  { id: 2, name: "doc2.eml", size: "2.4 MB", date: "01-15-2026" },
];

export default function DocumentsTab() {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-4 p-4 rounded-md border bg-gray-50"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded bg-[#fafbfc] border">
                <FileText className="text-muted-foreground" />
              </div>

              <div className="flex-1">
                <div className="font-medium">{doc.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {doc.size} • {doc.date}
                </div>
              </div>

              <div>
                <button
                  className="p-2 rounded hover:bg-slate-100"
                  aria-label={`Download ${doc.name}`}
                >
                  <Download />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 p-12 border-2 border-dashed rounded-md border-muted-foreground/30 bg-muted-foreground/5 text-center">
            <FileText className="mx-auto mb-4 text-muted-foreground" />
            <div className="font-medium">Drop files here to upload</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
