import { Select } from "antd";

import { formatPrice } from "@/common/utils/format-price";
import type { TOrder } from "@/features/orders/types";
import { getOrderShortId } from "@/features/orders/utils/get-order-short-id";
import { ORDER_STATUS_OPTIONS } from "@/features/orders-admin-page/consts/order-status-options";

type TAdminOrderCardProps = {
  order: TOrder;
  onChangeStatus: (orderId: string, status: TOrder["status"]) => void;
};

export const AdminOrderCard = ({ order, onChangeStatus }: TAdminOrderCardProps) => (
  <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
    <div className="flex flex-col gap-xs md:flex-row md:items-center md:justify-between">
      <div>
        <strong className="text-app-text">Order {getOrderShortId(order._id)}</strong>
        <p className="m-0 text-sm text-app-text-muted">
          {order.shippingAddress.recipientName}, {order.shippingAddress.street},{" "}
          {order.shippingAddress.postalCode} {order.shippingAddress.city}
        </p>
      </div>
      <Select
        className="min-w-36"
        onChange={(status: TOrder["status"]) => onChangeStatus(order._id, status)}
        options={ORDER_STATUS_OPTIONS}
        value={order.status}
      />
    </div>
    <div className="mt-s flex items-center justify-between border-t border-app-border pt-xs">
      <span className="text-app-text-muted">{order.items.length} items</span>
      <strong className="text-app-text">{formatPrice(order.totalPriceCents)}</strong>
    </div>
  </article>
);
