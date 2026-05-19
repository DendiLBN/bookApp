import { OrderItemsList } from "@/features/orders/components/order-items-list";
import { OrderStatusBadge } from "@/features/orders/components/order-status-badge";

import { formatPrice } from "@/common/utils/format-price";
import type { TOrder } from "@/features/orders/types";
import { formatOrderDate } from "@/features/orders/utils/format-order-date";
import { getOrderShortId } from "@/features/orders/utils/get-order-short-id";

type TCustomerOrderCardProps = {
  order: TOrder;
};

export const CustomerOrderCard = ({ order }: TCustomerOrderCardProps) => (
  <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
    <div className="mb-xs flex items-center justify-between gap-xs">
      <strong className="text-app-text">Order {getOrderShortId(order._id)}</strong>
      <OrderStatusBadge status={order.status} />
    </div>
    <p className="mt-0 mb-s text-sm text-app-text-muted">
      Placed {formatOrderDate(order.createdAt)}
    </p>
    <OrderItemsList items={order.items} />
    <div className="mt-s border-t border-app-border pt-xs text-right font-bold text-app-text">
      Total: {formatPrice(order.totalPriceCents)}
    </div>
  </article>
);
