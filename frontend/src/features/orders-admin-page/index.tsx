import { Loader2 } from "lucide-react";

import { Card } from "@/components/ui/Card";

import { formatPrice } from "@/common/utils/format-price";
import { ORDER_STATUS_LABELS } from "@/features/orders/consts/order-status";
import type { TOrder } from "@/features/orders/types";
import { useFetchOrdersQuery, useUpdateOrderStatusMutation } from "@/store/api/orders";

const orderStatusOptions = Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({
  label,
  value,
}));

export const OrdersAdminView = () => {
  const { data: orders = [], isLoading } = useFetchOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  if (isLoading) {
    return (
      <Card className="grid min-h-60 place-items-center p-l">
        <div className="flex items-center gap-2 font-semibold text-app-text-muted">
          <Loader2 className="size-5 animate-spin text-app-brand" />
          Loading admin orders...
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-s">
      {orders.map((order) => (
        <article
          className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s"
          key={order._id}
        >
          <div className="flex flex-col gap-xs md:flex-row md:items-center md:justify-between">
            <div>
              <strong className="text-app-text">Order {order._id.slice(-6)}</strong>
              <p className="m-0 text-sm text-app-text-muted">
                {order.shippingAddress.recipientName}, {order.shippingAddress.street},{" "}
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </p>
            </div>
            <select
              className="min-h-10 min-w-36 rounded-m border border-app-border bg-app-surface px-xs text-app-text"
              onChange={(event) =>
                updateOrderStatus({
                  orderId: order._id,
                  status: event.target.value as TOrder["status"],
                })
              }
              value={order.status}
            >
              {orderStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-s flex items-center justify-between border-t border-app-border pt-xs">
            <span className="text-app-text-muted">{order.items.length} items</span>
            <strong className="text-app-text">{formatPrice(order.totalPriceCents)}</strong>
          </div>
        </article>
      ))}
    </div>
  );
};
