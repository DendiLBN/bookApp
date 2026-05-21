import { Loader2, PackageOpen } from "lucide-react";

import { Card } from "@/components/ui/Card";

import { CustomerOrderCard } from "@/features/orders-page/components/customer-order-card";

import { useFetchMyOrdersQuery } from "@/store/api/orders";

export const OrdersView = () => {
  const { data: orders = [], isLoading } = useFetchMyOrdersQuery();

  if (isLoading) {
    return (
      <Card className="grid min-h-60 place-items-center p-l">
        <div className="flex items-center gap-2 font-semibold text-app-text-muted">
          <Loader2 className="size-5 animate-spin text-app-brand" />
          Loading orders...
        </div>
      </Card>
    );
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
        <CustomerOrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};
