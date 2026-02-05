import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import PageHeader from "@/components/common_components/PageHeader";
import ExceptionApprovalDialog from "@/components/engineering-qa/ExceptionApprovalDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TestSuiteCard: React.FC<{
  title: string;
  passRate: number;
  flakyRate: number;
  status: "stable" | "flaky";
  lastRun: string;
  failing?: number;
  quarantined?: number;
}> = ({
  title,
  passRate,
  flakyRate,
  status,
  lastRun,
  failing = 0,
  quarantined = 0,
}) => {
  return (
    <Card className=" flex-1">
      <CardHeader>
        <div>
          <CardTitle className="text-sm">{title.toUpperCase()}</CardTitle>
          <CardDescription className="mt-1">Pass rate</CardDescription>
        </div>
        <div className="self-start">
          <Badge variant={status === "stable" ? "secondary" : "destructive"}>
            {status === "stable" ? "Stable" : "Flaky"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">{passRate}%</div>
        </div>

        <div className="mb-4">
          <Progress value={passRate} />
        </div>

        <div className="mb-2 text-sm text-muted-foreground">Flaky</div>
        <div className="mb-3">
          <Progress value={flakyRate} />
        </div>

        <div className="text-xs text-muted-foreground">
          Last run {lastRun} • failing {failing} • quarantined {quarantined}
        </div>
      </CardContent>
    </Card>
  );
};

const sampleFlaky = [
  {
    test: "checkout_should_submit_payment",
    suite: "e2e",
    reason: "Quarantined due to flaky third-party gateway",
    owner: "QA Automation",
    expires: "01-25-2026",
  },
  {
    test: "checkout_should_apply_coupon",
    suite: "e2e",
    reason: "Flaky due to third-party latency",
    owner: "Auto-QA",
    expires: "01-25-2026",
  },
  {
    test: "checkout_should_submit_payment",
    suite: "e2e",
    reason: "Quarantined due to flaky third-party gateway",
    owner: "QA Automation",
    expires: "01-25-2026",
  },
  {
    test: "checkout_should_apply_coupon",
    suite: "e2e",
    reason: "Flaky due to third-party latency",
    owner: "Auto-QA",
    expires: "01-25-2026",
  },
];

const EngineeringQA: React.FC = () => {
  return (
    <div className="">
      <PageHeader
        title="Engineering QA"
        subtitle="Prevent Defects Before They Reach Production"
        actions={<ExceptionApprovalDialog />}
      />

      <Card className="p-6 mb-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Test Suite Status</h2>
            <div className="text-sm text-muted-foreground">
              Unit / integration / e2e pass rate and flaky tests.
            </div>
          </div>
          <div>
            <Button variant="secondary">Quarantine a flaky test</Button>
          </div>
        </div>

        <div className="flex gap-4">
          <TestSuiteCard
            title="Unit"
            passRate={98}
            flakyRate={2}
            status="stable"
            lastRun="12:54"
            failing={3}
            quarantined={5}
          />
          <TestSuiteCard
            title="Integration"
            passRate={92}
            flakyRate={8}
            status="stable"
            lastRun="12:32"
            failing={12}
            quarantined={9}
          />
          <TestSuiteCard
            title="E2E"
            passRate={75}
            flakyRate={25}
            status="flaky"
            lastRun="12:18"
            failing={19}
            quarantined={14}
          />
        </div>
      </Card>

      <div className="mb-4 font-semibold">Flaky quarantine & stabilization</div>

      <Card>
        <div className="p-4">
          <Table>
            <TableHeader>
              <tr>
                <TableHead>Test</TableHead>
                <TableHead>Suite</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Expires</TableHead>
              </tr>
            </TableHeader>
            <TableBody>
              {sampleFlaky.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-sm">{row.test}</TableCell>
                  <TableCell className="text-sm">{row.suite}</TableCell>
                  <TableCell className="text-sm">{row.reason}</TableCell>
                  <TableCell className="text-sm">{row.owner}</TableCell>
                  <TableCell className="text-sm">{row.expires}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Release Gate View */}
      <Card className="p-6 mt-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Release Gate View</h2>
          <div className="text-sm text-muted-foreground">
            Required checks for production promotion. Gate requirements are
            immutable per release record.
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              title: "Unit suite *",
              status: "Passed",
              owner: "CI",
              desc: "Fast feedback; must pass before merge and before release promotion.",
            },
            {
              title: "Integration suite *",
              status: "Failed",
              owner: "CI",
              desc: "Service-level checks and contract tests.",
            },
            {
              title: "E2E suite *",
              status: "Failed",
              owner: "CI",
              desc: "Critical user journeys across browser/device matrix.",
            },
            {
              title: "Performance budget",
              status: "Passed",
              owner: "QA",
              desc: "Optional in normal releases; required during quarter-end freeze.",
            },
            {
              title: "Security scan *",
              status: "Running",
              owner: "CI",
              desc: "SAST + dependency scan must be green.",
            },
          ].map((g, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-4 border-t first:border-t-0"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="font-medium">{g.title}</div>
                  <Badge
                    className={cn("rounded", {
                      "bg-amber-100 text-amber-700": g.status === "Running",
                      "bg-green-100 text-green-700": g.status === "Passed",
                      "bg-blue-100 text-blue-700": g.status === "Failed",
                    })}
                  >
                    {g.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground ml-3">
                    Owner: {g.owner}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {g.desc}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Button variant="outline">Rerun</Button>
                <Button variant="outline">Pass</Button>
                <Button variant="outline">Fail</Button>
                <Button>Reset</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default EngineeringQA;
