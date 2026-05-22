import { Eye, EyeOff } from "lucide-react";

type TPasswordVisibilityButtonProps = {
  isVisible: boolean;
  label: string;
  onToggle: () => void;
};

export const PasswordVisibilityButton = ({
  isVisible,
  label,
  onToggle,
}: TPasswordVisibilityButtonProps) => (
  <button
    aria-label={label}
    className="absolute top-1/2 right-xs grid size-8 -translate-y-1/2 place-items-center rounded-s text-app-text-muted transition hover:bg-app-surface-muted hover:text-app-text"
    onClick={onToggle}
    type="button"
  >
    {isVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
  </button>
);
