import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit3 } from "lucide-react";
import typographyIcon from "@/assets/app-manage/icons/typography.svg";
import bottomNavIcon from "@/assets/app-manage/icons/bottom-nav.svg";
import topNavIcon from "@/assets/app-manage/icons/top-nav.svg";
import documentIcon from "@/assets/app-manage/icons/document.svg";
import AppColorDialog from "@/components/app-manage/AppColorDialog";
import TypographyDialog from "@/components/app-manage/TypographyDialog";
import SocialMediaBottomNavigationDialog from "@/components/app-manage/SocialMediaBottomNavigationDialog";
import SocialTopNavigationDialog from "@/components/app-manage/SocialTopNavigationDialog";
import InfluencerDocumentsDialog from "@/components/app-manage/InfluencerDocumentsDialog";

export default function SocialMediaAppTab() {
  const [appColor, setAppColor] = useState<string>("#111111");
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);
  const handleColorApply = (newColor: string) => {
    setAppColor(newColor);
    setIsColorDialogOpen(false);
  };

  const [typography, setTypography] = useState<string>("Poppins");
  const [isTypographyDialogOpen, setIsTypographyDialogOpen] = useState(false);
  const handleTypographyApply = (font: string) => {
    setTypography(font);
    setIsTypographyDialogOpen(false);
  };

  const [isBottomNavDialogOpen, setIsBottomNavDialogOpen] = useState(false);
  const [, setBottomNavTabs] = useState([]);
  const handleBottomNavApply = (tabs) => {
    setBottomNavTabs(tabs);
    setIsBottomNavDialogOpen(false);
  };

  const [isHomeTopNavOpen, setIsHomeTopNavOpen] = useState(false);
  const [, setHomeTopTabs] = useState([]);
  const handleHomeTopApply = (tabs) => {
    setHomeTopTabs(tabs);
    setIsHomeTopNavOpen(false);
  };

  const [isDocsDialogOpen, setIsDocsDialogOpen] = useState(false);
  const [documentsCount, setDocumentsCount] = useState(9);
  const handleDocumentsApply = (sections) => {
    const count = sections.reduce((acc, s) => acc + (s.items?.length || 0), 0);
    setDocumentsCount(count);
    setIsDocsDialogOpen(false);
  };

  const cards = [
    {
      title: "App Color",
      subtitle: "#111111",
      icon: null,
      iconBg: "bg-[#111111]",
    },
    {
      title: "Typography",
      subtitle: typography,
      icon: <img src={typographyIcon} alt="typography" className="size-5" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Bottom Navigation",
      subtitle: "5 Options",
      icon: (
        <img src={bottomNavIcon} alt="bottom navigation" className="size-5" />
      ),
      iconBg: "bg-gray-100",
    },
    {
      title: "Home Top Navigation",
      subtitle: "10 Options",
      icon: <img src={topNavIcon} alt="top navigation" className="size-5" />,
      iconBg: "bg-gray-100",
    },
    {
      title: `Influencer's Documents`,
      subtitle: `${documentsCount} Documents`,
      icon: <img src={documentIcon} alt="documents" className="size-5" />,
      iconBg: "bg-gray-100",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className="bg-white p-4 rounded-xl border-[0.8px] border-[#0000001A] shadow-sm flex flex-col gap-3"
          >
            <div className="flex items-start gap-3">
              {c.title === "App Color" ? (
                <div
                  className="rounded-full p-3 size-11 flex items-center justify-center"
                  style={{ backgroundColor: appColor }}
                ></div>
              ) : (
                <div
                  className={`rounded-full p-3 ${c.iconBg} size-11 flex items-center justify-center`}
                >
                  {c.icon}
                </div>
              )}

              <div className="flex-1">
                <div className="text-sm text-muted-foreground">{c.title}</div>
                <div className="font-semibold mt-1">
                  {c.title === "App Color" ? appColor : c.subtitle}
                </div>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-3 pt-2">
              {c.title === "App Color" ? (
                <button
                  onClick={() => setIsColorDialogOpen(true)}
                  className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  <Edit3 className="size-3" /> <span>Edit</span>
                </button>
              ) : c.title === "Typography" ? (
                <button
                  onClick={() => setIsTypographyDialogOpen(true)}
                  className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  <Edit3 className="size-3" /> <span>Edit</span>
                </button>
              ) : c.title === "Bottom Navigation" ? (
                <button
                  onClick={() => setIsBottomNavDialogOpen(true)}
                  className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  <Edit3 className="size-3" /> <span>Edit</span>
                </button>
              ) : c.title === "Home Top Navigation" ? (
                <button
                  onClick={() => setIsHomeTopNavOpen(true)}
                  className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  <Edit3 className="size-3" /> <span>Edit</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsDocsDialogOpen(true)}
                  className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  <Edit3 className="size-3" /> <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <AppColorDialog
        open={isColorDialogOpen}
        setOpen={setIsColorDialogOpen}
        initialColor={appColor}
        onApply={handleColorApply}
        onCancel={() => setIsColorDialogOpen(false)}
      />

      <TypographyDialog
        open={isTypographyDialogOpen}
        setOpen={setIsTypographyDialogOpen}
        initialFont={typography}
        onApply={handleTypographyApply}
        onCancel={() => setIsTypographyDialogOpen(false)}
      />

      <SocialMediaBottomNavigationDialog
        open={isBottomNavDialogOpen}
        setOpen={setIsBottomNavDialogOpen}
        onApply={handleBottomNavApply}
        onCancel={() => setIsBottomNavDialogOpen(false)}
      />

      <SocialTopNavigationDialog
        open={isHomeTopNavOpen}
        setOpen={setIsHomeTopNavOpen}
        onApply={handleHomeTopApply}
        onCancel={() => setIsHomeTopNavOpen(false)}
      />

      <InfluencerDocumentsDialog
        open={isDocsDialogOpen}
        setOpen={setIsDocsDialogOpen}
        onApply={handleDocumentsApply}
        onCancel={() => setIsDocsDialogOpen(false)}
      />
    </>
  );
}
