import { Link } from "react-router-dom";

import { BookOpen, Home, User } from "lucide-react";

import { CartDrawer } from "@/layouts/header/components/cart-drawer";
import { NotificationCenter } from "@/layouts/header/components/notification-center";
import { ThemeButton } from "@/layouts/header/components/theme-button/index.tsx";

import useUser from "@/common/users/useUser";
import { LogoutButton } from "@/features/login-page/LogoutUser";

const headerLinkClassName =
  "inline-flex min-h-10 shrink-0 items-center gap-xs rounded-m px-s text-sm font-semibold text-app-text no-underline transition hover:bg-app-surface-muted hover:text-app-brand";

export const LandingPageHeader = () => {
  const { user } = useUser();

  const isLoggedIn = !!user;

  return (
    <header className="app-header app-layout-surface sticky top-0 z-20 border-b px-0 shadow-app-s">
      <div className="grid min-h-16 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-s px-s sm:px-sm lg:px-l 3xl:px-22">
        <nav aria-label="Primary navigation" className="flex shrink-0 items-center gap-xs">
          <Link className={headerLinkClassName} to="/home">
            <Home className="size-4" />
            Home
          </Link>
          {isLoggedIn ? (
            <Link className={headerLinkClassName} to="/book">
              <BookOpen className="size-4" />
              Books
            </Link>
          ) : null}
        </nav>

        <div className="flex min-w-0 justify-center">
          <ThemeButton />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-xs">
          {isLoggedIn ? (
            <>
              <CartDrawer />
              <NotificationCenter />
              <LogoutButton />
            </>
          ) : (
            <nav aria-label="Account navigation" className="flex shrink-0 items-center gap-xs">
              <Link className={headerLinkClassName} to="/auth/login">
                <User className="size-4" />
                Sign In
              </Link>
              <Link className={headerLinkClassName} to="/auth/register">
                <User className="size-4" />
                Register
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
