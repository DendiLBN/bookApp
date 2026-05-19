import { ORDER_DATE_LOCALE } from "@/features/orders/consts/order-display";

export const formatOrderDate = (date: string) =>
  new Date(date).toLocaleDateString(ORDER_DATE_LOCALE);
