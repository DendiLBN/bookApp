import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

import { AvatarUploadButton } from "@/features/users/components/avatar-upload-button";

import { useAvatarUpload } from "@/features/users/hooks/useAvatarUpload";

import { getApiAssetUrl } from "@/common/config/api";
import useUser from "@/common/users/useUser";
import { cn } from "@/common/utils/cn";
import { createItemsSideBar } from "@/layouts/side-bar/consts/items-side-bar";
import { selectIsLoggedIn } from "@/store/reducers/auth";

export const LandingPageSideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { pathname } = useLocation();
  const { fileInputRef, handleAvatarChange, isUploadingAvatar, openAvatarPicker } =
    useAvatarUpload();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { user } = useUser();

  const toggleCollapsed = () => {
    setCollapsed((currentCollapsed) => !currentCollapsed);
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  const avatarSrc = getApiAssetUrl(user.avatarUrl);
  const selectedMenuKey = pathname.startsWith("/book")
    ? "books"
    : pathname.startsWith("/cart")
      ? "cart"
      : pathname.startsWith("/orders")
        ? "orders"
        : pathname.startsWith("/favorites")
          ? "favorites"
          : pathname.startsWith("/profile")
            ? "profile-overview"
            : "dashboard";
  const sideBarItems = createItemsSideBar(user);

  return (
    <aside
      className={`app-sidebar app-layout-surface relative hidden min-h-[calc(100vh-64px)] shrink-0 border-r transition-[width] duration-200 md:block ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="m-3 flex flex-col items-center gap-3 overflow-hidden rounded-lg border border-app-border bg-[linear-gradient(180deg,var(--color-surface-muted),var(--color-surface))] px-3 py-5 shadow-app-s">
        <AvatarUploadButton
          avatarSrc={avatarSrc}
          isUploading={isUploadingAvatar}
          onClick={openAvatarPicker}
        />
        <input
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={handleAvatarChange}
          ref={fileInputRef}
          type="file"
        />
        {collapsed ? null : (
          <div className="min-w-0 text-center">
            <h3 className="m-0 truncate text-sm font-semibold text-app-text">{user.firstName}</h3>
            <p className="m-0 mt-1 truncate text-xs text-app-text-muted">{user.email}</p>
          </div>
        )}
      </div>

      <nav aria-label="Sidebar navigation" className="flex flex-col gap-1 px-2">
        {sideBarItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedMenuKey === item.key;
          const hasActiveChild = item.children?.some((child) => child.key === selectedMenuKey);

          return (
            <div key={item.key}>
              <Link
                className={cn(
                  "flex min-h-10 items-center gap-xs rounded-m px-xs text-sm font-semibold text-app-text no-underline transition hover:bg-app-surface-muted hover:text-app-brand",
                  collapsed ? "justify-center" : undefined,
                  isActive || hasActiveChild ? "bg-app-brand-soft text-app-brand" : undefined,
                )}
                to={item.href}
              >
                <Icon className="size-4 shrink-0" />
                {collapsed ? null : <span className="min-w-0 truncate">{item.label}</span>}
                {!collapsed && item.children ? (
                  <ChevronDown className="ml-auto size-4 text-app-text-muted" />
                ) : null}
              </Link>

              {!collapsed && item.children ? (
                <div className="mt-1 ml-s flex flex-col gap-1 border-l border-app-border pl-xs">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    const isChildActive = selectedMenuKey === child.key;

                    return (
                      <Link
                        className={cn(
                          "flex min-h-9 items-center gap-xs rounded-m px-xs text-sm font-semibold text-app-text no-underline transition hover:bg-app-surface-muted hover:text-app-brand",
                          isChildActive ? "bg-app-brand-soft text-app-brand" : undefined,
                        )}
                        key={child.key}
                        to={child.href}
                      >
                        <ChildIcon className="size-4 shrink-0" />
                        <span className="min-w-0 truncate">{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <button
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute right-3 bottom-5 inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-app-border bg-app-surface text-app-text shadow-sm transition hover:bg-app-surface-muted hover:text-app-brand"
        onClick={toggleCollapsed}
        type="button"
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>
    </aside>
  );
};
