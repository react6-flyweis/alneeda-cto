import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  theme: string;
  setTheme: (v: string) => void;
}

export default function ThemeLayoutCard({ theme, setTheme }: Props) {
  return (
    <Card className="">
      <CardHeader>
        <div>
          <CardTitle className="text-lg">
            Theme & Layout Customization
          </CardTitle>
          <CardDescription>
            Adjust the app theme and layout preferences
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <RadioGroup value={theme} onValueChange={(v) => setTheme(v)}>
            <div className="grid gap-2">
              <label
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg transition-shadow",
                  theme === "dark" ? "bg-sky-50 shadow-sm" : "bg-muted",
                )}
              >
                <div>
                  <div className="font-semibold">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Dark color scheme
                  </div>
                </div>

                <RadioGroupItem
                  value="dark"
                  className={cn(
                    "size-6",
                    theme === "dark"
                      ? "bg-sky-800 text-white border-sky-800"
                      : "",
                  )}
                />
              </label>

              <label
                onClick={() => setTheme("light")}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg transition-shadow",
                  theme === "light" ? "bg-sky-50 shadow-sm" : "bg-muted",
                )}
              >
                <div>
                  <div className="font-semibold">Light Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Current theme (Default)
                  </div>
                </div>

                <RadioGroupItem
                  value="light"
                  className={cn(
                    "size-6",
                    theme === "light"
                      ? "bg-sky-800 text-white border-sky-800"
                      : "",
                  )}
                />
              </label>

              <label
                onClick={() => setTheme("auto")}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg transition-shadow",
                  theme === "auto" ? "bg-sky-50 shadow-sm" : "bg-muted",
                )}
              >
                <div>
                  <div className="font-semibold">Auto</div>
                  <div className="text-sm text-muted-foreground">
                    Follow system preferences
                  </div>
                </div>

                <RadioGroupItem
                  value="auto"
                  className={cn(
                    "size-6",
                    theme === "auto"
                      ? "bg-sky-800 text-white border-sky-800"
                      : "",
                  )}
                />
              </label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>

      <CardFooter>
        <div className="w-full flex flex-col gap-2">
          <div className="text-sm font-semibold border-t pt-4">
            Department Layout
          </div>

          <div className="flex flex-col divide-y">
            {[
              "Technical Department",
              "Product Development",
              "Security Department",
            ].map((d) => (
              <div
                key={d}
                className="flex items-center justify-between py-3 text-sm text-muted-foreground"
              >
                <div>{d}</div>
                <Button variant="link" size="sm" className="p-0">
                  Customize
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-2">
            <Button size="sm">Edit layout</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
