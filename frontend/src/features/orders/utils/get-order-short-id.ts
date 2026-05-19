import { ORDER_NUMBER_VISIBLE_CHARS } from "@/features/orders/consts/order-display";

export const getOrderShortId = (orderId: string) => orderId.slice(-ORDER_NUMBER_VISIBLE_CHARS);
