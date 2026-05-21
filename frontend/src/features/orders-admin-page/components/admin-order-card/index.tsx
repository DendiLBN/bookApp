import { formatPrice } from "@/common/utils/format-price";
import { ORDER_STATUS_LABELS } from "@/features/orders/consts/order-status";
import type { TOrder } from "@/features/orders/types";
import { getOrderShortId } from "@/features/orders/utils/get-order-short-id";

const orderStatusOptions = Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({
  label,
  value,
}));

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
      <select
        className="min-h-10 min-w-36 rounded-m border border-app-border bg-app-surface px-xs text-app-text"
        onChange={(event) => onChangeStatus(order._id, event.target.value as TOrder["status"])}
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
);
