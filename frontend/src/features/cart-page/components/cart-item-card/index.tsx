import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

import { formatPrice } from "@/common/utils/format-price";
import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY } from "@/features/cart-page/consts/cart";
import type { TResolvedCartItem } from "@/features/cart-page/utils/resolve-cart-items";

type TCartItemCardProps = {
  cartItem: TResolvedCartItem;
  compact: boolean;
  onRemove: (bookId: string) => void;
  onUpdateQuantity: (bookId: string, quantity: number) => void;
};

export const CartItemCard = ({
  cartItem,
  compact,
  onRemove,
  onUpdateQuantity,
}: TCartItemCardProps) => {
  const { book, bookId, quantity } = cartItem;

  return (
    <Card>
      <CardContent
        className={`grid gap-s p-s ${compact ? "" : "sm:grid-cols-[72px_minmax(0,1fr)_auto]"}`}
      >
        <img
          alt={book.title}
          className="aspect-2/3 w-full rounded-m object-cover"
          src={book.coverImageUrl || "/book.png"}
        />
        <div>
          <Link className="font-bold text-app-text no-underline" to={`/book/${bookId}`}>
            {book.title}
          </Link>
          <p className="mt-1 mb-0 text-app-text-muted">{book.author}</p>
          <p className="mt-1 mb-0 font-semibold text-app-accent">{formatPrice(book.priceCents)}</p>
        </div>
        <div className="flex items-center gap-xs">
          <Input
            className="w-20"
            max={MAX_CART_ITEM_QUANTITY}
            min={MIN_CART_ITEM_QUANTITY}
            onChange={(event) => {
              const nextQuantity = Number(event.target.value);

              onUpdateQuantity(bookId, Number.isNaN(nextQuantity) ? quantity : nextQuantity);
            }}
            type="number"
            value={quantity}
          />
          <Button onClick={() => onRemove(bookId)} type="button" variant="destructive">
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
