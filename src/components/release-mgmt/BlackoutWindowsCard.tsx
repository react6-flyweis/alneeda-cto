import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const blackoutWindows = [
  {
    title: "Global marketing launch",
    range: "Sun 25 Jan, 13:30 → Tue 27 Jan, 01:30",
    note: "No prod deploys unless emergency path is approved.",
    scope: "Global",
  },
  {
    title: "Global marketing launch",
    range: "Sun 25 Jan, 13:30 → Tue 27 Jan, 01:30",
    note: "No prod deploys unless emergency path is approved.",
    scope: "Global",
  },
];

export default function BlackoutWindowsCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Blackout windows</CardTitle>
          <CardDescription>
            Prevents non-emergency changes during critical periods.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {blackoutWindows.map((b, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-[#1E1E1E]">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#717182] mt-1">{b.range}</p>
                  <p className="text-xs text-[#717182] mt-1">{b.note}</p>
                </div>

                <div className="text-sm text-[#6B7280] self-start">
                  {b.scope}
                </div>
              </div>

              {idx < blackoutWindows.length - 1 && (
                <div className="border-b border-gray-100 mt-2" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
