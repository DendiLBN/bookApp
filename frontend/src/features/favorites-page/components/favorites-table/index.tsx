import { Link } from "react-router-dom";

import { Heart, Star } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

import { formatPrice } from "@/common/utils/format-price";
import type { TBook } from "@/features/book-page/types";

type TFavoritesTableProps = {
  books: TBook[];
  favoriteActionLoading: boolean;
  onToggleFavorite: (bookId: string) => void;
};

export const FavoritesTable = ({
  books,
  favoriteActionLoading,
  onToggleFavorite,
}: TFavoritesTableProps) => (
  <section className="grid gap-s md:grid-cols-2 xl:grid-cols-3">
    {books.map((book) => (
      <Card className="overflow-hidden" key={book._id}>
        <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-s p-s">
          <Link to={`/book/${book._id}`}>
            <img
              alt={book.title}
              className="aspect-2/3 w-full rounded-m object-cover shadow-app-s"
              src={book.coverImageUrl || book.avatar || "/book.png"}
            />
          </Link>
          <CardContent className="flex flex-col gap-xs p-0">
            <div>
              <Link className="text-app-text no-underline" to={`/book/${book._id}`}>
                <h2 className="m-0 line-clamp-2 text-lg font-extrabold">{book.title}</h2>
              </Link>
              <p className="mt-1 mb-0 text-sm text-app-text-muted">{book.author}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {book.category.slice(0, 2).map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-xs">
              <span className="inline-flex items-center gap-1 font-bold text-app-warning">
                <Star className="size-4 fill-current" />
                {book.rate}
              </span>
              <span className="font-bold text-app-accent">{formatPrice(book.priceCents)}</span>
            </div>
            <Button
              disabled={favoriteActionLoading}
              onClick={() => onToggleFavorite(book._id)}
              type="button"
              variant="outline"
            >
              <Heart className="fill-current" />
              Remove favorite
            </Button>
          </CardContent>
        </div>
      </Card>
    ))}
  </section>
);
