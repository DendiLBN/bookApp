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
      <section className="rounded-l border border-app-border bg-app-surface p-l shadow-app-s">
        <Empty description="You have no orders yet." />
      </section>
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
