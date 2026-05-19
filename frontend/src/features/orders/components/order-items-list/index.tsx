import { formatPrice } from "@/common/utils/format-price";
import type { TOrderItem } from "@/features/orders/types";

type TOrderItemsListProps = {
  items: TOrderItem[];
};

export const OrderItemsList = ({ items }: TOrderItemsListProps) => (
  <div className="flex flex-col gap-xs">
    {items.map((item) => (
      <div className="flex items-center justify-between gap-xs" key={item.bookId}>
        <span className="text-app-text">
          {item.title} x {item.quantity}
        </span>
        <span className="font-semibold text-app-accent">{formatPrice(item.lineTotalCents)}</span>
      </div>
    ))}
  </div>
);
