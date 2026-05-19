import { Empty, Spin } from "antd";

import { CustomerOrderCard } from "@/features/orders-page/components/customer-order-card";

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
        <CustomerOrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};
