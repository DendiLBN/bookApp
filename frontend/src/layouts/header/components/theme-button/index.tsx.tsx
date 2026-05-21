import { Moon, Sun } from "lucide-react";

import { useThemeContext } from "@/common/contexts/hooks/use-theme-context";

import { cn } from "@/common/utils/cn";

export const ThemeButton: React.FC = () => {
  const { isDarkMode, handleToggleTheme } = useThemeContext();

  return (
    <button
      aria-label="Toggle theme"
      aria-pressed={isDarkMode}
      className="inline-flex h-9 w-17 items-center rounded-full border border-app-border bg-app-surface p-1 shadow-app-s transition hover:border-app-brand"
      onClick={handleToggleTheme}
      type="button"
    >
      <span
        className={cn(
          "grid size-7 place-items-center rounded-full bg-app-brand text-app-text-inverse transition-transform",
          isDarkMode ? "translate-x-8" : "translate-x-0",
        )}
      >
        {isDarkMode ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </span>
    </button>
  );
};
