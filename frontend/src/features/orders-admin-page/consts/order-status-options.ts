import { ORDER_STATUS_LABELS } from "@/features/orders/consts/order-status";

export const ORDER_STATUS_OPTIONS = Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({
  label,
  value,
}));
