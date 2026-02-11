import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface Props {
  languages: string[];
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  addLanguage: () => void;
}

export default function LanguagesCard({
  languages,
  selectedLanguage,
  setSelectedLanguage,
  addLanguage,
}: Props) {
  return (
    <Card className="">
      <CardHeader>
        <div>
          <CardTitle className="text-lg">
            Multi-Language Documentation
          </CardTitle>
          <CardDescription>
            Manage supported documentation languages
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setSelectedLanguage(lang)}
              className={cn(
                "w-full text-left rounded-lg p-4 flex items-center justify-between transition-shadow",
                selectedLanguage === lang ? "bg-sky-50 shadow-sm" : "bg-muted",
              )}
            >
              <div className="font-medium">{lang}</div>

              <div className="flex items-center">
                {selectedLanguage === lang ? (
                  <div className="size-5 rounded-full bg-slate-900 flex items-center justify-center">
                    <div className="size-2 rounded-full bg-white" />
                  </div>
                ) : (
                  <div className="size-5 rounded-full border border-slate-300" />
                )}
              </div>
            </button>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-slate-900 text-white hover:bg-slate-800"
          onClick={addLanguage}
        >
          <Plus className="size-4" /> Add Language
        </Button>
      </CardFooter>
    </Card>
  );
}
