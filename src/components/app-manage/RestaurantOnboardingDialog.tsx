import OnboardingScreensDialog from "@/components/app-manage/OnboardingScreensDialog";

interface RestaurantOnboardingDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  /** called after user saves — kept compatible with existing callers that expect no args */
  onApply?: () => void;
  onCancel?: () => void;
}

export default function RestaurantOnboardingDialog({
  open,
  setOpen,
  onApply,
  onCancel,
}: RestaurantOnboardingDialogProps) {
  const RESTAURANT_ONBOARDING_SCREENS = [
    {
      id: `rest-screen-1`,
      title: "Order Food Online With Us",
      description:
        "Quickly browse restaurants, place orders and get food delivered to your doorstep.",
      image: undefined,
    },
    {
      id: `rest-screen-2`,
      title: "Third-Party Food Delivery",
      description:
        "Integrate with third-party delivery partners to expand reach and speed up deliveries.",
      image: undefined,
    },
    {
      id: `rest-screen-3`,
      title: "Kitchen Display System",
      description:
        "Send orders directly to kitchen displays to improve fulfillment speed and accuracy.",
      image: undefined,
    },
    {
      id: `rest-screen-4`,
      title: "Self Ordering KIOSK",
      description:
        "Offer self-service kiosks for faster in-store ordering and higher average order value.",
      image: undefined,
    },
  ];

  const handleApply = () => {
    onApply?.();
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <OnboardingScreensDialog
      open={open}
      setOpen={setOpen}
      initialScreens={RESTAURANT_ONBOARDING_SCREENS}
      onApply={() => handleApply()}
      onCancel={() => handleCancel()}
    />
  );
}
