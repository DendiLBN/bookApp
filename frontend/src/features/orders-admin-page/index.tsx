import { Spin } from "antd";

import { AdminOrderCard } from "@/features/orders-admin-page/components/admin-order-card";

import type { TOrder } from "@/features/orders/types";
import { useFetchOrdersQuery, useUpdateOrderStatusMutation } from "@/store/api/orders";

export const OrdersAdminView = () => {
  const { data: orders = [], isLoading } = useFetchOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleChangeStatus = (orderId: string, status: TOrder["status"]) => {
    updateOrderStatus({ orderId, status });
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div className="flex flex-col gap-s">
      {orders.map((order) => (
        <AdminOrderCard key={order._id} order={order} onChangeStatus={handleChangeStatus} />
      ))}
    </div>
  );
};
