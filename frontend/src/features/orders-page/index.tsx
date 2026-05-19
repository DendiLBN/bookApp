import { Empty, Spin } from "antd";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { formatPrice } from "@/common/utils/format-price";
import { ORDER_STATUS_LABELS } from "@/features/orders/consts/order-status";
import { useFetchMyOrdersQuery } from "@/store/api/orders";

export const OrdersView = () => {
  const { data: orders = [], isLoading } = useFetchMyOrdersQuery();

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-l">
          <Empty description="You have no orders yet." />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-s">
      {orders.map((order) => (
        <Card key={order._id}>
          <CardHeader className="flex-row items-start justify-between gap-xs">
            <div>
              <CardTitle>Order {order._id.slice(-6)}</CardTitle>
              <p className="mt-1 mb-0 text-sm text-app-text-muted">
                Placed {new Date(order.createdAt).toLocaleDateString("pl-PL")}
              </p>
            </div>
            <Badge variant="secondary">{ORDER_STATUS_LABELS[order.status]}</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-xs">
            {order.items.map((item) => (
              <div className="flex items-center justify-between gap-xs" key={item.bookId}>
                <span className="text-app-text">
                  {item.title} x {item.quantity}
                </span>
                <span className="font-semibold text-app-accent">
                  {formatPrice(item.lineTotalCents)}
                </span>
              </div>
            ))}
            <Separator className="mt-xs" />
            <div className="text-right font-bold text-app-text">
              Total: {formatPrice(order.totalPriceCents)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
