import type { TBook } from "@/features/book-page/types";
import type { TOrder } from "@/features/orders/types";

export type TDashboardStat = {
  label: string;
  value: number | string;
  helper: string;
};

export type TFeaturedShelvesProps = {
  books: TBook[];
  hasBooks: boolean;
};

export type TActiveShelvesProps = {
  categories: Array<[string, number]>;
};

export type THomeDashboardState = {
  catalogStatus: string;
  dashboardStats: TDashboardStat[];
  featuredBooks: TBook[];
  recentBooks: TBook[];
  recentOrders: TOrder[];
  topCategories: Array<[string, number]>;
  hasBooks: boolean;
  isAdmin: boolean;
  isError: boolean;
  isLoading: boolean;
};
