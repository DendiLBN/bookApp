import { Link } from "react-router-dom";

import { Heart, ShoppingCart, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  <Card className="flex min-h-full flex-col overflow-hidden">
    <Link className="block bg-app-surface-muted" to={`/book/${book._id}`}>
      <img
        alt={book.title}
        className="aspect-2/3 w-full object-cover"
        src={book.coverImageUrl || BOOK_COVER_FALLBACK_SRC}
      />
    </Link>
    <CardContent className="flex flex-1 flex-col gap-xs p-s">
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
        <span className="inline-flex items-center gap-1 font-bold text-app-warning">
          <Star className="size-4 fill-current" /> {book.rate}
        </span>
        <div className="flex items-center gap-1">
          <Button
            aria-label="Add to cart"
            disabled={cartActionLoading}
            onClick={() => onAddToCart(book._id)}
            size="icon"
            type="button"
            variant="outline"
          >
            <ShoppingCart />
          </Button>
          <Button
            aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
            disabled={favoriteActionLoading || isFavoriteCoolingDown}
            onClick={() => onToggleFavorite(book._id)}
            size="icon"
            type="button"
            variant={isFavorite ? "default" : "outline"}
          >
            <Heart className={isFavorite ? "fill-current" : undefined} />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);
