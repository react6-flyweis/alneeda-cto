import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit3 } from "lucide-react";
import typographyIcon from "@/assets/app-manage/icons/typography.svg";
import bottomNavIcon from "@/assets/app-manage/icons/bottom-nav.svg";
import sidebarIcon from "@/assets/app-manage/icons/sidebar.svg";
import onboardingIcon from "@/assets/app-manage/icons/onboarding.svg";
import loginIcon from "@/assets/app-manage/icons/login.svg";
import signupIcon from "@/assets/app-manage/icons/signup.svg";
import AppColorDialog from "@/components/app-manage/AppColorDialog";
import TypographyDialog from "@/components/app-manage/TypographyDialog";
import RestaurantOnboardingDialog from "@/components/app-manage/RestaurantOnboardingDialog";
import RestaurantLoginDialog, {
  RESTAURANT_LOGIN_DEFAULT,
} from "@/components/app-manage/RestaurantLoginDialog";
import RestaurantSignUpScreenDialog from "@/components/app-manage/RestaurantSignUpScreenDialog";
import RestaurantBottomNavigationDialog from "@/components/app-manage/RestaurantBottomNavigationDialog";
import RestaurantSideNavigationDialog from "@/components/app-manage/RestaurantSideNavigationDialog";
type AuthField = { id: string; label: string };

type AuthConfig = {
  fields: AuthField[];
  additionalOptions?: { id: string; name: string; enabled: boolean }[];
  otpRequired?: boolean;
  faceIdRequired?: boolean;
};

export default function RestaurantAppTab() {
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

  // Onboarding screens
  const [isOnboardingDialogOpen, setIsOnboardingDialogOpen] = useState(false);

  const handleOnboardingApply = () => {
    setIsOnboardingDialogOpen(false);
  };

  // Bottom Navigation dialog (restaurant)
  const [isBottomNavDialogOpen, setIsBottomNavDialogOpen] = useState(false);
  const [bottomNavCount, setBottomNavCount] = useState<number>(4);
  const handleBottomNavApply = (
    tabs: { id: string; label: string; visible: boolean }[],
  ) => {
    setBottomNavCount(tabs.length);
    setIsBottomNavDialogOpen(false);
  };

  // Side Navigation dialog (restaurant)
  const [isSideNavDialogOpen, setIsSideNavDialogOpen] = useState(false);
  const [sideNavCount, setSideNavCount] = useState<number>(32);
  const handleSideNavApply = (
    tabs: { id: string; label: string; visible: boolean }[],
  ) => {
    setSideNavCount(tabs.length);
    setIsSideNavDialogOpen(false);
  };

  // Login screen
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [loginConfig, setLoginConfig] = useState<AuthConfig>(
    RESTAURANT_LOGIN_DEFAULT,
  );
  const handleLoginApply = (cfg: AuthConfig) => {
    setLoginConfig(cfg);
    setIsLoginDialogOpen(false);
  };

  // Sign up screen
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);
  const [signUpConfig, setSignUpConfig] = useState<AuthConfig>({
    fields: [
      { id: "field-1", label: "First Name" },
      { id: "field-2", label: "Last Name" },
      { id: "field-3", label: "Phone Number" },
      { id: "field-4", label: "Date of Birth" },
      { id: "field-5", label: "Address" },
      { id: "field-6", label: "City" },
      { id: "field-7", label: "Postal Code" },
      { id: "field-8", label: "Alternate Phone" },
    ],
    additionalOptions: [
      { id: "google", name: "Google", enabled: true },
      { id: "facebook", name: "Facebook", enabled: true },
      { id: "apple", name: "Apple", enabled: true },
    ],
    otpRequired: true,
    faceIdRequired: false,
  });
  const handleSignUpApply = (cfg: AuthConfig) => {
    setSignUpConfig(cfg);
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
      subtitle: `${bottomNavCount} Options`,
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
      subtitle: "4 Screens",
      icon: <img src={onboardingIcon} alt="onboarding" className="size-5" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Login Screen",
      subtitle: `${loginConfig.fields.length} Field${
        loginConfig.fields.length > 1 ? "s" : ""
      } needed`,
      icon: <img src={loginIcon} alt="login" className="size-5" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Sign Up Screen",
      subtitle: `${signUpConfig.fields.length} Screens needed`,
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
              ) : c.title === "Sign Up Screen" ? (
                <button
                  onClick={() => setIsSignUpDialogOpen(true)}
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
              ) : (
                <Link
                  to="#"
                  className="text-xs text-muted-foreground inline-flex items-center gap-1"
                >
                  <Edit3 className="size-3" /> <span>Edit</span>
                </Link>
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

      <RestaurantOnboardingDialog
        open={isOnboardingDialogOpen}
        setOpen={setIsOnboardingDialogOpen}
        onApply={handleOnboardingApply}
        onCancel={() => setIsOnboardingDialogOpen(false)}
      />

      <RestaurantLoginDialog
        open={isLoginDialogOpen}
        setOpen={setIsLoginDialogOpen}
        onApply={handleLoginApply}
        onCancel={() => setIsLoginDialogOpen(false)}
      />

      <RestaurantSignUpScreenDialog
        open={isSignUpDialogOpen}
        setOpen={setIsSignUpDialogOpen}
        initial={signUpConfig}
        onApply={handleSignUpApply}
        onCancel={() => setIsSignUpDialogOpen(false)}
      />

      <RestaurantBottomNavigationDialog
        open={isBottomNavDialogOpen}
        setOpen={setIsBottomNavDialogOpen}
        onApply={handleBottomNavApply}
        onCancel={() => setIsBottomNavDialogOpen(false)}
      />

      <RestaurantSideNavigationDialog
        open={isSideNavDialogOpen}
        setOpen={setIsSideNavDialogOpen}
        onApply={handleSideNavApply}
        onCancel={() => setIsSideNavDialogOpen(false)}
      />
    </>
  );
}
