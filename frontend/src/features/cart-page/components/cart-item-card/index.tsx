import { Link } from "react-router-dom";

import { Loader2, Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";

import { formatPrice } from "@/common/utils/format-price";
import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY } from "@/features/cart-page/consts/cart";
import type { TResolvedCartItem } from "@/features/cart-page/utils/resolve-cart-items";

type TCartItemCardProps = {
  cartItem: TResolvedCartItem;
  compact: boolean;
  isPending: boolean;
  onRemove: (bookId: string) => void;
  onUpdateQuantity: (bookId: string, quantity: number) => void;
};

export const CartItemCard = ({
  cartItem,
  compact,
  isPending,
  onRemove,
  onUpdateQuantity,
}: TCartItemCardProps) => {
  const { book, bookId, quantity } = cartItem;
  const canDecreaseQuantity = quantity > MIN_CART_ITEM_QUANTITY && !isPending;
  const canIncreaseQuantity = quantity < MAX_CART_ITEM_QUANTITY && !isPending;

  return (
    <article
      className={`grid gap-s rounded-l border border-app-border bg-app-surface p-s shadow-app-s transition ${
        compact ? "" : "sm:grid-cols-[72px_minmax(0,1fr)_auto]"
      } ${isPending ? "opacity-75" : ""}`}
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
        <div className="flex items-center rounded-m border border-app-border bg-app-surface-muted">
          <Button
            disabled={!canDecreaseQuantity}
            onClick={() => onUpdateQuantity(bookId, quantity - 1)}
            size="icon"
            type="button"
            variant="ghost"
          >
            <Minus />
          </Button>
          <span className="min-w-10 text-center font-bold text-app-text">{quantity}</span>
          <Button
            disabled={!canIncreaseQuantity}
            onClick={() => onUpdateQuantity(bookId, quantity + 1)}
            size="icon"
            type="button"
            variant="ghost"
          >
            <Plus />
          </Button>
        </div>
        <Button
          disabled={isPending}
          onClick={() => onRemove(bookId)}
          type="button"
          variant="destructive"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <Trash2 />}
          {isPending ? "Removing..." : "Remove"}
        </Button>
      </div>
    </article>
  );
};
