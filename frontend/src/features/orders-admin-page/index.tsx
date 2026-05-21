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
        <AdminOrderCard key={order._id} order={order} onChangeStatus={handleChangeStatus} />
      ))}
    </div>
  );
};
