import { Camera, User } from "lucide-react";

type TAvatarUploadButtonProps = {
  avatarSrc?: string;
  isUploading: boolean;
  onClick: () => void;
};

export const AvatarUploadButton = ({
  avatarSrc,
  isUploading,
  onClick,
}: TAvatarUploadButtonProps) => (
  <button
    aria-label="Change avatar"
    className="group relative rounded-full transition hover:opacity-90 focus:ring-2 focus:ring-app-brand/30 focus:outline-none disabled:cursor-progress"
    disabled={isUploading}
    onClick={onClick}
    type="button"
  >
    <span className="grid size-16 place-items-center overflow-hidden rounded-full border border-app-border bg-app-accent-soft text-app-accent">
      {avatarSrc ? (
        <img alt="User avatar" className="h-full w-full object-cover" src={avatarSrc} />
      ) : (
        <User className="size-7" />
      )}
    </span>
    <span className="absolute right-0 bottom-0 grid h-6 w-6 place-items-center rounded-full border border-app-border bg-app-surface text-xs text-app-brand shadow-sm">
      <Camera className="size-3.5" />
    </span>
  </button>
);
