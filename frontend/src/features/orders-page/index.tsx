import { Loader2, PackageOpen } from "lucide-react";

import { Card } from "@/components/ui/Card";

import { formatPrice } from "@/common/utils/format-price";
import { ORDER_STATUS_LABELS } from "@/features/orders/consts/order-status";
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
      <Card className="grid min-h-60 place-items-center p-l text-center">
        <div>
          <div className="mx-auto mb-xs grid size-14 place-items-center rounded-full bg-app-brand-soft text-app-brand">
            <PackageOpen className="size-7" />
          </div>
          <h2 className="m-0 text-xl font-extrabold text-app-text">You have no orders yet</h2>
          <p className="mt-2 mb-0 text-app-text-muted">Completed checkouts will appear here.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-s">
      {orders.map((order) => (
        <article
          className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s"
          key={order._id}
        >
          <div className="mb-xs flex items-center justify-between gap-xs">
            <strong className="text-app-text">Order {order._id.slice(-6)}</strong>
            <span className="rounded-m bg-app-surface-muted px-xs py-1 text-sm text-app-text-muted">
              {ORDER_STATUS_LABELS[order.status]}
            </span>
          </div>
          <p className="mt-0 mb-s text-sm text-app-text-muted">
            Placed {new Date(order.createdAt).toLocaleDateString("pl-PL")}
          </p>
          <div className="flex flex-col gap-xs">
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
          </div>
          <div className="mt-s border-t border-app-border pt-xs text-right font-bold text-app-text">
            Total: {formatPrice(order.totalPriceCents)}
          </div>
        </article>
      ))}
    </div>
  );
};
