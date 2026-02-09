import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ChevronRight } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DeprecationTab() {
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardContent>
            <h2 className="text-lg font-medium mb-4">Timeline</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Announcement
                </label>
                <div className="relative">
                  <Input placeholder="01-05-2026" className="pr-10" />
                  <Calendar className="w-5 h-5 absolute right-3 top-3 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Feature Freeze
                </label>
                <div className="relative">
                  <Input placeholder="01-10-2026" className="pr-10" />
                  <Calendar className="w-5 h-5 absolute right-3 top-3 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sunset</label>
                <div className="relative">
                  <Input placeholder="01-20-2026" className="pr-10" />
                  <Calendar className="w-5 h-5 absolute right-3 top-3 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="border-t my-4" />

            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-medium">Documentation Complete</h3>
                <div className="text-xs text-muted-foreground mt-1">
                  01-05-2026 • Communicate reasons, target, and support policy.
                </div>
              </div>

              <div className="border-b pb-2">
                <h3 className="font-medium">Feature freeze</h3>
                <div className="text-xs text-muted-foreground mt-1">
                  01-10-2026 • No new functionality; only critical fixes.
                </div>
              </div>

              <div className="border-b pb-2">
                <h3 className="font-medium">Sunset & retirement window</h3>
                <div className="text-xs text-muted-foreground mt-1">
                  01-20-2026 • Disable new onboarding and enforce migration
                  completion.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent>
            <h2 className="text-lg font-medium mb-4">Migration target</h2>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Target Platform
              </label>

              <Select>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="platform-a">Platform A</SelectItem>
                  <SelectItem value="platform-b">Platform B</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium mb-2 block">
                Planning Notes
              </label>
              <Textarea
                className="h-40"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="mt-6 border-t pt-6">
              <Button className="w-full">
                Continue to retirement confirmation <ChevronRight />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
