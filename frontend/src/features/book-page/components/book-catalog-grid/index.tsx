import { Link } from "react-router-dom";

import { Heart, ShoppingCart, Star } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

import { cn } from "@/common/utils/cn";
import { formatPrice } from "@/common/utils/format-price";
import type { TBook } from "@/features/book-page/types";

const fallbackCoverImage = "/book.png";

type TBookCatalogGridProps = {
  books: TBook[];
  favoriteBookIds: string[];
  favoriteCooldownBookIds: string[];
  favoriteActionLoading: boolean;
  cartActionLoading: boolean;
  onToggleFavorite: (bookId: string) => void;
  onAddToCart: (bookId: string) => void;
};

export const BookCatalogGrid = ({
  books,
  cartActionLoading,
  favoriteCooldownBookIds,
  favoriteBookIds,
  favoriteActionLoading,
  onAddToCart,
  onToggleFavorite,
}: TBookCatalogGridProps) => (
  <section className="grid gap-s sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
    {books.map((book) => {
      const isFavorite = favoriteBookIds.includes(book._id);
      const isFavoriteDisabled =
        favoriteActionLoading || favoriteCooldownBookIds.includes(book._id);

      return (
        <Card
          className="group flex min-h-full flex-col overflow-hidden border-app-border/80 bg-app-surface shadow-app-s transition hover:-translate-y-0.5 hover:border-app-brand/60 hover:shadow-app-m"
          key={book._id}
        >
          <Link
            className="relative block overflow-hidden bg-app-surface-muted"
            to={`/book/${book._id}`}
          >
            <div className="absolute top-xs left-xs z-10 flex items-center gap-1 rounded-full bg-app-surface/90 px-2 py-1 text-xs font-bold text-app-warning shadow-app-s">
              <Star className="size-3.5 fill-current" />
              {book.rate.toFixed(1)}
            </div>
            <div className="absolute right-xs bottom-xs z-10 rounded-full bg-app-surface/90 px-2 py-1 text-xs font-bold text-app-accent shadow-app-s">
              {formatPrice(book.priceCents)}
            </div>
            <img
              alt={book.title}
              className="aspect-2/3 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              src={book.coverImageUrl || book.avatar || fallbackCoverImage}
            />
          </Link>
          <div className="flex flex-1 flex-col gap-xs p-s">
            <div>
              <Link className="text-app-text no-underline" to={`/book/${book._id}`}>
                <h2 className="m-0 line-clamp-2 text-lg leading-tight font-extrabold">
                  {book.title}
                </h2>
              </Link>
              <p className="mt-1 mb-0 truncate text-sm text-app-text-muted">{book.author}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {book.category.slice(0, 3).map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-xs">
              <Button asChild size="sm" variant="secondary">
                <Link to={`/book/${book._id}`}>Details</Link>
              </Button>
              <Button
                aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
                className={cn(isFavorite ? "text-app-danger hover:text-app-danger" : undefined)}
                disabled={isFavoriteDisabled}
                onClick={() => onToggleFavorite(book._id)}
                size="icon"
                type="button"
                variant="outline"
              >
                <Heart className={cn(isFavorite ? "fill-current" : undefined)} />
              </Button>
              <Button
                aria-label="Add to cart"
                disabled={cartActionLoading}
                onClick={() => onAddToCart(book._id)}
                size="icon"
                type="button"
              >
                <ShoppingCart />
              </Button>
            </div>
          </div>
        </Card>
      );
    })}
  </section>
);
