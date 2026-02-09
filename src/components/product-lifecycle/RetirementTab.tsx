import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RetirementTab() {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(true);
  const [check3, setCheck3] = useState(true);
  const [proof, setProof] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent>
          <h2 className="text-lg font-medium mb-4">Checklist</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b">
              <div className="pt-1">
                <Checkbox
                  checked={check1}
                  onCheckedChange={(v) => setCheck1(Boolean(v))}
                />
              </div>

              <div>
                <div className="font-medium">
                  Customer data migrated to the target
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Validate parity (counts, checksums, and key business queries).
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b">
              <div className="pt-1">
                <Checkbox
                  checked={check2}
                  onCheckedChange={(v) => setCheck2(Boolean(v))}
                />
              </div>

              <div>
                <div className="font-medium">
                  Access disabled / credentials rotated
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Disable new writes and remove privileged tokens.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b">
              <div className="pt-1">
                <Checkbox
                  checked={check3}
                  onCheckedChange={(v) => setCheck3(Boolean(v))}
                />
              </div>

              <div>
                <div className="font-medium">
                  Docs, runbooks, and support macros updated
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Ensure internal + customer docs are consistent.
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">
                Data migration proof (link or reference)
              </label>
              <Input
                value={proof}
                onChange={(e) => setProof(e.target.value)}
                placeholder=""
                className="bg-white"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">Notes</label>
              <Textarea
                className="h-28"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="mt-6 border-t pt-6">
              <Button
                className="w-full bg-[#08223a] text-white"
                disabled={!(check1 && check2 && check3)}
              >
                Confirm Retirement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-lg font-medium mb-4">Confirmation status</h2>

          <div className="space-y-6">
            <div>
              <div className="font-medium">Readiness</div>
              <div className="text-sm text-muted-foreground mt-1">
                Complete all checklist items.
              </div>
            </div>

            <div>
              <div className="font-medium">Proof</div>
              <div className="text-sm text-muted-foreground mt-1">
                Add a link or reference to migration evidence.
              </div>
            </div>

            <div>
              <div className="font-medium">Target</div>
              <div className="text-sm text-muted-foreground mt-1">
                (set in Deprecation Plan)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
