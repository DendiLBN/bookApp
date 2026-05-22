import { Link } from "react-router-dom";

import { BookOpen, Home, LibraryBig, User } from "lucide-react";

import { CartDrawer } from "@/layouts/header/components/cart-drawer";
import { NotificationCenter } from "@/layouts/header/components/notification-center";
import { ThemeButton } from "@/layouts/header/components/theme-button/index.tsx";

import useUser from "@/common/users/useUser";
import { LogoutButton } from "@/features/login-page/LogoutUser";

const headerLinkClassName =
  "inline-flex min-h-10 shrink-0 items-center gap-xs rounded-m px-2 text-sm font-semibold text-app-text no-underline transition hover:bg-app-surface-muted hover:text-app-brand sm:px-s";

export const LandingPageHeader = () => {
  const { user } = useUser();

  const isLoggedIn = !!user;

  return (
    <header className="app-header app-layout-surface sticky top-0 z-20 border-b px-0 shadow-app-s">
      <div className="grid min-h-18 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-xs px-s sm:gap-s sm:px-sm lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-l 3xl:px-22">
        <nav
          aria-label="Primary navigation"
          className="flex min-w-0 shrink items-center gap-1 overflow-x-auto sm:gap-2"
        >
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
            <span className="hidden sm:inline">Home</span>
          </Link>
          {isLoggedIn ? (
            <Link className={headerLinkClassName} to="/book">
              <BookOpen className="size-4" />
              <span className="hidden sm:inline">Books</span>
            </Link>
          ) : null}
          <ThemeButton />
        </nav>

        <div aria-hidden="true" className="hidden min-w-0 lg:block" />

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
                <span className="hidden sm:inline">Sign In</span>
              </Link>
              <Link className={headerLinkClassName} to="/auth/register">
                <User className="size-4" />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
