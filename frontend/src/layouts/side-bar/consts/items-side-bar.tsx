import {
  BookOpen,
  Heart,
  LayoutDashboard,
  PackageCheck,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";

import type { TUser } from "@/features/users/types";

export type TSideBarItem = {
  href: string;
  key: string;
  label: string;
  icon: typeof LayoutDashboard;
  children?: TSideBarItem[];
};

export const createItemsSideBar = (user?: TUser): TSideBarItem[] => [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    key: "dashboard",
    label: "Dashboard",
  },
  {
    href: "/book",
    icon: BookOpen,
    key: "books",
    label: "Books",
  },
  {
    href: "/cart",
    icon: ShoppingCart,
    key: "cart",
    label: "Cart",
  },
  {
    href: "/orders",
    icon: ShoppingBag,
    key: "orders",
    label: "Orders",
  },
  ...(user?.role === "admin"
    ? [
        {
          href: "/admin/orders",
          icon: PackageCheck,
          key: "admin-orders",
          label: "Admin orders",
        },
      ]
    : []),
  {
    children: [
      {
        href: "/profile",
        icon: User,
        key: "profile-overview",
        label: "Overview",
      },
      {
        href: "/favorites",
        icon: Heart,
        key: "favorites",
        label: "Favorites",
      },
    ],
    href: "/profile",
    icon: User,
    key: "profile",
    label: "Profile",
  },
];
