import LoginScreenDialog from "@/components/app-manage/LoginScreenDialog";

export const RESTAURANT_LOGIN_DEFAULT = {
  fields: [{ id: "field-1", label: "Phone Number" }],
  additionalOptions: [
    { id: "google", name: "Google", enabled: true },
    { id: "facebook", name: "Facebook", enabled: true },
    { id: "apple", name: "Apple", enabled: true },
  ],
  otpRequired: true,
  faceIdRequired: false,
} as const;

interface RestaurantLoginDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApply?: (cfg: typeof RESTAURANT_LOGIN_DEFAULT) => void;
  onCancel?: () => void;
}

export default function RestaurantLoginDialog({
  open,
  setOpen,
  onApply,
  onCancel,
}: RestaurantLoginDialogProps) {
  const handleApply = (cfg: typeof RESTAURANT_LOGIN_DEFAULT) => {
    onApply?.(cfg);
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <LoginScreenDialog
      open={open}
      setOpen={setOpen}
      initial={RESTAURANT_LOGIN_DEFAULT}
      onApply={handleApply}
      onCancel={handleCancel}
    />
  );
}
