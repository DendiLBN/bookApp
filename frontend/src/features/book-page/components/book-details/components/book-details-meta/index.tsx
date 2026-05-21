import { Heart, ShoppingCart, Star } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import { cn } from "@/common/utils/cn";
import { formatPrice } from "@/common/utils/format-price";
import type { TBook } from "@/features/book-page/types";

type TBookDetailsMetaProps = {
  book: TBook;
  cooldownBookIds: string[];
  favoriteActionLoading: boolean;
  favoriteBookIds: string[];
  isUpdatingCart: boolean;
  handleAddToCart: (bookId: string) => Promise<void>;
  handleToggleFavorite: (bookId: string) => Promise<void>;
};

export const BookDetailsMeta = ({
  book,
  cooldownBookIds,
  favoriteActionLoading,
  favoriteBookIds,
  handleAddToCart,
  handleToggleFavorite,
  isUpdatingCart,
}: TBookDetailsMetaProps) => {
  const categoryCount = book.category?.length ?? 0;
  const isFavorite = favoriteBookIds.includes(book._id);
  const isFavoriteDisabled = favoriteActionLoading || cooldownBookIds.includes(book._id);
  const primaryCategory = book.category?.[0] ?? "General";
  const bookMetrics = [
    { label: "Rating", value: `${book.rate}/5` },
    { label: "Shelves", value: categoryCount },
    { label: "Primary", value: primaryCategory },
    { label: "Price", value: formatPrice(book.priceCents) },
  ];

  return (
    <div className="flex flex-col items-start gap-xs">
      <p className="book-page__eyebrow">Book details</p>
      <h1 className="book-page__title">{book.title}</h1>
      <p className="book-page__subtitle">{book.author}</p>
      <div className="flex items-center gap-1 text-app-warning">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            className={cn("size-5", index < Math.round(book.rate) ? "fill-current" : "opacity-30")}
            key={`rating-${index}`}
          />
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-s sm:grid-cols-2 xl:grid-cols-4">
        {bookMetrics.map((metric) => (
          <div
            className="min-w-0 rounded-m border border-app-border bg-app-surface-muted p-m"
            key={metric.label}
          >
            <strong className="block truncate text-base text-app-brand">{metric.value}</strong>
            <span className="mt-0.5 block truncate text-xs text-app-text-muted">
              {metric.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-xs">
        {book.category?.map((category) => (
          <Badge key={category} variant="secondary">
            {category}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-xs">
        <Button disabled={isUpdatingCart} onClick={() => handleAddToCart(book._id)} type="button">
          <ShoppingCart />
          Add to cart
        </Button>
        <Button
          disabled={isFavoriteDisabled}
          onClick={() => handleToggleFavorite(book._id)}
          type="button"
          variant={isFavorite ? "default" : "outline"}
        >
          <Heart className={isFavorite ? "fill-current" : undefined} />
          {isFavorite ? "Saved favorite" : "Save favorite"}
        </Button>
      </div>
      <p className="m-0 max-w-155 leading-6 text-app-text-muted">
        Preview catalog data before adding this title to a basket or saving it to your reading list.
      </p>
    </div>
  );
};
