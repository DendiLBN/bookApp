import { Link } from "react-router-dom";

import { Heart, ShoppingCart, Star } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import { cn } from "@/common/utils/cn";
import { formatPrice } from "@/common/utils/format-price";
import { BOOK_COVER_FALLBACK_SRC } from "@/features/book-page/consts/book-card";
import type { TBook } from "@/features/book-page/types";

type TBookCatalogCardProps = {
  book: TBook;
  cartActionLoading: boolean;
  favoriteActionLoading: boolean;
  isFavorite: boolean;
  isFavoriteCoolingDown: boolean;
  onAddToCart: (bookId: string) => void;
  onToggleFavorite: (bookId: string) => void;
};

export const BookCatalogCard = ({
  book,
  cartActionLoading,
  favoriteActionLoading,
  isFavorite,
  isFavoriteCoolingDown,
  onAddToCart,
  onToggleFavorite,
}: TBookCatalogCardProps) => (
  <article className="flex min-h-full flex-col overflow-hidden rounded-l border border-app-border bg-app-surface shadow-app-s">
    <Link className="relative block bg-app-surface-muted" to={`/book/${book._id}`}>
      <div className="absolute top-xs left-xs z-10 flex items-center gap-1 rounded-full bg-app-surface/90 px-2 py-1 text-xs font-bold text-app-warning shadow-app-s">
        <Star className="size-3.5 fill-current" />
        {book.rate.toFixed(1)}
      </div>
      <img
        alt={book.title}
        className="aspect-2/3 w-full object-cover"
        src={book.coverImageUrl || BOOK_COVER_FALLBACK_SRC}
      />
    </Link>
    <div className="flex flex-1 flex-col gap-xs p-s">
      <div>
        <h2 className="m-0 text-lg font-bold text-app-text">{book.title}</h2>
        <p className="mt-1 mb-0 text-app-text-muted">{book.author}</p>
        <p className="mt-1 mb-0 font-semibold text-app-accent">{formatPrice(book.priceCents)}</p>
      </div>
      <div className="flex flex-wrap gap-1">
        {book.category.map((category) => (
          <Badge key={category} variant="secondary">
            {category}
          </Badge>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-xs">
        <Button asChild size="sm" variant="secondary">
          <Link to={`/book/${book._id}`}>Details</Link>
        </Button>
        <div className="flex items-center gap-1">
          <Button
            aria-label="Add to cart"
            disabled={cartActionLoading}
            onClick={() => onAddToCart(book._id)}
            size="icon"
            type="button"
          >
            <ShoppingCart />
          </Button>
          <Button
            aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
            className={cn(isFavorite ? "text-app-danger hover:text-app-danger" : undefined)}
            disabled={favoriteActionLoading || isFavoriteCoolingDown}
            onClick={() => onToggleFavorite(book._id)}
            size="icon"
            type="button"
            variant="outline"
          >
            <Heart className={cn(isFavorite ? "fill-current" : undefined)} />
          </Button>
        </div>
      </div>
    </div>
  </article>
);
