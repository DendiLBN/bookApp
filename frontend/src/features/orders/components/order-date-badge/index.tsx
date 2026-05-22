import { CalendarClock } from "lucide-react";

import { formatOrderDate } from "@/features/orders/utils/format-order-date";

type TOrderDateBadgeProps = {
  date: string;
};

export const OrderDateBadge = ({ date }: TOrderDateBadgeProps) => (
  <span className="inline-flex items-center gap-2 rounded-m border border-app-border bg-app-surface-muted px-xs py-1 text-sm font-semibold text-app-text">
    <CalendarClock className="size-4 text-app-accent" />
    {formatOrderDate(date)}
  </span>
);
