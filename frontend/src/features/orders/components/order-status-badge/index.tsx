import {
  ORDER_STATUS_BADGE_CLASSES,
  ORDER_STATUS_LABELS,
} from "@/features/orders/consts/order-status";
import type { TOrder } from "@/features/orders/types";

type TOrderStatusBadgeProps = {
  status: TOrder["status"];
};

export const OrderStatusBadge = ({ status }: TOrderStatusBadgeProps) => (
  <span
    className={`rounded-m border px-xs py-1 text-sm font-bold ${ORDER_STATUS_BADGE_CLASSES[status]}`}
  >
    {ORDER_STATUS_LABELS[status]}
  </span>
);
