import { useState } from "react";
import { Edit3 } from "lucide-react";
import typographyIcon from "@/assets/app-manage/icons/typography.svg";
import bottomNavIcon from "@/assets/app-manage/icons/bottom-nav.svg";
import sidebarIcon from "@/assets/app-manage/icons/sidebar.svg";
import onboardingIcon from "@/assets/app-manage/icons/onboarding.svg";
import loginIcon from "@/assets/app-manage/icons/login.svg";
import signupIcon from "@/assets/app-manage/icons/signup.svg";
import AppColorDialog from "@/components/app-manage/AppColorDialog";
import TypographyDialog from "@/components/app-manage/TypographyDialog";
import ShoppingBottomNavigationDialog from "@/components/app-manage/ShoppingBottomNavigationDialog";
import ShoppingSideNavigationDialog from "@/components/app-manage/ShoppingSideNavigationDialog";
import OnboardingScreensDialog from "@/components/app-manage/OnboardingScreensDialog";
import GroceryLoginDialog from "@/components/app-manage/GroceryLoginDialog";
import GrocerySignUpScreenDialog from "@/components/app-manage/GrocerySignUpScreenDialog";
import type { GroceryLoginConfig } from "@/components/app-manage/GroceryLoginDialog";

const SHOPPING_LOGIN_DEFAULT: GroceryLoginConfig = {
  title: "",
  fields: [
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
  ],
  additionalOptions: [{ id: "google", name: "Google", enabled: true }],
  otpRequired: true,
  faceIdRequired: false,
};

export default function ShoppingAppTab() {
  // App Color
  const [appColor, setAppColor] = useState<string>("#CF2027");
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);
  const handleColorApply = (newColor: string) => {
    setAppColor(newColor);
    setIsColorDialogOpen(false);
  };

  // Typography
  const [typography, setTypography] = useState<string>("Poppins");
  const [isTypographyDialogOpen, setIsTypographyDialogOpen] = useState(false);
  const handleTypographyApply = (newFont: string) => {
    setTypography(newFont);
    setIsTypographyDialogOpen(false);
  };

  // Bottom navigation
  const [isBottomNavDialogOpen, setIsBottomNavDialogOpen] = useState(false);
  const [, setBottomNavTabs] = useState<
    { id: string; label: string; visible: boolean }[]
  >([]);
  const handleBottomNavApply = (
    tabs: { id: string; label: string; visible: boolean }[],
  ) => {
    setBottomNavTabs(tabs);
    setIsBottomNavDialogOpen(false);
  };

  // Side navigation
  const [isSideNavDialogOpen, setIsSideNavDialogOpen] = useState(false);
  const [sideNavCount, setSideNavCount] = useState<number>(11);
  const handleSideNavApply = (
    tabs: { id: string; label: string; visible: boolean }[],
  ) => {
    setSideNavCount(tabs.length);
    setIsSideNavDialogOpen(false);
  };

  // Onboarding screens
  const [isOnboardingDialogOpen, setIsOnboardingDialogOpen] = useState(false);
  const handleOnboardingApply = () => {
    setIsOnboardingDialogOpen(false);
  };

  // Login screen
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [loginConfig, setLoginConfig] = useState<GroceryLoginConfig>(
    SHOPPING_LOGIN_DEFAULT,
  );
  const handleLoginApply = (cfg: GroceryLoginConfig) => {
    setLoginConfig(cfg);
    setIsLoginDialogOpen(false);
  };

  // Sign up screen
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);

  const handleSignUpApply = () => {
    setIsSignUpDialogOpen(false);
  };

  const cards = [
    {
      title: "App Color",
      subtitle: "#CF2027",
      icon: null,
      iconBg: "bg-[#CF2027]",
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
      title: "Side Navigation",
      subtitle: `${sideNavCount} Options`,
      icon: <img src={sidebarIcon} alt="side navigation" className="size-5" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Onboarding Screen",
      subtitle: "3 Screens",
      icon: <img src={onboardingIcon} alt="onboarding" className="size-5" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Login Screen",
      subtitle: loginConfig.title?.trim()
        ? `${loginConfig.title} • ${loginConfig.fields.length} Field${
            loginConfig.fields.length > 1 ? "s" : ""
          }`
        : `${loginConfig.fields.length} Field${
            loginConfig.fields.length > 1 ? "s" : ""
          } needed`,
      icon: <img src={loginIcon} alt="login" className="size-5" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Sign Up Screen",
      subtitle: "8 Screens needed",
      icon: <img src={signupIcon} alt="signup" className="size-5" />,
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
              ) : c.title === "Side Navigation" ? (
                <button
                  onClick={() => setIsSideNavDialogOpen(true)}
                  className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  <Edit3 className="size-3" /> <span>Edit</span>
                </button>
              ) : c.title === "Onboarding Screen" ? (
                <button
                  onClick={() => setIsOnboardingDialogOpen(true)}
                  className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  <Edit3 className="size-3" /> <span>Edit</span>
                </button>
              ) : c.title === "Login Screen" ? (
                <button
                  onClick={() => setIsLoginDialogOpen(true)}
                  className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  <Edit3 className="size-3" /> <span>Edit</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsSignUpDialogOpen(true)}
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

      <ShoppingBottomNavigationDialog
        open={isBottomNavDialogOpen}
        setOpen={setIsBottomNavDialogOpen}
        onApply={handleBottomNavApply}
        onCancel={() => setIsBottomNavDialogOpen(false)}
      />

      <ShoppingSideNavigationDialog
        open={isSideNavDialogOpen}
        setOpen={setIsSideNavDialogOpen}
        onApply={handleSideNavApply}
        onCancel={() => setIsSideNavDialogOpen(false)}
      />

      <OnboardingScreensDialog
        open={isOnboardingDialogOpen}
        setOpen={setIsOnboardingDialogOpen}
        onApply={handleOnboardingApply}
        onCancel={() => setIsOnboardingDialogOpen(false)}
      />

      <GroceryLoginDialog
        open={isLoginDialogOpen}
        setOpen={setIsLoginDialogOpen}
        initial={loginConfig}
        onApply={handleLoginApply}
        onCancel={() => setIsLoginDialogOpen(false)}
      />

      <GrocerySignUpScreenDialog
        open={isSignUpDialogOpen}
        setOpen={setIsSignUpDialogOpen}
        onApply={handleSignUpApply}
        onCancel={() => setIsSignUpDialogOpen(false)}
      />
    </>
  );
}
