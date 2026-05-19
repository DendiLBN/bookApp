import { Select, Spin } from "antd";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    return <Spin size="large" />;
  }

  return (
    <div className="flex flex-col gap-s">
      {orders.map((order) => (
        <Card key={order._id}>
          <CardHeader className="flex-col gap-xs md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Order {order._id.slice(-6)}</CardTitle>
              <p className="m-0 text-sm text-app-text-muted">
                {order.shippingAddress.recipientName}, {order.shippingAddress.street},{" "}
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </p>
            </div>
            <Select
              className="min-w-36"
              onChange={(status: TOrder["status"]) =>
                updateOrderStatus({ orderId: order._id, status })
              }
              options={orderStatusOptions}
              value={order.status}
            />
          </CardHeader>
          <CardContent>
            <Separator className="mb-xs" />
            <div className="flex items-center justify-between">
              <span className="text-app-text-muted">{order.items.length} items</span>
              <strong className="text-app-text">{formatPrice(order.totalPriceCents)}</strong>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
