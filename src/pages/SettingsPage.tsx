import { useState } from "react";
import PageHeader from "@/components/common_components/PageHeader";
import NotificationCenterCard from "@/components/settings/NotificationCenterCard";
import ThemeLayoutCard from "@/components/settings/ThemeLayoutCard";
import LanguagesCard from "@/components/settings/LanguagesCard";

function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: false,
    slack: false,
    discord: false,
  });

  const [theme, setTheme] = useState("light");
  const [languages, setLanguages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languages[0],
  );

  function toggle(key: keyof typeof notifications) {
    setNotifications((s) => ({ ...s, [key]: !s[key] }));
  }

  function addLanguage() {
    setLanguages((l) => [...l, "New language"]);
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Real-time monitoring and management"
      />

      <div className="space-y-5">
        <NotificationCenterCard
          notifications={notifications}
          onToggle={toggle}
        />
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <ThemeLayoutCard theme={theme} setTheme={setTheme} />

          <LanguagesCard
            languages={languages}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            addLanguage={addLanguage}
          />
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
