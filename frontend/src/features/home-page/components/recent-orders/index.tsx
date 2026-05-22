import { Link } from "react-router-dom";

import { ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { OrderDateBadge } from "@/features/orders/components/order-date-badge";
import { OrderStatusBadge } from "@/features/orders/components/order-status-badge";

import { formatPrice } from "@/common/utils/format-price";
import type { TOrder } from "@/features/orders/types";

type TRecentOrdersProps = {
  isAdmin: boolean;
  orders: TOrder[];
};

export const RecentOrders = ({ isAdmin, orders }: TRecentOrdersProps) => (
  <Card className="overflow-hidden">
    <CardHeader className="flex-row items-start justify-between gap-xs border-b border-app-border bg-app-surface-muted p-4.5 pb-s">
      <div>
        <p className="m-0 text-xs font-bold text-app-text-muted uppercase">
          {isAdmin ? "Store orders" : "Your orders"}
        </p>
        <CardTitle className="mt-1">Recent orders</CardTitle>
      </div>
      <ReceiptText className="size-5 text-app-accent" />
    </CardHeader>
    <CardContent className="grid gap-xs p-4.5">
      {orders.length > 0 ? (
        orders.map((order) => (
          <Link
            className="rounded-m border border-app-border bg-app-surface-muted p-xs text-inherit no-underline transition hover:border-app-accent hover:bg-app-accent-soft"
            key={order._id}
            to={isAdmin ? "/admin/orders" : "/orders"}
          >
            <div className="flex items-start justify-between gap-xs">
              <div className="min-w-0">
                <p className="m-0 truncate text-sm font-bold text-app-text">
                  {order.items.length} {order.items.length === 1 ? "book" : "books"}
                </p>
                <div className="mt-2">
                  <OrderDateBadge date={order.createdAt} />
                </div>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="mt-2 mb-0 font-bold text-app-text">
              {formatPrice(order.totalPriceCents)}
            </p>
          </Link>
        ))
      ) : (
        <div className="rounded-m border border-dashed border-app-border p-s">
          <p className="mt-0 mb-xs text-app-text-muted">
            {isAdmin ? "No recent store orders yet." : "Your latest orders will appear here."}
          </p>
          <Button asChild size="sm" variant="secondary">
            <Link to={isAdmin ? "/admin/orders" : "/book"}>
              {isAdmin ? "Open orders" : "Browse books"}
            </Link>
          </Button>
        </div>
      )}
    </CardContent>
  </Card>
);
