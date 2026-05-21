import { Link } from "react-router-dom";

import { BookOpen, Home, LibraryBig, User } from "lucide-react";

import { CartDrawer } from "@/layouts/header/components/cart-drawer";
import { NotificationCenter } from "@/layouts/header/components/notification-center";
import { ThemeButton } from "@/layouts/header/components/theme-button/index.tsx";

import useUser from "@/common/users/useUser";
import { LogoutButton } from "@/features/login-page/LogoutUser";

const headerLinkClassName =
  "inline-flex min-h-10 shrink-0 items-center gap-xs rounded-m px-xs text-sm font-semibold text-app-text no-underline transition hover:bg-app-surface-muted hover:text-app-brand sm:px-s";

export const LandingPageHeader = () => {
  const { user } = useUser();

  const isLoggedIn = !!user;

  return (
    <header className="app-header app-layout-surface sticky top-0 z-20 border-b px-0 shadow-app-s">
      <div className="grid min-h-18 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-s px-s sm:px-sm lg:px-l 3xl:px-22">
        <nav aria-label="Primary navigation" className="flex shrink-0 items-center gap-2">
          <Link
            className="mr-xs hidden items-center gap-xs rounded-m pr-xs text-app-text no-underline sm:flex"
            to="/home"
          >
            <span className="grid size-10 place-items-center rounded-m bg-app-brand text-app-text-inverse shadow-app-s">
              <LibraryBig className="size-5" />
            </span>
            <span className="hidden leading-tight lg:block">
              <strong className="block text-sm">BookNest</strong>
              <span className="block text-xs text-app-text-muted">Reader commerce</span>
            </span>
          </Link>
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
          <ThemeButton />
        </nav>

        <div aria-hidden="true" className="min-w-0" />

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
